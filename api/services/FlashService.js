
// Pone "en cola", los mensajes "flash" que se vallan destinando por cada funcion en cada objeto.
// Estos mensajes son procesados por el fron en assets/js/pages/app.js al cargarse la app
// de angular, son procesados despues de cargarse y tambien son agregados al scope de cada controller
//
// Funciona en conjunción con la policy flash.js para heredar las locales correspondientes a la vista.

module.exports = {
  success: function(req, message) {
    if(!req.session.flashMessages || !req.session.flashMessages['success']) {req.session.flashMessages={success:[]};}
    req.session.flashMessages['success'].push(message);
  },
  info: function(req, message) {
    if(!req.session.flashMessages || !req.session.flashMessages['info']) {req.session.flashMessages={info:[]};}
    req.session.flashMessages['info'].push(message);
  },
  warning: function(req, message) {
    if(!req.session.flashMessages || !req.session.flashMessages['warning']) {req.session.flashMessages={warning:[]};}
    req.session.flashMessages['warning'].push(message);
  },
  error: function(req, message) {
    if(!req.session.flashMessages || !req.session.flashMessages['error']) {req.session.flashMessages={error:[]};}
    req.session.flashMessages['error'].push(message);
  }
};
