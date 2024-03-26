const LogModel = require("../models/log");
const {DateTime}  = require('luxon');
module.exports = (req, res, next) => {
    if(req.method === 'GET'){
        next();
    }
    else{
        switch(req.originalUrl){
            case '/api/login':
                req.action = "Login";
                break;

            case '/api/admin':
                switch(req.method){
                    case 'POST':
                        req.action = "Add admin";
                        break;

                    case 'PATCH': 
                        req.action = "Edit admin";
                        break;

                    case 'DETELE':
                        req.action = "Delete admin";
                        break;
                }
                break;

            case '/api/user':
                switch(req.method){
                    case 'POST':
                        req.action = "Add user";
                        break;

                    case 'PATCH': 
                        req.action = "Edit user";
                        break;

                    case 'DETELE':
                        req.action = "Delete user";
                        break;               
                }
                break;

            case '/api/layout':
                switch(req.method){
                    case 'POST':
                        req.action = "Add layout";
                        break;

                    case 'PATCH': 
                        req.action = "Edit layout";
                        break;

                    case 'DETELE':
                        req.action = "Delete layout";
                        break;               
                }
                break;

            case '/api/port':
                switch(req.method){
                    case 'POST':
                        req.action = "Add port";
                        break;

                    case 'PATCH': 
                        req.action = "Edit port";
                        break;

                    case 'DETELE':
                        req.action = "Delete port";
                        break;               
                }
                break;

            case '/api/scheduler':
                switch(req.method){
                    case 'POST':
                        req.action = "Add scheduler";
                        break;

                    case 'DETELE':
                        req.action = "Delete scheduler";
                        break;               
                }
                break;
        }
        const LogData = new LogModel({
            created: DateTime.local().toLocaleString(DateTime.DATETIME_FULL, {locale:'en'}),
            adminname: req.adminname,
            action: req.action,
            data: JSON.stringify(req.body)
          });
        LogData.save({
            alo: console.log("Save Done")
          });
        next();
    }
}