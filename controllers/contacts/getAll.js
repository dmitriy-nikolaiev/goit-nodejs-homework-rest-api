const { Contact } = require('../../model/schemas')

const getAll = async (_, res, next) => {
  try {
    const contact = await Contact.find({}, 'name email phone favorite')
    res.json({
      contact,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getAll
