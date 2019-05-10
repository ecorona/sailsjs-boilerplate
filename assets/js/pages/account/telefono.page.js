ng.controller('telefonoController', ['$rootScope', '$scope', '$http',
  function($rootScope, $scope, $http) {
    _.merge($scope, SAILS_LOCALS);

    $scope.formData = {
      _csrf: $scope._csrf
    };

    $scope.cloudError = false;

    $scope.syncing = false;

    $scope.trySubmit = function(){
      if($scope.validarFormulario()){
        $scope.syncing = true;
        $http.put('/api/v1/account/validate-sms', $scope.formData).then(function succcess(){
          window.location = '/account';
        },function error(err){
          console.log('PUT /api/v1/account/validate-sms->error:', err);
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
