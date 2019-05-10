ng.controller('definicionesControllerView', ['$rootScope', '$scope','$http',
  function($rootScope, $scope , $http) {
    _.merge($scope, SAILS_LOCALS);
    $scope.definiciones = [];
    $scope.definicion={};

    $scope.init = function(){
      $scope.listarDefiniciones();
    };

    $scope.showModal = function(definicion){
      if(definicion){
        $scope.definicion = angular.copy(definicion);
      }else{
        $scope.definicion = {tipo: 'catalogo'};
      }
      $('#myModal').modal('show');
      console.log('show modal');
    };

    $scope.listarDefiniciones = function(){
      $http.get('/api/v1/admin/definiciones/getall').then(function succcess(response){
        $scope.definiciones = response.data;
      },function error(err){
        $scope.syncing = false;
        console.log('get /api/v1/admin/definiciones/getall ->error:', err);
        alertify.error('No se pudo listar las Definiciones, inténtelo mas tarde.');
      });
    };
    $scope.guardar = function(){
      console.log('vamos a guardar un registro');
      $http.post('/api/v1/admin/definiciones/save',{definicion: $scope.definicion}).then(
        (response) => {
          //console.log('POST /api/v1/admin/definiciones/save->response:', response);
          alertify.success('Proceso Completo');
          $('#myModal').modal('hide');
          var idx = _.findIndex($scope.definiciones, {id: response.data.id});
          if (idx > -1) {
            $scope.definiciones[idx] = response.data;
          }else{
            $scope.definiciones.push(response.data);
          }
        },
        (err) => {
          console.log('POST /api/v1/admin/definiciones/save: error', err);
        }
      );
    };

    $scope.borrarDefinicion = function(idDefinicion){
      var data = {_csrf: $scope.formData._csrf, idDefinicion: idDefinicion};
      alertify.confirm($rootScope.app.name = 'Definicion','El proceso de Borrado <b>no se puede revertir</b>.<br><br>¿Está seguro?', () => {
        $http.post(' /api/v1/admin/definiciones/eliminar', data).then(function succcess(response){
          var idx = _.findIndex($scope.definiciones, {id: response.data.id});
          if(idx>-1){
            $scope.definiciones.splice(idx, 1);
            alertify.success('Proceso Completo');
          }
          console.log('Definicion borrado****', response.data);
        },function error(err){
          $scope.syncing = false;
          console.log('post /api/v1/admin/definiciones/eliminar->error:', err);
          alertify.error('No se pudo borrar, inténtelo mas tarde.');
        });
      }, () => {});
    };

  }

]);
