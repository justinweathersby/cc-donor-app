app.factory('Need', function($resource) {
  return $resource('/api/needs/:id');
});

app.factory('Donation', function($resource) {
  return $resource('http://staging.creativechatter.com/api/resources/:id');
});
