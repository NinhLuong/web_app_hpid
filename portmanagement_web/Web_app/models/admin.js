const mongoose = require("mongoose")
// const adminModel = require("admin")

const Schema = mongoose.Schema;
const adminSchema = new Schema({
	id:{
  	type: Number,
  	unique: true
  },
	adminname:{
    type: String,
    require: true
  },
	password:{
		type: String,
		require: true
	},
	email:{
		type: String,
		require: true
	},
	fullname:{
		type: String,
		require: true
	},
	created: {
    type: String,
    default: Date.now
	}
})

adminSchema.pre('save', async function (next) {
  if (this.isNew) {
    const maxIdAdmin = await this.constructor.findOne({}, { id: 1 }).sort({ id: -1 });
    this.id = (maxIdAdmin && maxIdAdmin.id + 1) || 1;
  }
  next();
});

const AdminMongoose = mongoose.model("Admin", adminSchema);

module.exports = AdminMongoose;
