'use strict'

app.controller('CreateUserController', function($scope,
                                                $state, $stateParams,
                                                $ionicPopup,
                                                User, authService, currentUserService)
{
  $scope.user = new User();
  //--TODO: Can i put this in the Donation factory?
  $scope.user.location_attributes = {
    street: "",
    postal_code: "",
    city: "",
    state: ""
  };

  $scope.createNewUser = function(){
    $scope.user.$save()
      .then(function(data){
        //--Success Handler
        var alertPopup = $ionicPopup.alert({
          title: 'Success',
          template: "Thank you for signing up with Creative Chatter. Happy Donating!"
        });

        //authService.login($scope.user);
        console.log('User has been saved... trying to Sign-In', $scope.user);
        $state.go('login');
        //$state.go('tabs.dashboard');
    }).catch(function(error) {
      console.log("Error Response: ", error.data)
      var alertPopup = $ionicPopup.alert({
        title: 'Failed',
        template: "Sorry something went wrong. If this problem continues please contact Creative Chatter at support@creativechatter.com"
      });
    });
  }; //-- End createNewUser function
}); //-- End CreateUserController
