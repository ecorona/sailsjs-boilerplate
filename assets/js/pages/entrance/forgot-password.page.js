ng.controller('forgotPasswordController', ['$rootScope', '$scope', '$http',
  function($rootScope, $scope, $http) {
    // Attach any initial data from the server.
    _.extend($scope, SAILS_LOCALS);
    $scope.syncing = false;

    // Form data
    $scope.formData = {
      _csrf: $scope._csrf
    };

    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `formData`.
    $scope.formErrors = { /* … */ };

    // Server error state for the form
    $scope.cloudError = '';

    // Success state when form has been submitted
    $scope.cloudSuccess = false;


    $scope.trySubmit = function(){

      if($scope.validarFormulario()){
        //hacer post!!!
        $scope.syncing = true;
        $http.post('/api/v1/entrance/send-password-recovery-email',$scope.formData).then(() => {
          $scope.cloudSuccess = true;
        }, (err) => {
          $scope.syncing = false;
          //parsear errores!!!
          var headers = err.headers();
          if(headers){
            if(headers['x-exit']) {
              $scope.cloudError = headers['x-exit'];
            }else{
              alertify.alert($rootScope.app.name, 'No se pudo continuar');
            }
          }
        });
      }
    };

    $scope.validarFormulario= function() {
      // Clear out any pre-existing error messages.
      $scope.formErrors = {};

      var argins = $scope.formData;

      // Validate email:
      if(!argins.emailAddress) {
        $scope.formErrors.emailAddress = true;
      }

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
      if (Object.keys($scope.formErrors).length > 0) {
        return true;
      }

      return argins;
    };
  }
]);
