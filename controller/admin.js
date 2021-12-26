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

const CHALLENGE = [18.4, 24.9, 29.9, 34.9, 39.9, Infinity]

const BMI_UNKNOWN_DATA = {
  BMI: '-',
  BMICateogry: '-',
  HealthRisk: '-',
}

const calculateBMI = (weight, height) => {
  return weight / (height * height)
}

const findCategoryAndRisk = (bmi) => {
  // special case for reducing overhead
  if (bmi > CHALLENGE[4]) return [BMICATEGORY[5], HEALTHRISK[5]]
  // general cases
  for (let i = 0; ; i++) {
    if (bmi <= CHALLENGE[i]) return [BMICATEGORY[i], HEALTHRISK[i]]
  }
}

const isValid = (field) => {
  if (isNaN(field) || field === 0 || field === Infinity) return false
  else return true
}

exports.getBMIData = (req, res, next) => {
  const data = req.body
  const updatedData = []
  let countOverweightPeople = 0
  for (let record of data) {
    let weight, height
    try {
      weight = parseInt(record['WeightKg'])
      height = parseInt(record['HeightCm']) * 0.01
      if (!isValid(weight) || !isValid(height)) {
        throw 'Invalid Data'
      }

      let BMI = calculateBMI(weight, height)
      BMI = Math.round((BMI + Number.EPSILON) * 100) / 100
      const [bmiCategory, healthRisk] = findCategoryAndRisk(BMI)
      if (bmiCategory === 'Overweight') countOverweightPeople++
      record['BMI'] = BMI + ' kg/m2'
      record['BMICateogry'] = bmiCategory
      record['HealthRisk'] = healthRisk
    } catch (err) {
      record = { ...record, ...BMI_UNKNOWN_DATA }
    }

    updatedData.push(record)
  }
  return res.json({
    updatedData: updatedData,
    totalNumberOfOverweightPeople: countOverweightPeople,
  })
}
