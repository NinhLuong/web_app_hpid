const mongoose = require("mongoose")
// const portModel = require("port")

const Schema = mongoose.Schema;
const portSchema = new Schema({
	portid:{
	  	type: Number,
	  	unique: true
  	},
	portname:{
	    type: String,
	    require: true
	},
	right:[{ type: Schema.Types.ObjectId, ref: 'Right' }],
	layoutid:{
		type: Number,
		require: true
	},
	layout: [{ type: Schema.Types.ObjectId, ref: 'Layout' }],
	switch: [{ type: Schema.Types.ObjectId, ref: 'Switch' }],
	user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	status:{
		type: String,
		require: true
	},

})


const PortMongoose = mongoose.model("Port", portSchema);

module.exports = PortMongoose;
