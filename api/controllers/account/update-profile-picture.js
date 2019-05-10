//var url = require('url');
var util = require('util');
var fs = require('fs');
module.exports = {
  friendlyName: 'Actualizar imagen de perfil',
  description: 'Recibe la imagen de perfil del usuario y la guarda',
  files:['fotoperfil'],
  inputs: {
    fotoperfil: {
      description: 'Upstream for an incoming file upload.',
      type: 'ref'
    },
  },
  exits: {
    success: {
      outputDescription: 'La foto se ha subido',
    },

    noFileAttached: {
      description: 'No file was attached.',
      responseType: 'badRequest'
    },

    tooBig: {
      description: 'The file is too big.',
      responseType: 'badRequest'
    },
  },
  fn: async function ({fotoperfil}, exits) {

    // Upload the image.
    var info = await sails.uploadOne(fotoperfil, {
      dirname:'../../images/users/',
      maxBytes: 1024 * 1024 // 1 MB maximo
    })
    // Note: E_EXCEEDS_UPLOAD_LIMIT is the error code for exceeding
    // `maxBytes` for both skipper-disk and skipper-s3.
    .intercept('E_EXCEEDS_UPLOAD_LIMIT', 'tooBig')
    .intercept((err)=>new Error('The photo upload failed: '+util.inspect(err)));

    if(!info) {
      throw 'noFileAttached';
    }

    // actualizar al registro del usuario.
    await User.update({id:this.req.me.id},{
      imageUploadFd: info.fd,
      imageUploadMime: info.type,
      picture: true
    });

    //si ya teniamos una imagen,... borrarla.
    if(this.req.me.imageUploadFd) {fs.unlinkSync(this.req.me.imageUploadFd);}

    //var profilePicture = url.resolve(sails.config.custom.baseUrl, '/api/v1/account/'+this.req.me.id+'/photo');

    FlashService.success(this.req, 'La imagen de su perfil ha sido actualizada.');

    return exits.success();

  }
};
