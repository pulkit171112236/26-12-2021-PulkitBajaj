const expect = require('chai').expect

const adminController = require('../controller/admin')

describe('Admin Controller', function () {
  var res
  before(function () {
    res = {
      json: function (data) {
        this.updatedData = data.updatedData
        this.totalNumberOfOverweightPeople = data.totalNumberOfOverweightPeople
      },
    }
  })

  it('should retain count of the records passed', function () {
    const req = {
      body: [
        { a: 'test', b: 'test', c: 1 },
        { a: 'test', b: 'test', c: 1 },
        { a: 'test', b: 'test', c: 1 },
      ],
    }
    adminController.getBMIData(req, res, () => {})
    expect(res.updatedData).to.have.lengthOf(3)
    expect(res.totalNumberOfOverweightPeople).to.be.equal(0)
  })

  it('should give correct category of people', function () {
    const req = {
      body: [
        {
          Gender: 'Male',
          HeightCm: 178,
          WeightKg: 58,
        },
        {
          Gender: 'Male',
          HeightCm: 180,
          WeightKg: 77,
        },
        {
          Gender: 'Fema',
          HeightCm: 167,
          WeightKg: 82,
        },
        {
          Gender: 'Male',
          HeightCm: 167,
          WeightKg: 96,
        },
        {
          Gender: 'Femail',
          HeightCm: 167,
          WeightKg: 100,
        },
      ],
    }

    adminController.getBMIData(req, res, () => {})
    const expectedCategories = [
      'Underweight',
      'Normal weight',
      'Overweight',
      'Moderately obese',
      'Severel obese',
      'Very severely obese',
    ]
    const expectedHealthRisk = [
      'Malnutrition risk',
      'Low risk',
      'Enhanced risk',
      'Medium risk',
      'High',
      'Very high risk',
    ]
    const records = res.updatedData
    for (let i = 0; i < 5; i++) {
      const record = records[i]
      expect(record.BMICateogry).to.be.equal(expectedCategories[i])
      expect(record.HealthRisk).to.be.equal(expectedHealthRisk[i])
    }
    expect(res.totalNumberOfOverweightPeople).to.be.equal(1)
  })

  it('should give unknown values if height or weight is 0', function () {
    const req = {
      body: [
        { Gender: 'Female', HeightCm: 0, WeightKg: 100 },
        { Gender: 'Female', HeightCm: 170, WeightKg: 75 },
      ],
    }

    adminController.getBMIData(req, res, () => {})
    const record = res.updatedData[0]
    expect(record.BMI).to.be.equal('-')
    expect(record.BMICateogry).to.be.equal('-')
    expect(record.HealthRisk).to.be.equal('-')
    expect(res.totalNumberOfOverweightPeople).to.be.equal(1)
  })

  it('should give unknown values if height or weight is missing', function () {
    const req = {
      body: [
        { Gender: 'Female', WeightKg: 100 },
        { Gender: 'Female', HeightCm: 140 },
      ],
    }
    adminController.getBMIData(req, res, () => {})
    const record = res.updatedData[0]
    expect(record.BMI).to.be.equal('-')
    expect(record.BMICateogry).to.be.equal('-')
    expect(record.HealthRisk).to.be.equal('-')
    expect(res.totalNumberOfOverweightPeople).to.be.equal(0)
  })

  it('should handle large records (1 lakh)', function () {
    const req = { body: require('./large-data') }
    adminController.getBMIData(req, res, () => {})
    expect(
      adminController.getBMIData.bind(this, req, res, () => {})
    ).not.to.throw()
    expect(res.updatedData).to.have.length(100000)
  })
  // after(function (done) {})
})
