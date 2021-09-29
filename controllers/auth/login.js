const jwt = require('jsonwebtoken')
const { Unauthorized, Forbidden } = require('http-errors')

const { User } = require('../../model/schemas')

require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  const compareResult = user && user.comparePassword(password)

  if (!user || !compareResult) {
    throw new Unauthorized('Email or password is wrong')
  }

  if (!user.verify) {
    throw new Forbidden('Email not verified')
  }

  const { _id: id, subscription } = user
  const payload = { id }
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
