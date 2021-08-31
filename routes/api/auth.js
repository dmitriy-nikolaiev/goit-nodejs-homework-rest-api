const express = require('express')

const { joiUserSchema } = require('../../model/schemas')
const { validation } = require('../../middlewares')
const { auth } = require('../../controllers')

const router = express.Router()

const userValidationMiddleware = validation(joiUserSchema)

router.post('/signup', userValidationMiddleware, auth.signup)

// router.post("/login", userValidationMiddleware, ctrl.login);

// router.get("/logout", ctrl.logout);

module.exports = router
