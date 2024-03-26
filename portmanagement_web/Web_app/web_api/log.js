const LogModel = require("../models/log");
module.exports = {
  listLog: function(req, res, next){
    LogModel.find({},'-_id -data -__v').sort({ created: -1 }).limit(30).then(function(log){
      return res.send(log);
    })
  },
}