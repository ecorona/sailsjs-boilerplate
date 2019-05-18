module.exports = {


  friendlyName: 'View catalogos',


  description: 'Display "Catalogos" page.',
  inputs:{
    coleccion: {
      description: 'El nombre de la colección a la que se desea accesar.',
      type: 'string',
      required: false
    },

    id: {
      descripcion: 'El id del registro de la colección.',
      type: 'string',
      required:false
    },

  },
  exits: {

    success: {
      viewTemplatePath: 'pages/admin/catalogos/catalogos'
    }

  },


  fn: async function (inputs, exits) {
    var definicion = {};
    if(inputs.coleccion && !inputs.id){
      definicion = await Definiciones.findOne({nombre: inputs.coleccion});
      var catalogos = await  Catalogos.find({coleccion: inputs.coleccion});
      //sails.log('Catalogos: ', catalogos);
      return exits.success({catalogos: catalogos, definicion: definicion});
    }else if(inputs.coleccion && inputs.id && inputs.id !=='nuevo'){
      definicion = await Definiciones.findOne({nombre: inputs.coleccion});
      var catalogo = await  Catalogos.findOne({id: inputs.id});
      //sails.log('Catalogos: ', catalogos);
      return exits.success({definicion: definicion, catalogo: catalogo});
    }else if(inputs.id ==='nuevo'){
      definicion = await Definiciones.findOne({nombre: inputs.coleccion});
      return exits.success({catalogo: {}, definicion: definicion});
    }
    else{
      return exits.success();
    }

  }


};
