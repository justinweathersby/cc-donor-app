'use strict'

//--Handles User Resources
app.controller('ViewDonationController', function($scope, $state, $stateParams,
                                                  $http, $ionicLoading,
                                                  currentUserService, CHATTER_API){
  var token = localStorage.getItem('token');
  var id = localStorage.getItem('id');

  $ionicLoading.show({
    template: '<p>Loading...</p><ion-spinner></ion-spinner>'
  });
  $scope.back = function()
  {
    $state.go('tabs.dashboard');
  }
  $scope.getDonations = function(){


    $http({method: 'GET',
                     url: CHATTER_API.url + "/resources/?user_id=" + id,
                     headers: {'Authorization': token}})
        .success( function( data )
        {
          $scope.donations = data;
          $ionicLoading.hide();
          if($scope.donations.length == 0)
            {
               window.plugins.toast.showShortCenter("no donations found");
            }
        }
      ).error( function(error) {
        $ionicLoading.hide();
        window.plugins.toast.showShortCenter("Error Try To Logout and Log Back In...Sorry");
        console.log(error);
      });
  };
});
