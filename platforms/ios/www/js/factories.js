app.factory('Need', function($resource) {
  return $resource('/api/needs/:id');
});

app.factory('Donation', function($resource) {
  return $resource('/api/resources/:id');
});
