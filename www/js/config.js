
app.config(function($stateProvider, $urlRouterProvider) {
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
    .state('terms-and-conditions', {
      url: '/terms_and_conditions',
      templateUrl: 'templates/terms_and_conditions.html'
    })
    
    .state('donations', {
      url: '/donations',
      templateUrl: 'templates/donations/donations.html',
      controller: 'DonationController'
    })

    .state('viewDonation', {
      url: '/donations/:id/view',
      templateUrl: 'templates/donations/donation-view.html',
      controller: 'DonationController'
    })

    //--Routes for tabs
    .state('tabs', {
      url: '/tab', //-- actual address
      abstract: true, //--never actualy going to navagate away from this template
      templateUrl: 'templates/tabs.html'

    })
    .state('tabs.dashboard', { //--child template of tabs
      url: '/dashboard',
      views: {
        'dashboard-tab' : { //--name of view
        templateUrl: 'templates/dashboard.html'
        //controller: 'DashboardController'
        }
      }
    })
    .state('tabs.donate', { //--child template of tabs
      url: '/donate',
      views: {
        'donate-tab' : { //--name of view
        templateUrl: 'templates/donate.html'
        //controller: 'DonateController'
        }
      }
    })
    .state('tabs.shop', { //--child template of tabs
      url: '/shop',
      views: {
        'shop-tab' : { //--name of view
        templateUrl: 'templates/shop.html'
        //controller: 'DashboardController'
        }
      }
    })
    .state('tabs.settings', { //--child template of tabs
      url: '/settings',
      views: {
        'settings-tab' : { //--name of view
        templateUrl: 'templates/settings.html'
        //controller: 'DashboardController'
        }
      }
    })


    $urlRouterProvider.otherwise('/login'); //--default go to page
});
