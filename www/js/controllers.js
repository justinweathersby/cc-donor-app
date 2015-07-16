
app.controller('AppController', function() {});
app.controller('LoginController', function() {});

app.controller('DonateController', function($scope, camera) {
  $scope.getPhoto = function(){
    Camera.getPicture().then(function(imageURI) {
      console.log(imageURI); //--TODO: Test and remove
      $scope.lastPhoto = imageURI;
    }, function(err) {
      console.err(err);
    }, {
      quality: 100,
      saveToPhotoAlbum: false
    });
  };
});
