// .directive('validPrice',function(){
//   return{
//    require: "ngModel",
//    link: function(scope, elm, attrs, ctrl){
//     var regex=/^\d{2,4}(\.\d{1,2})?$/;
//     ctrl.$parsers.unshift(function(viewValue){
//      var floatValue = parseFloat(viewValue);
//      if(regex.test(viewValue)){
//       ctrl.$setValidity('validPrice',true);
//      }
//      else{
//      ctrl.$setValidity('validPrice',false);
//      }
//      return viewValue;
//     });
//    }
//   };
//  });
// app.directive('googleplace', function() {
//     return {
//         require: 'ngModel',
//         link: function(scope, element, attrs, model) {
//             var options = {
//                 types: ['geocode'],
//                 componentRestrictions: {}
//             };
//             var componentForm = {
//               street_number: 'short_name',
//               route: 'long_name',
//               locality: 'long_name',
//               administrative_area_level_1: 'short_name',
//               country: 'long_name',
//               postal_code: 'short_name'
//             };
//
//             scope.gPlace = new google.maps.places.Autocomplete(element[0], options);
//
//             google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
//                 var place = scope.gPlace.getPlace();
//
//                 for (var i = 0; i < place.address_components.length; i++) {
//                   var addressType = place.address_components[i].types[0];
//                   if (componentForm[addressType]) {
//                     var val = place.address_components[i][componentForm[addressType]];
//                     //document.getElementById(addressType).value = val;
//                     console.log("Google Address=>" + val);
//                   }
//                 }
//                 document.getElementById("street_name").value = place.address_components[0][componentForm["street_number"]] + " " + place.address_components[1][componentForm["route"]];
//                 document.getElementById("city").value = place.address_components[2][componentForm["locality"]];
//                 document.getElementById("zipcode").value = place.address_components[3][componentForm["locality"]];
//                 document.getElementById("state").value = place.address_components[4][componentForm["locality"]];
//
//
//                 //console.log("testcommaplace=", place.address_components[0]);
//                 console.log("route=" + place.address_components[1][componentForm["route"]]);
//                 console.log("locality=" + place.address_components[0][componentForm["locality"]]);
//                 console.log("street_number=" + place.address_components[0][componentForm["street_number"]]);
//
//                 scope.$apply(function() {
//                     model.$setViewValue(element.val());
//                 });
//             });
//

            //--test
            //var place = scope.gPlace.getPlace();
            //scope.gPlace = scope.gPlace.getPlace();
            //---

            // for (var component in componentForm) {
            //   document.getElementById(component).value = '';
            //   document.getElementById(component).disabled = false;
            // }

            // Get each component of the address from the place details
            // and fill the corresponding field on the form.
            // for (var i = 0; i < scope.gPlace.address_components.length; i++) {
            //   var addressType = scope.gPlace.address_components[i].types[0];
            //   if (componentForm[addressType]) {
            //     var val = pscope.gPlace.address_components[i][componentForm[addressType]];
            //     //document.getElementById(addressType).value = val;
            //     console.log("Google Address=>" + val);
            //   }
            // }
//         }
//     };
// });
