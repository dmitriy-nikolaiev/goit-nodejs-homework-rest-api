const jwt = require('jsonwebtoken')

const { User } = require('../../model/schemas')

require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    const compareResult = user.comparePassword(password)

    if (!user || !compareResult) {
      return res.status(401).json({
        message: 'Email or password is wrong',
      })
    }

    const { id, subscription } = user
    const payload = { id }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' })
    await User.updateOne({ _id: id }, { token })

    res.json({
      token,
      user: {
        email,
        subscription,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = login
