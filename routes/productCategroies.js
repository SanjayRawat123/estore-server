const express = require('express');
const pool = require('../share/pool')
const router = express.Router();


router.get('/', (req, res) => {
    pool.query('select * from categories', (error, categories) => {
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(200).send(categories);
        }
    });
});


module.exports = router;