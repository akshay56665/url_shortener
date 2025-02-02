const mongoose=require('mongoose');

let schema=new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirecturl:{
        type:String,
        required:true,
    },
    visitHistory:[{timestamps:{type:Number}}],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
    },
    {timestamps:true}
);

const URL=new mongoose.model('URL',schema);

module.exports=URL;