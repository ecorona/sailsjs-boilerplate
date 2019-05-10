module.exports = {


  friendlyName: 'Obtener',


  description: 'Obtener permisos.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    var permisos = await Permisos.find({'estatus':'1'});
    return exits.success(permisos);


  }


};
