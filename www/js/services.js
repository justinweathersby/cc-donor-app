//-- This service contains user information for authorization and authentication needs
app.service('currentUserService', function(){
  this.id = null;
  this.token = null;
  this.role = null;
});

//-- This service handles all authentication between app and Chatter API
app.service('authService', function($http, currentUserService, CHATTER_API){
  this.login = function(user){
    var spinner = new Spinner().spin()
    var target = document.getElementById('spinner');
    target.appendChild(spinner.el);
    return  $http({method: 'POST',
                   url: CHATTER_API.url + '/login',
                   headers: {'X-API-EMAIL' : user.email, 'X-API-PASS' : user.password}})
                //   headers: {'X-API-EMAIL' : "justinweathersby@gmail.com", 'X-API-PASS' : "test1234"}})
      .success( function( data )
      {
        // TODO:
        spinner.stop();
        console.log('Return Data From Login Post to Api:', data)
        currentUserService.token = data.auth_token;
        currentUserService.id = data.id;
        currentUserService.role = 'admin';

        //--Set header for all subsequent requests
        $http.defaults.headers.common['Authorization'] = data.auth_token;

      }
    )
    .error( function(error)
    {
      console.log(error);
      spinner.stop();
    });
  }; //--End of login function

  this.logout = function(user){
    return  $http({method: 'POST', url: CHATTER_API.url + '/logout', headers: {'Authorization' : user.token}});
  };// --End of logout function
});



app.service('donationCategoryService', function($http, CHATTER_API){
  var token = localStorage.getItem('token');
  this.getCategories = function(q){
    // console.log('Inside getCategories function...')
    // console.log(q)
    return $http({method: 'GET',
                  url: CHATTER_API.url + '/categories?query=' + q,
                  headers: {'Authorization':  token}})
      .success(function(data){
        console.log("CategoriesService: ", data)
        }
      ).error( function(error) {
        console.log("CategoriesServiceError: ", error);
      });
    }
});



app.service('stripeService',['$http', '$state',function ($http, $state, CHATTER_API) {
var baseUrl = "http://staging.creativechatter.com";
var name = "";
var price = "";
var shopname = "";
               return{

                    get: function(image, name, price)
                    {
                      var q = document.getElementById('quantity-select').value;
                    console.log(localStorage.getItem('token'));
                    name  = name;
                    price = price;
                    shopname = shopname;
                    console.log(name);
                    var handler = StripeCheckout.configure({
                        // test key
                         key: 'pk_test_tslqI9coii8qKhuEkZI4ZlV6',
                        image: image,
                        token: function(token) {
                        var access_token = localStorage.getItem('token');

                        console.log(token.id);
      // make charge api call
    //  var url = CHATTER_API.url + "/stripe_charge?stripeToken="+token.id+"&stripeAmount="+price+"&stripeVendor=acct_16rxjaFvAbwux3pz&stripeAppFee=21"
  var url = 'http://staging.creativechatter.com/api' + "/stripe_charge?stripeToken="+token.id+"&stripeAmount="+price+"&stripeVendor=acct_16rxjaFvAbwux3pz&stripeAppFee=21"

      $http({method: 'POST',
             url: url,
            //  data: {
            //             stripeToken: token.id,
            //             stripeVendor: shopname,
            //             itemId: name,
            //             quantity: quantity
            //         },
             headers: {'Authorization': access_token}})
      .success( function( data )
      {

        $state.go('tabs.map');

      }
      ).error( function(error) {
        console.log(error);
      });

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



// app.service('needService', function($http, CHATTER_API){
//   this.getNeeds = function(){
//     return  $http({method: 'GET',
//                    url: CHATTER_API + '/needs'})
//       .success( function( data )
//       {
//         console.log('Donation Categories data from api: ', data);
//       })
//       .error(function(data)
//       {
//         console.log('Error:', data)
//         error(data);
//       });
//     }
// });

app.service('s3SigningService', function($http, CHATTER_API){
  this.getSignature = function(fileName){
    console.log('Contacting s3 signing service from api...')
    return $http({method: 'GET',
                  url: CHATTER_API.url + '/s3_access_signature',
                  headers: {'X-API-FILENAME' : fileName}})
    .success(function(data)
    {
      console.log('Successfully got s3 Signature from API', data)
    })
    .error(function(data)
    {
      console.log('Failure to get s3 Signature from API')
      error(data);
    });
  }
});
