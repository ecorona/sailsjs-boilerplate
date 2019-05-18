module.exports = {


  friendlyName: 'Save',


  description: 'Save perfiles.',


  inputs: {
    perfil: {
      type: 'json',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    var perfil = await Perfiles.create(inputs.perfil).fetch();
    return exits.success(perfil);

  }


};
