ng.factory('PerfilesFactory', ['$http', function($http){
  return {
    save: function(formData){
      return $http.post('/api/v1/admin/perfiles/save', formData);
    },
    get: function(){
      return $http.get('/api/v1/admin/perfiles/get');
    }
  };
}]);
