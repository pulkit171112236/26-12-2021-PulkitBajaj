// core-modules
const path = require('path')

// third-party-imports
const express = require('express')
const bodyParser = require('body-parser')
// const mongoose = require('mongoose')

// // file-imports
// const User = require('./models/user')

// // constants
// const MONGODB_URI = "mongodb://127.0.0.1:27017/shop?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

// required objects
const app = express()

// set view-engine
app.set('view engine', 'ejs')
app.set('views', 'views')

// Routes
const adminRoutes = require('./routes/admin')

// middlewares
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.text())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', adminRoutes)

// const PORT = process.env.PORT || 3000
// mongoose
//   .connect(MONGODB_URI)
//   .then((result) => {
//     console.log('Connected!')
//     app.listen(PORT)
//   })
//   .catch((err) => {
//     console.log('client_not_connected', err)
//   })

app.listen(3000)
