const jwt=require('jsonwebtoken');
const config=require('../config/config');

module.exports=(req,res,next)=>{
try {
    var decoded= jwt.verify(req.body.token,config.secret)
     req.userData=decoded;
    next();
} catch (error) {
    return res.status(401).json({

        msg:"auth failed"
    })
}
    

}