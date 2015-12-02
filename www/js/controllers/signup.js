

app.controller('SignController', function($scope,$state, $http, $stateParams,$ionicPopup, CHATTER_API)
{

  $scope.createUser = function(user)
  { 

  	console.log(user);
  	$http.post(CHATTER_API.url + "/users", {email: user.email, password: user.password})
  	.success( function (data) {
  		console.log(data);
  		$http.defaults.headers.common['Authorization'] = data.auth_token;
  		 localStorage.setItem('user', user.email);
        localStorage.setItem('token', data.auth_token);
  		$state.go('tabs.dashboard');
  	})
  
  };

});