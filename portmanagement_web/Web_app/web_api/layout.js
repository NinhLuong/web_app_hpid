const fs = require('fs');
const bodyParser = require("body-parser");
const LayoutModel = require("../models/layout");
const {DateTime}  = require('luxon');

module.exports = {
	listLayout: function(req, res, next){
		LayoutModel.find({},'-_id id layoutname layoutdir portlist').populate('portlist','-_id portname').then(function(layout){
			console.log(layout)
			return res.send(layout)
		})
	},

	addLayout: function(req, res, next){
		console.log(req.file.originalname)
		LayoutModel.findOne({
			layoutname: req.body.layoutname
		}).then(function(layout){
			if(layout){
				console.log("Layout already");
				return res.send("Layout already");
			}
			else{
				var created = DateTime.now().toString();
				console.log(req.file.originalname)
				const LayoutData = new LayoutModel({
					layoutname: req.body.layoutname,
					layoutdir: req.file.originalname,
					portlist: [],
					created: created
				});
				LayoutData.save({
					alo: console.log("Save image done")
				})
				return res.send("Add layout succeed");
			}
		})
	},
	
	editLayout: function(req, res, next){
		LayoutModel.findOne({
			id: req.body.id
		}).then(function(layout){
			var created = DateTime.now().toString();
			if(req.body.layoutname){
			    layout.layoutname = req.body.layoutname;
			}
			console.log(req)
			if(req.file){
				if(layout.layoutdir != req.file.originalname){
					try{
						fs.promises.unlink(process.env.UPLOAD_DIR_LAYOUT_IMAGE + layout.layoutdir);
					}
					catch(error){}
					layout.layoutdir = req.file.originalname;
				}
			}
			layout.save();
			return res.send("Edit layout done")
		})
	},

	deleteLayout: function(req, res, next){
		LayoutModel.findOneAndDelete({
			layoutname: req.body.layoutname
		}).then(function(layout){
			// console.log(layout);
			fs.promises.unlink(process.env.UPLOAD_DIR_LAYOUT_IMAGE + layout.layoutdir)
    		.then(() => {
		        return res.send("Layout removed");
		    })
		    .catch(error => {
		        console.error("Error while unlinking:", error);
		        // Handle the error as needed
		        return res.send("Layout removed");
		    });
		})
	}
}
