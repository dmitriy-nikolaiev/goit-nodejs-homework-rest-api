const express = require('express')

const { joiContactSchema } = require('../../model/schemas')
const { validation, authentication } = require('../../middlewares')
// const {users: ctrl} = require("../../controllers");
// const authentication = require('../../middlewares/authentication')

const validationMiddleware = validation(joiContactSchema)

const router = express.Router()

const ctrl = require('../../model')

router.get('/', authentication, ctrl.listContacts)
// router.get('/', authentication, ctrl.listContacts)

router.get('/:contactId', ctrl.getContactById)

router.post('/', validationMiddleware, ctrl.addContact)

router.delete('/:contactId', ctrl.removeContact)

router.put('/:contactId', validationMiddleware, ctrl.updateContact)

router.patch('/:contactId/favorite', ctrl.updateStatusContact)

module.exports = router
