'use strict'

app.controller('AppController', function($state, $scope, $ionicHistory, $ionicPopup, authService) {

  // $scope.$on(AUTH_EVENTS.notAuthorized, function(event){
  //   var alertPopup = $ionicPopup.alert({
  //     title: 'Unathorized',
  //     template: 'You are not allowed to acces this resource.'
  //   });
  // });
  //
  // //--When not authorized event is broadcast..
  // $scope.$on(AUTH_EVENTS.notAuthenticated, function(event){
  //   authService.logout();
  //   $state.go('login');
  //   var alertPopup = $ionicPopup.alert({
  //     title: 'Session lost',
  //     template: 'Sorry, You must log in again.'
  //   });
  // });

});

app.controller('DashController', function($scope) {
var user = localStorage.getItem('user');
var first = localStorage.getItem('first');

if(first == null)
{
setTimeout( function() {
window.plugins.toast.showShortTop('Welcome back '+user);
}, 1000);
localStorage.setItem('first', true);
}

var bounce = new Bounce();
bounce.scale({
  from: { x: 0.8, y: 0.8 },
  to: { x: 1, y: 1 }
});
var btn = document.getElementById('shop-button');

var numAnim = new CountUp("counter", 24.02,Math.floor((Math.random() * 10) + 1));
numAnim.start();

setTimeout( function() {
bounce.applyTo(btn);

}, 2000)


$scope.goDrive = function()
{
  var url = "https://www.creativechatter.com/";
    open(url, "_blank","location=yes");

}


});


