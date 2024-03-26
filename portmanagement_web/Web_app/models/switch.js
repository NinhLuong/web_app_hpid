const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const switchSchema = new Schema({
	id:{
	  	type: Number,
	  	unique: true
	},
	name:{
		type: String,
		require: true
	},
    api:{
		type: String,
		require: true
	},
})


const SwitchMongoose = mongoose.model("Switch", switchSchema);

module.exports = SwitchMongoose;
