const express=require('express');
const router=express.Router();
const Users=require('../models/user');
const user=require('../cotrollers/userController');
const config=require('../config/config')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');

router.get('/show',user.show);
router.get('/',user.display);
router.get('/about',user.showAbout)
router.get('/contact',user.showContact)
router.get('/signin',user.signin)
router.get('/signup',user.signup)
router.post('/save',user.save);


router.post('/',(req,res)=>{
    Users.findOne({ email: req.body.email },
        (err, user)=> {
         if (err) {
           return res.status(500).send('Error on the server.');
         }
         if (!user) {
           return res.status(404).send('No user found.');
         }
        var passwordIsValid= bcrypt.compareSync(req.body.password,user.password, (err, result) => {
           if (err) {
             res.status(401).json({ message: "Auth failed" });
             console.log(err);
           }
           if (result) {
             res.status(200).json({ message: "Auth Success" });
             console.log(result);
           }
         });
         if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
         var token = jwt.sign({ id: user._id,email:user.email }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          });
          res.status(200).send({ auth: true, token: token });
        // console.log("Success")
       });

})
/*

router.delete('/',(req,res)=>{
const id=req.body.id
Users.remove(id).exec()
.then(result=>{
    res.status(200).json(result)
})
.catch(err=>{
    res.status(500).json(err);

});
})



router.get('/',(req,res,next)=>{
Users.find()
.exec()
.then(result=>{
    res.status(200).json(result);
})
.catch(err=>{
    res.status(500).json({
        error:err
    })
});
});

router.post('/',(req,res,next)=>{
const users=new Users({
    email:req.body.email,
    password:req.body.password
});
users.save()
.then(docs=>{
    res.status(200).json(docs);
    console.log(docs);
})
.catch(err=>{
    res.status(500).json({
        error:err
        })
});


})
*/
module.exports = router;