'use strict'

app.controller('ShopCtrl', function ($scope, $http, CHATTER_API) {

  var token = localStorage.getItem('token');
  //var baseUrl = CHATTER_API.url + "/item_categories";
  //console.log(baseUrl);
  //console.log(token);
    $http({method: 'GET',
                     url: CHATTER_API.url + "/item_categories",
                    // headers: {'X-API-EMAIL' : user.email, 'X-API-PASS' : user.password}})
                     headers: {'Authorization': token}})
        .success( function( data )
        {
          $scope.categories = data;

        }
      ).error( function(error) {
          console.log(error);
        });
});
