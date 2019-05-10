ng.controller('dashboardController', ['$rootScope', '$scope',
  function($rootScope, $scope) {
    // Attach any initial data from the server.
    _.extend($scope, SAILS_LOCALS);
  }
]);
