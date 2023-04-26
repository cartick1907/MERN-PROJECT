const mongoose = require('mongoose')

const userSchema= mongoose.Schema({

    name:{
        type : String,
        req: [true,'Please add a Name']
    },
    email:{
        type : String,
        req: [true,'Please add a Email '],
        unique:true
    },
    password:{
        type : String,
        req: [true,'Please add a Password']
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('User',userSchema)