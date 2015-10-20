'use strict'

app.controller('MapCtrl', function($scope, $state, $stateParams, $http) {

	 var lat = 30.294608;
	var lng = -81.653581;

var mapOptions = {
        //28.373113, -80.747651
         center: {lat: lat, lng: lng},
         zoom: 15,
        // icon: image,
         animation: google.maps.Animation.DROP,
         mapTypeId: google.maps.MapTypeId.ROADMAP,
         mapTypeControlOptions: {
         mapTypeIds: []
        },
        panControl: false,
        streetViewControl: false,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL
        }
      };

  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
 var geocoder = new google.maps.Geocoder();

	getLocation(0,0);

	var showLocation = function(lat, lng, address)
{

	swal({   
	  title: "Delivery to :" ,
      text: address,
      confirmButtonText: 'Confirm',
      showCancelButton: true,
      allowOutsideClick: true,
      confirmButtonColor: "#4c4cfd",
      closeOnConfirm: false,
      animation: "slide-from-top"
	 }, 
		function(){   
swal("Great", "Delivery will be on the way shortly", "success");
		});

};


    function placeMarker(location)
    {
    var point = "img/point.png";
    var marker = new google.maps.Marker({
    position: location,
    //icon: point,
    map: map
    });

  map.setCenter(location);
    }

	 google.maps.event.addListener(map, 'click', function(event) {
	 	console.log('hey');
      placeMarker(event.latLng);
      var myLatLng = event.latLng;
      var lat = myLatLng.lat();
      var lng = myLatLng.lng();
      var latlng = new google.maps.LatLng(lat, lng);

      //Code to reverse geocode follows
       geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
         if (results[1]) {
          map.setZoom(16);
          // marker = new google.maps.Marker({
          //   position: latlng
          // });
          var address = results[0].formatted_address;
        showLocation(lat, lng, address);
          //infowindow.setContent(results[1].formatted_address);
          //infowindow.open(map, marker);
          //document.forms["wheregoing"]["start"].value=results[1].formatted_address;
        }
       } else {
        alert("Geocoder failed due to: " + status);
       }
      });
     });

	function getLocation(lat , lng)
{

	 console.log("Not initialize");
	 lat = 30.294608;
	lng = -81.653581;
    google.maps.event.addDomListener(window, 'load', initialize());
     var image = "img/point.png";
    function initialize() {
      console.log("Initialize");
      
      $scope.map = map;


            var marker = new google.maps.Marker({
    position: {lat: lat, lng: lng}
    
});

// To add the marker to the map, call setMap();
marker.setMap(map);


    }
}




});