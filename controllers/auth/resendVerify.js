const { BadRequest } = require('http-errors')

const { User } = require('../../model/schemas')
const { sendMail } = require('../../utils')

const resendVerify = async (req, res) => {
  const { email } = req.body

  if (!email) {
    throw new BadRequest('missing required field email')
  }

  const findUser = await User.findOne({ email })
  if (!findUser) {
    throw new BadRequest('User email not found')
  }
  if (findUser.verify) {
    throw new BadRequest('Verification has already been passed')
  }

  findUser.setVerifyToken()
  await findUser.save()

  const { host } = req.headers
  const { verificationToken } = findUser
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
  res.json({
    message: 'Verification email sent',
  })
}

module.exports = resendVerify
