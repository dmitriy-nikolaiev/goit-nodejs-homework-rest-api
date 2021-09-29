const { User } = require('../../model/schemas')
const { Conflict } = require('http-errors')
const gravatar = require('gravatar')
const { sendMail } = require('../../utils')

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (user) {
      throw new Conflict('Email in use')
    }

    const newUser = new User({ email })
    newUser.setPassword(password)

    const gravatarOptions = { s: '250', d: 'robohash' }
    newUser.avatarURL = gravatar.url(email, gravatarOptions, false)

    newUser.setVerifyToken()

    await newUser.save()

    const { host } = req.headers
    const { subscription, avatarURL, verificationToken } = newUser
    const data = {
      to: email,
      subject: 'Email address verification',
      html: `<b> Hi user!</b>
      <p>We just need to verify your email address before you can access to ${host}.</p>
      <p>Verify your email address: <a href="http://${host}/users/verify/${verificationToken}">Just follow this link</a></p>

      Thanks! &#8211; The Company team)
      `,
    }

    await sendMail(data)
    // const sendingResult = await sendMail(data)
    // if (!sendingResult) {
    //   throw new Conflict('Email verification sending failed')
    // }

    res.status(201).json({
      user: {
        email,
        subscription,
        avatarURL,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = signup
