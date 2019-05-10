ng.controller('configuracionController', ['$rootScope', '$scope', '$http',
  function($rootScope, $scope, $http) {
    _.merge($scope, SAILS_LOCALS);

    $scope.syncing = false;
    $scope.save = function(){
      alertify.confirm($rootScope.app.name, '¿Está Seguro?', () => {
        $scope.syncing = true;
        $http.post('/api/v1/admin/configuracion/save', {configuracion:$scope.configuracion}).then(function succcess(response){
          console.log('POST /api/v1/admin/configuracion/save->response:', response);
          document.location = '/admin/configuracion';
        },function error(err){
          console.log('POST /api/v1/admin/configuracion/save->error:', err);
          $scope.syncing = false;
        });
      }, () => {});
    };
  }
]);
