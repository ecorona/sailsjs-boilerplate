ng.controller('404Controller', ['$rootScope', '$scope',
  function($rootScope, $scope) {
    _.extend($scope, SAILS_LOCALS);

    $scope.syncing = false;

    $rootScope.app.es404 = true;
  }
]);
