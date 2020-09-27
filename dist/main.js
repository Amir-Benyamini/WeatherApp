
const tManager = new TempManager()
const render = new Renderer()
let weather;

const loadPage = function () {
	let weatherInstance = new OH('weather', null, async (obj) => {
		weather = obj;
		handleWeatherChanges();

		const savedCities = await tManager.getSavedCities()
		savedCities.forEach(c => render.renderData(c))
	});
}

function handleWeatherChanges() {
	//handle cities already existing on the server
	let cities = Object.keys(weather);
	for(let city of cities) {
		render.renderData(weather[city]);
	}

	//handle events
	weather.on('create', (change) => {
		render.renderData(change.value)
	});

	weather.on('delete', (change) => {
		let containerElm = document.querySelector('#result-container');
		let citiesElms = containerElm.querySelectorAll('div.placeholder')
		for(let i=0; i < citiesElms.length; i++) {
			if('.'+citiesElms[i].getAttribute('city-name') === change.path) {
				containerElm.removeChild(citiesElms[i]);
			}
		}
	});
}

const handleSearch = function () {
	tManager.getCityData($('#cityInp').val())
}

$('#inpBtn').on('click', async function () {
	handleSearch()
})

$(document).ready(async function () {
	loadPage()
})

$('#result-container').on('click', '.btn_plus', function () {
	const cityName = $(this).closest('div.placeholder').attr('city-name')
	tManager.saveCity(cityName)
})
$('#result-container').on('click', '.btn_minus', function () {
	const cityName = $(this).closest('div.placeholder').attr('city-name')
	tManager.removeCity(cityName)
})
$('#result-container').on('click', '.btn_delete', function () {
	const cityName = $(this).closest('div.placeholder').attr('city-name')
	delete weather[cityName];
})