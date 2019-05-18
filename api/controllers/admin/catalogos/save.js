module.exports = {


  friendlyName: 'Crear registro dinamico',


  description: 'Este action se encarga de crear un registro dinamico de los catalogos de un solo valor',


  inputs: {
    registro:{
      type:'json',
      required:true,
      description:'Este es el registro dinamico del catalogo'
    }
  },


  exits: {
    success:{
      statusCode: 200,
      description: 'Registro creado adecuadamente'
    },
    yaExiste:{
      statusCode:400,
      description: 'Este registro ya existe'
    }
  },


  fn: async function (inputs, exits) {
    var element = {};
    if(!inputs.registro.id){
      var registros = await Catalogos.find({etiqueta : inputs.registro.etiqueta});
      if(registros.length > 0) {return exits.yaExiste('Registro ya existe');}
      element = await Catalogos.create(inputs.registro);
    }
    else {
      element = await Catalogos.update({id:inputs.registro.id},inputs.registro);
    }
    return exits.success(element);
  }


};
