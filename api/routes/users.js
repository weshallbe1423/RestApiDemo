const express=require('express');
const router=express.Router();

const user=require('../cotrollers/userController');



router.get('/show',user.show);
router.get('/',user.display);
router.get('/about',user.showAbout)
router.get('/contact',user.showContact)
router.get('/login',user.validateUser)
router.post('/save',user.save);

/*
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