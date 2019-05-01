const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');

//get all products
router.get('/', (req, res, next) => {
    Product.find()
    .select('name price _id')
        .exec()
        .then(docs => {
            const response={
                count:docs.length,
                products:docs
            }
            
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
//add product to database
router.post('/', (req, res, next) => {
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                messgage: "Added prouct succsefully",
                createdProduct: product
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});
//get specific product by Id
router.get('/:productId', (req, res, next) => {

    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        });

});


//update product by id
router.patch('/:productId', (req, res, next) => {
    Product.findOneAndUpdate(req.params.id,
        {
            $set: {
                name: req.body.name,
                price: req.body.price
            }
        },
        { new: true })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })

});
//delete product by Id
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;