'use strict'

app.controller('CheckoutCtrl', function($scope, $state, stripeService, $stateParams, $http) {

      console.log($stateParams);
      var cat = $stateParams.category;
      $scope.quantity = [];
      $scope.item = $stateParams;

      for(var i = 0; i < parseInt($stateParams.quantity); i++ )
      {
        $scope.quantity.push(i+1);
      }

      var n = parseFloat($scope.item.price)+parseFloat($scope.item.shipping);
      $scope.totalPrice = n.toFixed(2);


      $scope.buy = function(){
        var n = parseFloat($scope.item.price)+parseFloat($scope.item.shipping);
        var total= n.toFixed(2);

        stripeService.get($scope.item.image_url, $scope.item.item, total);
      }

      $scope.back = function()
      {
        $state.go('tabs.shop');
      }
});
