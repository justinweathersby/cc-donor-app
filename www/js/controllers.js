'use strict'

app.controller('AppController', function($scope, $ionicHistory) {});
app.controller('LoginController', function() {});

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

app.controller('loginController', function($scope, auth, $state) {
  $scope.user = {};
  $scope.login = function(user) {
    if ($scope.loginForm.$valid){
      console.log($scope.user);
      auth.login($scope.user);
    }
    console.log('Sign-In', user);
    $state.go('tabs.dashboard');
  };

  $scope.goToSignUp = function() {
    $state.go('signup');
  };

  $scope.goToLogin = function() {
    $state.go('login');
  };
});
