const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const rightSchema = new Schema({
	id:{
	  	type: Number,
	  	unique: true
	},
	right:{
		type: String,
		require: true
	},
	vlan:{
		type: Number,
		require: true
	}
})


const RightMongoose = mongoose.model("Right", rightSchema);

module.exports = RightMongoose;
