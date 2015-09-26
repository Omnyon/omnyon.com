var express = require('express');
var app = express();

app.use(express.static('dist'));
app.use(express.static('node_modules'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/html/index.html');
});

app.get('/careers', function(req, res) {
  res.sendFile(__dirname + '/html/careers.html');
});

app.listen(5000, function() {
  console.log('Listening on port 5000');
});