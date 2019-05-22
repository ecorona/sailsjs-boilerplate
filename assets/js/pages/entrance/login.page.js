ng.controller('loginController', ['$rootScope', '$scope', '$http',
  function($rootScope, $scope, $http) {
    // Attach any initial data from the server.
    _.extend($scope, SAILS_LOCALS);

    localStorage.removeItem('jwt');

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

    $scope.trySubmit = function(){
      if($scope.validarFormulario()){
        $scope.syncing = true;
        $http.put('/api/v1/entrance/login', $scope.formData).then(
          () => {
            window.location = '/';
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

      // Validate password:
      if(!argins.password) {
        $scope.formErrors.password = true;
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
