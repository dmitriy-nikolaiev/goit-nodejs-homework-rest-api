const { Contact } = require('../../model/schemas')

const getAll = async (req, res) => {
  const { page = 1, limit = 0, ...searchQuery } = { ...req.query }
  searchQuery.owner = req.user._id
  const paginationOptions = {
    page: +page,
    limit: +limit,
    populate: { path: 'owner', select: '_id email subscription' },
  }
  const { docs: contacts, ...rest } = await Contact.paginate(
    searchQuery,
    limit === 0 ? { pagination: false } : paginationOptions,
  )

  res.json({
    contacts,
    ...rest,
  })
}

// Без пагинации
// const getAll = async (req, res) => {
//   const contact = await Contact.find({
//     ...req.query,
//     owner: req.user._id,
//   }).populate('owner', '_id email subscription')

//   res.json({
//     contact,
//   })
// }

module.exports = getAll
