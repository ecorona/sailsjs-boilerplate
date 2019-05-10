ng.controller('contactoController', ['$rootScope', '$scope', '$http',
  function($rootScope, $scope, $http) {
    // Heredar las locales enviadas a la vista de sails
    _.extend($scope, SAILS_LOCALS);
    $scope.syncing = false;
    // Form data
    $scope.formData = {
    };
    $scope.formErrors = { /* … */ };
    $scope.cloudError = '';
    $scope.cloudSuccess = false;
    // Post form!
    $scope.trySubmit = function(){
      if($scope.validarFormulario()){
        //POST!
        $scope.syncing = true;
        $http.post('/api/v1/deliver-contact-form-message', $scope.formData).then(
          () => {
            $scope.cloudSuccess = true;
          }, (err) => {
            $scope.syncing = false;
            console.log('POST /api/v1/deliver-contact-form-message->error:', err);
            $scope.cloudError = true;
          }
        );
      }
    };


    $scope.validarFormulario = function() {

      // Clear out any pre-existing error messages.
      $scope.formErrors = {};

      var argins = $scope.formData;

      // Validate email:
      if(!argins.emailAddress || !validateEmail(argins.emailAddress)) {
        $scope.formErrors.emailAddress = true;
      }

      // Validate name:
      if(!argins.fullName) {
        $scope.formErrors.fullName = true;
      }

      // Validate topic:
      if(!argins.topic) {
        $scope.formErrors.topic = true;
      }

      // Validate message:
      if(!argins.message) {
        $scope.formErrors.message = true;
      }

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
      if (Object.keys($scope.formErrors).length > 0) {
        return false;
      }

      return argins;
    };
  }
]);
