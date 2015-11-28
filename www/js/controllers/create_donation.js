'use strict'

app.controller('CreateDonationController', function($scope,
                                                    $state, $stateParams, $http, $q,
                                                    $ionicPopup, $ionicPlatform, $ionicModal, $ionicLoading,
                                                    $cordovaCamera, $cordovaFileTransfer,
                                                    donationCategoryService, s3SigningService, currentUserService,
                                                    Donation,
                                                    CHATTER_API) {


  $scope.donation = new Donation;
  $scope.donation.location_attributes = {
    street: "",
    postal_code: "",
    city: "",
    state: ""
  };
  $scope.donation.image_file_name = "";
  $scope.s3_upload_image = false;


  $scope.addDonation = function() { //create a new donation. Issues a POST to /api/resources/new
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
    console.log('Adding donation...');
    var time = new Date().getTime();
    var token = localStorage.getItem('token');
    var user_id = localStorage.getItem('id');
    var fileName = user_id + "-" + time + ".jpg"; //--Name the file

    $http.defaults.headers.common['Authorization'] = token;

    if ($scope.s3_upload_image){
      $scope.donation.image_file_name = fileName;
      console.log('Upload image: ', fileName);
    }
    console.log('Image filename?: ', $scope.donation.image_file_name);

    $scope.donation.$save()
      .then(function(resp) {
        console.log('successly donated item...starting image upload');

        //--If an image was selected then upload it
        if ($scope.s3_upload_image){
          $scope.uploadPicture(resp.id, fileName)
          .then(function(rest) {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Success',
              template: "Your donation with image has been successfully uploaded to Creative Chatter. Check notifications for a match."
            });
            console.log("Inside Then for uploadPicture");
            $state.go('showDonation', {id :resp.id}); // on success go back to home i.e. donations state.
          });
        }
        else{
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Success',
            template: "Your donation has been successfully uploaded to Creative Chatter. Check notifications for a match."
          });
          ;
          $state.go('showDonation', {id :resp.id}); // on success go back to home i.e. donations state.
        }
      })
      .catch(function(resp){
        console.log("Error REsponse: ", resp.data);
          $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Failed',
          template: "Sorry something went wrong. Please try to log out then back in. If this problem continues please contact Creative Chatter at support@creativechatter.com"
        });
      });
  };

  //-- This method handles select field values for donation title (category)
  $scope.callbackMethod = function (query) {
    console.log("query: ", query)
      // return donationCategoryService.getCategories("a");

      return donationCategoryService.getCategories(query);

  };

  //-- Method is called when an item is selected inside the category modal
  $scope.categorySelected = function (callback) {
    $scope.donation.title  = callback.item.name;
  };

  $scope.selectPicture = function() {
    //console.log('Selected option to upload a picture...setting s3_upload_image to true');
    $scope.s3_upload_image = true;

    document.addEventListener('deviceready', function() {
        console.log("Device is ready..")
        var options = {
            quality: 100,
            targetWidth: 300,
            targetHeight: 300,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        };
        $cordovaCamera.getPicture(options).then(function(imageURI) {
            $scope.imageSrc = imageURI;
            image.src = imageURI;

        }, function(err) {
            console.log("Did not get image from camera");
            // alert(err);
        });

        $cordovaCamera.cleanup();

      }, false); // device ready

  }; // Select picture
  $scope.takePicture = function() {
    //console.log('Selected option to upload a picture...setting s3_upload_image to true');
    $scope.s3_upload_image = true;

    document.addEventListener('deviceready', function() {
        console.log("Device is ready..")
        var options = {
            quality: 100,
            targetWidth: 300,
            targetHeight: 300,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
        };
        $cordovaCamera.getPicture(options).then(function(imageURI) {
            $scope.imageSrc = imageURI;
            image.src = imageURI;

        }, function(err) {
            console.log("Did not get image from library");
            // alert(err);
        });

        $cordovaCamera.cleanup();

      }, false); // device ready

  }; // Select picture

//--Upload to s3
//--Called from addDonation function
$scope.uploadPicture = function(itemId, fileName) {
      // var fileName = $scope.donation.image_file_name
      var token = localStorage.getItem('token');
      $http.defaults.headers.common['Authorization'] = token;

      var deferred = $q.defer();

      console.log('Uploading ' + fileName + ' to S3...');

      $http({method: 'GET',
                    url: CHATTER_API.url + '/s3_access_signature',
                    headers:{'X-API-FILENAME': fileName}})
      .success(function(data, status, headers, config) {

          console.log('Got signed doc: ', data.bucket);

          var win = function (r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);

            deferred.resolve(r.responseCode);
            return deferred.promise;
          }//--End win

          var fail = function (error) {
              alert("An error has occurred: Code = " + error.code);
              deferred.reject
              console.log("upload error source " + error.source);
              console.log("upload error target " + error.target);
              return deferred.promise;
          }

          var imgURI =  $scope.imageSrc;

          document.addEventListener('deviceready', function(){
            var Uoptions = new FileUploadOptions();
            //var Uoptions = {};
            Uoptions.fileKey="file";
            Uoptions.fileName = fileName; //--fileName is the param from function
            Uoptions.mimeType ="image/jpeg";
            Uoptions.chunkedMode = false;

            //--Handles manipulating s3 upload key when images have an id over 1000
            //-----------------------------------------------------------------
            var stringfyItemId = "";
            var stringfyKey = "000/";
            var zeros = 3;
            var secondZeros = 3;
            var firstSet = ~~(itemId / 1000);
            var secondSet = itemId % 1000;

            if(itemId >= 1000){
              console.log("firstset: " + firstSet);
              console.log("firstset: " + firstSet);

              //--Calculate if the sets are less than 3 then fill with zeros
              zeros = zeros - firstSet.toString().length;
              secondZeros = secondZeros - secondSet.toString().length;

              //--Create new path for id's larger than 999
              //--Add in preceding zeros
              for(var i=0; i< zeros; i++){
                stringfyKey += "0";
              }

              for(var i=0; i< secondZeros; i++){
                stringfyItemId += "0";
              }

              stringfyItemId += secondSet;

              console.log("stringfyKey pre-addingsecondset:" + stringfyKey);

              stringfyKey += firstSet + "/" + stringfyItemId;

            }
            else{
              secondZeros = secondZeros - itemId.toString().length;

              for(var i=0; i< secondZeros; i++){
                stringfyItemId += "0";
              }
              stringfyKey += "000/" + stringfyItemId + itemId;
            }
            //-----------------------------------------------------------------


            console.log("New key images/" +stringfyKey);

            var uri = encodeURI("https://" + data.bucket + ".s3.amazonaws.com/");
            var params = {
              "key": "resources/images/" + stringfyKey + "/original/" + fileName,
              "AWSAccessKeyId": data.key,
              "acl": "public-read",
              "policy": data.policy,
              "signature": data.signature,
              "Content-Type": "image/jpeg"
            };
            Uoptions.params = params;

            var ft = new FileTransfer();
            //-- if imgURI is nil try $scope.imageSrc
            console.log('File upload: ', imgURI);
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

      return deferred.promise;
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
