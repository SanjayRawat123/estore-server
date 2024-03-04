const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const productCategories = require('./routes/productCategroies');
const products = require('./routes/products');
const users = require('./routes/user');
const orders = require('./routes/orders');
const bodyparser = require('body-parser');
const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cors())
app.use(bodyparser.json());
app.use('/productCategories', productCategories);
app.use('/products', products);
app.use('/users', users);
app.use('/orders', orders);


module.exports = app;