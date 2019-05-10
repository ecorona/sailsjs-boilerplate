/**
 * forbidden.js
 *
 * A custom response that content-negotiates the current request to either:
 *  • log out the current user and redirect them to the login page
 *  • or send back 401 (Unauthorized) with no response body.
 *
 * Example usage:
 * ```
 *     return res.forbidden();
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       forbidden: {
 *         description: 'No tienes permiso.',
 *         responseType: 'forbidden'
 *       }
 *     }
 * ```
 */
module.exports = function forbidden(message, description) {

  var req = this.req;
  var res = this.res;

  sails.log.verbose('Ran custom response: res.forbidden()');

  if(message) {res.set('X-Exit',message||'forbidden');}
  if(description) {res.set('X-Exit-Description', description);}
  if (req.wantsJSON) {
    return res.sendStatus(403);
  } else {
    if(!message) {message ='No tiene permiso para efectuar esa operación.';}
    FlashService.error(req, message);
    return res.redirect('/dashboard');
  }

};
