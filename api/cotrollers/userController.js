
const express=require('express');
const router=express.Router();
const Users=require('../models/users');
const ejs=require('ejs');


const userController={}

userController.display=function(req,res){
    res.render('index');

}
userController.showAbout=function(req,res){
  res.render('about');

}
userController.showContact=function(req,res){
  res.render('contact');

}
userController.validateUser=function(req,res){

res.render('login');
}


    userController.show = function(req, res) {
        Users.find({}).exec(function (err, users) {
          if (err) {
            console.log("Error:", err);
          }
          else {
            res.render('register',{users:users});
          }
        });
      };
 userController.save=function(req,res){
    const users=new Users({
        email:req.body.email,
        password:req.body.password
    });
    users.save()
    .then(res.render('success'))
    .catch(err=>{
        res.render('error');
    });
    
    
    }
    
    module.exports = userController;