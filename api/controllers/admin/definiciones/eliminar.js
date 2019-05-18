module.exports = {


  friendlyName: 'Eliminar',


  description: 'Eliminar definiciones.',


  inputs: {
    idDefinicion:{
      type: 'string',
      required: true,
      description: 'Desactiva Definiciones'
    }
  },


  exits: {

  },



  fn: async function (inputs, exits) {
    var definicion = await Definiciones.update({id:inputs.idDefinicion}, {estatus: 0}).fetch();
    console.log('estoRecibe',definicion);
    return exits.success(definicion[0]);

  }


};
