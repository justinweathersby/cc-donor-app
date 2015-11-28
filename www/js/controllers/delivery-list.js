




app.controller('DeliveryListCtrl', function($scope, $http) {

var user = localStorage.getItem('user');

$http.get(DELIVERY_API, {params: {customer: user}}).success( function (data) {

	if(data.length == 0)
	{
	 window.plugins.toast.showShortBottom("You have no orders");

	}
	else
	{
		$scope.deliveries = data;
	}

	$scope.go = function(item)
	{
		console.log(item);
	}

});




})
