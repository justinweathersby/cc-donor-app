'use strict'

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
