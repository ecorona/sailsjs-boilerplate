/*eslint-disable no-unused-vars*/

if(SAILS_LOCALS && SAILS_LOCALS._environment && SAILS_LOCALS._environment ==='production'){
  console.log= function(){return;};
}

var ng = angular.module('angularjs-app',[
  'ngSails',
  'ngSanitize'
]);

ng.run(['$rootScope', '$sails', function($rootScope, $sails){
  $rootScope.app = {
    name: SAILS_LOCALS.app.name,
    version: SAILS_LOCALS.app.version,
    author: SAILS_LOCALS.app.author,
    conectado: false,
    canales: function(){
      $sails.get('/api/v1/account/canales').then(
        (response) => {
          console.log('$GET /api/v1/account/canales->response:', response.data);
        }, (error) => {
          console.log('$GET /api/v1/account/canales->error:', error);
        }
      );
    }
  };

  if(SAILS_LOCALS && SAILS_LOCALS.me && SAILS_LOCALS.me.id){
    $rootScope.app.usuario = SAILS_LOCALS.me;
  }
  if(SAILS_LOCALS && SAILS_LOCALS.flashMessages && SAILS_LOCALS.flashType==='alertify'){
    alertifyFlash(SAILS_LOCALS.flashMessages);
  }
}]);
