'use strict'

app.controller('DashboardController', function($scope, $state, currentUserService) {

  $scope.goToDonations = function() {
    console.log("Donations page");
    $state.go('tabs.donations');
  };

});
