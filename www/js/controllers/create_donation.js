'use strict'

app.controller('CreateDonationController', function($scope,
                                                    $state, $stateParams, $http, $cordovaFileTransfer,
                                                    $ionicPopup, $ionicPlatform, $ionicModal,
                                                    $cordovaCamera,
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
  // $scope.categories = {};
  //
  // donationCategoryService.getCategories().success(data){
  //   $scope.categories = data;
  // };

  $scope.addDonation = function() { //create a new donation. Issues a POST to /api/resources/new
    $scope.donation.$save()
      .then(function(resp) {
        var alertPopup = $ionicPopup.alert({
          title: 'Success',
          template: "Your donation has been successfully uploaded to Creative Chatter. Check notifications for a match."
        });
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

  // $scope.takePicture = function() {
  //   console.log("take picture function")
  //
  //   $ionicPlatform.ready(function() {
  //       var options = {
  //           quality: 50,
  //           destinationType: Camera.DestinationType.DATA_URL,
  //           sourceType: Camera.PictureSourceType.CAMERA,
  //           allowEdit: true,
  //           encodingType: Camera.EncodingType.JPEG,
  //           targetWidth: 100,
  //           targetHeight: 100,
  //           popoverOptions: CameraPopoverOptions,
  //           saveToPhotoAlbum: false
  //       };
  //
  //       $scope.takePicture = function() {
  //           $cordovaCamera.getPicture(options).then(function(imageData) {
  //               $scope.imgSrc = "data:image/jpeg;base64," + imageData;
  //           }, function(err) {
  //               console.log(err);
  //           });
  //       }
  //     });
  //   }

$scope.takePicture = function(imageURI) {
//uploadToS3
      // var fileName = currentUserService.id + new Date().getTime() + ".jpg"; //--Name the file
      var fileName = "ionic.png";
      //$scope.item.picture = 'https://s3-eu-west-1.amazonaws.com/bucket-name/' + fileName;
      console.log('Uploading ' + fileName + ' to S3...');

      $http({method: 'GET',
                    url: CHATTER_API.url + '/s3_access_signature',
                    headers: {'X-API-FILENAME' : fileName}})
      .success(function(data, status, headers, config) {

          console.log('Got signed doc: ', data);
          var Uoptions = {};
          Uoptions.fileKey = "file";
          Uoptions.fileName = fileName;
          Uoptions.mimeType = "image/jpeg";
          Uoptions.chunkedMode = false;
          Uoptions.httpMethod = "PUT";
          Uoptions.headers = {
              connection: "close"
          };
          Uoptions.params = {
              "key": fileName,
              "AWSAccessKeyId": data.key,
              "acl": "public-read",
              "policy": data.policy,
              "signature": data.signature,
              "Content-Type": "image/jpeg"
          };
        //
        // $scope.selectPicture = function() {
        // document.addEventListener('deviceready', function() {
            // console.log("Device is ready..")
            // var options = {
            //     destinationType: Camera.DestinationType.FILE_URI,
            //     sourceType: Camera.PictureSourceType.CAMERA,
            // };
            // $cordovaCamera.getPicture(options).then(function(imageURI) {
            //     $scope.imageSrc = imageURI;
            //     $scope.img = imageURI;
            //
            // }, function(err) {
            //     console.log("Did not get image from camera")
            //     alert(err);
            // });
        //
        // }, false); // device ready
    //}; // Select picture
    console.log(Uoptions)
    console.log($cordovaFileTransfer)
    //objReturned = $cordovaFileTransfer.upload("https://" + data.bucket + ".s3.amazonaws.com/" + "resources/", "www/img/ionic.png", Uoptions);
  //  console.log(objReturned);


    var win = function (r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
    }

    var fail = function (error) {
        alert("An error has occurred: Code = " + error.code);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
    }

    $cordovaFileTransfer.upload("www/img/ionic.png", "https://" + data.bucket + ".s3.amazonaws.com/" + "resources/", win, fail, Uoptions);
        // .then(function(result) {
        //     // Success!
        //     // Let the user know the upload is completed
        //     $ionicLoading.show({template : 'Upload Success!!', duration: 3000});
        //     console.log('upload to s3 succeed ', result);
        //
        // }, function(err) {
        //     // Error
        //     // Uh oh!
        //     $ionicLoading.show({template : 'Upload Failed', duration: 3000});
        //     console.log('upload to s3 fail ', err);
        // }, function(progress) {
        //     console.log("Progress..")
        //     // constant progress updates
        // });

      }).error(function(data, status, headers, config) { //--End of Success s3 Signing

        console.log(' didnt Got signed doc: ' + JSON.stringify(data));
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
