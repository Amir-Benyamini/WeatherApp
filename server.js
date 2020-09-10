const express = require('express')
const bodyParser = require ('body-parser')
const api = require('./server/routes/api')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/WeatherAppDB', { useNewUrlParser: true, useUnifiedTopology: true} )

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/', api)


const port = 5555
app.listen(port, function(){
	console.log(`server is up and running at port ${port}`)
})

