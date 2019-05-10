ng.controller('catalogosController', ['$rootScope', '$scope', 'CatalogosFactory',
  function($rootScope, $scope, CatalogosFactory) {
    _.extend($scope, SAILS_LOCALS);
    //La vista para este controlador esta devolviendo:
    //Catalogos, Definicion y Catalogo(cuando se especifique uno)
    $scope.syncing = false;
    $scope.init = function(){
      //$scope.catalogos = [];
      //$scope.definicion = {};
      //$scope.definicion = {};
      //console.log('catalogosController ha sido inicializado. Catalogos', $scope.catalogos);
      //console.log('catalogosController ha sido inicializado. Definicion',$scope.definicion);
      //console.log('catalogosController ha sido inicializado. Catalogo', $scope.catalogo);
    };

    $scope.saveElemento = function(){
      if(!$scope.catalogo.id){$scope.catalogo.coleccion = $scope.definicion.nombre;}
      CatalogosFactory.save(angular.copy($scope.catalogo)).then(function succcess(response){
        console.log('Datos a guardar', response.data);
        window.location = '/catalogos/'+$scope.definicion.nombre;
        alertify.success('Proceso Completado');
      },function error(err){
        console.log('UsuariosFactory.save()->error:', err);
      });
      //alertify.confirm('Guardar Registro', '¿Esta Seguro?', ()=>{
      //}, ()=>{});
    };
    $scope.borrarRegistro = function(idr){
      alertify.confirm('Acción Importante','Esto no se puede recuperar.',() => {
        CatalogosFactory.borrar(idr).then(function succcess(response){
          $scope.catalogos.splice(_.findIndex($scope.catalogos, {id:response.data.id}),1);
          alertify.success('El registro fue borrado');
          console.log('Dato borrado: ', response.data);
        },function error(err){
          console.log('UsuariosFactory.borrar()->error:', err);
        });
      },() => {
        alertify.warning('Cancelado');
      }).set('labels', {ok:'Eliminar', cancel:'Cancelar'});
    };

  }
]);
