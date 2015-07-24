app.service('auth', function($http){
  this.login = function(user){
    return $http.post('/login', {
      headers: {'X-API-EMAIL' : user.email, 'X-API-PASS' : user.password }
      }
    );
  }
});
