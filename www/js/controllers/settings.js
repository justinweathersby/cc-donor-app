app.controller('SettingsController', function($scope, $ionicActionSheet, $state, $http) {

  $scope.logout = function()
  {
     $ionicActionSheet.show({
     buttons: [
       { text: 'Logout' }
     ],
     titleText: 'Logout ? '+localStorage.getItem('user'),
     cancelText: 'Cancel',
     buttonClicked: function(index) {

      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('first');
      

      $state.go('login');
       return true;
     }
   });
  }
});
