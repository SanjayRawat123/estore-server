const express = require('express');
const mysql = require('mysql2')
const app = express();

const pool = mysql.createPool(
    {
        host: '127.0.0.1',
        user: '',
        password: '',
        database: '',
        port: 3306,
        multipleStatements: true
    });


app.get('/', (req, res) => {
    pool.query('select * from categories', (error, categories) => {
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(200).send(categories);
        }
    });
});
















const port = 3000
const server = app.listen(port, () => {
    console.log('server is running on 3000 port')
})