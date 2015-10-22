'use strict'

app.controller('CreateDonationController', function($scope,
                                                    $state, $stateParams, $http,
                                                    $ionicPopup, $ionicPlatform, $ionicModal, $ionicLoading,
                                                    $cordovaCamera, $cordovaFileTransfer,
                                                    donationCategoryService, s3SigningService, currentUserService,
                                                    Donation,
                                                    CHATTER_API) {
  $scope.donation = new Donation();
  //--TODO: Can i put this in the Donation factory?
  $scope.donation.location_attributes = {
    street: "",
    postal_code: "",
    city: "",
    state: ""
  };
  $scope.donation.image_file_name = "";
  $scope.s3_upload_image = false;
  // $scope.categories = {};
  //
  // donationCategoryService.getCategories().success(data){
  //   $scope.categories = data;
  // };

  $scope.addDonation = function() { //create a new donation. Issues a POST to /api/resources/new
    var time = new Date().getTime();
    var fileName = currentUserService.id + "-" + time + ".jpg"; //--Name the file
    $scope.donation.image_file_name = fileName;

    console.log('Donation Save - filename: ' + $scope.donation.image_file_name);
    $scope.donation.$save()
      .then(function(resp) {
        var alertPopup = $ionicPopup.alert({
          title: 'Success',
          template: "Your donation has been successfully uploaded to Creative Chatter. Check notifications for a match."
        });
        $scope.uploadPicture(resp.id, fileName);
        $state.go('viewDonation', {id :resp.id}); // on success go back to home i.e. donations state.
      })
      .catch(function(resp){
        console.log("REsponse: ", resp.data)
        var alertPopup = $ionicPopup.alert({
          title: 'Failed',
          // template: "Sorry something went wrong. If this problem continues please contact Creative Chatter at support@creativechatter.com"
        });
      });
  };

  //-- This method handles select field values for donation title (category)
  $scope.callbackMethod = function (query) {
    console.log("query: ", query)
    //--TODO find method to search categories
    return donationCategoryService.getCategories();
  };

  //-- Method is called when an item is selected inside the category modal
  $scope.categorySelected = function (callback) {
    $scope.donation.title  = callback.item.name;
  };

  $scope.selectPicture = function() {
    document.addEventListener('deviceready', function() {
        console.log("Device is ready..")
        var options = {
            quality: 60,
            targetWidth: 256,
            targetHeight: 256,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
        };
        $cordovaCamera.getPicture(options).then(function(imageURI) {
            $scope.imageSrc = imageURI;
            //var image = document.getElementById('myImage');
            image.src = imageURI;

        }, function(err) {
            console.log("Did not get image from camera")
            alert(err);
        });

        $cordovaCamera.cleanup();

      }, false); // device ready

  }; // Select picture


//--Upload to s3
//--Called from addDonation function
$scope.uploadPicture = function(itemId, fileName) {
      // var fileName = $scope.donation.image_file_name

      console.log('Uploading ' + fileName + ' to S3...');

      $http({method: 'GET',
                    url: CHATTER_API.url + '/s3_access_signature',
                    headers: {'X-API-FILENAME' : fileName}})
      .success(function(data, status, headers, config) {

          console.log('Got signed doc: ', data.bucket);
          //console.log('Uoptions: ', Uoptions);


          var win = function (r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
            //angular.element(document.getElementById('upload_image_button'))[0].disabled = true;
            // alert({
            //    title: 'Successful Upload',
            //    template: 'Thank you for attaching an image.'
            //  });
            //  $ionicPopup.alert({
            //     title: 'Success',
            //     content: 'Thank you for attaching an image'
            //   }).then(function(res) {
                //document.getElementById('upload_image_button').disabled = true;
            // });
          }//--End win

          var fail = function (error) {
              alert("An error has occurred: Code = " + error.code);
              console.log("upload error source " + error.source);
              console.log("upload error target " + error.target);
          }
          //'data:image/jpeg;base64,'
          console.log($scope.imageSrc);
          var imgURI =  $scope.imageSrc;

          document.addEventListener('deviceready', function(){
            var Uoptions = new FileUploadOptions();
            //var Uoptions = {};
            Uoptions.fileKey="file";
            Uoptions.fileName = fileName;
            Uoptions.mimeType ="image/jpeg";
            Uoptions.chunkedMode = false;

            var uri = encodeURI("https://" + data.bucket + ".s3.amazonaws.com/");
            var params = {
              "key": "resources/images/000/000/" + itemId + "/medium/" + fileName,
              "AWSAccessKeyId": data.key,
              "acl": "public-read",
              "policy": data.policy,
              "signature": data.signature,
              "Content-Type": "image/jpeg"
            };
            Uoptions.params = params;

            var ft = new FileTransfer();
            ft.upload(imgURI, uri, win, fail, Uoptions);

          }, false); // device ready

      }).error(function(data, status, headers, config) { //--End of Success s3 Signing
          $ionicPopup.alert({
             title: 'Sorry...',
             content: 'Authentication problem please logout, then log back in.'
           }).then(function(res) {
             console.log(' didnt Got signed doc: ' + JSON.stringify(data));
         });
      });

  } // upload to Amazon s3 bucket

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
