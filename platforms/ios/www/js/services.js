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
                   url: 'api/login',
                   headers: {'X-API-EMAIL' : user.email, 'X-API-PASS' : user.password}})
                   //headers: {'X-API-EMAIL' : "justinweathersby@gmail.com", 'X-API-PASS' : "test1234"}})
      .success( function( data )
      {
        // TODO:
        console.log('Return Data From Login Post to Api:', data)
        currentUserService.token = data.auth_token;
        currentUserService.id = data.id;
        currentUserService.role = 'admin';

        //--Set header for all subsequent requests
        $http.defaults.headers.common['Authorization'] = data.auth_token;

      }
      );
  }; //--End of login function
  this.logout = function(user){
    return  $http({method: 'POST', url: '/api/logout', headers: {'Authorization' : user.token}});
    //--End of return statement
  };// --End of logout function

});

//-- This service handles all calls to Items (vendor's) through the Chatter API
// app.service('vendorItemService', function($http, currentUserService){
//   this.getItems = function(){
//     return $http({method: 'GET', url: '/api/items'})
//     .success(function(data)
//   {
//
//   });
//   };
// });


app.service('stripeService',['$http',function ($http) {

var name = "";
var price = "";
var shopname = "";
               return{

                    get: function(image, name, price)
                    {
                      var q = document.getElementById('quantity-select').value;
                      console.log(q);
                    name  = name;
                    price = price;
                    shopname = shopname;
                    console.log(name);
                    var handler = StripeCheckout.configure({
                        // test key
                         key: 'pk_test_QTWZlzwsA6mjhPbwoYQNAnRa',
                        image: image,
                        token: function(token) {

            // make charge api call

//app.use('/charge/:token/:amount', api.charge);

                }
           
                }); // end of get function                    
                            handler.open({
                                  name: shopname,
                                  description: name,
                                  amount: (price * 100) * parseInt(q)
                                });
                    
                    } // end of function

}

}]);



app.service('needService', function($http){
  this.getNeeds = function(){
    return  $http({method: 'GET',
                   url: '/api/needs'})
      .success( function( data )
      {
        console.log('Return Data From Service get to Api:', data)
        success(data);
      })
      .error( function( data)
      {
      error(data);
      }); //--End of return statement
    }
});
