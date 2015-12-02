

app.controller('SignController', function($scope,
                                                $state, $stateParams,
                                                $ionicPopup)
{

  $scope.createUser = function(user)
  { //create a new user. Issues a POST to /api/users
    $scope.user.$save()
      .then(function(resp) {
        var alertPopup = $ionicPopup.alert({
          title: 'Success',
          template: "Thank you for signing up with Creative Chatter. Happy Donating!"
        });
        $state.go('login'); // on success go to dashboard.
      })
      .catch(function(resp){
        console.log("Error Response: ", resp.data)
        var alertPopup = $ionicPopup.alert({
          title: 'Failed',
          // template: "Sorry something went wrong. If this problem continues please contact Creative Chatter at support@creativechatter.com"
        });
      });
  };

});