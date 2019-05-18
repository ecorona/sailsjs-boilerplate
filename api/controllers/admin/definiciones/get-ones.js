module.exports = {


  friendlyName: 'Get ones',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    var definicionDesactivadas = await Definiciones.find({'estatus' : '0'});
    console.log(definicionDesactivadas);
    return exits.success(definicionDesactivadas);

  }


};
