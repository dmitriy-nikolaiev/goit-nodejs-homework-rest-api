const { Contact } = require('../../model/schemas')
const { BadRequest, NotFound } = require('http-errors')

const updateStatus = async (req, res) => {
  const { contactId } = req.params
  const { favorite } = req.body

  if (favorite === undefined) {
    throw new BadRequest('missing field favorite')

    // return res.status(400).json({
    //   message: 'missing field favorite',
    // })
  }

  const updateContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: req.user._id },
    { favorite },
    {
      new: true,
    },
  )
  // const updateContact = await Contact.findByIdAndUpdate(
  //   contactId,
  //   { favorite },
  //   {
  //     new: true,
  //   },
  // )
  if (!updateContact) {
    throw new NotFound()

    // return res.status(404).json({
    //   message: 'Not found',
    // })
  }

  res.json({
    contact: updateContact,
  })
}

module.exports = updateStatus
