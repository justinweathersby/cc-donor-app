'use strict'

app.controller('CreateDonationController', function($scope,
                                                    $state, $stateParams,
                                                    $ionicPopup, $ionicPlatform, $ionicModal,
                                                    $cordovaCamera,
                                                    donationCategoryService, Donation) {
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
      var signingURI = API_URL + "/s3_access_signature"; //--Path to call post and get signed s3 uri back
      var fileName = new Date().getTime() + ".jpg"; //--Name the file
      //$scope.item.picture = 'https://s3-eu-west-1.amazonaws.com/bucket-name/' + fileName;
      console.log('Uploading ' + fileName + ' to S3');

      $http.post(signingURI, { //--Params:
          "fileName": fileName
      }).success(function(data, status, headers, config) {

          console.log('Got signed doc: ' + JSON.stringify(data));
          var Uoptions = {};
          Uoptions.fileKey = "file";
          Uoptions.fileName = fileName;
          Uoptions.mimeType = "image/jpeg";
          Uoptions.chunkedMode = false;
          Uoptions.headers = {
              connection: "close"
          };
          Uoptions.params = {
              "key": fileName,
              "AWSAccessKeyId": data.awsKey,
              "acl": "public-read",
              "policy": data.policy,
              "signature": data.signature,
              "Content-Type": "image/jpeg"
          };

        $scope.selectPicture = function() {
        document.addEventListener('deviceready', function() {

            var options = {
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA,
            };
            $cordovaCamera.getPicture(options).then(function(imageURI) {
                $scope.imageSrc = imageURI;
                $scope.img = imageURI;

            }, function(err) {
                alert(err);
            });

        }, false); // device ready
    }; // Select picture

    $cordovaFileTransfer.upload("https://" + data.bucket + ".s3.amazonaws.com/", imageURI, Uoptions)
        .then(function(result) {
            // Success!
            // Let the user know the upload is completed
            $ionicLoading.show({template : 'Upload Success!!', duration: 3000});
            console.log('upload to s3 succeed ', result);

        }, function(err) {
            // Error
            // Uh oh!
            $ionicLoading.show({template : 'Upload Failed', duration: 3000});
            console.log('upload to s3 fail ', err);
        }, function(progress) {

            // constant progress updates
        });

      }).error(function(data, status, headers, config) {

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
