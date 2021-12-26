// core-modules
const path = require('path')

// third-party-imports
const express = require('express')
const bodyParser = require('body-parser')

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

const PORT = process.env.PORT || 3000
app.listen(PORT)
