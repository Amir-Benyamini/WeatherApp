const mongoose = require('mongoose')
const schema = mongoose.Schema

const citySchema = new schema({
	name: { type: String, required: true },
	temperature: Number,
	condition: String,
	conditionPic: String
})


const City = mongoose.model("City", citySchema)
module.exports = City