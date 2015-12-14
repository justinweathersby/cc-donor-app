




app.controller('DeliveryListCtrl', function($scope, $ionicLoading, $http) {

var user = localStorage.getItem('user');
$ionicLoading.show({
     template: '<p style="font-family:Brandon;color:grey;">Loading orders</p><ion-spinner icon="dots"></ion-spinner>',
    hideOnStageChange: true
    });

$http.get(DELIVERY_API, {params: {customer: user}}).success( function (data) {

	if(data.length == 0)
	{
		console.log('done');
		$ionicLoading.hide();
	 window.plugins.toast.showShortBottom("You have no orders");
	}
	else
	{
		$ionicLoading.hide();
		$scope.deliveries = data;
	}

	$scope.go = function(item)
	{
		console.log(item);
	}

});




})

