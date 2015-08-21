app.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
});

app.constant('USER_ROLES', {
  admin : 'admin_role',
  public: 'public',
  vendor: 'Vendor'
});

// app.constant('CHATTER_API', {
//     url:'http://staging.creativechatter.com/api'
// });

app.constant('CHATTER_API', {
    // url:'http://staging.creativechatter.com/api'
    url: '/api'
});
