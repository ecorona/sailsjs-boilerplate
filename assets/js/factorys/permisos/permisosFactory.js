ng.factory('PermisosFactory', ['$http', function($http){
  return {
    traer: function(){
      return $http.post('/api/v1/admin/users/get-permisos', {id:'grid'});
    },
    toogle: function(datos){
      return $http.post('/api/v1/admin/users/toogle-permiso', datos);
    },
    addpermiso: function(data){
      return $http.post('/api/v1/admin/users/add-permiso', data);
    },
  };
}]);
