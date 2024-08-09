import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import multer from 'multer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '..', 'db', 'users.json')
const uploadDir = path.join(__dirname, '..', 'db', 'photos')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage: storage })

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

async function uploadPhoto(req, res) {
  try {
    const { userId } = req.body

    if (!req.file || !userId) {
      res.status(400).send('Nenhum arquivo enviado ou userId invalido')
      return
    }

    const usersData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'))

    const user = usersData.find(user => user.id === userId)

    if (!user) {
      return res.status(404).send('Usuário não encontrado')
    }

    if (user?.photos?.length === 5 && user?.plan === 'free') {
      res.status(409).json({
        message: 'limite de fotos no modo gratuito'
      })
      return
    }

    const photoPath = req.file.path.replace(/\\/g, '/')
    user.photos = user.photos || []
    user.photos.push({
      filename: req.file.filename,
      path: req.file.path,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      ownerId: userId
    })

    fs.writeFileSync(dbPath, JSON.stringify(usersData, null, 2), 'utf-8')

    res.send({
      message: 'Upload bem-sucedido e caminho da foto salvo',
      photoData: {
        filename: req.file.filename,
        path: req.file.path,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        ownerId: userId
      }
    })


  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export { upload, uploadPhoto }