const mongoose = require('mongoose')

require('dotenv').config()

const app = require('../app')

const { DB_HOST, PORT = 3000 } = process.env

// {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// }
// mongoose.set('useNewUrlParser', true)
// mongoose.set('useFindAndModify', false)
// mongoose.set('useCreateIndex', true)
// mongoose.set('useUnifiedTopology', true)

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT)
    console.log('Database connection successful')
  })
  .catch(error => {
    console.log(error)
    process.exit(1)
  })
