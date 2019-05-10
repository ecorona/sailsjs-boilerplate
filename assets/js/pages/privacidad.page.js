ng.controller('privacidadController', ['$rootScope', '$scope',
  function($rootScope, $scope) {
    // Heredar las locales enviadas a la vista de sails
    _.extend($scope, SAILS_LOCALS);

  }
]);
