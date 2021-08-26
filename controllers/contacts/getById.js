const contactOperations = require('../../model/contactsData')

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params

    const contact = await contactOperations.getById(contactId)
    if (!contact) {
      return res.status(404).json({
        message: 'Not found',
      })
    }

    res.json({
      contact,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getById
