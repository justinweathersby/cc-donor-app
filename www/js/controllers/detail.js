'use strict'

app.controller('DetailCtrl', function($scope, $cordovaGeolocation, $state,  $http,  $stateParams, stripeService, CHATTER_API) {

  $scope.query = "";

$scope.saveImage = function(url)
{
  localStorage.setItem('image', url);
 // console.log(localStorage.getItem('image'));
}


var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
      getItems(lat, long);
    }, function(err) {
     window.plugins.toast.showLongCenter("Enable location services");

    });

  $scope.shop = [];
  $scope.items = [];
  var name = $stateParams.shop;
  var id = $stateParams.id;
  $scope.shopname = name;
  var token = localStorage.getItem('token');

function getItems(lat,lng)
{
 // var u ="/items?latitude=32.8873&longitude=-79.9833&item_category_id="+id;
  var spinner = new Spinner().spin()
var target = document.getElementById('spinner');
target.appendChild(spinner.el);
  $http({method: 'GET',

url: CHATTER_API.url + '/items?latitude='+lat+'&longitude='+lng+'&item_category_id='+id,
        //staging.creativechatter.com/api/items?latitude=32.8873&longitude=-79.9833&item_category_id=1
         headers: {'Authorization': token}})
          .success( function( data )
          {
            spinner.stop();
        
            for(var i = 0; i < data.length; i++)
            {
              if(data[i].item_category.name == name)
              {
                console.log('match');
                
                $scope.items.push(data[i]);
              }
              // if no options then go to quantity
              // in checkout pass id of item and number of items wanted
            }
            console.log($scope.items);
            //console.log($scope.items);
              if($scope.items.length == 0)
                {
    window.plugins.toast.showShortCenter("no items found");

                }
          }
          ).error( function(error) {
            console.log(error);
             swal("", "there was an error.. try again later", "error");
          });

}

$scope.share = function(image)
{
$cordovaSocialSharing.share("sharing", "message", image, "https://beatshop.io");
}

  $scope.back = function()
  {

    $state.go('tabs.shop');
  }
});
