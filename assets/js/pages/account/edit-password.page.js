ng.controller('editPasswordController', ['$rootScope', '$scope', '$http',
  function($rootScope, $scope, $http) {
    // Attach raw data exposed by the server.
    _.extend($scope, SAILS_LOCALS);

    // Main syncing/loading state for this page.
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
        $http.put('/api/v1/account/update-password', $scope.formData).then(function succcess(){
          window.location = '/account';
        },function error(err){
          $scope.syncing = false;
          console.log('PUT /api/v1/account/update-password->error:', err);
          alertify.error('No se pudo hacer el cambio, inténtelo mas tarde.');
        });
      }
    };

    $scope.validarFormulario = function() {
      // Clear out any pre-existing error messages.
      $scope.formErrors = {};

      var argins = { password: $scope.formData.password };

      // Validate password:
      if(!argins.password) {
        $scope.formErrors.password = true;
      }

      // Validate password confirmation:
      if(argins.password && argins.password !== $scope.formData.confirmPassword) {
        $scope.formErrors.confirmPassword = true;
      }

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
      if (Object.keys($scope.formErrors).length > 0) {
        return;
      }

      return argins;
    };
  }
]);
