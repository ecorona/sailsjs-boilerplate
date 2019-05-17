
/**
 * validateEmail - Valida una dirección email
 *
 * @param  {String} email el email que se desea validar
 * @return {Boolean}      el email es válido o no
 */
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


/**
 * alertifyFlash - Lanza un alertify segun venga en flashMessages
 *
 * @param  {JSON} flashMessages Estructura de mensajes
 */
function alertifyFlash(flashMessages){
  if (flashMessages && flashMessages['error'] && flashMessages['error'].length > 0) {
    flashMessages['error'].forEach((message) => {
      alertify.error(message);
    });
  }
  if (flashMessages && flashMessages['warning'] && flashMessages['warning'].length > 0) {
    flashMessages['warning'].forEach((message) => {
      alertify.warning(message);
    });
  }
  if (flashMessages && flashMessages['info'] && flashMessages['info'].length > 0) {
    flashMessages['info'].forEach((message) => {
      alertify.message(message);
    });
  }
  if (flashMessages && flashMessages['success'] && flashMessages['success'].length > 0) {
    flashMessages['success'].forEach((message) => {
      alertify.success(message);
    });
  }
}
