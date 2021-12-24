const express = require('express')

const adminController = require('../controller/adminController')
const router = express.Router()

module.exports = router.post('/api', adminController)
