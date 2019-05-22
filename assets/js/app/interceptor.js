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
        //si hay jwt, lo usamos en la solicitud
        const jwt = localStorage.getItem('jwt');
        if(jwt){
          if(!config.headers) {config.headers={};}
          config.headers.authorization = 'Bearer '+ jwt;
        }

        return config;
      },
      'requestError': function(rejection) {
        return $q.reject(rejection);
      },
      'response': function(response) {
        //si en la respuesta viene un _csrf, lo tomamos
        if(response.data && response.data._csrf) { SAILS_LOCALS._csrf = response.data._csrf; }
        //si en la respuesta viene un jwt, lo almacenamos para usarse en zonas donde sea necesario
        if(response.data && response.data.jwt) { SAILS_LOCALS.jwt = response.data.jwt; localStorage.setItem('jwt', response.data.jwt); }
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
