ng.controller('usersController', [
  '$rootScope',
  '$scope',
  '$http',
  'UsuariosFactory',
  'PermisosFactory',
  function($rootScope, $scope, $http, UsuariosFactory, PermisosFactory) {
    _.merge($scope, SAILS_LOCALS);
    $scope.usuarios = [];
    $scope.formData = {};
    $scope.pestana = 'generales';
    $scope.user = {};
    $scope.searchGeneral = '';
    $scope.datosFecha={mostrar: false};
    /*
    ██ ███    ██ ██ ████████
    ██ ████   ██ ██    ██
    ██ ██ ██  ██ ██    ██
    ██ ██  ██ ██ ██    ██
    ██ ██   ████ ██    ██
    */
    $scope.init = function(){
      $scope.perms = [];
      PermisosFactory.traer().then((response)=>{
        //console.log('PermisosFactory.get()->success:', response.data);
        $scope.perms = response.data;
      },
      (err)=>{
        console.log('UsuariosFactory.get()->error:', err);
      });
    };
    $scope.shownPermisos = function(user){
      $scope.user = user;
      $('#myModalPermisos').modal('show');
      var p =[];
      angular.forEach(angular.copy($scope.perms), (e) => {
        if(!e.categoria) {e.categoria = 'Sin Categoria';}
        if(_.indexOf($scope.user.permisos, e.valor) > -1) {
          e.aplicado = true;
        }
        p.push(e);
      });
      $scope.permisos = _.groupBy(p,'categoria');
    };
    $scope.cambioPermiso = function(perm){
      PermisosFactory.addpermiso({id:$scope.user.id,valor:perm}).then((response)=>{
        alertify.success('Se actualizó');
        var idx = _.findIndex($scope.usuarios, {id:$scope.user.id});
        if(idx > -1) {$scope.usuarios[idx].permisos = response.data;}
      },(err)=>{
        console.log('PermisosFactory.toogle()->error:', err);
        alertify.error(err);
      });
    };
    //Agregar usuario
    $scope.showUsuario = function(user){
      if(user){
        //console.log('Datos del usuario: ****: ', user);
        $scope.user = user;
      }else{$scope.user = {};}
      $('#myModal').modal('show');
    };
    /*
     ██████  ██    ██  █████  ██████  ██████   █████  ██████  ██    ██ ███████ ██    ██  █████  ██████  ██  ██████
    ██       ██    ██ ██   ██ ██   ██ ██   ██ ██   ██ ██   ██ ██    ██ ██      ██    ██ ██   ██ ██   ██ ██ ██    ██
    ██   ███ ██    ██ ███████ ██████  ██   ██ ███████ ██████  ██    ██ ███████ ██    ██ ███████ ██████  ██ ██    ██
    ██    ██ ██    ██ ██   ██ ██   ██ ██   ██ ██   ██ ██   ██ ██    ██      ██ ██    ██ ██   ██ ██   ██ ██ ██    ██
     ██████   ██████  ██   ██ ██   ██ ██████  ██   ██ ██   ██  ██████  ███████  ██████  ██   ██ ██   ██ ██  ██████
    */
    $scope.guardarUsuario = function(){
      if($scope.user.agencia === null){delete $scope.user.agencia;}
      if($scope.user.regiduria === null){delete $scope.user.regiduria;}
      UsuariosFactory.save(angular.copy($scope.user)).then(function succcess(response){
        var idx = _.findIndex($scope.usuarios, {id: response.data.id});
        if (idx > -1) {
          alertify.success('Registro Editado Correctamente.');
          $scope.usuarios[idx] = response.data;
        }else{
          alertify.success('Registro Agregado Correctamente.');
          $scope.usuarios.push(response.data);
        }
        //console.log('UsuariosFactory.save()->success:', response);
        $scope.usuario={};
      },function error(err){
        if(err.status===403){
          alertify.error('Error al guardar datos, Contacte con el Administrador');
        }
        console.log('UsuariosFactory.save()->error:', err);
      });
    };
  }
]);
