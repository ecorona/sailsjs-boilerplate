
module.exports.templateEmail = async function(obj){
  var nodemailer = require('nodemailer');

  if(!sails.config.opciones.smtpHost || !sails.config.opciones.smtpUser || !sails.config.opciones.smtpPassword || !sails.config.opciones.internalEmailAddress){
    sails.log.warn('⚠ notificaService.templateEmail():No se pudo enviar email: configuración SMTP incompleta.');
    return;
  }

  var cuentasMailer = nodemailer.createTransport({
    host: sails.config.opciones.smtpHost,
    port: sails.config.opciones.smtpPort, //587
    secure: sails.config.opciones.smtpSecure, // upgrade later with STARTTLS
    auth: {
      user: sails.config.opciones.smtpUser,
      pass: sails.config.opciones.smtpPassword,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: sails.config.opciones.rejectUnauthorized
    }
  });

  //renderizar la plantilla...
  obj.templateData.layout = '/layouts/layout-email';
  obj.templateData.url = require('url');
  var htmlEmail = await sails.renderView('emails/'+obj.template, obj.templateData);

  var mailObj = {
    from: '"'+(sails.config.opciones.emailFromName||'')+'" <'+ sails.config.opciones.internalEmailAddress+'>',
    to: obj.to,
    subject: obj.subject,
    html: htmlEmail
  };

  cuentasMailer.sendMail(mailObj, (error, resultado)=> {
    if (error) {
      sails.log.warn('notificaService.templateEmail():No se pudo enviar email:', error.response||'');
      throw (error);
    }
    sails.log.verbose('notificaService.templateEmail():Email enviado:', resultado);
    return (resultado);
  });
};
