ng.config(['$httpProvider', '$provide', '$qProvider', '$sailsProvider', function($httpProvider, $provide, $qProvider, $sailsProvider) {

  $provide.factory('myHttpInterceptor', ['$q', function($q) {
    return {
      'request': function(config) {
        // config/security.js csrf=true
        // Si encontramos un token csrf de regreso en la vista, lo usarémos para las solicitudes.
        if(config.method !== 'GET' && SAILS_LOCALS._csrf){
          if(!config.data) {config.data = {};}
          config.data._csrf = SAILS_LOCALS._csrf;
        }
        return config;
      },
      'requestError': function(rejection) {
        return $q.reject(rejection);
      },
      'response': function(response) {
        if(response._csrf) { SAILS_LOCALS._csrf = response._csrf; }
        return response;
      },
      'responseError': function(rejection) {
        return $q.reject(rejection);
      }
    };
  }]);

  $httpProvider.interceptors.push('myHttpInterceptor');
  $sailsProvider.interceptors.push('myHttpInterceptor');

  //configuración de sockets
  $sailsProvider.config.transports = ['websocket'];
  $sailsProvider.config.autoConnect = true;
  $sailsProvider.config.reconnection = true;
  $sailsProvider.config.reconnectionDelay = 3000;
}]);
