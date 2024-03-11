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
    console.log("hello",process.env.NODE_ENV)
}

app.use(cors())
app.use(bodyparser.json());
app.get('/api/get', (req, res) => {
    res.send({ message: "hello back to nodejs" })
})
app.get('/api/get_user_details', (req, res) => {
    res.send({
        user: {
            name: "satyam",
            age: 22,
            contact: 12254,
            env: process.env.NODE_ENV

        }
    })
});
app.use('/productCategories', productCategories);
app.use('/products', products);
app.use('/users', users);
app.use('/orders', orders);


module.exports = app;