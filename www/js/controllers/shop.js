'use strict'

app.controller('ShopCtrl', function ($scope, $http, CHATTER_API) {

  var token = localStorage.getItem('token');
  //var baseUrl = CHATTER_API.url + "/item_categories";
  //console.log(baseUrl);
  //console.log(token);


  $scope.icons = ICONS;

  var spinner = new Spinner().spin()
var target = document.getElementById('spinner');
target.appendChild(spinner.el);
    $http({method: 'GET',
                     url: CHATTER_API.url + "/item_categories",
                    //url:"api/item_categories",
                    // headers: {'X-API-EMAIL' : user.email, 'X-API-PASS' : user.password}})
                     headers: {'Authorization': token}})
        .success( function( data )
        {
          spinner.stop();
          $scope.categories = data;

        }
      ).error( function(error) {
        spinner.stop();
          console.log(error);
          alert('logout and login again');
        });
});
