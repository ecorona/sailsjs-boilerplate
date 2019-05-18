ng.factory('CatalogosFactory', ['$http', function($http) {
  return{
    init: function(dato){
      return $http.post('/api/v1/catalogos/validar', dato);
    },
    save: function(catalogo){
      return $http.post('/api/v1/admin/catalogos/save', {registro: catalogo});
    },
    borrar: function(idr){
      return $http.post('/api/v1/admin/catalogos/borrar', {id: idr});
    },
    getAll: function(data){
      return $http.post('/api/v1/admin/catalogos/getall', data);
    },
  };
}]);
