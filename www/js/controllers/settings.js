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
      
      //alert('logged out '+localStorage.getItem('user'));

      $state.go('login');
       return true;
     }
   });
  }
});
