app.factory('Need', function($resource) {
  return $resource('/api/needs/:id');
});

app.factory('Donation', function($resource) {
  return $resource('/api/resources/:id');
});

app.factory('Camera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();
      console.log("get Picture function")
      navigator.camera.getPicture(function(result) {
        console.log("Camera Magic")
        q.resolve(result);
      }, function(err) {
        q.reject(err);
        console.log("Error")
      }, options);

      return q.promise;
    }
  }
}]);
