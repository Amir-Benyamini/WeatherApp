
const tManager = new TempManager()
const render = new Renderer()

const loadPage = async function () {
	const savedCities = await tManager.getSavedCities()
	savedCities.forEach(c => render.renderData(c))
}

const handleSearch = async function () {
	let cityData = await tManager.getCityData($('#cityInp').val())
	render.renderData(cityData)
}


$('#inpBtn').on('click', async function () {
	handleSearch()
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
