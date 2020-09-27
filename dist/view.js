class Renderer {
	renderData(citydata) {
		const source = $('#city-template').html();
		const template = Handlebars.compile(source)
		const newHTML = template(citydata)
		$('#result-container').append(newHTML)
	}
}