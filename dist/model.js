const weatherIconMap = {
	'Clear':        '<i class="fas fa-sun" style="color:#fbbf24"></i>',
	'Clouds':       '<i class="fas fa-cloud" style="color:#94a3b8"></i>',
	'Rain':         '<i class="fas fa-cloud-rain" style="color:#60a5fa"></i>',
	'Drizzle':      '<i class="fas fa-cloud-rain" style="color:#93c5fd"></i>',
	'Thunderstorm': '<i class="fas fa-bolt" style="color:#f59e0b"></i>',
	'Snow':         '<i class="fas fa-snowflake" style="color:#bae6fd"></i>',
	'Mist':         '<i class="fas fa-smog" style="color:#cbd5e1"></i>',
	'Smoke':        '<i class="fas fa-smog" style="color:#9ca3af"></i>',
	'Haze':         '<i class="fas fa-smog" style="color:#d1d5db"></i>',
	'Fog':          '<i class="fas fa-smog" style="color:#d1d5db"></i>',
	'Dust':         '<i class="fas fa-wind" style="color:#d97706"></i>',
	'Sand':         '<i class="fas fa-wind" style="color:#d97706"></i>',
	'Tornado':      '<i class="fas fa-wind" style="color:#6b7280"></i>',
}

const defaultIcon = '<i class="fas fa-cloud-sun" style="color:#a78bfa"></i>'

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

		const condition = result.weather[0].main
		const icon = weatherIconMap[condition] || defaultIcon

		let newCityData = {
			name: result.name,
			temperature: Math.round(result.main.temp),
			humidity: result.main.humidity,
			description: result.weather[0].description,
			icon,
		}

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
