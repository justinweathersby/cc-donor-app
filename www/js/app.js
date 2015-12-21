
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
              if(device.platform === "iOS") {
        window.plugin.notification.local.registerPermission();
    }

    });


});
