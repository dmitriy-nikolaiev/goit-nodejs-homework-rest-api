const { Contact } = require('../../model/schemas')

const updateStatus = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const { favorite } = req.body

    if (favorite === undefined) {
      return res.status(400).json({
        message: 'missing field favorite',
      })
    }

    const updateContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      {
        new: true,
      },
    )
    if (!updateContact) {
      return res.status(404).json({
        message: 'Not found',
      })
    }

    res.json({
      contact: updateContact,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = updateStatus
