ng.controller('editProfileController', ['$rootScope', '$scope', '$http',
  function($rootScope, $scope, $http) {
    // Attach raw data exposed by the server.
    _.extend($scope, SAILS_LOCALS);
    $scope.random = parseInt(Math.random()*10000);
    // Set the form data.
    $scope.formData = {
      fullName : $scope.me.fullName,
      emailAddress: $scope.me.emailChangeCandidate ? $scope.me.emailChangeCandidate : $scope.me.emailAddress,
      telefono: $scope.me.telefono,
      _csrf: $scope._csrf
    };

    $scope.syncing = false;

    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `formData`.
    $scope.formErrors = { /* … */ };

    // Server error state for the form
    $scope.cloudError = '';

    $scope.$watch('fotoperfil', (foto) => {
      if(foto){
        $scope.updateProfilePicture();
      }
    });

    $scope.updateProfilePicture = function(){
      var file = $scope.fotoperfil;

      var data = new FormData();
      data.append('fotoperfil', file);

      $http.post(
        '/api/v1/account/update-profile-picture?_csrf=' + $scope._csrf,
        data, //data
        {//options
          transformRequest: angular.identity,
          headers: {
            'Content-Type': undefined
          },
        }
      ).then(() => {
        document.location = '/account/profile';
      },(error, status) => {
        console.log('Error al subir la imagen:', error, status);
      });
    };

    $scope.removeProfilePicture = function(){
      alertify.confirm('Quitar Foto','Esto no se puede deshacer<hr>¿Está Seguro?', () => {
        $http.post('/api/v1/account/remove-profile-picture?_csrf=' + $scope._csrf ).then(() => {
          document.location = '/account/profile';
        },(error, status) => {
          console.log('Error al quitar la imagen:', error, status);
        });
      }, () => {});
    };

    $scope.trySubmit = function(){
      if($scope.validarFormulario()){
        $scope.syncing = true;
        $http.put('/api/v1/account/update-profile', $scope.formData).then(function succcess(){
          window.location = '/account';
        },function error(err){
          console.log('PUT /api/v1/account/update-profile->error:', err);
          $scope.syncing = false;
          //parsear errores!!!
          var headers = err.headers();
          if(headers){
            if(headers['x-exit']) {
              $scope.cloudError = headers['x-exit']; //emailAlreadyInUse
            }else{
              alertify.alert($rootScope.app.name, 'No se pudo continuar');
            }
          }

        });
      }
    };

    $scope.validarFormulario = function() {
      // Clear out any pre-existing error messages.
      this.formErrors = {};

      var argins = this.formData;

      // Validate name:
      if(!argins.fullName) {
        this.formErrors.password = true;
      }

      // Validate email:
      if(!argins.emailAddress) {
        this.formErrors.emailAddress = true;
      }

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      return argins;
    };
  }
]);
