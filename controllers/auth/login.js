const { User } = require('../../model/schemas')

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    const compareResult = user.comparePassword(password)

    if (!user || !compareResult) {
      return res.status(400).json({
        message: 'Email or password is wrong',
      })
    }

    const token = 'exampletoken_maswdcc93022cnjdhd92dsd221093ddbseir'
    const { subscription } = user
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
