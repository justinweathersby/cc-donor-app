
app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html'
    })
    .state('signup',{
      url: '/signup',
      templateUrl: 'templates/signup.html'
    })
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
        //controller: 'DashboardController'
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
    .state('tabs.terms_and_conditions', {
      url: '/terms_and_conditions',
      views: {
        'terms-and-conditions-tab' : {
        templateUrl: '/terms_and_conditions'
        }
      }
    })
    
    $urlRouterProvider.otherwise('/tab/dashboard'); //--default go to page
});
