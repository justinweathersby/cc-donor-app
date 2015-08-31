
var app = angular.module('cc-donor-app', ['ionic',
                                          'ngResource',
                                          'ion-autocomplete',
                                          'ion-google-place',
                                          'ngCordova'])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
            // Stuff in here
    });
});
