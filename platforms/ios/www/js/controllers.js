'use strict'

var baseUrl = "http://staging.creativechatter.com";

app.controller('AppController', function($state, $scope, $ionicHistory, $ionicPopup, authService) {

  // $scope.$on(AUTH_EVENTS.notAuthorized, function(event){
  //   var alertPopup = $ionicPopup.alert({
  //     title: 'Unathorized',
  //     template: 'You are not allowed to acces this resource.'
  //   });
  // });
  //
  // //--When not authorized event is broadcast..
  // $scope.$on(AUTH_EVENTS.notAuthenticated, function(event){
  //   authService.logout();
  //   $state.go('login');
  //   var alertPopup = $ionicPopup.alert({
  //     title: 'Session lost',
  //     template: 'Sorry, You must log in again.'
  //   });
  // });

});

app.controller('ShopCtrl', function ($scope, $http) {

$scope.query = "";
var token = localStorage.getItem('token');
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

app.controller('DetailCtrl', function($scope, $state,  $http,  $stateParams, stripeService) {

 // console.log($stateParams);
  $scope.shop = [];
  $scope.items = [];
  var name = $stateParams.shop;
  $scope.shopname = name;
var token = localStorage.getItem('token');

$http({method: 'GET',
                   url:'/api/items',
                  // headers: {'X-API-EMAIL' : user.email, 'X-API-PASS' : user.password}})
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


app.controller('CheckoutCtrl', function($scope, stripeService, $stateParams, $http) {


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


      $scope.buy = function()
{
 var n = parseFloat($scope.item.price)+parseFloat($scope.item.shipping);
      var total= n.toFixed(2);

 
  stripeService.get($scope.item.image_url, $scope.item.item, total);
}

      $scope.back = function()
      {
        window.location.href = '/#/tab/shop/'+cat;
      }

});


app.controller('LoginController', function($scope, $state, $http, $ionicPopup, authService, currentUserService) {
  
  var user = localStorage.getItem('user');
  console.log(user);

  if(user !== null)
  {
    $state.go('tabs.dashboard');
  }

  $scope.login = function(user) {

    if ($scope.loginForm.$valid){
      console.log('valid');
      authService.login(user).success(function(){
        console.log('Login Success, Token: ', currentUserService.token);
        console.log('Sign-In', user);
        localStorage.setItem('user', user.email);
        localStorage.setItem('token', currentUserService.token);
        $state.go('tabs.dashboard');
      }).error(function(error)
      {
        console.log(error)
        var alertPopup = $ionicPopup.alert({
          title: 'Login Unsuccessful',
          template: "Email and password did not match Chatter's records."
        });
      });
    }
  }; //end of login function




  $scope.goToSignUp = function() {
    $state.go('signup');
  };

  $scope.goToLogin = function() {
    $state.go('login');
  };
});

app.controller('TabCtrl', function($scope, $state, $http) {

  console.log('tab');
  $scope.donateTab = true;



});


app.controller('NeedController', function($scope, Need){
  $scope.needs = Need.query();

  // var entries = Need.query(function() {
  //   console.log(entries);
  // });
});


app.controller('SettingsController', function($scope, $ionicActionSheet, $state, $http) {

  $scope.logout = function()
  {
      $ionicActionSheet.show({
     buttons: [
       { text: 'Logout' }
     ],
     titleText: 'Logout ? ',
     cancelText: 'Cancel',
     buttonClicked: function(index) {

      localStorage.removeItem('user');
      localStorage.removeItem('token');
      $state.go('login');  
       return true;
     }
   });
  }



});


//--Handles User Resources
app.controller('DonationController', function($scope, $stateParams, Donation){
  $scope.donations = Donation.query();
  $scope.donation = Donation.get({ id: $stateParams.id });

  $scope.viewDonation = function(id){
    $state.go('viewDonation({id:id})')
  }
  // var entries = Need.query(function() {
  //   console.log(entries);
  // });
});

app.controller('DonationCreateController', function($scope, $stateParams, $ionicModal, Donation) {
  $scope.donation = new Donation();  //create new donation instance. Properties will be set via ng-model on UI
  $scope.categories = [{ 'id': '1', 'name': 'Parking1' },{ 'id': '2', 'name': 'Parking2' }];
  $scope.addDonation = function() { //create a new donation. Issues a POST to /api/resources/new
    console.log('Inside add donation function in controller')
    $scope.donation.$save(function() {
      $state.go('donations'); // on success go back to home i.e. donations state.
    });
  }

  $ionicModal.fromTemplateUrl('templates/terms_and_conditions.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  })

  $scope.openModal = function() {
    $scope.modal.show()
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
});

app.controller('DonateController', function($scope, camera) {
  $scope.getPhoto = function(){
    Camera.getPicture().then(function(imageURI) {
      console.log(imageURI); //--TODO: Test and remove
      $scope.lastPhoto = imageURI;
    }, function(err) {
      console.err(err);
    }, {
      quality: 100,
      saveToPhotoAlbum: false
    });
  };
});
