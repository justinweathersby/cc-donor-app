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

app.controller('LoginController', function($scope, $state, $ionicPopup, authService, currentUserService) {
  $scope.login = function(user) {
    if ($scope.loginForm.$valid){
      authService.login(user).success(function(){
        console.log('Login Success, Token: ', currentUserService.token);
        console.log('Sign-In', user);
        $state.go('tabs.dashboard');
      }).error(function()
      {
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

app.controller('NeedController', function($scope, Need){
  $scope.needs = Need.query();

  // var entries = Need.query(function() {
  //   console.log(entries);
  // });
});

//--Handles User Resources
app.controller('DonationController', function($scope, $stateParams, Donation){
  $scope.donations = Donation.query();
  $scope.donation = Donation.query({ id: $stateParams.id });

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
