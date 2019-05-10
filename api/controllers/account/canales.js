module.exports = {


  friendlyName: 'Canales',


  description: 'Canales account.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    //si no es socket, no hacer nada
    if(!this.req.isSocket){return exits.success();}

    //unirlo al canal general publico de la app.
    sails.sockets.join(this.req, 'publico');

    var profile = {};
    var canales = ['publico'];

    if(this.req.me){
      //unirlo al canal general privado de la app.
      sails.sockets.join(this.req, 'privado');
      canales.push('privado');
      profile = {
        id: this.req.me.id,
        fullName: this.req.me.fullName,
        emailAddress: this.req.me.emailAddress,
        permisos: this.req.me.permisos,
      };
    }

    return exits.success({profile, canales});
  }

};
