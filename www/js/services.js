app.service('authService', function($http, currentUserService){
  this.login = function(user){
    return  $http({method: 'POST', url: '/api/login', headers: {'X-API-EMAIL' : user.email, 'X-API-PASS' : user.password}})
      .success( function( data )
      {
        currentUserService.token = data.auth_token;
        currentUserService.id = data.id;
      });
    }; //--End of login function
  this.logout = function(user){
    return  $http({method: 'POST', url: '/api/logout', headers: {'Authorization' : user.token}});
    //--End of return statement
  };// --End of logout function
});

app.service('currentUserService', function(){
  this.id = null;
  this.token = null;
});

// app.service('needService', function($http){
//   this.getNeeds = function(user){
//     return  $http({method: 'POST', url: '/api', headers: {'X-API-EMAIL' : user.email, 'X-API-PASS' : user.password}})
//       .success( function( data )
//       {
//         success(data);
//       })
//       .error( function( data)
//       {
//       error(data);
//       }); //--End of return statement
//     }
// });
