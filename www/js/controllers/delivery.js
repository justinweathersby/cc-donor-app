app.controller('DeliveryCtrl', function($scope, $state, $cordovaGeolocation, $stateParams, $http) {


    //console.log($stateParams);
if($stateParams.status == "onway") //onway
{
    var deliveryMap = new GMaps({
        div: '#map',
        lat: 0.0,
        lng: 0.0,
        zoom: 17
    });

    var deliveryMarker = deliveryMap.addMarker({
        lat: 0.0,
        lng: 0.0

    });

    var meMarker = deliveryMap.addMarker({
        lat: 0.0,
        lng: 0.0

    });

    //if you have deliveries than watch the driver
    var socket = io.connect(SOCKET_URL);

    socket.on('moving', function(location) {

    console.log(location);
      if(location[0].id == $stateParams.id)
      {
        var lat = location[0].lat;
        var lng = location[0].lng;
        console.log("location from socket = " + lat + ", " + lng);
        //update map marker
        var latlng = new google.maps.LatLng(lat, lng);
        deliveryMarker.setPosition(latlng);
         deliveryMap.setCenter(lat, lng);
      }

    });



    var posOptions = {
        timeout: 10000,
        enableHighAccuracy: false
    };
    $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function(position) {
            var lat = position.coords.latitude
            var long = position.coords.longitude

            //deliveryMap.setCenter(lat, long);
            var latlng = new google.maps.LatLng(lat, long);
            meMarker.setPosition(latlng);

            var watchOptions = {
                timeout: 3000,
                enableHighAccuracy: false // may cause errors if true
            };

            // start watching yourself


        });
}
else
{
  window.plugins.toast.showLongCenter('Your order has not been picked up yet');
  $state.go('tabs.delivery-list');
}




});
//client side