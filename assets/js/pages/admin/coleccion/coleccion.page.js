ng.controller('catalogosControllerView', ['$rootScope', '$scope','$http',
  function($rootScope, $scope , $http) {
    _.merge($scope, SAILS_LOCALS);
    $scope.catalogos = [];
    $scope.catalogo = {};
    $scope.formData = {
      _csrf: $scope._csrf,
    };


    $scope.init = function(){
      $scope.listarCatalogos();
    };
    $scope.nuevaColeccion = function(){
      $scope.catalogo = {
        tipo : 'string',
        categoria : 'individual',
        orden : 0
      };
      $scope.pestana='agregar';
      $scope.borrar = false;
      $scope.guardar = true;
      $scope.bloqueado = false;
    };
    $scope.editar= function(catalogo){
      $scope.pestana = 'editar';
      $scope.catalogo = angular.copy(catalogo);
      $scope.guardar = true;
      $scope.borrar = false;
      $scope.bloqueado = false;
    };
    $scope.delete = function(catalogo){
      console.log('Borrar', catalogo);
      $scope.catalogo = angular.copy(catalogo);
      $scope.pestana='borrar';
      $scope.borrar = true;
      $scope.guardar = false;
      $scope.bloqueado = true;
    };
    $scope.cerrar = function(){
      $scope.catalogo = {};
    };
    $scope.showModalPapelera =  function(){
      $scope.listarCatalogosDesactivados();
      $('#myPapelera').modal('show');
    };

    $scope.listarCatalogos = function(){
      console.log('Mostrando catalogos');
      $http.get('/api/v1/admin/catalogos/getall').then(function succcess(response){
        $scope.catalogos = response.data;
        console.log('array',response);
        console.log('Catalogos a listar', $scope.catalogos);
      },function error(err){
        $scope.syncing = false;
        console.log('get /api/v1/admin/catalogos/getall ->error:', err);
        alertify.error('No se pudo listar los Permisos, inténtelo mas tarde.');
      });
    };
    $scope.listarCatalogosDesactivados = function(){
      console.log('Mostrando Catalogos desactivados');
      $http.get('/api/v1/admin/catalogos/get-ones').then(function success(response){
        $scope.catalogoDesactivados  = response.data;
        console.log('definiciones a listar', $scope.catalogoDesactivados);
      }, function error(err){
        $scope.syncing = false;
        console.log('/api/v1/admin/catalogos/get-ones', err);
        alertify.error('No se pudo listar los Catalogos, inténtelo mas tarde.');
      });
    };
    $scope.recuperarCatalogo = function(idCatalogo){
      var data = {_csrf: $scope.formData._csrf, idCatalogo: idCatalogo};
      $http.post('/api/v1/admin/catalogos/restablecer', data).then(function succcess(response){
        console.log(response);
        $('#myPapelera').modal('hide');
        alertify.success('Catalogo Recuperado');
        window.location.href = '/admin/catalogos';
      },function error(err){
        $scope.syncing = false;
        console.log('error:', err);
        alertify.error('No se pudo recuperar, inténtelo mas tarde.');
      });
    };
    $scope.guardarCatalago = function(){
      $scope.formData.catalogo = $scope.catalogo;
      $http.post('/api/v1/admin/catalogos/save',$scope.formData).then(
        (response) => {
          console.log('POST /api/v1/admin/catalogos/save->response:', response);
          alertify.success('Proceso Completo');
          $('#myModal').modal('hide');
          //Response para update
          var idx = _.findIndex($scope.catalogos, {id: response.data.id});
          if (idx > -1) {
            $scope.catalogos[idx] = response.data;
          }else{
            $scope.catalogos.push(response.data);
            console.log('guardarColeccion',$scope.catalogos);
          }
        },
        (err) => {
          console.log('POST /api/v1/admin/catalogos/save: error', err);
        }
      );
      $scope.catalogo = {};
    };

    $scope.borrarCatalogo = function(idCatalogo){
      var data = {_csrf: $scope.formData._csrf, idCatalogo: idCatalogo};
      alertify.confirm($rootScope.app.name = 'Catalogo','El proceso de Borrado <b>no se puede revertir</b>.<br><br>¿Está seguro?', () => {
        $http.post(' /api/v1/admin/catalogos/eliminar', data).then(function succcess(response){
          var idx = _.findIndex($scope.catalogos, {id: response.data.id});
          if(idx>-1){
            $scope.catalogos.splice(idx, 1);
            alertify.success('Proceso Completo');
          }
          console.log('Definicion borrado****', response.data);
        },function error(err){
          $scope.syncing = false;
          console.log('post /api/v1/admin/catalogos/eliminar->error:', err);
          alertify.error('No se pudo borrar, inténtelo mas tarde.');
        });
      }, () => {});
    };


  }

]);
