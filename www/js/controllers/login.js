'use strict'

app.controller('LoginController', function($scope, $state, $ionicPopup, authService, currentUserService) {
  var user = localStorage.getItem('user');
  console.log(user);

  if(user !== null)
  {
    $state.go('tabs.dashboard');
  }

  $scope.login = function(user) {
    if ($scope.loginForm.$valid){
      authService.login(user).success(function(){
        console.log('Login Success, Token: ', currentUserService.token);
        console.log('Sign-In', user);
        localStorage.setItem('user', user.email);
        localStorage.setItem('token', currentUserService.token);
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
