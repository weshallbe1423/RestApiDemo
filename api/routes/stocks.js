const express=require('express');
const Stock=require('../models/stock');
const router=express.Router();
const mongoose=require('mongoose');


router.get('/',(req,res,next)=>{
Stock.find()
.exec()
.then(stocks=>{
    res.status(200).json({
        stocks
    })
})
.catch(err=>{
    res.status(500).json({
        error:err
    })
});

})

router.post('/',(req,res,next)=>{
const stock=new Stock({
    _id: mongoose.Types.ObjectId(),
    item_name:req.body.item_name,
    item_qunatity:req.body.item_qunatity,
    item_company:req.body.item_company
});
stock.save()
.then( result=>{
    res.status(200).json({
        message:"created stock",
        CreatedStock:stock
    });
})

.catch(err=>{
    res.status(500).json({
        error:err
    })
});
})

router.patch('/:stockId',(req,res,next)=>{
   Stock.findByIdAndUpdate(req.params.stockId,
    {$set:{
    item_name:req.body.item_name,
    item_qunatity:req.body.item_qunatity,
    item_company:req.body.item_company
   }
},
{new:true}).exec()
.then(result=>{
    res.status(200).json({
        result
    })
})
.catch(err=>{
    res.status(500).json({
        error:err
    })
}
    );
})

router.get('/:stockId',(req,res,next)=>{
    const id=req.param.stockId;
    Stock.findById(id)
    .exec()
    .then(doc=>{
        res.status(200).json({
            doc
        });
    })
    .catch(err=>{
        res.status(500).json({error:err})
        console.log(err);
    })
})


router.delete('/:stockId',(req,res,next)=>{
    Stock.findByIdAndDelete(req.params.stockId)
    .exec()
    .then(result=>{
        res.status(200).json({
            DeletedStock:result,
            message:"deleted successfully"
        });
        
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    });
})
module.exports=router;