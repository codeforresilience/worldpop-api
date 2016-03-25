var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  var json = JSON.parse('{"count":11,"totalPopulation":12043545.114792835,"totalArea":3576039.0251903664,"polygonArea":3548725.419122968}');
  
  var worldpop = require('worldpop')
  var accessToken = 'pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJWQlQ1NlNVIn0.IT_b8KVeZDvOFZLWF7DpvQ'

  var tilesUri = 'tilejson+http://api.tiles.mapbox.com/v4/' + 'devseed.isnka9k9.json?access_token=' + accessToken;
  var tileLayer = 'population';

  layer = {"type":"Feature","properties":{},"geometry":{"type":"Polygon",
  "coordinates":[[[32.7802848815918,0.5343741191764122],[32.78989791870117,0.534030811344804],[32.78989791870117,0.5297394618360466],[32.780113220214844,0.5288811915769153],[32.7802848815918,0.5343741191764122]]]}}

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

	  document.write(JSON.stringify(results));
	  store = JSON.stringify(results);

	  console.log("results"+results)
	  
	  return results
   })  
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});