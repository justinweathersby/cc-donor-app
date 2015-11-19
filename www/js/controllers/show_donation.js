'use strict'

app.controller('ShowDonationController', function($scope, $state, $stateParams, $ionicPopup, Donation, CHATTER_API, $http){

  var token = localStorage.getItem('token');
  var id = $stateParams.id;
  // var spinner = new Spinner().spin()
  // var target = document.getElementById('spinner');
  // target.appendChild(spinner.el);
  $scope.back = function()
  {
    $state.go('donations');
  }

  $http({method: 'GET',
                   url: CHATTER_API.url + "/resources/" + id,
                   headers: {'Authorization': token}})
    .success( function( data )
    {
      // spinner.stop();
      $scope.donation = data;
      console.log('image url: ', $scope.donation.image_url);
    }
    ).error( function(error) {
      // spinner.stop();
        console.log(error);
    }
  );
  $scope.destroy = function(){
    if($scope.donation.workflow_state == "open"){
      var confirmPopup = $ionicPopup.confirm({
          title: 'Remove Donation',
          template: 'Are you sure you want to remove this donation?'
      });
      confirmPopup.then(function(res) {
        if(res) {
          $http.delete(CHATTER_API.url + "/resources/" + $scope.donation.id,
                           {headers: {'Authorization': token}})
              .success( function( data )
              {
                var alertPopup = $ionicPopup.alert({
                  title: 'Success',
                  template: "Your donation has been removed from Creative Chatter."
                });
                $state.go('tabs.dashboard'); // on success go back to home i.e. donations state.

              }
            ).error( function(error) {
                console.log(error);
            });
      } else {
          console.log('Dont delete');
      }
      });

    }
  };//--End destroy function
});
