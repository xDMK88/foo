var express = require('express');
var app = express();
var request = require('request');
const pool = require('../config/db.config');
const bodyParser = require('body-parser');

module.exports.getTask = function(req, res) {
    pool.query('SELECT * FROM task', (error, result) => {
        if (error) throw error;
        res.send(result);
    });
}
module.exports.getLeaderTask = function(req, res) {
    console.log(req)
    request({
        method: 'GET',
        uri: 'https://web.leadertask.com/api/v1/tasks/entity?uid=0099b2f2-2129-48f6-ae9b-b47372fb37cb',
        headers: {'Authorization': 'j1J0PVy8Y2EYPyrgu83QkK8SL1rzpDXCMBLHEaesadf13T0CJunImPlW9bb4/T8RIetd+/kBaebTV9+JkWXnlOmV9LHZ/1XCtbaDavIVqe5OmGipsSql4MEhlxXyFEQm+BdgubPEfJ3aPx3a53cv0olLmebdjCmQZiJSoQlgvqQZnDJtyORRDlhQTzqggw1D3DZtac0c01I+WwzIMxez0CcnKM6BV2v9z1bDPzCUkIGgkvf75ytkcgVrwhiScfrS', 'LocalDate':'18-04-2022'}
    }, function (error, response, body){
        if(!error && response.statusCode == 200){
            var jsonParser = bodyParser.json();
            res.setHeader('Content-Type', 'application/json');
            res.type('html');
            res.get('uid')
            //  res.json(body)
             pool.query('INSERT INTO task (jsontask)  VALUES (?)',body, (error, result) => {
                    if (error) throw error;
                    res.status(201).send(`User added with ID: ${result.insertId}`);
                });
        }
    });
}
module.exports.postTask = function(req, res) {
    pool.query('INSERT INTO task SET ?', req.body, (error, result) => {
        if (error) throw error;
        res.status(201).send(`User added with ID: ${result.insertId}`);
    });
}
module.exports.patchTask = function(req, res) {
    const id = req.params.id;
    pool.query('UPDATE task SET ? WHERE id = ?', [req.body, id], (error, result) => {
        if (error) throw error;

        res.send('User updated successfully.');
    });
}
module.exports.deleteTask = function(req, res) {
    const id = req.params.id;
    pool.query('DELETE FROM task WHERE id = ?', [id], (error, result) => {
        if (error) throw error;

        res.send('User deleted successfully.');
    });
}
app.delete('/', function (req, res) {
    res.send('Получил DELETE запрос');
});

app.all('/', function (req, res, next) {
    console.log('Буду выполнятся для любого запроса и пошлю запрос дальше по очереди ...');
    next(); // посылаю на х.. к следующему обработчику
});
app.post('/task', function(req, res) {
    console.log(req.body.name);
    res.json(req.body.name);
});
app.get('/task/:name', function(req, res) {
    console.log(req.params.name);
    res.json(req.params.name);
});
app.get('/:id', function (req, res) {
    let id = req.params.id;
    res.send('Получил GET запрос с параметром: ' + id);
});

app.post('/', function (req, res) {
    res.send('Получил POST запрос');
});

app.put('/', function (req, res) {
    res.send('Получил PUT запрос');
});

app.patch('/', function (req, res) {
    res.send('Получил PATCH запрос');
});

