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
