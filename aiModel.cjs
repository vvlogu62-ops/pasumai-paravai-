async function predictDisease(imagePath) {
  console.log('AI image received:', imagePath)

  // Temporary demo prediction
  return {
    crop: 'Paddy',
    disease: 'Healthy',
    confidence: 92
  }
}

module.exports = {
  predictDisease
}
