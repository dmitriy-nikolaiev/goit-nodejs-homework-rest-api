const { User } = require('../../model/schemas')
const { NotFound } = require('http-errors')

const getVerify = async (req, res) => {
  const { verificationToken } = req.params

  const user = await User.findOneAndUpdate(
    { verificationToken },
    { verificationToken: null, verify: true },
  )

  if (!user) {
    throw new NotFound('User not found')
  }

  res.json({
    message: 'Verification successful',
  })
}

module.exports = getVerify
