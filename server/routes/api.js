const express = require('express')
const axios = require('axios')
const City = require("../models/city")

const router = express.Router()

router.get('/city/:city',async function(req, res){
	let city = req.params.city

	let getRequest = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e2522630235d331673040866c32bdf37&units=metric`)
	let data = getRequest.data

		res.send(data.main)
})


router.get('/cities',async function(req, res){

	let findCities = await City.find({})
		res.send(findCities)
	})

router.post('/city/:city', function(req, res){
	let cityName = req.params.city

	let cityInstance = new City({name:cityName})
			cityInstance.save()
			res.send(cityInstance)
})

router.delete('/city/:city', async function(req, res){
	let cityName = req.params.city

	let deletedCity = await City.deleteMany({ name:cityName}, function (err) {
	})
		res.send(deletedCity)

})

module.exports = router
