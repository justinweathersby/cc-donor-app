
var app = angular.module('cc-donor-app', ['ionic'])
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Stuff in here
        });
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'templates/login.html',
                controller: 'LoginController'
            })
            .state('donate', {
                url: '/donate',
                templateUrl: 'templates/users.html',
                controller: 'UserController'
            })
            .state('settings', {
                url: "/settings",
                templateUrl: "templates/user.html",
                controller: "UserController"
            });
        $urlRouterProvider.otherwise('/users');
    });
