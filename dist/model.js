class TempManager {
	constructor() {
		this.cityData = []
	}

	getSavedCities = async function () {
		let result = await $.get('/cities')

		for (let city of result) {
			await this.getCityData(city.name)
		}

		return this.cityData;
	}
	getCityData = async function (cityName) {
		let result = await $.get(`/city/${cityName}`)

		let newCityData = { name: result.name, temperature: result.main.temp, humidity: result.main.humidity, description: result.weather[0].description }

		this.cityData.push(newCityData)

		return newCityData
	}
	saveCity = async function (cityName) {
		$.ajax({
			type: 'POST',
			url: '/city',
			data: cityName,
			success: () => alert('city is now saved!'),
		})
	}

	removeCity = async function (cityName) {

		$.ajax({
			type: 'DELETE',
			url: `/city/${cityName}`,
			success: () => alert('city is now removed!'),
		})
	}


}

