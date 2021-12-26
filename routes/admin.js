const express = require('express')

const adminController = require('../controller/admin')
const router = express.Router()

module.exports = router.post('/api', adminController.getBMIData)
