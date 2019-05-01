const express= require('express');
const router=express.Router();
const Order=require('../models/order');
const mongoose=require('mongoose');

//Get All Orders
router.get('/',(req,res,next)=>{
Order.find()
.exec()
.then(result=>{
    res.status(200).json(result)
    console.log(res);
})
.catch(err=>{
    res.status(500).json(err);
    console.log(err);
});
});
   
//fetch order
router.post('/',(req,res,next)=>{
const order=new Order({
    _id:mongoose.Types.ObjectId(),
    product:req.body.productId,
    quantity:req.body.quantity
})
order.save()
.then(result=>{
    res.status(201).json(result);
    console.log(result);
})
.catch(err=>{
res.status(500).json({
    error:err
    })
});
   
});

//get order by id
router.get('/:orderId',(req,res,next)=>{
    const id=req.params.orderId;
    Order.findById(id)
    .exec()
    .then(docs=>{
        
        res.status(200).json({
            docs
        });
        
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    });
});

//delete order by id
router.delete('/:orderId',(req,res,next)=>{
const id=req.params.orderId;
    Order.remove({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json(result);
        console.log("Deleted Succsessfully!"+result);
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    });
});
module.exports=router;