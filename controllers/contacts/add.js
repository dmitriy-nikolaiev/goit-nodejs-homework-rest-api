const { Contact } = require('../../model/schemas')

const add = async (req, res, next) => {
  try {
    const newContact = await Contact.create(req.body)
    res.status(201).json({
      newContact,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = add
