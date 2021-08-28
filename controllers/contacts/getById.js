const { Contact } = require('../../model/schemas')
// findOne({ _id })
// findById
const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    // const contact = await Contact.findOne({ _id: contactId })
    const contact = await Contact.findById(contactId)

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
