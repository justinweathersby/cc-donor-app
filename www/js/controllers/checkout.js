'use strict'

app.controller('CheckoutCtrl', function($scope, $ionicLoading, $state,$ionicModal, stripeService, $http) {
 Stripe.setPublishableKey('pk_test_tslqI9coii8qKhuEkZI4ZlV6');
  var item = JSON.parse(localStorage["item"]);
//console.log(item);
      $scope.item = item;
      console.log(item);
      $scope.quantities = item.options;

      var n = parseFloat(item.price)+parseFloat(item.shipping);
      $scope.totalPrice = n.toFixed(2);
// document.getElementById('card-form').addEventListener('input', function (e) {
//   e.target.value = e.target.value.replace(/[^\d0-9]/g, '').replace(/(.{4})/g, '$1 ').trim();
// });
// document.getElementById('card-exp').addEventListener('input', function (e) {
//   e.target.value = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{2})/g, '$1 ').trim();
// });


function stripeResponseHandler(status, token)
{
  var access_token = localStorage.getItem('token');
  var base  = 'http://staging.creativechatter.com/api/stripe_charge?stripeToken=';
  var url = base+token.id+"&stripeAmount="+item.price+"&stripeVendor=acct_16rxjaFvAbwux3pz&stripeAppFee=21";

      $http({method: 'POST',
             url: url,
             headers: {'Authorization': access_token}})
      .success( function( data )
      {
       $ionicLoading.hide();
       $scope.modal.hide();
        $state.go('map');
      }
      ).error( function(error) {
        $ionicLoading.hide();
        $scope.modal.hide();
        sweetAlert("sorry .. ", "your card was declined", "error");
      });
}

$scope.checkout = function()
{
  var animation = 'bounceIn';
  $ionicModal.fromTemplateUrl('stripe.html', {
      scope: $scope,
      animation: 'animated ' + animation,
      hideDelay:1020
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
      $scope.hideModal = function(){
        $scope.modal.hide();
        // Note that $scope.$on('destroy') isn't called in new ionic builds where cache is used
        // It is important to remove the modal to avoid memory leaks
        $scope.modal.remove();
      }
    });
}

$scope.pay = function(data)
{
  console.log(data);
  $ionicLoading.show({
     template: '<p style="font-family:Brandon;color:grey;">Processing payment please wait</p><ion-spinner icon="dots"></ion-spinner>',
    hideOnStageChange: true
    });
  console.log(data);
  //var card =  data.card.replace(/\s/g, "");
  var exp = data.card.replace(/[^\dA-Z]/g, '');
  // console.log(card);
  // console.log(data.exp);
  console.log(localStorage.getItem('token'));
  // use details to create token
  Stripe.card.createToken({
  number: data.card,
  cvc: data.cvc.toString(),
  exp: data.exp.toString(), 
}, stripeResponseHandler);

}


$scope.showTerms = function()
{
 // console.log('change');
   $ionicModal.fromTemplateUrl('terms.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
    $scope.openModal();
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


      $scope.back = function()
      {
        $state.go('tabs.shop');
      }
});
