const { User } = require('../../model/schemas')
const { BadRequest, NotFound } = require('http-errors')

const updateSubscription = async (req, res) => {
  const { subscription } = req.body

  if (subscription === undefined) {
    throw new BadRequest('missing field subscription')
    // return res.status(400).json({
    //   message: 'missing field subscription',
    // })
  }

  const updateUser = await User.findByIdAndUpdate(
    req.user._id,
    { subscription },
    {
      new: true,
      runValidators: true,
    },
  )
  if (!updateUser) {
    throw new NotFound()
    // return res.status(404).json({
    //   message: 'Not found',
    // })
  }

  res.json({
    updateUser,
  })
}

module.exports = updateSubscription
