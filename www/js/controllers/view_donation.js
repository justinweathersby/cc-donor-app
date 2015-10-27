'use strict'

//--Handles User Resources
app.controller('ViewDonationController', function($scope, $state, $stateParams, $http, currentUserService, CHATTER_API){
  var token = localStorage.getItem('token');
  var id = localStorage.getItem('id');
  var spinner = new Spinner().spin()
  var target = document.getElementById('spinner');
  target.appendChild(spinner.el);
  // $scope.getDonations();
  // $scope.viewDonation = function(id){
  //   $state.go('showDonation({id:id})')
  // }
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
          spinner.stop();
          $scope.donations = data;

        }
      ).error( function(error) {
        spinner.stop();
        console.log(error);
      });
  };
});
