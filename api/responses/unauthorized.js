/**
 * unauthorized.js
 *
 * A custom response that content-negotiates the current request to either:
 *  • log out the current user and redirect them to the login page
 *  • or send back 401 (Unauthorized) with no response body.
 *
 * Example usage:
 * ```
 *     return res.unauthorized();
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       badCombo: {
 *         description: 'That email address and password combination is not recognized.',
 *         responseType: 'unauthorized'
 *       }
 *     }
 * ```
 */
module.exports = function unauthorized(message, description) {

  var req = this.req;
  var res = this.res;

  sails.log.verbose('Ran custom response: res.unauthorized()');

  if(message) {res.set('X-Exit',message||'forbidden');}
  if(description) {res.set('X-Exit-Description', description);}
  if (req.wantsJSON) {
    return res.sendStatus(401);
  } else {
    FlashService.error(req, 'No tiene permiso para entrar.');
    if (req.session.userId) {
      delete req.session.userId;
      return res.redirect('/login');
    }
    return res.redirect('/');
  }

};
