const mongoose = require("mongoose")


const user = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name: String,
    password:String,
    email:String,
    phone:String,
  
})

module.exports = mongoose.model('users',user)