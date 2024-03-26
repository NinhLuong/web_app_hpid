require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cors = require('cors');
const {DateTime}  = require('luxon'); 
const bcrypt = require("bcryptjs");

const AdminModel = require("./models/admin");
const UserModel = require("./models/user");
const LayoutModel = require("./models/layout");
const RightModel = require("./models/right");
const SwitchModel = require("./models/switch");
const PortModel = require("./models/port");
const DeviceModel = require("./models/device");

const SchedulerModel = require("./models/scheduler");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(12);

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();
app.use(cors({
    origin: "*",
    methods: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  }));
app.use(express.json());
app.use('/api', routes)
const imageDir = path.join(__dirname, process.env.UPLOAD_DIR_LAYOUT_IMAGE);
app.use('/images',express.static(imageDir));

// const csvDir = path.join(__dirname, process.env.UPLOAD_DIR_CSV);
// app.use('/csv',express.static(csvDir));

// AdminModel.deleteMany({}).then(function(result) {
//     // if (err) throw err;
//     console.log("Đã xóa " + result.deletedCount + " tài liệu trong collection.");
// });

// UserModel.deleteMany({}).then(function(result) {
//     // if (err) throw err;
//     console.log("Đã xóa " + result.deletedCount + " tài liệu trong collection.");
// });

// LayoutModel.deleteMany({}).then(function(result) {
//     // if (err) throw err;
//     console.log("Đã xóa " + result.deletedCount + " tài liệu trong collection.");
// });

// RightModel.deleteMany({}).then(function(result) {
//     // if (err) throw err;
//     console.log("Đã xóa " + result.deletedCount + " tài liệu trong collection.");
// });

// SchedulerModel.deleteMany({}).then(function(result) {
//     // if (err) throw err;
//     console.log("Đã xóa " + result.deletedCount + " tài liệu trong collection.");
// });

// PortModel.deleteMany({}).then(function(result) {
//     // if (err) throw err;
//     console.log("Đã xóa " + result.deletedCount + " tài liệu trong collection.");
// });

DeviceModel.deleteMany({}).then(function(result) {
    // if (err) throw err;
    console.log("Đã xóa " + result.deletedCount + " tài liệu trong collection.");
});

// AdminModel.findOne({
//   adminname: "admin"
// }).then(function(user){
//   if (user) {
//     console.log("Admin already");
//     return 0;
//   }
//   bcrypt.hash("admin", salt)
//   .then(function(hashpassword) {
//     const AdminData = new AdminModel({
//       adminname: "admin",
//       password: hashpassword,
//       email: "",
//       fullname: "",
//       created: ""
//     });
//     AdminData.save({
//       alo: console.log("Admin save Done")
//     });
//   })
// })
UserModel.findOne({
  username: "Nobody"
}).then(function(user) {
    if (user) {
      console.log("User already");
      return 0;
    }
    RightModel.findOne( {right:"No access"} ).then(function(right){
      const UserData = new UserModel({
        id:0,
        username: "Nobody",
        email: "nobody@gmail.com",
        group: "No group",
        right: right._id
      });
      UserData.save({
        alo: console.log("User save done")
      })
    })
  })

// RightModel.insertMany([
//   {
//     id:1,
//     right:"No access",
//     vlan:1
//   },
//   {
//     id:2,
//     right:"Internet only",
//     vlan:2
//   },
//   {
//     id:3,
//     right: "Full access",
//     vlan:3
//   }

// ]).then(function(){ 
//     console.log("Data inserted")  // Success 
// }).catch(function(error){ 
//     console.log(error)      // Failure 
// }); 


// SwitchModel.insertMany([
//   {
//     id:1,
//     name:"switch3",
//     api:"http://127.0.0.1:5000/switches/"
//   },
//   {
//     id:2,
//     name:"switch4",
//     api:"http://127.0.0.1:5000/switches/"
//   }

// ]).then(function(){ 
//     console.log("Data inserted")  // Success 
// }).catch(function(error){ 
//     console.log(error)      // Failure 
// }); 



// var raw = JSON.stringify({
//     "portid": 1,
//     "portname": "switch1-port1",
//     "rightid": 1,
//     "layoutid": 1,
//     "switchid": 1
// });
// var myHeaders = new Headers();
// myHeaders.append("Authorization", process.env.LOCAL_TOKEN);
// myHeaders.append("Content-Type", "application/json");
// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };
// fetch("http://"+process.env.SERVER_IP+":"+process.env.SERVER_PORT+"/api/port", requestOptions)

// var raw = JSON.stringify({
//     "portid": 2,
//     "portname": "switch1-port2",
//     "rightid": 1,
//     "layoutid": 1,
//     "switchid": 1
// });
// var myHeaders = new Headers();
// myHeaders.append("Authorization", process.env.LOCAL_TOKEN);
// myHeaders.append("Content-Type", "application/json");
// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };
// fetch("http://"+process.env.SERVER_IP+":"+process.env.SERVER_PORT+"/api/port", requestOptions)

// var raw = JSON.stringify({
//     "portid": 3,
//     "portname": "switch1-port3",
//     "rightid": 1,
//     "layoutid": 1,
//     "switchid": 1
// });
// var myHeaders = new Headers();
// myHeaders.append("Authorization", process.env.LOCAL_TOKEN);
// myHeaders.append("Content-Type", "application/json");
// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };
// fetch("http://"+process.env.SERVER_IP+":"+process.env.SERVER_PORT+"/api/port", requestOptions)

// var raw = JSON.stringify({
//     "portid": 4,
//     "portname": "switch2-port1",
//     "rightid": 1,
//     "layoutid": 2,
//     "switchid": 1
// });
// var myHeaders = new Headers();
// myHeaders.append("Authorization", process.env.LOCAL_TOKEN);
// myHeaders.append("Content-Type", "application/json");
// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };
// fetch("http://"+process.env.SERVER_IP+":"+process.env.SERVER_PORT+"/api/port", requestOptions)

// var raw = JSON.stringify({
//     "portid": 5,
//     "portname": "switch2-port2",
//     "rightid": 1,
//     "layoutid": 2,
//     "switchid": 1
// });
// var myHeaders = new Headers();
// myHeaders.append("Authorization", process.env.LOCAL_TOKEN);
// myHeaders.append("Content-Type", "application/json");
// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };
// fetch("http://"+process.env.SERVER_IP+":"+process.env.SERVER_PORT+"/api/port", requestOptions)

// var raw = JSON.stringify({
//     "portid": 6,
//     "portname": "switch2-port3",
//     "rightid": 1,
//     "layoutid": 2,
//     "switchid": 1
// });
// var myHeaders = new Headers();
// myHeaders.append("Authorization", process.env.LOCAL_TOKEN);
// myHeaders.append("Content-Type", "application/json");
// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };
// fetch("http://"+process.env.SERVER_IP+":"+process.env.SERVER_PORT+"/api/port", requestOptions)


app.listen(process.env.SERVER_PORT, process.env.SERVER_IP, () => {
    console.log(`Server Started at ${process.env.SERVER_PORT}`)
})

