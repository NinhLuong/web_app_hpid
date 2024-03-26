const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const schedulerSchema = new Schema({
	id:{
	  	type: Number,
	  	unique: true
	},
	datetime:{
		type: String,
		require:true
	},
  	port:[{ type: Schema.Types.ObjectId, ref: 'Port' }],
  	changeto:{
  		type: String,
  		require:true
  	}
})

const SchedulerMongoose = mongoose.model("Scheduler", schedulerSchema);

module.exports = SchedulerMongoose;
