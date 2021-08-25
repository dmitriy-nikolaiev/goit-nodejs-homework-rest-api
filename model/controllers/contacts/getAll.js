// const contactOperations = require('../../')
const contactOperations = require('../../contactsData')

const getAll = async (_, res, next) => {
  try {
    const contacts = await contactOperations.getAll()

    res.json({
      contacts,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getAll
