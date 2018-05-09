const express = require('express');
const router = express.Router();// for routing with different URL
const mongoose = require('mongoose');
const Product = require('../models/product');

//this method executes when http://SITEURL.com/products is called in GET Method
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET method'
  });
});

//this method executes when http://SITEURL.com/products is called in POST Method
router.post('/', (req, res, next) => {
//in post method URL we are adding body values into mongoDB using mongoose
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product.save().then(result => {
    console.log(result);
  })
  .catch(err => console.log(err));
  res.status(201).json({
    message: 'Handling POST method',
    product: product
  });
});

//this method executes when http://SITEURL.com/products/productId is called in GET Method
router.get('/:productId', (req, res, next) =>{
  const id = req.params.productId;
  if(id === 'special') {
    res.status(200).json({
      message: 'u have passed special ID',
      id: id
    });
  }
  else {
    res.status(200).json({
      message: ' u haven\'t used special param'
    });
  }
});

//this method executes when http://SITEURL.com/products is called in Patch Method (update)
router.patch('/:productId', (req, res, next) =>{
  const id = req.params.productId;
  res.status(200).json({
    message: 'u have update the product' + id + '.',
    id: id
  });
});

//this method executes when http://SITEURL.com/products/productId is called in DELETE Method
router.delete('/:productId', (req, res, next) =>{
  const id = req.params.productId;
  res.status(200).json({
    message: 'u have delete the product' + id + '.',
    id: id
  });
});

module.exports = router;
