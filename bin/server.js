const mongoose = require('mongoose')

require('dotenv').config()

const app = require('../app')

// const { DB_HOST, PORT = 3000 } = process.env
const { DB_USER, DB_USER_PASS, DB_NAME, PORT = 3000 } = process.env
const DB_HOST = `mongodb+srv://${DB_USER}:${DB_USER_PASS}@cluster0.zavyu.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

mongoose
  .connect(DB_HOST, {
    // These parameters are no longer supported from version Mongoose 6.x
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
  })
  .then(() => {
    app.listen(PORT)
    console.log('Database connection successful')
  })
  .catch(error => {
    console.log(error)
    process.exit(1)
  })
