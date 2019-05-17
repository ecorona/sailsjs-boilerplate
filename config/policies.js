/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  '*': ['is-logged-in','is-mfa-ok','flash', 'permisos'],

  // Bypass the `is-logged-in` policy for:
  'entrance/*': true,
  'view-nosotros': true,
  'view-contacto': true,
  'view-privacidad': true,
  'view-terminos': true,

  'view-vision':true,

  'account/validate-mfa': ['is-logged-in'],

  'account/canales': true,
  'account/logout': true,
  'view-homepage-or-redirect': true,
  'deliver-contact-form-message': true,

  'admin/*':['is-logged-in','is-mfa-ok','flash','permisos'],

  //supongamos que todo dentro de /secreto requiere que forzosamente tengas activado el MFA
  'secreto/*':['is-logged-in','is-mfa-ok','is-mfa-forced','flash','permisos'],

  //'security/grant-csrf-token': true,

};
