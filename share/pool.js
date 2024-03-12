
const mysql = require('mysql2');


const pool = mysql.createPool(
    {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: 'estore',
        port: process.env.DATABASE_PORT,
        multipleStatements: true
    });


module.exports = pool;