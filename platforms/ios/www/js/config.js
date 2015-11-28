
app.config(function($stateProvider, $urlRouterProvider, $compileProvider, $ionicConfigProvider) {

   $ionicConfigProvider.tabs.position('bottom'); // other values: top

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginController'
    })
    .state('signup',{
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'LoginController'
    })

    // --- Terms and Co for making a donation
    .state('terms-and-conditions', {
      url: '/terms_and_conditions',
      templateUrl: 'templates/terms_and_conditions.html'
    })

    // --- Page listing all the users donations
    .state('donations', {
      cache: false,
      url: '/donations',
      templateUrl: 'templates/donations/donations.html',
      controller: 'ViewDonationController'
    })

    // --- Page displaying just 1 of the users donations
    .state('showDonation', {
      cache: false,
      url: '/donations/:id',
      templateUrl: 'templates/donations/donation-show.html',
      controller: 'ShowDonationController'
    })

    //--Routes for tabs
    .state('tabs', {
      url: '/tab', //-- actual address
      abstract: true, //--never actualy going to navagate away from this template
      templateUrl: 'templates/tabs.html',
      controller: 'TabCtrl'
    })
    .state('tabs.dashboard', { //--child template of tabs
      url: '/dashboard',
      views: {
        'dashboard-tab' : { //--name of view
        templateUrl: 'templates/dashboard.html',
        controller: 'DashController'
        }
      }
    })

     .state('tabs.delivery', { //--child template of tabs
      url: '/delivery/:status/:id',
      views: {
        'dashboard-tab' : { //--name of view
        templateUrl: 'templates/delivery.html',
        controller: 'DeliveryCtrl'
        }
      }
    })

.state('tabs.delivery-list', { //--child template of tabs
      url: '/delivery-list',
      views: {
        'dashboard-tab' : { //--name of view
        templateUrl: 'templates/delivery-list.html',
        controller: 'DeliveryListCtrl'
        }
      }
    })

    .state('tabs.donate', { //--child template of tabs
      url: '/donations/new',
      cache: false,
      views: {
        'donate-tab' : {
        templateUrl: 'templates/donations/donation-new.html',
        controller: 'CreateDonationController'
        }
      }
    })
    .state('tabs.shop', {
      url: '/shop',
      views: {
        'shop-tab' : { //--name of view
        templateUrl: 'templates/shop.html',
        controller: 'ShopCtrl'
        }
      }
    })

     .state('map', {
      url: '/map',
        templateUrl: 'templates/map.html',
        controller: 'MapCtrl'
    })

      .state('tabs.shopDetail', { //--child template of tabs
      url: '/shop/:shop/:id',
      views: {
        'shop-tab' : { //--name of view
        templateUrl: 'templates/shop-detail.html',
        controller: 'DetailCtrl'
        }
      }
    })
        // <!-- url: '/checkout/:item/:price/:shipping/:vendor/:lat/:lng', -->
      .state('tabs.checkout', { //--child template of tabs
      url: '/checkout/',
      views: {
        'shop-tab' : { //--name of view
        templateUrl: 'templates/checkout.html',
        controller: 'CheckoutCtrl'
        }
      }
    })
    .state('tabs.settings', {
      url: '/settings',
      views: {
        'settings-tab' : { //--name of view
        templateUrl: 'templates/settings.html',
        controller: 'SettingsController'
        }
      }
    })

    $urlRouterProvider.otherwise('/login'); //--default go to page

    //--Cordova white list plugin
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
});
