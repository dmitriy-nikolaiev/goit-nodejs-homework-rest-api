const { User } = require('../../model/schemas')
const { Conflict } = require('http-errors')
const gravatar = require('gravatar')

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (user) {
      throw new Conflict('Email in use')

      // return res.status(409).json({
      //   message: 'Email in use',
      // })
    }

    const newUser = new User({ email })
    newUser.setPassword(password)

    const gravatarOptions = { s: '200', r: 'g', d: 'monsterid' }
    newUser.avatarURL = gravatar.url(email, gravatarOptions, false)

    await newUser.save()

    const { subscription, avatarURL } = newUser
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
