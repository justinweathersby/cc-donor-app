
var app = angular.module('cc-donor-app', ['ionic',
                                          'ngDropdowns',
                                          'ngResource',
                                          'ion-google-place',
                                          'ngIOS9UIWebViewPatch',
                                          'ion-autocomplete',
                                          'ngMessages',
                                          'ngCordova'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      TestFairy.begin('993218db594324f249e28bfa5a72f74f0d21732d');
              if(device.platform === "iOS") {
        window.plugin.notification.local.registerPermission();
    }

    });


});
