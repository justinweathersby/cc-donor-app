

app.controller('VendorCtrl', function ($scope,$ionicLoading,  $http) {



console.log(localStorage['user']);
var user = localStorage.getItem('user');
$ionicLoading.show({
     template: '<p style="font-family:Brandon;color:grey;">Loading orders</p><ion-spinner icon="dots"></ion-spinner>',
    hideOnStageChange: true
    });

$http.get(DELIVERY_API, {params: {vendor: user}}).success( function (data) {

	if(data.length == 0)
	{
		console.log('done');
		$ionicLoading.hide();
	 window.plugins.toast.showShortBottom("You have no orders");
	}
	else
	{
		$ionicLoading.hide();
		$scope.orders = data;
		console.log(data);
	}

	$scope.go = function(item)
	{
		console.log(item);
	}

}).error( function(err) {
	alert(err);
	$ionicLoading.hide();
});




});