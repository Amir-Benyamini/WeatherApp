const express = require('express')
const axios = require('axios')
const City = require("../models/city")

const router = express.Router()

//api request to get the weather data of a city
router.get('/city/:city', async function (req, res) {
	let city = req.params.city

	let apiRequest = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e2522630235d331673040866c32bdf37&units=metric`)
	let data = apiRequest.data

	res.send(data)
})

//DB request to get all the cities inside our data base
router.get('/cities', async function (req, res) {

	let findCities = await City.find({})
	res.send(findCities)
})

//DB route to create and save new city on the data base
router.post('/city', function (req, res) {
	let cityNameObj = req.body
	console.log(cityNameObj);
	let cityInstance = new City(cityNameObj)

	cityInstance.save()
	res.send(cityInstance)
})

// DB route for deleting a city by name from the data base
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
