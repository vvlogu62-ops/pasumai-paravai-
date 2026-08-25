const multer = require('multer')

const upload = multer({
  storage: multer.memoryStorage()
})

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    })
  }

  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'Image upload failed'
      })
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Crop image is required'
      })
    }

    // Temporary demo AI response
    return res.status(200).json({
      success: true,
      status: 'Detected',
      crop: 'Paddy',
      disease: 'Healthy / No major disease detected',
      confidence: 92,
      message: 'AI screening completed successfully'
    })
  })
}
