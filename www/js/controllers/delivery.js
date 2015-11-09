


app.controller('DeliveryCtrl', function ($scope, $http) {


// //37.35357644, -122.10818206
    var map = new GMaps({
      div: '#map',
      lat: 37.35357644,
      lng: -122.10818206,
      zoom: 17
    });
//-122.10818206
  var myMarker = map.addMarker({
  lat: 37.35357644,
  lng: -122.10818206,
  title: "me"
});


//client side
 var socket = io.connect(SOCKET_URL);

 socket.on('moving', function(location) {

  var lat  = location[0].lat;
  var lng = location[0].lng;
  console.log("location from socket = "+lat+", "+lng);

 map.setCenter(lat, lng);
  //update map marker
 var latlng = new google.maps.LatLng(lat, lng);
myMarker.setPosition(latlng);

 });

$scope.watch = function()
{
var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude

      map.setCenter(lat, long);

    var watchOptions = {
    timeout : 3000,
    enableHighAccuracy: false // may cause errors if true
  };

  var watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    null,
    function(err) {
      // error
    },
    function(position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
        var location = [{lat: lat, lng: long}];
        socket.emit('moving', location);
  });

    }, function(err) {
      // error
    });

        }



});