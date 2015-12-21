app.controller('SettingsController', function($scope, $ionicActionSheet, $state, $http) {

  // $scope.change = function(change)
  // {
  //   if(change)
  //   {
      
  //     // turn on background mode
  //     console.log('enabled');
  //  cordova.plugins.backgroundMode.enable();
  //   }
  //   else
  //   {
  //     // turn of background mode
  //     console.log('disabled'); 
  //   cordova.plugins.backgroundMode.disable();
  //    $scope.notif = {checked:false};
  //   }
  // }
  // $scope.notif = {checked:true};
  // if($scope.notif.checked = true)
  // {
  //   console.log('enabled by true')
  //  cordova.plugins.backgroundMode.enable();
  // }
  //  // console.log(cordova.plugins);

  //   cordova.plugins.backgroundMode.onactivate = function() {
  //     console.log('on background');
  //   };

  //   cordova.plugins.backgroundMode.onfailure = function(errorCode) {
  //     console.log(errorCode);
  //   };

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
    //cordova.plugins.backgroundMode.disable();

      $state.go('login');
       return true;
     }
   });
  }
});
