L.mapbox.accessToken = 'pk.eyJ1Ijoia2FyaXRvdHAiLCJhIjoib0ppeVhnWSJ9.JOLM9BQLqtI_bjvNzjNPew';
var geolocate = document.getElementById('geolocate');
var map = L.mapbox.map('map', 'mapbox.streets');


hotel = document.getElementById('filter-hotel'),
restaurant = document.getElementById('filter-restaurant'),
all = document.getElementById('filter-all');


map.attributionControl.setPosition('bottomleft');

// create the initial directions object, from which the layer
// and inputs will pull data.
var directions = L.mapbox.directions();

var directionsLayer = L.mapbox.directions.layer(directions)
    .addTo(map);

var directionsInputControl = L.mapbox.directions.inputControl('inputs', directions)
    .addTo(map);

var directionsErrorsControl = L.mapbox.directions.errorsControl('errors', directions)
    .addTo(map);

var directionsRoutesControl = L.mapbox.directions.routesControl('routes', directions)
    .addTo(map);

var directionsInstructionsControl = L.mapbox.directions.instructionsControl('instructions', directions)
    .addTo(map);


var myLayer = L.mapbox.featureLayer().addTo(map);



// This uses the HTML5 geolocation API, which is available on
// most mobile browsers and modern browsers, but not in Internet Explorer
//
// See this chart of compatibility for details:
// http://caniuse.com/#feat=geolocation

if (!navigator.geolocation) {
    geolocate.innerHTML = 'Geolocation is not available';
} else {
    geolocate.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        map.locate();
    };
}

// Once we've got a position, zoom and center the map
// on it, and add a single marker.
map.on('locationfound', function(e) {
    map.fitBounds(e.bounds);

    myLayer.setGeoJSON({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [e.latlng.lng, e.latlng.lat]
        },
        properties: {
            'title': 'Here I am!',
            'marker-color': '#ff8888',
            'marker-symbol': 'star'
        }
    });

    // And hide the geolocation button
    myLayer.openPopup();
    geolocate.parentNode.removeChild(geolocate);
});

// If the user chooses not to allow their location
// to be shared, display an error message.
map.on('locationerror', function() {
    geolocate.innerHTML = 'Position could not be found';
});


for (var i = 1; i < dato.features.lenght; i++) {
 dato.features[i].properties["title"]= dato.features[i].properties.name;

    if(dato.features[i].properties.amenity=="restaurant"){
    dato.features[i].properties["marker-symbol"]="restaurant";
      
    }
    if(dato.features[i].properties.tourism=="hotel"){
    dato.features[i].properties["marker-symbol"]="lodging";
    
    }

    };


var markers = L.mapbox.featureLayer()
    .setGeoJSON(dato)
    .addTo(map);

     hotel.onclick = function(e) {
        all.className = '';
        restaurant.className = '';
        this.className = 'active';
        markers.setFilter(function(f) {
            return f.properties['marker-symbol'] === 'lodging';
        });
        return false;
    };

    restaurant.onclick = function(e) {
        all.className = '';
        hotel.className = '';
        none.className = '';
        this.className = 'active';
        markers.setFilter(function(f) {
            return f.properties['marker-symbol'] === 'restaurant';
        });
        return false;
    };

     all.onclick = function() {
        hotel.className = '';
        restaurant.className = '';
        this.className = 'active';
        map.featureLayer.setFilter(function(f) {
            // Returning true for all markers shows everything.
            return true;
        });
        return false;
    };
