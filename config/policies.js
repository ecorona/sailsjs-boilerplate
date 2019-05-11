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

  '*': ['is-logged-in','flash', 'permisos'],

  // Bypass the `is-logged-in` policy for:
  'entrance/*': true,
  'view-nosotros': true,
  'view-contacto': true,
  'view-privacidad': true,
  'view-terminos': true,

  'view-vision':true,

  'account/canales': true,
  'account/logout': true,
  'view-homepage-or-redirect': true,
  'deliver-contact-form-message': true,

  //'security/grant-csrf-token': true,

};
