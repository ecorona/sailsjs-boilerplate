ng.controller('visionController', ['$rootScope', '$scope',
  function($rootScope, $scope) {
    _.extend($scope, SAILS_LOCALS);

    $scope.syncing = false;

    $scope.init = function(){
      console.log('visionController ha sido inicializado.');
      alertify.message('Hola mundo');
    };

  }
]);
