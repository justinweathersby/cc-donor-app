//-- This service contains user information for authorization and authentication needs
app.service('currentUserService', function(){
  this.id = null;
  this.token = null;
  this.role = null;
});

//-- This service handles all authentication between app and Chatter API
app.service('authService', function($http, currentUserService, CHATTER_API){

  this.login = function(user){
    return  $http({method: 'POST',
                   url: CHATTER_API.url + '/login',
                   headers: {'X-API-EMAIL' : user.email, 'X-API-PASS' : user.password}})
      .success( function( data )
      {
        // TODO:
        console.log('Return Data From Login Post to Api:', data)
        currentUserService.token = data.auth_token;
        currentUserService.id = data.id;
        currentUserService.role = 'admin';

        //--Set header for all subsequent requests
        $http.defaults.headers.common['Authorization'] = data.auth_token;

      });
  }; //--End of login function
  this.logout = function(user){
    return  $http({method: 'POST', url: CHATTER_API.url + '/logout', headers: {'Authorization' : user.token}});
    //--End of return statement
  };// --End of logout function

});

app.service('donationCategoryService', function($http){
  this.getCategories = function(){
    return $http({method: 'GET',
                  url: CHATTER_API.url + '/categories'})
      .success(function(data)
      {
        console.log('Donation Categories data from api: ', data);
      })
      .error(function(data)
      {
        error(data);
      });
    }
});
