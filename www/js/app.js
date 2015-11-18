
var app = angular.module('cc-donor-app', ['ionic',
                                          'ngResource',
                                          'ngIOS9UIWebViewPatch',
                                          'ion-autocomplete',
                                          'ngMessages',
                                          'ngCordova'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
              if(device.platform === "iOS") {
        window.plugin.notification.local.registerPermission();
    }

    cordova.plugins.backgroundMode.enable();

    console.log(cordova.plugins);  

    cordova.plugins.backgroundMode.onactivate = function() {
      console.log('on background');
    };

    cordova.plugins.backgroundMode.onfailure = function(errorCode) {
      console.log(errorCode);
    };

    });


});
