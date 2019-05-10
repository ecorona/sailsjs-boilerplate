ng.directive('usuarioDirectiva', [ 'PerfilesFactory', function(PerfilesFactory) {
  return {
    scope: {
      user: '=',
      bloqueado: '=',
    },
    link: function(scope) {
      PerfilesFactory.get().then((response)=>{
        console.log('PerfilesFactory.get()->success', response.data);
        scope.perfiles = response.data;
      },(err)=>{
        console.log('PerfilesFactory.get()->error',err);
      });
    },
    restrict: 'E',
    transclude: true,
    template: JST['assets/templates/users/usuariosDirectiva.html']()
  };
}]);
