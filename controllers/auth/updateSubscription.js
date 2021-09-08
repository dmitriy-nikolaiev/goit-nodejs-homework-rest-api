const { User } = require('../../model/schemas')
const { BadRequest, NotFound } = require('http-errors')

const updateSubscription = async (req, res) => {
  const { subscription } = req.body

  if (subscription === undefined) {
    throw new BadRequest('missing field subscription')
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { subscription },
    {
      new: true,
      runValidators: true,
    },
  )
  if (!updatedUser) {
    throw new NotFound()
  }

  const { email } = updatedUser
  res.json({ email, subscription })
}

module.exports = updateSubscription
