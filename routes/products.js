const express = require('express');
const router = express.Router();
const pool = require('../share/pool');


router.get('/', (req, res) => {
    let mainCategoryId = req.query.mainCategoryId;
    let subCategoryId = req.query.subCategoryId;
    let keyword = req.query.keyword;
    let query = 'select * from products';
    if (subCategoryId) {
        query += ' where category_id =' + subCategoryId;
    }
    if (mainCategoryId) {
        query = `select products. * from products , categories 
        where products.category_id = categories.id and categories.parent_category_id
        =${mainCategoryId}`;
    }

    if (keyword) {
        query += ` and keywords like '%${keyword}%'`;
    }
    pool.query(query, (error, products) => {
        if (error) {
            res.status(404).send(error);
        } else {
            res.status(200).send(products);
        }
    })
});

router.get('/:id', (req, res) => {
    const id = req.params.id
    pool.query('select * from products where id = ' + id, (error, product) => {
        if (error) {
            res.status(404).send(error);
        } else {
            res.status(200).send(product);
        }
    })
})


module.exports = router