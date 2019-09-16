var express = require('express');
var app = express();
var PORT = 3000;

//necessary for PUT&POST requests
var bodyParser = require('body-parser');

//app listens for requests
app.listen(PORT, () => {
    console.log(`\r\nNODE ::: I started my back end server on port ${PORT}.\r\n`);
});

// FIRST: get data from DB
// --- HERE: save data from json files ---
const fs = require('fs');

let products_rawdata = fs.readFileSync('../../products.json');
let products = JSON.parse(products_rawdata);

let customers_rawdata = fs.readFileSync('../../customers.json');
let customers = JSON.parse(customers_rawdata);

let orders_rawdata = fs.readFileSync('../../orders.json');
let orders = JSON.parse(orders_rawdata);
// ---------------------------------------


//provide data over URL
app.get('/products', function(req, res, next) {
    //code executed when link is visited
    res.send(products);
    console.log("\r\nPRODUCTS\r\n",products);
})

app.get('/customers', function(req, res, next) {
    res.send(products);
    console.log("\r\nCUSTOMERS\r\n",customers);
})

app.get('/orders', function(req, res, next) {    
    res.send(orders);
    console.log("\r\nORDERS\r\n",orders);
    // res.status(200)
})

// tells the system that you want json to be used
app.use(bodyParser.json());

app.put('/orders/:id', function(req, res) {    
    let updatedOrder = req.body;
    console.log("NEW ORDER HAS TO BE SENT TO DB: \r\n",updatedOrder);
    //send response back to frontend
    res.send(updatedOrder);
})