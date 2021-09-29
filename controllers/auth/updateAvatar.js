const path = require('path')
const fs = require('fs/promises')
const { BadRequest } = require('http-errors')
const Jimp = require('jimp')

const { User } = require('../../model/schemas')

const avatarsDir = path.join(__dirname, '../../', 'public/avatars')
const fileExtFilter = 'jpg|jpeg|png|gif'

const updateAvatar = async (req, res) => {
  const id = req.user._id.toString()
  const { path: tempPath, originalname } = req.file

  try {
    if (!originalname.match(`\\.(${fileExtFilter})$`)) {
      await fs.unlink(tempPath)
      throw new BadRequest(
        `Only the following file types are allowed: ${fileExtFilter}.`,
      )
    }

    const fileName = id + '_avatar' + path.extname(originalname)
    const uploadPath = path.join(avatarsDir, fileName)

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
