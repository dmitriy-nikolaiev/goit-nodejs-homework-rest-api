const express = require('express')

const { joiContactSchema } = require('../../model/schemas')
const { validation } = require('../../middlewares')
// const {users: ctrl} = require("../../controllers");

const validationMiddleware = validation(joiContactSchema)

const router = express.Router()

const ctrl = require('../../model')

router.get('/', ctrl.listContacts)

router.get('/:contactId', ctrl.getContactById)

router.post('/', validationMiddleware, ctrl.addContact)

router.delete('/:contactId', ctrl.removeContact)

router.put('/:contactId', validationMiddleware, ctrl.updateContact)

router.patch('/:contactId/favorite', ctrl.updateStatusContact)

module.exports = router
