const path = require('path')
const fs = require('fs/promises')
const { BadRequest } = require('http-errors')
const Jimp = require('jimp')

const { User } = require('../../model/schemas')

const avatarsDir = path.join(__dirname, '../../', 'public/avatars')
const fileExtFilter = 'jpg|jpeg|png|gif'

const updateAvatar = async (req, res) => {
  const id = req.user._id.toHexString()
  // const id = req.user._id.str
  // const id = JSON.stringify(req.user._id)
  // console.log(req.file)

  const { path: tempPath, originalname } = req.file

  if (!originalname.match(`\\.(${fileExtFilter})$`)) {
    await fs.unlink(tempPath)
    throw new BadRequest(`Only ${fileExtFilter} are allowed`)
  }

  const fileName = id + '_avatar' + path.extname(originalname)
  // const uploadPath = path.join(avatarsDir, id, originalname)
  const uploadPath = path.join(avatarsDir, fileName)

  try {
    const JimpFile = await Jimp.read(tempPath)
    JimpFile.resize(250, 250).writeAsync(tempPath)

    await fs.rename(tempPath, uploadPath)
    const avatarURL = `/avatars/${fileName}`
    await User.findByIdAndUpdate(id, { avatarURL })

    res.json({ avatarURL })
  } catch (error) {
    await fs.unlink(tempPath)
    throw error
  }
}

module.exports = updateAvatar
