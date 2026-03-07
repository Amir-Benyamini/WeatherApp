const express = require('express')
const axios = require('axios')
const City = require("../models/city")

const router = express.Router()

router.get('/city/:city', async function (req, res) {
	const city = req.params.city.trim()

	if (!city || city.length < 2) {
		return res.status(400).json({ error: 'Please provide a valid city name.' })
	}

	try {
		const apiKey = process.env.WEATHER_API_KEY
		const apiRequest = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`)
		res.send(apiRequest.data)
	} catch (err) {
		if (err.response && err.response.status === 404) {
			return res.status(404).json({ error: `City "${city}" not found.` })
		}
		console.error('Weather API error:', err.message)
		res.status(500).json({ error: 'Failed to fetch weather data. Please try again.' })
	}
})

router.get('/cities', async function (req, res) {
	try {
		const cities = await City.find({})
		res.send(cities)
	} catch (err) {
		console.error('DB error fetching cities:', err.message)
		res.status(500).json({ error: 'Failed to fetch saved cities.' })
	}
})

router.post('/city', async function (req, res) {
	const cityData = req.body

	if (!cityData || !cityData.name) {
		return res.status(400).json({ error: 'City name is required.' })
	}

	try {
		const cityInstance = new City(cityData)
		await cityInstance.save()
		res.send(cityInstance)
	} catch (err) {
		if (err.code === 11000) {
			return res.status(409).json({ error: 'City is already saved.' })
		}
		console.error('DB error saving city:', err.message)
		res.status(500).json({ error: 'Failed to save city.' })
	}
})

router.delete('/city/:city', async function (req, res) {
	const cityName = req.params.city.trim()

	if (!cityName) {
		return res.status(400).json({ error: 'City name is required.' })
	}

	try {
		const deletedCity = await City.deleteMany({ name: new RegExp(`^${cityName}$`, 'i') })
		res.send(deletedCity)
	} catch (err) {
		console.error('DB error deleting city:', err.message)
		res.status(500).json({ error: 'Failed to remove city.' })
	}
})

module.exports = router
