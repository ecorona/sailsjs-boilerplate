var QRCode = require('qrcode');
module.exports = {
  friendlyName: 'Qrcode',
  description: 'Generador de Códigos QR',
  inputs: {
    texto:{
      required:true,
      type:'string',
      description:'Informacion del QR'
    },
    level:{
      type:'string',
      required:false,
      defaultsTo:'M',
      isIn:['L','M','Q','H']
    },
    margin:{
      type: 'number',
      required: false,
      defaultsTo: 1
    },
    output:{
      type:'string',
      defaultsTo:'data',
      isIn:['data','svg']
    }
  },
  exits: {
    success:{
      descripion:'El codigo se generó correctamente.'
    }
  },
  fn: async function (inputs, exits) {
    if(inputs.output==='data'){
      QRCode.toDataURL(inputs.texto, { errorCorrectionLevel: inputs.level, margin:inputs.margin }, (err, qrcodedata) => {
        if(err) {return exits.error(err);}
        sails.log.verbose('sails.helpers.qrcode->data:', qrcodedata);
        return exits.success(qrcodedata);
      });
    }else if (inputs.output==='svg'){
      QRCode.toString(inputs.texto, { errorCorrectionLevel: inputs.level, margin:inputs.margin , type:'svg'}, (err, cadena) => {
        if(err) {return exits.error(err);}
        sails.log.verbose('sails.helpers.qrcode->svg:', cadena);
        return exits.success(cadena);
      });
    }
  }
};
