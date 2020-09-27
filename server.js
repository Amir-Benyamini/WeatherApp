const http = require('http');
const express = require('express')
const bodyParser = require ('body-parser')
const api = require('./server/routes/api')
const path = require('path')
const OH = require('object-hub');

const app = express()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/WeatherAppDB', { useNewUrlParser: true, useUnifiedTopology: true} )

app.use(express.static(path.join(__dirname, 'dist')))
//app.use(express.static(path.join(__dirname, 'node_modules')))
app.get('/handlebars.js', (req, res) => { res.sendFile(path.join(__dirname, 'node_modules/handlebars/dist/handlebars.min.js')); });
app.get('/jquery.js', (req, res) => { res.sendFile(path.join(__dirname, 'node_modules/jquery/dist/jquery.min.js')); });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/oh.js', (req, res) => { res.sendFile(path.join(__dirname, 'node_modules/object-hub/client-side/oh.js')); });
app.get('/proxserve.js', (req, res) => { res.sendFile(path.join(__dirname, 'node_modules/proxserve/index.js')); });

const server = http.createServer(app);
const port = 5555
server.listen(port,() => {
	console.log(`server is up and running at port ${port}`);
	weather = new OH('weather', server, {});
	app.use((req, res, next) => { req.weather = weather; next(); });
	app.use('/', api)
});