const path = require('path')
const fs = require('fs/promises')

const { User } = require('../../model/schemas')
// const { NotFound } = require('http-errors')

const avatarsDir = path.join(__dirname, '../../', 'public/avatars')

const updateAvatar = async (req, res) => {
  const id = req.user._id.toHexString()
  // const id = req.user._id.str
  // const id = JSON.stringify(req.user._id)
  // console.log(req.file)

  const { path: tempPath, originalname } = req.file
  const fileName = id + '_avatar' + path.extname(originalname)
  // const uploadPath = path.join(avatarsDir, id, originalname)
  const uploadPath = path.join(avatarsDir, fileName)

  try {
    await fs.rename(tempPath, uploadPath)
    const avatarURL = `/avatars/${fileName}`
    await User.findByIdAndUpdate(id, { avatarURL })

    res.json({ avatarURL })
  } catch (error) {
    await fs.unlink(tempPath)
    throw error
  }

  // file upload
  // const avatarURL = ''
  // const updatedUser = await User.findByIdAndUpdate(
  //   req.user._id,
  //   { avatarURL },
  //   {
  //     new: true,
  //   },
  // )
  // if (!updatedUser) {
  //   throw new NotFound()
  // }

  // res.json({ avatarURL })
}

module.exports = updateAvatar
