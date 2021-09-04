const { User } = require('../../model/schemas')
const { Conflict } = require('http-errors')

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
    await newUser.save()

    const { subscription } = newUser
    res.status(201).json({
      user: {
        email,
        subscription,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = signup
