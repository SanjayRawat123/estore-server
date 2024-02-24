const express = require('express');
const cors = require('cors')
const productCategories = require('./routes/productCategroies')
const products = require('./routes/products')

const app = express();


app.use(cors())
app.use('/productCategories', productCategories)
app.use('/products',products)

const port = 3000
const server = app.listen(port, () => {
    console.log('server is running on 3000 port')
})