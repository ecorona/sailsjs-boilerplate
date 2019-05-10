ng.controller('perfilesController', [

  '$rootScope',
  '$scope',
  '$http',
  'PerfilesFactory',
  function($rootScope, $scope, $http, PerfilesFactory) {
    _.merge($scope, SAILS_LOCALS);
    $scope.perfiles = [];
    $scope.formData = {};
    $scope.perfil = {};
    /*
    ██ ███    ██ ██ ████████
    ██ ████   ██ ██    ██
    ██ ██ ██  ██ ██    ██
    ██ ██  ██ ██ ██    ██
    ██ ██   ████ ██    ██
    */
    $scope.init = function(){
      $scope.getPerfiles();
    };
    $scope.showModal = function(){
      $scope.perfil = {};
      $('#myModalPerfil').modal('show');
    };
    /*
     ██████  ███████ ████████ ██████  ███████ ██████  ███████ ██ ██      ███████ ███████
    ██       ██         ██    ██   ██ ██      ██   ██ ██      ██ ██      ██      ██
    ██   ███ █████      ██    ██████  █████   ██████  █████   ██ ██      █████   ███████
    ██    ██ ██         ██    ██      ██      ██   ██ ██      ██ ██      ██           ██
     ██████  ███████    ██    ██      ███████ ██   ██ ██      ██ ███████ ███████ ███████
    */

    $scope.getPerfiles = function(){
      PerfilesFactory.get().then(
        (response)=>{
          console.log('PerfilesFactory.get()->success:', response.data);
          $scope.perfiles = response.data;
        },
        (err)=>{
          console.log('PerfilesFactory.get()->error:', err);
        }
      );
    };
    /*
     ██████  ██    ██  █████  ██████  ██████   █████  ██████
    ██       ██    ██ ██   ██ ██   ██ ██   ██ ██   ██ ██   ██
    ██   ███ ██    ██ ███████ ██████  ██   ██ ███████ ██████
    ██    ██ ██    ██ ██   ██ ██   ██ ██   ██ ██   ██ ██   ██
     ██████   ██████  ██   ██ ██   ██ ██████  ██   ██ ██   ██
    */
    $scope.guardar = function(){
      $scope.formData.perfil = $scope.perfil;
      PerfilesFactory.save(angular.copy($scope.formData)).then(function succcess(response){
        alertify.success('Perfil agregado!.');
        var idx = _.findIndex($scope.perfiles, {id: response.data.id});
        if (idx > -1) {
          $scope.perfiles[idx] = response.data;
        }else{
          $scope.perfiles.push(response.data);
        }
        console.log('PerfilesFactory.save()->success:', response);
        $('#myModalPerfil').modal('hide');
        $scope.perfil={};
      },function error(err){
        console.log('PerfilesFactory.save()->error:', err);
      });
    };
  }
]);
