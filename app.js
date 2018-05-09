const express = require('express');
const bodyParser = require('body-parser');//for parsing the URL we are getting for body(for better understanding of URL)
//const morgan = require('morgan');//for logging the incoming reqquests(dev)
const mongoose = require('mongoose');//libraary to deal with mongoDB
const app = express();

//routes variables paths in our project
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//mongoDB connection
mongoose.connect(process.env.mongoDB_url);

//app.use(morgan('dev'));//for logging incoming URL
app.use(bodyParser.urlencoded({extended: false}));//bisecting URL into understandable way
app.use(bodyParser.json());//allowing to parse JSON also

//basic server cretion block of code 7-12 lines
// app.use((req, res, next) => {
//   res.status(200).json({
//     message: 'It works!'
//   });
// });

//Headers: what to recieve from browser/client to server
app.use((req, res, next) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content_type, Accept, Authorization");

//what type of methods entertainmed by server(usually browser automatically sends this req.)
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE');
    return res.status(200).json({});
  }
  next();
});
// middleware to handle the routes depending on the URL
//Funneling of requests
app.use('/products', productRoutes);//this will route to method executes when http://SITEURL.com/products and this routes to line7
app.use('/orders', orderRoutes);//this will route to method executes when http://SITEURL.com/orders and this routes to line8

//for error handling: for wrong route URL response send using  next method
app.use((req, res, next) =>{
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

//error handling by sending JSON to client
app.use((error,req, res, next) =>{
  res.status(error.status || 500);
  res.json({
    error:{
      message: error.message
    }
  });
});
module.exports = app; //By default we have export(return)
