ng.controller('nuevoPasswordController', ['$rootScope', '$scope', '$http',
  function($rootScope, $scope, $http) {
    // Attach any initial data from the server.
    _.extend($scope, SAILS_LOCALS);

    $scope.syncing = false;

    // Form data
    $scope.formData = {
      _csrf: $scope._csrf,
      token: $scope.token
    };

    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `formData`.
    $scope.formErrors = { /* … */ };

    // Server error state for the form
    $scope.cloudError = '';

    $scope.trySubmit = function(){
      if($scope.validarFormulario()){
        //hacer post!!!
        $scope.syncing = true;
        $http.post('/api/v1/entrance/update-password-and-login', $scope.formData).then(() => {
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
        });
      }
    };

    $scope.validarFormulario = function(){
      // Clear out any pre-existing error messages.
      this.formErrors = {};

      var argins = _.extend({
        token: this.token
      }, this.formData);

      // Validate password:
      if(!argins.password) {
        this.formErrors.password = true;
      }

      // Validate password confirmation:
      if(argins.password && argins.password !== argins.confirmPassword) {
        this.formErrors.confirmPassword = true;
      }

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
      if (Object.keys(this.formErrors).length > 0) {
        return false;
      }

      return argins;
    };
  }
]);
