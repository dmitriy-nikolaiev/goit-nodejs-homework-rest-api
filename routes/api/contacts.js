const express = require('express')

const { joiContactSchema } = require('../../model/schemas')
const {
  validation,
  authentication,
  controllerWrapper,
} = require('../../middlewares')

const validationMiddleware = validation(joiContactSchema)

const router = express.Router()

const ctrl = require('../../model')

router.get('/', authentication, controllerWrapper(ctrl.listContacts))
// router.get('/', authentication, ctrl.listContacts)

router.get(
  '/:contactId',
  authentication,
  controllerWrapper(ctrl.getContactById),
)

router.post(
  '/',
  authentication,
  validationMiddleware,
  controllerWrapper(ctrl.addContact),
)

router.delete(
  '/:contactId',
  authentication,
  controllerWrapper(ctrl.removeContact),
)

router.put(
  '/:contactId',
  authentication,
  validationMiddleware,
  controllerWrapper(ctrl.updateContact),
)

router.patch(
  '/:contactId/favorite',
  authentication,
  validationMiddleware,
  controllerWrapper(ctrl.updateStatusContact),
)

module.exports = router
