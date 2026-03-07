// Allow raw HTML in the icon field
Handlebars.registerHelper('raw', function(value) {
	return new Handlebars.SafeString(value || '')
})

class Renderer {
	renderData(citydata) {
		const source = $('#city-template').html()
		const template = Handlebars.compile(source)
		const newHTML = template(citydata)
		$('#result-container').append(newHTML)
	}
}
