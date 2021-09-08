const multer = require('multer')
const path = require('path')

const tempDir = path.join(__dirname, '../', 'tmp')

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    fileSize: 1024,
  },
  // fileFilter: (req, file, cb) => {
  //   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
  //     // return cb(new Error(`Only jpg|jpeg|png|gif are allowed`))
  //   }

  //   cb(null, true)
  // },
})

const upload = multer({
  storage: multerConfig,
})

module.exports = upload
