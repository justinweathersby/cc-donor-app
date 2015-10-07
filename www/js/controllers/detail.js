'use strict'

app.controller('DetailCtrl', function($scope, $state,  $http,  $stateParams, stripeService) {

  $scope.query = "";
  // console.log($stateParams);
  $scope.shop = [];
  $scope.items = [];
  var name = $stateParams.shop;
  $scope.shopname = name;
  var token = localStorage.getItem('token');

  $http({method: 'GET',
         url:'/api/items',
         headers: {'Authorization': token}})
          .success( function( data )
          {

            for(var i = 0; i < data.length; i++)
            {
              if(data[i].item_category.name == name)
              {
                console.log('match');

                $scope.items.push(data[i]);
              }
            }
          }
          ).error( function(error) {
            console.log(error);
          });

  $scope.back = function()
  {

    $state.go('tabs.shop');
  }
});
