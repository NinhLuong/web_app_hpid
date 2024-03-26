const RightModel = require("../models/right");
module.exports = {
  listRight: function(req, res, next){
    RightModel.find({},'-_id -__v').then(function(right){
      return res.send(right);
    })
  },
}