'use strict'

app.controller('TabCtrl', function($scope, $state, $http) {
    console.log('tab');
    $scope.donateTab = true;

    var customer = localStorage.getItem('user');
    console.log(customer);
    // listen on the socket
    var socket = io.connect(SOCKET_URL);
   // var socket = io.connect('http://localhost:8080');

var addMessage = function(message)
{
    console.log('set');
    var alarmTime = new Date();
alarmTime.setSeconds(alarmTime.getSeconds() + 1);
    cordova.plugins.notification.local.schedule({
    id: 1,  
    title: "",
    text: message,
    at: alarmTime
 });

}

// fired when item is picked up set local notification
socket.on('canceled', function(data) {
 // console.log('local user '+customer);
  //  console.log('server user '+data.customer);
    	if(data.customer == customer)
    	{
		addMessage("Your delivery has been canceled please wait for another driver");
        window.plugins.toast.showLongCenter("Your delivery has been canceled please wait for another driver");
       
		}
    });

// fired when item is picked up set local notification
socket.on('pickedup', function(data) {
 //   alert('local user '+customer);
  //  alert('server user '+data.customer);
    	if(data.customer == customer)
    	{
		addMessage("Your order is on the way");
        window.plugins.toast.showLongCenter("Your order is on the way");

		}
    });

// fired when user has item delivered set local notification
//trigger review of delivery
    socket.on('delivered', function(data) {

    if(data.customer == customer)
    {
       addMessage("Your order has been delivered");
window.plugins.toast.showLongCenter("Your order has been delivered");
 
   }
    });

    // fired when the user logs
    var connectData = {
        user: customer,
        date: new Date().toString()
    };
    socket.emit('connected', connectData)


});