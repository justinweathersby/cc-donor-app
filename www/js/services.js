app.service('authService', function($http){
  this.login = function(user){
    return  $http({method: 'POST', url: '/api', headers: {'X-API-EMAIL' : user.email, 'X-API-PASS' : user.password}})
      .success( function( data )
      {
        success(data);
      })
      .error( function( data)
      {
      error(data);
      }); //--End of return statement
    }
});

app.service('needService', function($http){
  this.login = function(user){
    return  $http({method: 'POST', url: '/api', headers: {'X-API-EMAIL' : user.email, 'X-API-PASS' : user.password}})
      .success( function( data )
      {
        success(data);
      })
      .error( function( data)
      {
      error(data);
      }); //--End of return statement
    }
});
