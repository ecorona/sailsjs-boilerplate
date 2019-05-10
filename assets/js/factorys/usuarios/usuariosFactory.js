/* global ng*/
ng.factory('UsuariosFactory', ['$http','$rootScope', function($http,$rootScope) {
  return {
    save: function(data){
      return $http.post('/api/v1/admin/users/save', data);
    },
    get: function(){
      return $http.get('/api/v1/admin/users/get');
    },
    tienePermiso: function(data){
      if(typeof data === 'string'){ data = [data];}
      var found = _.intersection(data, $rootScope.app.usuario.permisos);
      return found.length>0;
    },
  };
}]);
