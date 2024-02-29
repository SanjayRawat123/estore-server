const express = require('express');
const cors = require('cors');
const productCategories = require('./routes/productCategroies');
const products = require('./routes/products');
const users = require('./routes/user');
const orders = require('./routes/orders');
const bodyparser = require('body-parser');
const app = express();


app.use(cors())
app.use(bodyparser.json());
app.use('/productCategories', productCategories);
app.use('/products',products);
app.use('/users',users);
app.use('/orders',orders);
const port = 3000
const server = app.listen(port, () => {
    console.log('server is running on 3000 port')
})