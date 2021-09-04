const { Contact } = require('../../model/schemas')
const { NotFound } = require('http-errors')

const update = async (req, res, next) => {
  const { contactId } = req.params

  const updateContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: req.user._id },
    {
      ...req.body,
      owner: req.user._id,
    },
    {
      new: true,
    },
  )
  if (!updateContact) {
    throw new NotFound()

    // return res.status(404).json({
    //   message: 'Not found',
    // })
  }

  res.status(201).json({
    contact: updateContact,
  })
}

module.exports = update
