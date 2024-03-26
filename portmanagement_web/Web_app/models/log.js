const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const logSchema = new Schema({
	created: {
	    type: String,
	    default: Date.now
  	},
	adminname: {
	    type: String,
	    require: true
	  },
	action:{
		type: String,
		require: true
	},
	data:{
		type: String,
		reuire: true
	}
})

const LogMongoose = mongoose.model("Log", logSchema);

module.exports = LogMongoose;
