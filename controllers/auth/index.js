const signup = require('./signup')
const login = require('./login')
const logout = require('./logout')
const getCurrent = require('./getCurrent')
const updateSubscription = require('./updateSubscription')
const updateAvatar = require('./updateAvatar')
const getVerify = require('./getVerify')
const resendVerify = require('./resendVerify')

module.exports = {
  signup,
  login,
  logout,
  getCurrent,
  updateSubscription,
  updateAvatar,
  getVerify,
  resendVerify,
}
