const express = require('express')

const { joiUserSchema } = require('../../model/schemas')
const {
  validation,
  authentication,
  controllerWrapper,
} = require('../../middlewares')
const { auth } = require('../../controllers')

const router = express.Router()

const userValidationMiddleware = validation(joiUserSchema)

router.post('/signup', userValidationMiddleware, controllerWrapper(auth.signup))

router.post('/login', userValidationMiddleware, controllerWrapper(auth.login))

router.get('/logout', authentication, controllerWrapper(auth.logout))

router.get('/current', authentication, controllerWrapper(auth.getCurrent))

router.patch('/', authentication, controllerWrapper(auth.updateSubscription))

module.exports = router
