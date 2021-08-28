const { Contact } = require('../../model/schemas')

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const deletedContact = await Contact.findByIdAndRemove(contactId)

    if (!deletedContact) {
      return res.status(404).json({
        message: 'Not found',
      })
    }

    res.json({
      deletedContact,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = remove
