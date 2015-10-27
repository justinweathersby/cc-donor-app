'use strict'

app.controller('LoginController', function($scope, $state, $ionicPopup, authService, currentUserService) {
  var user = localStorage.getItem('user');
  console.log(user);

  if(user !== null)
  {
    $state.go('tabs.dashboard');
  }

  $scope.login = function(user) {
      var spinner = new Spinner().spin()
var target = document.getElementById('spinner');
target.appendChild(spinner.el);
    if ($scope.loginForm.$valid){
      authService.login(user).success(function(){
        spinner.stop();
        console.log('Login Success, Token: ', currentUserService.token);
        console.log('Sign-In', user);
        localStorage.setItem('user', user.email);
        localStorage.setItem('token', currentUserService.token);
        localStorage.setItem('id', currentUserService.id);
        $state.go('tabs.dashboard');
      }).error(function()
      {
        spinner.stop();
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
