class TempManager {
	constructor() {
		this.cityData = []
	}

	getSavedCities = async function () {
		this.cityData = []
		let result = await $.get('/cities')

		for (let city of result) {
			try {
				await this.getCityData(city.name)
			} catch (err) {
				console.error(`Failed to load weather for saved city "${city.name}":`, err)
			}
		}

		return this.cityData;
	}

	getCityData = async function (cityName) {
		let result = await $.get(`/city/${cityName}`)
		let newCityData = { name: result.name, temperature: result.main.temp, humidity: result.main.humidity, description: result.weather[0].description }
		this.cityData.push(newCityData)
		return newCityData
	}

	saveCity = async function (cityObj) {
		$.ajax({
			type: 'POST',
			url: '/city',
			data: cityObj,
			success: () => alert('City is now saved!'),
			error: (xhr) => {
				const msg = xhr.responseJSON && xhr.responseJSON.error ? xhr.responseJSON.error : 'Failed to save city.'
				alert(msg)
			}
		})
	}

	removeCity = async function (cityName) {
		$.ajax({
			type: 'DELETE',
			url: `/city/${cityName}`,
			success: () => alert('City has been removed!'),
			error: (xhr) => {
				const msg = xhr.responseJSON && xhr.responseJSON.error ? xhr.responseJSON.error : 'Failed to remove city.'
				alert(msg)
			}
		})
	}
}
