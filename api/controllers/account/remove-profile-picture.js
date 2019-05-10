var fs = require('fs');

module.exports = {


  friendlyName: 'Remove profile picture',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    var user = await User.findOne({id:this.req.me.id});

    //borrar el archivo.
    fs.unlinkSync(user.imageUploadFd);

    //actualizar db
    await User.update({id:this.req.me.id},{
      imageUploadFd: '',
      imageUploadMime: '',
      picture: false
    });

    FlashService.success(this.req, 'La imagen de su perfil ha sido removida.');

    return exits.success();

  }


};
