const { User } = require('../../model/schemas')
const { Unauthorized } = require('http-errors')

const getCurrent = async (req, res) => {
  // const currentUser = await User.findById(req.user._id).select(
  //   'email subscription -_id',
  // )
  const currentUser = await User.findById(req.user._id)
  if (!currentUser) {
    throw new Unauthorized('Not authorized')
  }

  const { email, subscription } = currentUser
  res.json({ email, subscription })
}

module.exports = getCurrent
