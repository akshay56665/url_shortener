const mongoose=require('mongoose');

let schema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        required:true,
        default:'NORMAL'
    },
    password:{
        type:String,
        required:true,
    }},
    {timestamps:true}
);

const user=new mongoose.model('auth',schema);

module.exports=user;