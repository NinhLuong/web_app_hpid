const PortModel = require("../models/port");
const MacModel = require("../models/mac");
const DeviceModel = require("../models/device");
const AdminModel = require("../models/admin");
const {DateTime}  = require('luxon');
const cron = require('node-cron');

const task = cron.schedule('* * * * *', async()=>{
	const time = DateTime.local().toLocaleString(DateTime.DATETIME_FULL);
	console.log(time);
	var requestOptions = {
	  method: 'GET',
	  redirect: 'follow'
	};

	await fetch(process.env.SWITCH_API + "/switches/getAllMACAddresses", requestOptions)
		.then(response => response.json())
		.then(function(result){
			// console.log(result.message)
			let temp = 0;
			let flag = 0;
			result.message.forEach(item=>{
				temp++;
				console.log(item.MACAddress)
				MacModel.findOne({mac: item.MACAddress}).then(async function(mac){
					if(mac){
						console.log(mac)
						console.log("mac")
					}
					else{
						console.log("Here")
						// flag = 1;
						await DeviceModel.find({mac: item.MACAddress}).populate('port', 'portid').then(function(device){
							if(!device.length){
								flag = 1;
								console.log(item.id)
								PortModel.findOne({portid: item.id}).then(function(port){
									const DeviceData = new DeviceModel({	
										port: port._id,
										mac: item.MACAddress,
										created: time
									})
									DeviceData.save();
								})
								if(temp == result.message.length){
									// console.log(flag)
									if(flag){
										console.log("Alert")

										AdminModel.find({adminname: { $ne: 'admin' }}).then(function(admin){
											admin.forEach(elememnt=>{
												const data = {
												    prjkey: 'prj2311secdonshare',
												    email: elememnt.email,
												    subject: 'Alert - Found new device',
												    content: '<h2 class="fg-white">Sample HTML content: Alert</h2><p class="fg-white">new device with mac-address: <b>' + item.MACAddress + '</b> found!</p>'
												};

												const requestOptions = {
												    method: 'POST',
												    headers: {
												        'Content-Type': 'application/json'
												    },
												    body: JSON.stringify(data)
												};
												// console.log(requestOptions);
												 fetch(process.env.MAIL_API, requestOptions)
												     .then(response => response.json())
												     .then(result => console.log(result))
												     .catch(error => console.error('Lỗi:', error));
												})
										})
									}
								}
							}
							// else{
							// 	console.log(device)
							// 	console.log("device")
							// }
						})
					}
				})
			})
		})
		.catch(error => console.log('error', error));
	
},{
	scheduled:false
})

module.exports = {
	listMac: function(req, res, next){
		DeviceModel.find({}, '-_id').populate({path:'port', select:'-_id layout portname user right',  
			populate: [{path:'layout', select:'-_id layoutname'}, {path:'user', select:'-_id username'}, {path:'right', select:'-_id right'}]})
		.then(function(device) {
			console.log(device);
			task.start();
			return res.send(device);
		})
	}
}