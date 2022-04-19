var createError = require('http-errors');
var express = require('express');
const components = require('./routes/task');
var bodyParser = require('body-parser')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const pool = require('./config/db.config');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/node_modules'));
var indexRouter = require('./routes/index');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', components);
app.use('/task', components);
app.use('/', indexRouter);


app.use(function(req, res, next){
  const err = new Error('Ни хрена не найдено!');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  })
})
app.get('/users', (request, response) => {
  pool.query('SELECT * FROM task', (error, result) => {
    if (error) throw error;
    response.send(result);
  });
});

// view engine setup

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.get('https://web.leadertask.com/api/v1/tasks/entity?uid=0099b2f2-2129-48f6-ae9b-b47372fb37cb', function (req, res){
  res.header('Authorization','j1J0PVy8Y2EYPyrgu83QkK8SL1rzpDXCMBLHEaesadf13T0CJunImPlW9bb4/T8RIetd+/kBaebTV9+JkWXnlOmV9LHZ/1XCtbaDavIVqe5OmGipsSql4MEhlxXyFEQm+BdgubPEfJ3aPx3a53cv0olLmebdjCmQZiJSoQlgvqQZnDJtyORRDlhQTzqggw1D3DZtac0c01I+WwzIMxez0CcnKM6BV2v9z1bDPzCUkIGgkvf75ytkcgVrwhiScfrS');
  res.send()
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// Only works on 3000 regardless of what I set environment port to or how I set
// [value] in app.set('port', [value]).
// app.listen(3000);
app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'),'localhost', function () {
  console.log('Сервер работает с портом: ' + app.get('port'))
});
module.exports = app;
