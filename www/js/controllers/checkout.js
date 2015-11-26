'use strict'

app.controller('CheckoutCtrl', function($scope, $state, stripeService, $http) {

  var item = JSON.parse(localStorage["item"]);
console.log(item);
      $scope.item = item;

      $scope.quantities = item.options;

      var n = parseFloat(item.price)+parseFloat(item.shipping);
      $scope.totalPrice = n.toFixed(2);


      $scope.buy = function(){
        var n = parseFloat(item.price)+parseFloat(item.shipping);
        var total= n.toFixed(2);

        // var names = [{"vendor":s.vendor, "phone":s.phone,"item":s.item, "lat": s.lat,
        // "lng":s.lng, "total": total, "shipping": s.shipping, "image": localStorage.getItem('image')}];
        // localStorage["names"] = JSON.stringify(names);
        // var storedNames = JSON.parse(localStorage["names"]);
        // console.log(storedNames[0]);
       
        stripeService.get(item.imageUrl, item.name, total);

      }

      $scope.back = function()
      {
        $state.go('tabs.shop');
      }
});
