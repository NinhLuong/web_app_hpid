const bodyParser = require("body-parser");
const SchedulerModel = require("../models/scheduler");
const PortModel = require("../models/port");
const {DateTime}  = require('luxon');
const cron = require('node-cron');


function changeStatus(portid, status){
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	var requestOptions = {
	  method: 'PUT',
	  headers: myHeaders,
	  body: JSON.stringify({"status": status}),
	  redirect: 'follow'
	};
	//console.log( requestOptions.body);
	fetch(process.env.SWITCH_API+"/port/updatePortStatus/"+portid, requestOptions)
}
const task = cron.schedule('* * * * *', ()=>{
	const time = DateTime.local().toLocaleString(DateTime.DATETIME_FULL);
	console.log(time);
	SchedulerModel.find({
		datetime: time
	}).then(function(scheduler){
		scheduler.forEach( item =>{
			PortModel.findById(item.port).then(function(port){
				port.status = item.changeto;
				console.log(port.status);
				changeStatus(port.portid, port.status);
				port.save();
			})
		})
		console.log(scheduler)
		SchedulerModel.deleteMany({
			datetime: time
		}).then(function(){
			console.log("Deleted")
			scan();
		})
	})
	
},{
	scheduled:false
})

function scan(){
	SchedulerModel.find({}).then(function(scheduler){
		if(!scheduler.length){
			console.log("Stop cron")
			task.stop();
		}
	})
}
module.exports = {

	listScheduler: function(req, res, next){
		SchedulerModel.find({},'-_id').populate({path:'port', select:'-_id layout portname user',  
			populate: [{path:'layout', select:'-_id layoutname'}, {path:'user', select:'-_id username'}]})
		.then(function(scheduler){
			// console.log(scheduler[0].port);
			if(!scheduler.length){
				console.log("Stop cron")
				task.stop();
			}
			return res.send(scheduler);
		})
	},

	addScheduler: function(req, res, next){
		const {
		    year,
		    month,
		    day,
		    hours,
		    minutes,
		    portname,
		    status
		  } = req.body;
		var nextid = 0;
		SchedulerModel.findOne({}, { id: 1 }).sort({ id: -1 }).then(function(id){
			if(id){
				nextid = id.id + 1;
			}
			else{
				nextid = 1;
			}
			PortModel.findOne({ portname:portname }).then(function(port){
				const SchedulerData = new SchedulerModel({
					id: nextid,
					datetime: DateTime.local(year,month,day,hours,minutes).toLocaleString(DateTime.DATETIME_FULL, {locale:'en'}),
				    port: port._id,
				    changeto: status
				});
				SchedulerData.save({
				alo: console.log("Scheduler save done")
				})
				task.start();
				return res.send("Add scheduler succeed");
			})
		})
	},

	deleteScheduler: async function(req, res, next){
		SchedulerModel.deleteOne({
			id: req.body.id
		}).then(function(){
			SchedulerModel.find().then(function(scheduler){
				console.log(scheduler)
				if(!scheduler.length){
					console.log("Stop cron")
					task.stop();
				}
				return res.send("Scheduler removed")
			})
		})
	}
}
