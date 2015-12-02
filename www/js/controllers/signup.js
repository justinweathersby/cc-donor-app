

app.controller('SignController', function($scope,$state, $http, $stateParams,$ionicPopup, authService, CHATTER_API)
{

  $scope.createUser = function(user)
  {

  	console.log(user);
  	$http.post(CHATTER_API.url + "/users", {email: user.email, password: user.password})
  	.success( function (data) {
      console.log("Returned Success Data> ");
      console.log(JSON.stringify(data, null, 4));

      authService.login(user);
  		$state.go('tabs.dashboard');
  	})
    .error( function(error)
    {
      console.log(error);
    });

  };

});
