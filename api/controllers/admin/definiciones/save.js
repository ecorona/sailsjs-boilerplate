module.exports = {


  friendlyName: 'Save',


  description: 'Save definiciones.',


  inputs: {
    definicion: {
      type: 'json',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    var definicion;
    if(inputs.definicion.id){
      definicion = await Definiciones.update({id: inputs.definicion.id},inputs.definicion).fetch();
      definicion = definicion[0];
    }else{
      definicion = await Definiciones.create(inputs.definicion).fetch();
    }
    return exits.success(definicion);

  }


};
