module.exports = {


  friendlyName: 'Getall',


  description: 'Getall definiciones.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    var definiciones = await Definiciones.find();
    return exits.success(definiciones);
  }


};
