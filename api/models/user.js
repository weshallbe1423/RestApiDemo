const mongoose=require('mongoose');

var userSchema=new mongoose.Schema({

    _id:mongoose.Schema.Types.ObjectId,
    email:{type:String,required:true},
    mobile:{type:m=Number,required:true},
    password:{type:String ,required:true}

})

module.exports=mongoose.model("Users",userSchema);