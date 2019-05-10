ng.controller('accountOverviewController', ['$rootScope', '$scope',
  function($rootScope, $scope) {
    _.extend($scope, window.SAILS_LOCALS);

    // Server error state for the form
    $scope.cloudError = '';

  }
]);
