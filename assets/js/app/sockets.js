ng.run(['$sails','$rootScope', function($sails, $rootScope){
  $sails.on('connect', () => {
    $rootScope.$broadcast('connect');
    $rootScope.app.conectado = true;
    $rootScope.app.canales();
  });

  $sails.on('disconnect', () => {
    $rootScope.$broadcast('disconnect');
    $rootScope.app.conectado = false;
  });

  $sails.on('login', (user) => {
    const message = 'Inicio de sesión: '+ user;
    alertify.message(message);
    $rootScope.$broadcast('login', user);
  });
}]);
