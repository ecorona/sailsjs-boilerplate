module.exports = {


  friendlyName: 'Borrar Registro',


  description: 'Puede aplicarse para cualquier registro por medio de id.',


  inputs: {
    id:{
      type:'string',
      description:'Define el id del elemento a destruir',
      required: true
    }
  },


  exits: {
    success:{
      statusCode: 200,
      description: 'El registro se borró a decuadamente'
    }
  },


  fn: async function (inputs, exits) {
    var eliminado = await Catalogos.destroy({id:inputs.id});
    return exits.success(eliminado);
  }


};
