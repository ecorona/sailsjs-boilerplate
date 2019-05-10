ng.controller('multifactorController', ['$rootScope', '$scope', '$http',
  function($rootScope, $scope, $http) {
    _.extend($scope, window.SAILS_LOCALS);

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

    //mostrar que todo salió bien.
    $scope.success = false;

    $scope.trySubmit = function(){
      if($scope.validarFormulario()){
        $scope.syncing = true;
        $http.put('/api/v1/account/validate-mfa', $scope.formData).then(function succcess(){
          $scope.success = true;
        },function error(err){
          console.log('PUT /api/v1/account/validate-mfa->error:', err);
          $scope.syncing = false;
          $scope.cloudError = true;
          //parsear errores!!!
          var headers = err.headers();
          if(headers){
            if(headers['x-exit']) {
              $scope.cloudError = headers['x-exit'];
            }
          }
        });
      }
    };

    $scope.trySubmitDisable = function(){
      $scope.syncing = true;
      $http.put('/api/v1/account/disable-mfa', $scope.formData).then(function succcess(){
        window.location='/account';
      },function error(err){
        console.log('PUT /api/v1/account/disable-mfa->error:', err);
        $scope.syncing = false;
        $scope.cloudError = true;
      });
    };

    $scope.validarFormulario = function() {
      $scope.cloudError = false;
      $scope.formErrors = {};
      var argins = { token: $scope.formData.token };
      if(!argins.token || argins.token.length<6 || argins.token.length>6) {
        $scope.formErrors.token = true;
      }
      if (Object.keys($scope.formErrors).length > 0) {
        return;
      }

      return argins;
    };
  }
]);
