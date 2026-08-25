const express = require('express')
const cors = require('cors')
const multer = require('multer')

const app = express()
const upload = multer({ storage: multer.memoryStorage() })

app.use(cors())
app.use(express.json())

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Pasumai Paravai AI server online'
  })
})

// AI disease detection demo endpoint
app.post('/api/detect-disease', upload.single('image'), (req, res) => {

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'Crop image is required'
    })
  }

  // Demo AI response
  res.json({
    success: true,
    status: 'Detected',
    crop: 'Crop',
    disease: 'Healthy / No major disease detected',
    confidence: 92,
    message: 'AI screening completed successfully'
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(
    `Pasumai Paravai AI server running on http://localhost:${PORT}`
  )
})