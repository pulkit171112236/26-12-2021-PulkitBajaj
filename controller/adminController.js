const BMICATEGORY = [
  'Underweight',
  'Normal weight',
  'Overweight',
  'Moderately obese',
  'Severel obese',
  'Very severely obese',
]

const HEALTHRISK = [
  'Malnutrition risk',
  'Low risk',
  'Enhanced risk',
  'Medium risk',
  'High',
  'Very high risk',
]

const challenge = [18.4, 24.9, 29.9, 34.9, 39.9, Infinity]

const calculateBMI = (weight, height) => {
  return weight / (height * height)
}

const findAttributes = (bmi) => {
  for (let i = 0; ; i++) {
    if (bmi <= challenge[i]) return [BMICATEGORY[i], HEALTHRISK[i]]
  }
}

module.exports = (req, res, next) => {
  const data = req.body
  const updatedData = data
  let countOverweightPeople = 0
  for (let el of updatedData) {
    const weight = el['WeightKg']
    const height = el['HeightCm'] * 0.01
    const BMI = calculateBMI(weight, height)
    const [bmiCategory, healthRisk] = findAttributes(BMI)
    if (bmiCategory === 'Overweight') countOverweightPeople++
    el['BMI'] = BMI + ' kg/m2'
    el['BMICateogry'] = bmiCategory
    el['HealthRisk'] = healthRisk
  }
  return res.json({
    updatedData: updatedData,
    totalNumberOfOverweightPeople: countOverweightPeople,
  })
}
