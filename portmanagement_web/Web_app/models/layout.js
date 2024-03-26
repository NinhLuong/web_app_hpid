const mongoose = require("mongoose")
const PortModel = require("../models/port");

const Schema = mongoose.Schema;
const layoutSchema = new Schema({
	id:{
  	type: Number,
  	unique: true
  },
	layoutname:{
    type: String,
    require: true
  },
	layoutdir:{
		type: String,
		require: true
	},
  portlist: [{
    type: Schema.Types.ObjectId,
    ref: 'Port'
  }],
	created: {
    type: String,
    default: Date.now
  },
})

layoutSchema.pre('save', async function (next) {
  if (this.isNew) {
    const maxIdLayout = await this.constructor.findOne({}, { id: 1 }).sort({ id: -1 });
    this.id = (maxIdLayout && maxIdLayout.id + 1) || 1;
    const test = await PortModel.find({layoutid: this.id},"_id")
    console.log(test)
    this.portlist = this.portlist.concat(test)
    const test1 = await PortModel.updateMany({layoutid: this.id}, {layout: this._id})
    console.log(test1)
  }
  next();
});

const LayoutMongoose = mongoose.model("Layout", layoutSchema);

module.exports = LayoutMongoose;
