'use strict'

/*
var DeliverySchema = new mongoose.Schema({
      id: {type:  Number},
      to: [{
      name: {type: String},
      address: {type: String },
      lat: {type: Number },
      lng: {type: Number }
      }],
      from: [{
      name: {type: String},
      address: {type: String },
      lat: {type: Number },
      lng: {type: Number }
      }],  
      item: {type: String },
      ready: {type: Boolean},
      status: {type: String},
  date: {type: Date, default: Date.now}
});

*/

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

        var s = $stateParams;

        var names = [{"vendor":s.vendor, "phone":9049998388,"item":s.item, "lat": s.lat,
        "lng":s.lng, "total": total, "shipping": s.shipping, "image": localStorage.getItem('image')}];
        localStorage["names"] = JSON.stringify(names);
        var storedNames = JSON.parse(localStorage["names"]);
        console.log(storedNames[0]);
       
        stripeService.get($scope.item.image_url, $scope.item.item, total);

      }

      $scope.back = function()
      {
        $state.go('tabs.shop');
      }
});
