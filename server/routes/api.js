const express = require('express')
const axios = require('axios')
const City = require("../models/city")

const router = express.Router()

router.get('/city/:city', async function (req, res) {
	let city = req.params.city

	try {
		let apiRequest = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e2522630235d331673040866c32bdf37&units=metric`)
		let data = apiRequest.data
		req.weather[city.toLowerCase()] = {
			name: data.name,
			temperature: data.main.temp,
			humidity: data.main.humidity,
			description: data.weather[0].description
		};
		res.status(200).end();
	} catch(err) {
		console.error(err); //probably gets here for '404 not found'
	}
})

router.get('/cities', async function (req, res) {
	let findCities = await City.find({})
	res.send(findCities)
})

router.post('/city', function (req, res) {
	let cityNameObj = req.body
	let cityInstance = new City(cityNameObj)

	cityInstance.save()
	res.send(cityInstance)
})

router.delete('/city/:city', async function (req, res) {
	let cityString = req.params.city
	let firstLatter = cityString.slice(0, 1).toUpperCase()
	let restOfstring = cityString.slice(1, cityString.length)

	let cityName = firstLatter + restOfstring

	let deletedCity = await City.deleteMany({ name: cityName }, function (err) {
	})
	res.send(deletedCity)

})

module.exports = router