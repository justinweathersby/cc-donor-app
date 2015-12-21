'use strict'

app.controller('CheckoutCtrl', function($scope, $ionicLoading, $state, $ionicModal, stripeService, $http) {
    Stripe.setPublishableKey('pk_test_tslqI9coii8qKhuEkZI4ZlV6');
    var item = JSON.parse(localStorage["item"]);
    console.log(item);
    $scope.sizes = [];
    $scope.count = [];
    $scope.item = item;
    if(item.item_category.name == 'Clothing')
    {
        var optionString = "Size";    
    }
    else
    {
        var optionString = "Color";
    }
    var hasOptions = true;
    if (item.options.length == 0) {
        console.log('no options');
        hasOptions = false;
        $scope.showOptions = true;
        for (var i = 1; i < item.quantity + 1; i++) {
            $scope.count.push({
                id: item.id,
                text: i,
                count: item.quantity_remaining
            });
        }
    } else {
        $scope.showNoOptions = true;
    }

    for (var i = 0; i < item.options.length; i++) {
        //console.log(item.options[0]);
        $scope.sizes.push({
            id: item.options[i].id,
            text: item.options[i].name,
            count: item.options[i].quantity_remaining
        });
    }
    $scope.orginalPrice = parseFloat(item.price) + parseFloat(item.shipping);
    $scope.totalPrice = $scope.orginalPrice.toFixed(2);

    // function show() {

    //      console.log('ready');
    //      document.getElementById('card-form').addEventListener('input', function(e) {
    //          e.target.value = e.target.value.replace(/[^\d0-9]/g, '').replace(/(.{4})/g, '$1 ').trim();
    //      });
    //      document.getElementById('card-exp').addEventListener('input', function(e) {
    //          e.target.value = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{2})/g, '$1 ').trim();
    //      });

    //  }
    $scope.size = {
        name: {
            text: optionString
        }
    };
    $scope.quantity = {
        name: {
            text: "Quantity"
        }
    };
    $scope.get = function(item) {
        $scope.count = [];
        //console.log(item);
        $scope.quantity = {
            name: {
                text: "Quantity"
            }
        };
        for (var i = 1; i < item.count + 1; i++) {
            $scope.count.push({
                text: i
            });
        }
    }
    $scope.add = function(item) {

        var total = parseFloat($scope.orginalPrice) * parseFloat(item.text);
        $scope.totalPrice = total.toFixed(2);
        console.log($scope.size.name.id);
        console.log($scope.quantity.name.text);
    }

    function stripeResponseHandler(status, response, token) {

        if (status == 200) {
            console.log(response);
            var access_token = localStorage.getItem('token');
            var base = 'http://staging.creativechatter.com/api/stripe_charge?stripeToken=';
            if (hasOptions) {
                var url = base + response.id + "&stripeAmount=" + $scope.totalPrice + "&stripeVendor=acct_16rxjaFvAbwux3pz&stripeAppFee=21&option_id=" + $scope.size.name.id + "&quantity=" + $scope.quantity.name.text;
            } else {
                var url = base + response.id + "&stripeAmount=" + $scope.totalPrice + "&stripeVendor=acct_16rxjaFvAbwux3pz&stripeAppFee=21&item_id=" + $scope.item.id + "&quantity=" + $scope.quantity.name.text;
            }
            console.log(url);
            $http({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Authorization': access_token
                    }
                })
                .success(function(data) {
                    $ionicLoading.hide();
                    $scope.modal.hide();
                    $state.go('map');
                }).error(function(error) {
                    $scope.modal.hide();

                    sweetAlert("sorry .. ", "your card was declined", "error");
                    $ionicLoading.hide();
                });
        } else {
            $ionicLoading.hide();
            swal({
                title: "sorry",
                text: response.error.message,
                timer: 2000,
                showConfirmButton: false
            });
        }
    }

    $scope.checkout = function() {
        var sizeText = $scope.size.name.text;
        var sizeID = $scope.size.name.id;
        var count = $scope.quantity.name.text;
        console.log(sizeText);
        console.log(count);
        console.log(sizeID);
        if (count == '0') {
            // alert('pick size and quantity');
            window.plugins.toast.showLongCenter('pick size and quantity');

        } else {
            var animation = 'bounceIn';
            $ionicModal.fromTemplateUrl('stripe.html', {
                scope: $scope,
                animation: 'animated ' + animation,
                hideDelay: 1020
            }).then(function(modal) {
                $scope.modal = modal;
                $scope.modal.show();
                $scope.hideModal = function() {
                    $scope.modal.hide();
                    // Note that $scope.$on('destroy') isn't called in new ionic builds where cache is used
                    // It is important to remove the modal to avoid memory leaks
                    $scope.modal.remove();
                }
            });
            // setTimeout(function() {
            //     show();
            //     $ionicLoading.hide();
            // }, 2000);

        }

    }

    $scope.pay = function(data) {
        //console.log(data);
        $ionicLoading.show({
            template: '<p style="font-family:Brandon;color:grey;">Processing payment please wait</p><ion-spinner icon="dots"></ion-spinner>',
            hideOnStageChange: true
        });
         console.log(data);
          if (!Stripe.card.validateCardNumber(data.card)) {
            $ionicLoading.hide();
            swal({
                title: "sorry",
                text: 'your card number incorrect',
                timer: 2000,
                showConfirmButton: false
            });
        }
        else
        {
        var cardString = data.card.toString(); 
        var card = cardString.replace(/\s/g, "");
        //var exp = data.exp.replace(/[^\dA-Z]/g, '/');
        var expString = data.exp.toString();
        var one = expString.charAt(0);
        var two = expString.charAt(1);
        var three = expString.charAt(2);
        var four = expString.charAt(3);
        var exp = one + two + "-" + three + four;
    
        if (!Stripe.card.validateExpiry(exp)) {
            $ionicLoading.hide();
            swal({
                title: "sorry",
                text: 'your expiration date is incorrect',
                timer: 2000,
                showConfirmButton: false
            });
        }
        //console.log(card);
        // use details to create token
        Stripe.card.createToken({
            number: card,
            cvc: data.cvc.toString(),
            exp: exp.toString(),
        }, stripeResponseHandler);
}
    }


    $scope.showTerms = function() {
        // console.log('change');
        $ionicModal.fromTemplateUrl('terms.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.openModal();
        });
        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });

    }


    $scope.back = function() {
        $state.go('tabs.shop');
    }
});