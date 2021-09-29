const bcrypt = require('bcryptjs')
const { Schema, model } = require('mongoose')
const Joi = require('joi')
const { nanoid } = require('nanoid')

const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const subscriptionValues = ['starter', 'pro', 'business']

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: emailRegexp,
    },
    subscription: {
      type: String,
      enum: [...subscriptionValues],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: '',
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true },
)

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.methods.setVerifyToken = function () {
  this.verificationToken = nanoid()
  this.verify = false
}

const joiUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid(...subscriptionValues),
  avatarURL: Joi.string(),
  verify: Joi.boolean(),
  verificationToken: Joi.string(),
})

const User = model('user', userSchema)

module.exports = {
  User,
  joiUserSchema,
}
