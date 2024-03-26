const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const deviceSchema = new Schema({
	mac:{
	    type: String,
	    require: true
  	},
	datetime:{
		type: String,
		require:true
	},
  	port:[{ type: Schema.Types.ObjectId, ref: 'Port' }],
})


const DeviceMongoose = mongoose.model("Device", deviceSchema);

module.exports = DeviceMongoose;
