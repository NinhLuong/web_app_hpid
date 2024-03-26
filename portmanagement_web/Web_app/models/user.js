const mongoose = require("mongoose")

const {DateTime}  = require('luxon');
const Schema = mongoose.Schema;
const userSchema = new Schema({
	id:{
  	type: Number,
  	// unique: true
    },
	username: {
	    type: String,
	    require: true
	},
	email:{
		type: String,
		require: true
	},
	group:{
		type: String,
		require: true
	},
	right:[{ type: Schema.Types.ObjectId, ref: 'Right' }],
	created: {
		type: String,
		default: Date.now
	}
})

// userSchema.pre('save', async function (next) {
//   if (this.isNew) {
//   	var created = new Date().toLocaleString();
//   	this.created = created;
//     const maxIdUser = await this.constructor.findOne({}, { id: 1 }).sort({ id: -1 });
//     this.id = (maxIdUser && maxIdUser.id + 1) || 1;
//   }
//   next();
// });

const UserMongoose = mongoose.model("User", userSchema);

module.exports = UserMongoose;
