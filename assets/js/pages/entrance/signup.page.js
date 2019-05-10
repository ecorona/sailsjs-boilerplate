ng.controller('signupController', ['$rootScope', '$scope', '$http',
  function($rootScope, $scope, $http) {

    // Attach any initial data from the server.
    _.extend($scope, SAILS_LOCALS);

    // Form data
    $scope.formData = {
      fullName:'',
      emailAddress:'',
      password:'',
      confirmPassword:'',
      origen:'',
      telefono:'',
      _csrf: $scope._csrf
    };

    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `formData`.
    $scope.formErrors = { /* … */ };

    // Syncing / loading state
    $scope.syncing = false;

    // Server error state
    $scope.cloudError = '';

    // Success state when form has been submitted
    $scope.cloudSuccess = false;

    $scope.trySubmit = function(){

      if($scope.validarFormulario()){
        //hacer post!!!
        $scope.syncing = true;
        $http.post('/api/v1/entrance/signup',$scope.formData).then(() => {
          //la cuenta fué creada...
          if($scope.isEmailVerificationRequired) {
            $scope.cloudSuccess = true;
          }else {
            window.location = '/';
          }
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

    $scope.validarFormulario = function() {
      // Clear out any pre-existing error messages.
      $scope.formErrors = {};
      var argins = $scope.formData;
      // Validate full name:
      if(!argins.fullName) {
        $scope.formErrors.fullName = true;
      }

      // Validate email:
      if(!argins.emailAddress || !validateEmail(argins.emailAddress)) {
        $scope.formErrors.emailAddress = true;
      }

      // Validate password:
      if(!argins.password) {
        $scope.formErrors.password = true;
      }

      // Validate origen:
      if(!argins.origen) {
        $scope.formErrors.origen = true;
      }

      // Validate telefono:
      if(!argins.telefono || argins.telefono.length!==10) {
        $scope.formErrors.telefono = true;
      }

      // Validate password confirmation:
      if(argins.password && argins.password !== argins.confirmPassword) {
        $scope.formErrors.confirmPassword = true;
      }

      // Validate ToS agreement:
      if(!argins.agreed) {
        $scope.formErrors.agreed = true;
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
