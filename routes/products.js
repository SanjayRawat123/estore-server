const express = require('express');
const router = express.Router();
const pool = require('../share/pool');


router.get('/', (req, res) => {
    pool.query('select * from products', (error, products) => {
        if (error) {
            res.status(404).send(error);
        } else {
            res.status(200).send(products);
        }
    })
});

router.get('/:id', (req, res) => {
    const id = req.params.id
    pool.query('select * from products where id = ' + id , (error,product)=>{
        if (error) {
            res.status(404).send(error);
        } else {
            res.status(200).send(product);
        }
    })
})


module.exports = router