const { Contact } = require('../../model/schemas')

const getAll = async (req, res, next) => {
  try {
    const contact = await Contact.find(req.query, 'name email phone favorite')
    res.json({
      contact,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getAll
