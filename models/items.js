const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    price:{
        type:Number,
        required : true
    },
    taste:{
        type:String,
        enum : ['sweet','sour','spicy'],
        required:true
    },
    is_drink:{
        type : Boolean,
        required : true
    },
    ingredients:{
        type:[String],
        default:[]
    },
    num_sales:{
        type:Number,
        default : 0
    }
})

//create person model

const Item = mongoose.model('item',itemSchema);
module.exports = Item