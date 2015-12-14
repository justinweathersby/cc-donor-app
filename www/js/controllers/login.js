'use strict'

app.controller('LoginController', function($http,$ionicLoading,  $scope, $state, $ionicPopup, authService, currentUserService) {
  var user = localStorage.getItem('user');
  console.log(user);


  // $http.get(DELIVERY_API).success( function (data) {
  //  for(var i = 0; i < data.length; i++)
  //  { 
  //   $http.delete(DELIVERY_API+"/"+data[i]._id).success( function(data) {
  //     console.log('done');
  //   })
  // }
  // })

  if(user !== null)
  {
    $state.go('tabs.dashboard');
  }

  $scope.login = function(user) {

    $ionicLoading.show({
     template: '<p style="font-family:Brandon;color:grey;">Logging in</p><ion-spinner icon="dots"></ion-spinner>',
    hideOnStageChange: true
    });

    if ($scope.loginForm.$valid){
      authService.login(user).success(function(){
        $ionicLoading.hide();
        console.log('Login Success, Token: ', currentUserService.token);
        console.log('Sign-In', user);
        localStorage.setItem('user', user.email);
        //alert(user.email);
        //alert(localStorage.getItem('user'));
        localStorage.setItem('token', currentUserService.token);
        localStorage.setItem('id', currentUserService.id);
        window.location.reload();
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
