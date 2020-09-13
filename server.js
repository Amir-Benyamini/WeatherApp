const express = require('express')
const bodyParser = require ('body-parser')
const api = require('./server/routes/api')
const path = require('path')

const app = express()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/WeatherAppDB', { useNewUrlParser: true, useUnifiedTopology: true} )


app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', api)


const port = 5555
app.listen(port, function(){
	console.log(`server is up and running at port ${port}`)
})

