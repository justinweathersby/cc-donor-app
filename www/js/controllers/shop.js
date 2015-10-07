'use strict'

app.controller('ShopCtrl', function ($scope, $http) {

  var token = localStorage.getItem('token');
  var baseUrl = "http://staging.creativechatter.com";
  //console.log(baseUrl);
  //console.log(token);

    $http({method: 'GET',
                     url:'/api/item_categories',
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
