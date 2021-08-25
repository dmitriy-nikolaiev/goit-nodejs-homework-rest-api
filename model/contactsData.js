const path = require('path')
const fs = require('fs').promises
const { v4 } = require('uuid')

const contactsPath = path.join(__dirname, './contacts.json')

async function getAll() {
  try {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)

    return contacts
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

async function getById(contactId) {
  try {
    const contacts = await getAll()
    const findContact = contacts.find(
      contact => String(contact.id) === String(contactId),
    )

    if (!findContact) {
      return null
      // throw new Error(`Contact with id=${contactId} not found`)
    }

    return findContact
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

async function add(data) {
  const newContact = { id: v4(), ...data }

  try {
    const contacts = await getAll()
    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts))

    return newContact
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

async function remove(contactId) {
  try {
    const contacts = await getAll()
    const idx = contacts.findIndex(
      item => String(item.id) === String(contactId),
    )
    if (idx === -1) {
      return null
    }

    const newContacts = contacts.filter(
      contact => String(contact.id) !== String(contactId),
    )
    await fs.writeFile(contactsPath, JSON.stringify(newContacts))

    return contacts[idx]
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

async function update(contactId, updateData) {
  try {
    const UpdateContacts = await getAll()
    const idx = UpdateContacts.findIndex(
      item => String(item.id) === String(contactId),
    )
    if (idx === -1) {
      return null
    }

    UpdateContacts[idx] = { ...UpdateContacts[idx], ...updateData }
    await fs.writeFile(contactsPath, JSON.stringify(UpdateContacts))

    return UpdateContacts[idx]
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
}
