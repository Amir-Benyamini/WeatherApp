require('dotenv').config()
const express = require('express')
const bodyParser = require ('body-parser')
const api = require('./server/routes/api')
const path = require('path')

const app = express()

const mongoose = require('mongoose')
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost/WeatherAppDB'
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Connected to MongoDB'))
	.catch(err => console.error('MongoDB connection error:', err))


app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', api)


const port = process.env.PORT || 5555
app.listen(port, function(){
	console.log(`server is up and running at port ${port}`)
})

