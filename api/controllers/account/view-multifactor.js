/*eslint-disable camelcase*/
const speakeasy = require('speakeasy');
const QRCode = require(`qrcode`);

module.exports = {


  friendlyName: 'View multifactor',


  description: 'Display "Multifactor" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/account/multifactor'
    }

  },


  fn: async function (inputs, exits) {

    //si el usuario no lo tiene activado, generarle un codigo y la pagina debe mostrar
    // el proceso de enrolamiento para activar el primer token.
    //
    // Si ya lo tiene activado, debe darsele una opcion para desactivarlo.

    //Generar token secreto

    const user = await User.findOne({id:this.req.me.id});

    //si el usuario no tiene registro mfa (Multiple Factor Authentication)
    if(!user.mfa || !user.mfa.enrolled){

      //generar enrolamento
      const options = {
        issuer: sails.config.custom.app.name,
        name: `${sails.config.custom.app.name} (${ user.fullName })`,
        length: 64
      };

      const { base32, otpauth_url } = speakeasy.generateSecret(options);

      //almacenar de forma temporal
      const mfa = {
        created: new Date(),
        enrolled: false, //aun no está activo
        secret: base32,
        otp: otpauth_url
      };

      await User.update({id:user.id},{mfa:mfa});

      const qrcode = await QRCode.toDataURL(otpauth_url,{ errorCorrectionLevel: 'H' });

      return exits.success({base32, otpauth_url, user, qrcode});


    }

    return exits.success({user});

  }


};
