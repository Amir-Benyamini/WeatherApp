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
		$.get(`/city/${cityName}`);
	}

	saveCity = async function (city) {
		$.ajax({
			type: 'POST',
			url: '/city',
			data: { name: city },
			success: () => alert(`city ${city} is now saved!`),
		})
	}

	removeCity = async function (city) {
		$.ajax({
			type: 'DELETE',
			url: `/city/${city}`,
			success: () => alert(`city ${city} is now removed!`),
		})
	}
}

