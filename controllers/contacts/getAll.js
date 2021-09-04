const { Contact } = require('../../model/schemas')

const getAll = async (req, res) => {
  const contact = await Contact.find({
    ...req.query,
    owner: req.user._id,
  }).populate('owner', '_id email subscription')

  res.json({
    contact,
  })
}

module.exports = getAll
