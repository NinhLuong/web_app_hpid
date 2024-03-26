const bodyParser = require("body-parser");
const PortModel = require("../models/port");
const RightModel = require("../models/right");
const LayoutModel = require("../models/layout");
const SwitchModel = require("../models/switch");
const UserModel = require("../models/user");

function changeVlan(portid, vlanid){
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var requestOptions = {
	  method: 'PUT',
	  headers: myHeaders,
	  body: JSON.stringify({"vlanID": vlanid.toString()}),
	  redirect: 'follow'
	};
	console.log(requestOptions.body)
	console.log(process.env.SWITCHAPI+"/port/updatePortVlanID/"+portid);
	fetch(process.env.SWITCH_API+"/port/updatePortVlanID/"+portid, requestOptions).then(response => response.text())
	.then(result => console.log(result))
	.catch(error => console.log('error', error));
}

module.exports = {
	listPort: function(req, res, next){
		PortModel.find({}, '-_id -__v -switch').sort("layoutid").populate([{path:"user", select:"username email"},{path:"right", select:"right"},{path:"layout", select:"layoutname"}]).then(function(port){
			console.log(port);
			return res.send(port);
		})
	},

	addPort: function(req, res, next){
		const {
			portid,
			portname,
			rightid,
			layoutid,
			switchid
		} = req.body;
		RightModel.findOne({ id:rightid }).then(function(right){
			SwitchModel.findOne({ id: switchid}).then(function(switch_info){
				UserModel.findOne({ username: "Nobody"}).then(function(user){
					const PortData = new PortModel({
						portid: portid,
						portname: portname,
						right: right._id,
						layoutid: layoutid,
						switch: switch_info._id,
						user: user._id,
						status: "DOWN"
					})
					LayoutModel.findOne({ id: layoutid}).then(function(layout){
						if(layout){
							PortData.layout = layout._id
							layout.portlist.push(PortData._id)
							layout.save()
						}
						PortData.save({
							alo: console.log(PortData)
						})
					})
				})
			})	
		})	
		return res.send("Add port succeed");
	},

	editPort: function(req, res, next){
		const{
			portname,
			layoutname,
			username,
			status
		} = req.body;
		LayoutModel.findOne({ layoutname: layoutname }).then(function(layout){
			UserModel.findOne({ username: username }).then(function(user){
				PortModel.findOne({ portname:portname }).then(function(port){
					LayoutModel.findById(port.layout).then(async function(old_layout){
						console.log(req.body)
						console.log(user)
						port.right = user.right;
						console.log(user.right);
						if(old_layout){
							if(!layout._id.equals(old_layout._id)){
								layout.portlist.push(port._id)
								old_layout.portlist = old_layout.portlist.filter(await function(port_id){
									console.log(port_id)
									console.log(port._id)
									console.log(!(port._id.equals(port_id)))
									return !(port._id.equals(port_id));
								})
								console.log(old_layout.portlist)
								old_layout.save()
								layout.save()
							}
						}
						else{
							layout.portlist.push(port._id)
							layout.save()
						}
						// console.log(layoutname)
						console.log(layout)
						port.layout = layout._id;
						port.layoutid = layout.id;
						port.user = user._id;
						port.status = status;
						port.save();
					})
				})
			})
		})
		return res.send("Edit port done");
	},

	deletePort: function(req, res, next){
		PortModel.deleteOne({
			portid: req.body.portid
		}).then(function(port){
			return res.send("Port removed")
		})
	},
	updateRight: function(userid, right){
		PortModel.find({user: userid}).then(function(port){
			console.log(port);
			port.forEach(async item => {
				item.right = right._id;
				console.log(right.vlan);
				console.log(item.portid);
				changeVlan(item.portid,right.vlan);
				item.save();
			})
		})
	}
}
