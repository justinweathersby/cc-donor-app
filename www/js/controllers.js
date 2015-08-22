'use strict'

app.controller('AppController', function($state, $scope, $ionicHistory, $ionicPopup, authService) {

  // $scope.$on(AUTH_EVENTS.notAuthorized, function(event){
  //   var alertPopup = $ionicPopup.alert({
  //     title: 'Unathorized',
  //     template: 'You are not allowed to acces this resource.'
  //   });
  // });
  //
  // //--When not authorized event is broadcast..
  // $scope.$on(AUTH_EVENTS.notAuthenticated, function(event){
  //   authService.logout();
  //   $state.go('login');
  //   var alertPopup = $ionicPopup.alert({
  //     title: 'Session lost',
  //     template: 'Sorry, You must log in again.'
  //   });
  // });

});

app.controller('LoginController', function($scope, $state, $ionicPopup, authService, currentUserService) {
  $scope.login = function(user) {
    if ($scope.loginForm.$valid){
      authService.login(user).success(function(){
        console.log('Login Success, Token: ', currentUserService.token);
        console.log('Sign-In', user);
        $state.go('tabs.dashboard');
      }).error(function()
      {
        var alertPopup = $ionicPopup.alert({
          title: 'Login Unsuccessful',
          template: "Email and password did not match Chatter's records."
        });
      });
    }
  }; //end of login function

  $scope.goToSignUp = function() {
    $state.go('signup');
  };

  $scope.goToLogin = function() {
    $state.go('login');
  };
});

app.controller('NeedController', function($scope, Need){
  $scope.needs = Need.query();

  // var entries = Need.query(function() {
  //   console.log(entries);
  // });
});

//--Handles User API Resources
app.controller('DonationController', function($scope, $state, $stateParams, Donation){
  $scope.donations = Donation.query();
  $scope.donation = Donation.get({ id: $stateParams.id });

  $scope.viewDonation = function(id){
    $state.go('viewDonation({id:id})')
  }
});

app.controller('CreateDonationController', function($scope, $state, $stateParams, $ionicPopup, $ionicModal, donationCategoryService, Donation) {
  $scope.donation = new Donation();
  //--TODO: Can i put this in the factory?
  $scope.donation.location_attributes = {
    street: "",
    postal_code: "",
    city: "",
    state: ""
  };
  $scope.form_errors = {};

  $scope.addDonation = function() { //create a new donation. Issues a POST to /api/resources/new
    $scope.donation.$save()
      .then(function(resp) {
        var alertPopup = $ionicPopup.alert({
          title: 'Successfully Donated',
          template: "Your donation has been successfully uploaded to Creative Chatter. Check notifications for a match."
        });
        $state.go('viewDonation', {id :resp.id}); // on success go back to home i.e. donations state.
      })
      .catch(function(resp){
        //--TODO: REMOVE FROM TESTING
        console.log("REsponse: ", resp.data);
        angular.forEach(resp.data, function(value, key){
          console.log(value, ' : ', key);
          $scope.form_erros.push(key[0] + ': ' + value);
        });

        var alertPopup = $ionicPopup.alert({
          title: 'Failed to Donate',
          //template: $scope.form_errors[0]
          template: "Sorry something went wrong. If this problem continues please contact Creative Chatter at support@creativechatter.com"
        });
      });
  }


  //-- This method handles select field values for donation title (category)
  $scope.callbackMethod = function (query) {
    return donationCategoryService.getCategories();
  }

  //-- Method is called when an item is selected inside the category modal
  $scope.categorySelected = function (callback) {
    $scope.donation.title  = callback.item.name;
}

  $ionicModal.fromTemplateUrl('templates/terms_and_conditions.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  })

  $scope.openModal = function() {
    $scope.modal.show()
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
});
