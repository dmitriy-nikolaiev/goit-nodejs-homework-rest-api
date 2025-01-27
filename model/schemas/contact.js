const { Schema, SchemaTypes, model } = require('mongoose')
const Joi = require('joi')

const mongoosePaginate = require('mongoose-paginate-v2')

const emailRegexp = /\b[\w\\.-]+@[\w\\.-]+\.\w{2,4}\b/
const phoneRegexp =
  /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      match: emailRegexp,
    },
    phone: {
      type: String,
      match: phoneRegexp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
)
contactSchema.plugin(mongoosePaginate)

const joiContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp),
  phone: Joi.string().pattern(phoneRegexp),
  favorite: Joi.boolean(),
})

const Contact = model('contact', contactSchema)

module.exports = { Contact, joiContactSchema }
