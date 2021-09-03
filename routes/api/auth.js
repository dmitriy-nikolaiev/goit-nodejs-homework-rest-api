const express = require('express')

const { joiUserSchema } = require('../../model/schemas')
const { validation, authentication } = require('../../middlewares')
const { auth } = require('../../controllers')

const router = express.Router()

const userValidationMiddleware = validation(joiUserSchema)

router.post('/signup', userValidationMiddleware, auth.signup)

router.post('/login', userValidationMiddleware, auth.login)

router.post('/logout', authentication, auth.logout)

// router.get('/', ctrl.logout);

module.exports = router
