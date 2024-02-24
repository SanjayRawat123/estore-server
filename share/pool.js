
const mysql = require('mysql2');

const pool = mysql.createPool(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'Rawat@9756037495',
        database: 'estore',
        port: 3306,
        multipleStatements: true
    });


module.exports = pool;