const jwt = require('jsonwebtoken')
const { Unauthorized } = require('http-errors')

const { User } = require('../model/schemas')

require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

const authentication = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Unauthorized()
      // return res.status(401).json({
      //   message: 'Not authorized',
      // })
    }

    const [bearer, token] = req.headers.authorization.split(' ')
    if (bearer !== 'Bearer') {
      throw new Unauthorized()
      // return res.status(401).json({
      //   message: 'Not authorized',
      // })
    }

    jwt.verify(token, SECRET_KEY)
    // const verifyRes = jwt.verify(token, SECRET_KEY)
    // console.log(verifyRes)

    const user = await User.findOne({ token })
    if (!user) {
      throw new Unauthorized()
      // return res.status(401).json({
      //   message: 'Not authorized',
      // })
    }

    req.user = user
    next()
  } catch (error) {
    next(new Unauthorized(error.message))
  }
}

module.exports = authentication
