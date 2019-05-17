module.exports = {


  friendlyName: 'Save',


  description: 'Save configuracion.',


  inputs: {
    configuracion:{
      type:'json',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    var opcionesValidas = [
      'rejectUnauthorized',
      'smtpPort',
      'smtpSecure',
      'flashType',
      'emailFromName',
      'smtpUser',
      'invitarMultiFactor',
      'smtpPassword',
      'smtpHost',
      'internalEmailAddress',
      'verifyEmailAddresses'
    ];
    var path = require('path');
    var configuracionPath = path.resolve(sails.config.appPath, '.tmp/configuracion.json');
    var configuracionInfo = await sails.helpers.fs.readJson(configuracionPath).tolerate('doesNotExist');
    if(!configuracionInfo.flashType){
      return exits.error('No existe');
    }
    var nuevasOpciones = _.pick(inputs.configuracion,opcionesValidas);
    var actualizado = _.merge(configuracionInfo, nuevasOpciones);
    await sails.helpers.fs.writeJson.with({
      destination: configuracionPath,
      json: actualizado,
      force: true
    })
    .tolerate((err)=>{
      sails.log.warn('For some reason, could not write bootstrap version .json file.  This could be a result of a problem with your configured paths, or, if you are in production, a limitation of your hosting provider related to `pwd`.  As a workaround, try updating app.js to explicitly pass in `appPath: __dirname` instead of relying on `chdir`.  Current sails.config.appPath: `'+sails.config.appPath+'`.  Full error details: '+err.stack+'\n\n(Proceeding anyway this time...)');
      return exits.error(err);
    });

    sails.config.opciones = actualizado;

    return exits.success();

  }


};
