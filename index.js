var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.post('/api',upload.array(), function(request, response, next) {
  var json = JSON.parse('{"count":11,"totalPopulation":12043545.114792835,"totalArea":3576039.0251903664,"polygonArea":3548725.419122968}');
  
  var worldpop = require('worldpop')
  var accessToken = 'pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJWQlQ1NlNVIn0.IT_b8KVeZDvOFZLWF7DpvQ'

  var tilesUri = 'tilejson+http://api.tiles.mapbox.com/v4/' + 'devseed.isnka9k9.json?access_token=' + accessToken;
  var tileLayer = 'population';

  var coordinates = request.body.coordinates

  layer = '{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":'+ coordinates+ '}}'

  layer = JSON.parse(layer)

  var defaults = {
	  longitude: 5.625,
	  latitude: 6.6646,
	  zoom: 3
   };

   var result = worldpop({
	  source: tilesUri,
	  layer: tileLayer,
	  polygon: layer,
	  min_zoom:11,
	  max_zoom:11, 
	  density: function (feat) { 
	  return feat.properties.density} 
	  },

	  function done (err, results) {

	  response.json(results);
   })  
});

app.post('/test',upload.array(), function(request, response, next) {

  var coordinates = request.body.coordinates
  response.end("It is Working")

});

app.listen(app.get('port'), function() {
  console.log('Application is running on port', app.get('port'));
});