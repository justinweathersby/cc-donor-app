'use strict'

app.controller('ShopCtrl', function ($scope, $http, $ionicLoading, CHATTER_API) {

  var token = localStorage.getItem('token');
  //var baseUrl = CHATTER_API.url + "/item_categories";
  //console.log(baseUrl);
  //console.log(token);


  $scope.icons = ICONS;
$ionicLoading.show({
     template: '<p style="font-family:Brandon;color:grey;">Loading categories</p><ion-spinner icon="dots"></ion-spinner>',
    hideOnStageChange: true
    });

    $http({method: 'GET',
                     url: CHATTER_API.url + "/item_categories",
                    //url:"api/item_categories",
                    // headers: {'X-API-EMAIL' : user.email, 'X-API-PASS' : user.password}})
                     headers: {'Authorization': token}})
        .success( function( data )
        {
          $ionicLoading.hide();
          $scope.categories = data;

        }
      ).error( function(error) {
      $ionicLoading.hide();
          console.log(error);
          alert('logout and login again');
        });
});
