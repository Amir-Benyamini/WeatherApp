
const tManager = new TempManager()
const render = new Renderer()

const loadPage = async function () {
	const savedCities = await tManager.getSavedCities()
	savedCities.forEach(c => render.renderData(c))
}

const handleSearch = async function () {
	const cityName = $('#cityInp').val().trim()
	if (!cityName) {
		alert('Please enter a city name.')
		return
	}

	try {
		let cityData = await tManager.getCityData(cityName)
		render.renderData(cityData)
	} catch (err) {
		const msg = err.responseJSON && err.responseJSON.error ? err.responseJSON.error : `City "${cityName}" not found.`
		alert(msg)
	}
}


$('#inpBtn').on('click', async function () {
	handleSearch()
})

$('#cityInp').on('keypress', function (e) {
	if (e.key === 'Enter') {
		handleSearch()
	}
})

$(document).ready(async function () {
	loadPage()
})

$('#result-container').on('click', '#plus', function () {
	const cityName = $(this).closest('#placeholder').find('h4').html().trim()
	const cityObj = { name: cityName }

	tManager.saveCity(cityObj)
})

$('#result-container').on('click', '#minus', function () {
	const cityName = $(this).closest('#placeholder').find('h4').html().trim()
	tManager.removeCity(cityName)
})
