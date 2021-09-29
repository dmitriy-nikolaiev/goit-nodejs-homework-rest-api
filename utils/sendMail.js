const sgMail = require('@sendgrid/mail')

const { SENDGRID_API_KEY, SENDGRID_SENDER_MAIL } = process.env

sgMail.setApiKey(SENDGRID_API_KEY)

const sendMail = async data => {
  try {
    const mail = { ...data, from: SENDGRID_SENDER_MAIL }
    await sgMail.send(mail)
    return true
  } catch (error) {
    return false
  }
}

module.exports = sendMail
