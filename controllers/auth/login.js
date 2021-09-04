const jwt = require('jsonwebtoken')
const { Unauthorized } = require('http-errors')

const { User } = require('../../model/schemas')

require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  const compareResult = user.comparePassword(password)

  if (!user || !compareResult) {
    throw new Unauthorized('Email or password is wrong')
    // return res.status(401).json({
    //   message: 'Email or password is wrong',
    // })
  }

  const { _id: id, subscription } = user
  const payload = { id }
  // const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
  const token = jwt.sign(payload, SECRET_KEY)
  await User.findByIdAndUpdate(
    id,
    { token },
    {
      new: true,
      select: 'token',
    },
  )

  res.json({
    token,
    user: {
      email,
      subscription,
    },
  })
}

module.exports = login
