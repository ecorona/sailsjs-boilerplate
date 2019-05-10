// flash.js hereda los mensajes encontrados en session.flashMessages a locals.
// para su posterior proceso en la vista frontal
//
// Pasan a SAILS_LOCALS.flashMessages
//
module.exports = function(req, res, next) {
  res.locals.flashMessages = { success: [], error: [], warning: [], info: []};

  if(!req.session.flashMessages) {
    req.session.flashMessages = { success: [], error: [], warning: [], info: [] };
    return next();
  }
  res.locals.flashMessages = _.clone(req.session.flashMessages);

  // Clear flash
  req.session.flashMessages = { success: [], error: [], warning: [], info: [] };
  return next();
};
