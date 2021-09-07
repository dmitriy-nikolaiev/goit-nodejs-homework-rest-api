const { Contact } = require('../../model/schemas')
const { NotFound } = require('http-errors')

const remove = async (req, res) => {
  const { contactId } = req.params
  const deletedContact = await Contact.findOneAndRemove({
    _id: contactId,
    owner: req.user._id,
  })

  if (!deletedContact) {
    throw new NotFound()
    // return res.status(404).json({
    //   message: 'Not found',
    // })
  }

  res.json({
    deletedContact,
  })
}

module.exports = remove
