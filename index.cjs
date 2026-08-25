const express = require('express')
const cors = require('cors')
const multer = require('multer')
const { predictDisease } = require('./aiModel')

const app = express()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
})

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Pasumai Paravai AI server is running'
  })
})

app.post('/api/detect-disease', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No image uploaded'
      })
    }

    const prediction = await predictDisease(req.file.originalname)

    res.json({
      status: prediction.disease === 'Healthy'
        ? 'Healthy'
        : 'Possible Issue',
      ...prediction
    })
  } catch (error) {
    console.error('AI error:', error)

    res.status(500).json({
      error: 'AI detection failed'
    })
  }
})

const PORT = process.env.PORT || 3001

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌱 Pasumai Paravai AI server running on port ${PORT}`)
})
