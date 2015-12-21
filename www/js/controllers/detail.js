'use strict'

app.controller('DetailCtrl', function($cordovaSocialSharing,$ionicModal, $ionicLoading,  $scope, $cordovaGeolocation, $state,  $http,  $stateParams, stripeService, CHATTER_API) {

  $scope.query = "";

$scope.go = function(item)
{
  $state.go('checkout', {item:JSON.stringify(item)});
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

// function startZoom()
// {
//   var myElement = document.getElementById('image-detail');
//   myElement.style.width = '320px';
//   var hammertime = new Hammer(myElement);
//     var width = parseInt(myElement.style.width),
//     vel   = 3.0,
//     min   = 100,
//     max   = 800,
//     scale;
// console.log(myElement.style.width);

// function gestureChange( e ) {
//     e.preventDefault();
// console.log(e.scale);
//     scale = e.scale;
    
//     var tempWidth = width * scale;

//     if ( tempWidth > max ) tempWidth = max;
//     if ( tempWidth < min ) tempWidth = min;

//     myElement.style.width = tempWidth+'px';
//     myElement.style.height = tempWidth+'px';

//     console.log(myElement.style.width);
// }

// function gestureEnd( e ) {
//   console.log('done changing');
//     e.preventDefault();
//     width = parseInt(myElement.style.width);
// }

//    hammertime.get('pinch').set({ enable: true });
//       hammertime.on('pinch', gestureChange);


// }



 $scope.showImageDetail = function(url) {
        // console.log('change');
        $scope.detailImage = url;
        $ionicModal.fromTemplateUrl('image-detail.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.openModal();
           // startZoom();
        });
        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });

    }


function getItems(lat,lng)
{
 // var u ="/items?latitude=32.8873&longitude=-79.9833&item_category_id="+id;
$ionicLoading.show({
     template: '<p style="font-family:Brandon;color:grey;">Loading items</p><ion-spinner icon="dots"></ion-spinner>',
    hideOnStageChange: true
    });
  $http({method: 'GET',

url: CHATTER_API.url + '/items?latitude='+lat+'&longitude='+lng+'&item_category_id='+id,
        //staging.creativechatter.com/api/items?latitude=32.8873&longitude=-79.9833&item_category_id=1
         headers: {'Authorization': token}})
          .success( function( data )
          {
            $ionicLoading.hide();
        
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
          //  console.log($scope.items);
            //console.log($scope.items);
              if($scope.items.length == 0)
                {
    window.plugins.toast.showShortCenter("no items found");

                }
          }
          ).error( function(error) {
            console.log(error);
            $ionicLoading.hide();
             swal("", "there was an error.. try again later", "error");
          });

}

$scope.share = function(image, description)
{
var post = "Look ! "+description+" I found on Creative Chatter app";
$cordovaSocialSharing.share(post, "message", image, "https://creativechatter.com");
}

  $scope.back = function()
  {

    $state.go('tabs.shop');
  }
});
