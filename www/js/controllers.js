'use strict'

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


    $http.get('shops.json').success(function (data) {


        $scope.shops = data;
    });

    $scope.query = "";

    $scope.like = function(shop)
    {
      console.log(shop);
    }
        $scope.comment = function(shop)
    {
      console.log(shop);
    }
        $scope.share = function(shop)
    {
      console.log(shop);
    }


});

app.controller('DetailCtrl', function($scope, $state,  $http,  $stateParams, stripeService) {

  //console.log($stateParams);
  $scope.shop = [];
  $scope.items = [];
  var name = $stateParams.shop;
  $scope.shopname = name;

  $http.get('shops.json')
  .success( function(data) {

for(var i = 0; i < data.length ; i++)
{
    
    if(name == data[i].title)
    {
      $scope.shop.push(data[i]);
    }
    
}

$scope.items = $scope.shop[0].items;

  }); 

$scope.buy = function(item)
{
  console.log(item);
  stripeService.get(name, item.image, item.name, item.price);
}

$scope.back = function()
{
  console.log('back');
  $state.go('tabs.shop');
}


});


app.controller('LoginController', function($scope, $state, $http, $ionicPopup, authService, currentUserService) {
  

  $scope.customer = function()
  {
    var e = document.getElementById('customer');
    e.style.color = 'white';
    e.style.backgroundColor = '#2979FF';

    var s = document.getElementById('shop');
    s.style.color = 'black';
    s.style.backgroundColor = 'transparent';

    localStorage.setItem('type',"customer");
  }

  $scope.shop = function()
  {
    var e = document.getElementById('shop');
    e.style.color = 'white';
    e.style.backgroundColor = '#2979FF';

    var c = document.getElementById('customer');
    c.style.color = 'black';
    c.style.backgroundColor = 'transparent';

    localStorage.setItem('type',"vendor");
  }

  $scope.login = function(user) {
    console.log(localStorage.getItem('type'));
    $state.go('tabs.shop');

    // if ($scope.loginForm.$valid){
    //   authService.login(user).success(function(){
    //     console.log('Login Success, Token: ', currentUserService.token);
    //     console.log('Sign-In', user);
    //     $state.go('tabs.dashboard');
    //   }).error(function()
    //   {
    //     var alertPopup = $ionicPopup.alert({
    //       title: 'Login Unsuccessful',
    //       template: "Email and password did not match Chatter's records."
    //     });
    //   });
    // }
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


app.controller('SettingsController', function($scope, $state, $http) {

  $scope.logout = function()
  {
    $state.go('login');
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
