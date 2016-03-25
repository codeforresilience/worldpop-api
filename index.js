var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  var json = JSON.parse('{"count":11,"totalPopulation":12043545.114792835,"totalArea":3576039.0251903664,"polygonArea":3548725.419122968}');
  response.json(json);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});