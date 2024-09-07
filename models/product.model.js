const mongoose = require('mongoose')



const product = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    discription:String,
    old_price: String,
    new_price:String,
    discount:Number,
    url:String

})

module.exports = mongoose.model('product',product)