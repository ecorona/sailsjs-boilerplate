ng.controller('homeController', ['$rootScope', '$scope',
  function($rootScope, $scope) {
    _.extend($scope, SAILS_LOCALS);

    $scope.syncing = false;

  }
]);
