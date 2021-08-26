const { joiContactSchema } = require('../../model/validation')
const contactOperations = require('../../model/contactsData')

const update = async (req, res, next) => {
  try {
    const { error } = joiContactSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        message: error.message,
      })
    }

    const { contactId } = req.params
    const updateContact = await contactOperations.update(contactId, req.body)

    if (!updateContact) {
      return res.status(404).json({
        message: 'Not found',
      })
    }

    res.status(201).json({
      contact: updateContact,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = update