'use strict'

app.controller('CheckoutCtrl', function($scope, $state,$ionicModal, stripeService, $http) {
 Stripe.setPublishableKey('pk_test_tslqI9coii8qKhuEkZI4ZlV6');
  var item = JSON.parse(localStorage["item"]);
//console.log(item);
      $scope.item = item;

      $scope.quantities = item.options;

      var n = parseFloat(item.price)+parseFloat(item.shipping);
      $scope.totalPrice = n.toFixed(2);
document.getElementById('card-form').addEventListener('input', function (e) {
  e.target.value = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
});
document.getElementById('card-exp').addEventListener('input', function (e) {
  e.target.value = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{2})/g, '$1 ').trim();
});


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
       
        $state.go('map');
      }
      ).error( function(error) {
        alert(error);
      });
}

$scope.pay = function(data)
{
  console.log(data);
  // window.plugins.toast.showShortCenter("Processing payment please wait");

  // var card =  data.card.replace(/\s/g, "");
  // console.log(card);
  // console.log(data.exp);
  console.log(localStorage.getItem('token'));
  // use details to create token
//   Stripe.card.createToken({
//   number: card,
//   cvc: data.cvc.toString(),
//   exp: data.exp.toString(),
// }, stripeResponseHandler);

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
