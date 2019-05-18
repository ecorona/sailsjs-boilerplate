/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /*
  ██████  ██    ██ ██████  ██      ██  ██████  ██████
  ██   ██ ██    ██ ██   ██ ██      ██ ██      ██    ██
  ██████  ██    ██ ██████  ██      ██ ██      ██    ██
  ██      ██    ██ ██   ██ ██      ██ ██      ██    ██
  ██       ██████  ██████  ███████ ██  ██████  ██████
  */
  //views
  'GET  /':                     { action: 'view-homepage-or-redirect' },
  'GET  /nosotros':             { action: 'view-nosotros' },
  'GET  /contacto':             { action: 'view-contacto' },
  'GET  /privacidad':           { action: 'view-privacidad' },
  'GET  /terminos':             { action: 'view-terminos' },
  'GET  /login':                { action: 'entrance/view-login' },
  'GET  /email/confirm':        { action: 'entrance/confirm-email' },
  'GET  /email/confirmed':      { view:   'pages/entrance/confirmed-email' },
  'GET  /password/forgot':      { action: 'entrance/view-forgot-password' },
  'GET  /password/new':         { action: 'entrance/view-new-password' },
  'GET  /signup':               { action: 'entrance/view-signup' },
  'GET /vision':                { action: 'view-vision' },



  //api
  'PUT  /api/v1/entrance/login':                        { action: 'entrance/login' },
  'POST /api/v1/entrance/send-password-recovery-email': { action: 'entrance/send-password-recovery-email' },
  'POST /api/v1/entrance/update-password-and-login':    { action: 'entrance/update-password-and-login' },
  'POST /api/v1/deliver-contact-form-message':          { action: 'deliver-contact-form-message' },
  'POST /api/v1/entrance/signup':                       { action: 'entrance/signup' },

  /*
  ██████  ██████  ███████ ███████ ██ ██      ███████ ███████
  ██   ██ ██   ██ ██      ██      ██ ██      ██      ██
  ██████  ██████  █████   █████   ██ ██      █████   ███████
  ██      ██   ██ ██      ██      ██ ██      ██           ██
  ██      ██   ██ ███████ ██      ██ ███████ ███████ ███████
  */
  //view
  'GET  /admin/perfiles':                     { action: 'admin/perfiles/view-perfiles' },
  //api
  'GET  /api/v1/admin/perfiles/get':          { action: 'admin/perfiles/get' },
  'POST /api/v1/admin/perfiles/save':         { action: 'admin/perfiles/save' },

  /*
   █████   ██████  ██████  ██████  ██    ██ ███    ██ ████████
  ██   ██ ██      ██      ██    ██ ██    ██ ████   ██    ██
  ███████ ██      ██      ██    ██ ██    ██ ██ ██  ██    ██
  ██   ██ ██      ██      ██    ██ ██    ██ ██  ██ ██    ██
  ██   ██  ██████  ██████  ██████   ██████  ██   ████    ██
  */
  //views
  'GET  /dashboard':             { action: 'dashboard/view-dashboard' },
  'GET  /account':               { action: 'account/view-account-overview' },
  'GET  /account/password':      { action: 'account/view-edit-password' },
  'GET  /account/profile':       { action: 'account/view-edit-profile' },
  'GET  /account/multifactor':   { action: 'account/view-multifactor' },
  'GET  /account/validate-mfa':  { view:  'pages/account/validate-mfa'},

  //api
  '/api/v1/account/logout':                          { action: 'account/logout' },
  '/logout':                                         '/api/v1/account/logout',
  'PUT  /api/v1/account/update-password':            { action: 'account/update-password' },
  'PUT  /api/v1/account/update-profile':             { action: 'account/update-profile' },
  'PUT  /api/v1/account/validate-mfa':               { action: 'account/validate-mfa'},
  'PUT  /api/v1/account/disable-mfa':                { action: 'account/disable-mfa' },
  'GET  /api/v1/account/canales':                    { action: 'account/canales' },
  'GET  /api/v1/account/:id/photo':                  { action: 'account/download-photo', skipAssets: false },
  'POST /api/v1/account/update-profile-picture':     { action: 'account/update-profile-picture' },
  'POST /api/v1/account/remove-profile-picture':     { action: 'account/remove-profile-picture' },

  /*
   █████  ██████  ███    ███ ██ ███    ██
  ██   ██ ██   ██ ████  ████ ██ ████   ██
  ███████ ██   ██ ██ ████ ██ ██ ██ ██  ██
  ██   ██ ██   ██ ██  ██  ██ ██ ██  ██ ██
  ██   ██ ██████  ██      ██ ██ ██   ████
  */
  //view
  'GET  /admin/users':                            { action: 'admin/users/view-users' },
  'GET  /admin/configuracion':                    { action: 'admin/configuracion/view-configuracion' },
  //api
  'POST /api/v1/admin/users/getall':              { action: 'admin/users/getall'},
  'POST /api/v1/admin/users/save':                { action: 'admin/users/save'},
  'POST /api/v1/admin/users/toogle-permiso':      { action: 'admin/users/toogle-permiso' },
  'POST /api/v1/admin/configuracion/save':        { action: 'admin/configuracion/save' },
  /*
  ██████  ███████ ██████  ███    ███ ██ ███████  ██████  ███████
  ██   ██ ██      ██   ██ ████  ████ ██ ██      ██    ██ ██
  ██████  █████   ██████  ██ ████ ██ ██ ███████ ██    ██ ███████
  ██      ██      ██   ██ ██  ██  ██ ██      ██ ██    ██      ██
  ██      ███████ ██   ██ ██      ██ ██ ███████  ██████  ███████
  */

  //views
  'GET  /admin/permisos':                         { action: 'admin/permisos/view-permisos' },
  //api
  'GET  /api/v1/admin/permisos/get':              { action: 'admin/permisos/get' },
  'POST /api/v1/admin/permisos/save':             { action: 'admin/permisos/save' },

  /*
   ██████  █████  ████████  █████  ██       ██████   ██████   ██████  ███████
  ██      ██   ██    ██    ██   ██ ██      ██    ██ ██       ██    ██ ██
  ██      ███████    ██    ███████ ██      ██    ██ ██   ███ ██    ██ ███████
  ██      ██   ██    ██    ██   ██ ██      ██    ██ ██    ██ ██    ██      ██
   ██████ ██   ██    ██    ██   ██ ███████  ██████   ██████   ██████  ███████
  */
  //views
  'GET  /catalogos/:coleccion?/:id?':         { action: 'admin/catalogos/view-catalogos' },
  //api
  'POST  /api/v1/admin/catalogos/getall':     { action: 'admin/catalogos/getall' },
  'POST /api/v1/admin/catalogos/save':        { action: 'admin/catalogos/save' },
  'POST /api/v1/admin/catalogos/borrar':      { action: 'admin/catalogos/borrar' },

  /*
  ██████  ███████ ███████ ██ ███    ██ ██  ██████ ██  ██████  ███    ██ ███████ ███████
  ██   ██ ██      ██      ██ ████   ██ ██ ██      ██ ██    ██ ████   ██ ██      ██
  ██   ██ █████   █████   ██ ██ ██  ██ ██ ██      ██ ██    ██ ██ ██  ██ █████   ███████
  ██   ██ ██      ██      ██ ██  ██ ██ ██ ██      ██ ██    ██ ██  ██ ██ ██           ██
  ██████  ███████ ██      ██ ██   ████ ██  ██████ ██  ██████  ██   ████ ███████ ███████
  */
  //views
  'GET  /admin/definiciones':                     { action: 'admin/definiciones/view-definiciones' },
  //api
  'GET  /api/v1/admin/definiciones/getall':       { action: 'admin/definiciones/getall' },
  'POST /api/v1/admin/definiciones/save':         { action: 'admin/definiciones/save' },
  'POST /api/v1/admin/definiciones/eliminar':     { action: 'admin/definiciones/eliminar'},
  'GET  /api/v1/admin/definiciones/get-ones':     { action: 'admin/definiciones/get-ones' },
};
