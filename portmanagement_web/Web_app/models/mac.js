const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const macSchema = new Schema({
	mac:{
	    type: String,
	    require: true
  	},
	device:{
		type: Number,
		require: true
	},
})


const MacMongoose = mongoose.model("Mac", macSchema);

module.exports = MacMongoose;
