app.constant('AUTH_EVENTS', {
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
});

app.constant('USER_ROLES', {
    admin: 'admin_role',
    public: 'public',
    vendor: 'Vendor'
});

//-- Staging API Url
app.constant('CHATTER_API', {
    url:'http://staging.creativechatter.com/api'
});


// -- Local Testing API Url
// app.constant('CHATTER_API', {
//     url: 'api'
// });

ICONS = ["fa fa-heart-o", "ion-settings", 'ion-tshirt-outline', 'ion-ios-bookmarks-outline', 'ion-leaf'
, 'fa fa-diamond', 'fa fa-gift', 'fa fa-birthday-cake', 'fa fa-briefcase', 'fa fa-bicycle',
'ion-wand', 'fa fa-child'];
SOCKET_URL = "http://driver-53731.onmodulus.net/";
DELIVERY_API = "http://driver-53731.onmodulus.net/api/delivery";



