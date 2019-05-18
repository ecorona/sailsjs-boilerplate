module.exports = {


  friendlyName: 'Get perfiles',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    var perfiles = await Perfiles.find();
    return exits.success(perfiles);

  }


};
