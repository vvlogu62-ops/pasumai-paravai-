import express from 'express'
import cors from 'cors'
import multer from 'multer'

const app = express()

app.use(cors())
app.use(express.json())

const upload = multer({
  storage: multer.memoryStorage()
})

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Pasumai Paravai AI server online'
  })
})

// AI disease detection
app.post('/api/detect-disease', upload.single('image'), async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Crop image is required'
      })
    }

    console.log('Crop image received:', req.file.originalname)

    // Demo AI response
    // Real AI model can be connected here later.
    const result = {
      success: true,
      status: 'Detected',
      crop: 'Crop',
      disease: 'Healthy / No major disease detected',
      confidence: 92
    }

    res.status(200).json(result)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      success: false,
      message: 'AI detection failed'
    })

  }

})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(
    `Pasumai Paravai AI server running on http://localhost:${PORT}`
  )
})