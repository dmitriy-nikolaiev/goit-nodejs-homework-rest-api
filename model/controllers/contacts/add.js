const { joiContactSchema } = require('../../validation')
const contactOperations = require('../../contactsData')

const add = async (req, res, next) => {
  try {
    const { error } = joiContactSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        message: error.message,
      })
    }

    const newContact = await contactOperations.add(req.body)
    res.status(201).json({
      contact: newContact,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = add
