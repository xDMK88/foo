const express = require('express');
const router = express.Router();
var app = express();
const pool = require('../config/db.config');
const task = require('../controllers/task');

//  router.get('/taskSync', task.getLeaderTask)

router.route('/taskSync').get(task.getLeaderTask);

router.get('/task/', task.getTask);
router.post('/task', task.postTask);
router.patch('/task/:id', task.patchTask);
router.delete('/task/:id', task.deleteTask)

router.all('/', function (req, res, next) {
    console.log('Буду выполнятся для любого запроса и пошлю запрос дальше по очереди ...');
    next(); // посылаю на х.. к следующему обработчику
});
router.get('/task/:name', function(req, res) {
    console.log(req.params.name);
    res.json(req.params.name);
});
router.get('/', function (req, res) {
    res.send('Получил GET запрос');
});

router.post('/', function (req, res) {
    res.send('Получил POST запрос');
});

router.put('/', function (req, res) {
    res.send('Получил PUT запрос');
});

router.patch('/', function (req, res) {
    res.send('Получил PATCH запрос');
});

router.delete('/', function (req, res) {
    res.send('Получил DELETE запрос');
})
module.exports = router;
