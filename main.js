/**
 * Created by Urriel.
 */

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// Exception handling
process.on('uncaughtException', function (e) {
  console.error('-------------------------------');
  console.error('Runtime Error');
  console.error(e);
  console.error('-------------------------------');
});

app.set('view engine', 'jade'); // use Jade to render views.

app.use(bodyParser.json({})); // request body parser.

app.use(express.static('public'));



app.get('/', function (req, res) { // default route.
  res.render('index');
});


// api routes.
app.use('/', require('./api'));


// start the server.
app.listen(3000, function () {
  console.info('Serveur running on localhost:3000');
});