const { Contact } = require('../../model/schemas')

const add = async (req, res, next) => {
  try {
    // user добавлен в req в модуле проверки аутентификации middlewares/authentication
    console.log(req.user._id)
    const newContact = await Contact.create({
      ...req.body,
      owner: req.user._id,
    })
    res.status(201).json({
      newContact,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = add
