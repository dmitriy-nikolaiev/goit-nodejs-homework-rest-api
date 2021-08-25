// const fs = require('fs/promises')
// const contacts = require('./contacts.json')

const contactsControl = require('./controllers/contacts')

const listContacts = contactsControl.getAll

const getContactById = contactsControl.getById

const removeContact = contactsControl.remove

const addContact = contactsControl.add

const updateContact = contactsControl.update

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
