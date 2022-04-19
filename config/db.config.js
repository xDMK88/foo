const mysql = require('mysql');
const config = {
    host: 'localhost',
    user: 'root',
    password: '4ksVknqUFDc7UGFa',
    database: 'inspector',
};
const pool = mysql.createPool(config);
module.exports = pool;
