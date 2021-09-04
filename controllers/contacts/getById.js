const { Contact } = require('../../model/schemas')
const { NotFound } = require('http-errors')

const getById = async (req, res) => {
  const { contactId } = req.params
  const contact = await Contact.findOne({
    _id: contactId,
    owner: req.user._id,
  }).populate('owner', '_id email subscription')
  // const contact = await Contact.findById(contactId).populate(
  //   'owner',
  //   '_id email subscription',
  // )

  if (!contact) {
    throw new NotFound()

    // return res.status(404).json({
    //   message: 'Not found',
    // })
  }

  res.json({
    contact,
  })
}

module.exports = getById
