const fs = require('fs');
const csv = require('csv-parser');
const bodyParser = require("body-parser");
const UserModel = require("../models/user");
const RightModel = require("../models/right");
const PortManagement = require("../web_api/port")
const {DateTime}  = require('luxon');


module.exports = {
	listUser: function(req, res, next){
		if (req.query.right == 'true'){
		    UserModel.find({},'-_id id username email group').populate('right','-_id right').then(function(user){
		      console.log(user);
		      return res.send(user);
		    })
		}
		else{
			UserModel.find({},'-_id id username email group').then(function(user){
		      console.log(user);
		      return res.send(user);
			})
		}
  	},
	addUser: function(req, res, next){
		if(req.query.csv != 'true'){
      const {
        username,
        email,
        group
      } = req.body;
      var created = DateTime.now().toString();
      UserModel.findOne({
        username: username
      })
        .then(function(user) {
          if (user) {
            console.log("User already");
            return res.send("User already");
          }
          if (username == "") {
            console.log("Invailid username ");
            return res.send("Invailid username");
          }
          RightModel.findOne( {right:"No access"} ).then(function(right){
          	UserModel.findOne({}, { id: 1 }).sort({ id: -1 }).then(function(id){
	          	var nextid = id.id + 1;
		          const UserData = new UserModel({
		          	id:nextid,
		          	username: username,
								email: email,
								group: group,
								right: right._id,
								created: created
		          });
		          UserData.save({
		            alo: console.log("User save done")
		          })
	        	})
          })
          return res.send("Add user succeed");
      	})
    	}
    	else{
	    	const csvFile = process.env.UPLOAD_DIR_CSV + req.file.originalname;
	    	const results = [];
	    	const errors = [];
	    	let count = 0;
	    	let temp = 0;
	    	fs.createReadStream(csvFile)
				  .pipe(csv())
				  .on('data', (row) => {
				    results.push(row);
				  })
				  .on('end', async () =>  {
				  	await UserModel.findOne({}, { id: 1 }).sort({ id: -1 }).then(function(id){
				  		// console.log(id.id)
				  		let idCounter=id.id;
				  		var created = DateTime.now().toString();
							const resultsWithIds = results.map(item => {
								idCounter++;
							  item.id = idCounter;
							  return item;
							});
				  	}) 
				  	RightModel.findOne( {right:"No access"} ).then(function(right){
							// console.log(results);
					    results.forEach(async item => {
					    	const {
					    		id,
					        username,
					        email,
					        group
					      } = item;
					      var created = DateTime.now().toString();
					      await UserModel.findOne({
					        username: username
					      })
					        .then(async function(user) {
					        	var error = 0;
					        	temp++;
					          if (user) {
					          	error = 1;
					            console.log("User already");
					            // console.log(errors)
					            // console.log(count)
					            errors.push({
					            	"username": username,
					            	"error": "User already" 
					            })
					          }
					          if (username == "") {
					            // console.log("Invailid username");
					            error = 1;
					            errors.push({
					            	username: username,
					            	error: "Invailid username" 
					            })
					          }
					          if(!error){
						          const UserData = new UserModel({
						          	id: id,
						          	username: username,
												email: email,
												group: group,
												right: right._id,
												created: created
						          });
						          await UserData.save({
						          	alo: count++ 
						          	});
						        }
					          // console.log(count)
					          if(temp == results.length){
					          	try{
					          	return res.send({
					          		"Saved": count,
					          		"Error": errors
					          	})
					          	}
					          	catch{}
					          }
					      	})
					    })
					  })
				    console.log("asdasd")
				  });
			}
    },
    editUser: function(req,res, next){
    	if(req.query.right!='true'){
    		console.log(req.body)
		    const{
		      username,
		      newusername,
		      email,
		      group
		    } = req.body;
		    UserModel.findOne({
		      username: username
		    }).then(function(user){
		      var created = DateTime.now().toString();
		      if (req.body.email == "" || req.body.fullname == "") {
		          return res.send("Invailid input");
		      }
		      if(newusername === username){
		      	user.email = email;
				    user.group = group;
				    user.created = created;
				    user.save();
				    return res.send("Edit user done")
				  }
				  else{
		      	UserModel.findOne({username: newusername}).then(function(usertemp){
		      		if(usertemp){
		      			return res.send("User already")
		      		}
		      		else{
		      			user.username = newusername;
		      			user.email = email;
					      user.group = group;
					      user.created = created;
					      user.save();
					      return res.send("Edit user done")
		      		}
		      	})
		      }
		    })
		  }
		  else{
		  	const{
		      username,
		      right
		    } = req.body;
		    RightModel.findOne({ right: right }).then(function(newright){
		    	UserModel.findOne({
			      username: req.body.username
			    }).then(function(user){
			      var created = DateTime.now().toString();
			      user.right = newright;
			      user.created = created;
			      PortManagement.updateRight(user._id, newright);
			      user.save();
			      return res.send("Edit right done")
			    })
		    })
		  }
	  },
	  deleteUser: function(req,res, next){
	    UserModel.deleteOne({
	      username: req.body.username
	    }).then(function(user){
	      return res.send("User removed")
	    })
	  }
}
