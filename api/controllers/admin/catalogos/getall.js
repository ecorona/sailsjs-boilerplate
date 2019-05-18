module.exports = {
  friendlyName: 'Get todos los catalogos',
  description: 'Funcion para regresar todos los catalogos dinamicos segun el controller que los pida',
  inputs: {
    catalogos:{
      type:'string',
      required:true,
      description: 'Cadena separada por comas de todos los catalogos dinamicos necesarios'
    }
  },
  exits: {
  },

  fn: async function (inputs, exits) {
    var cats = inputs.catalogos.split(',');
    var promesas = [];

    cats.forEach((catalogo) => {
      var buscar = catalogo.trim();
      promesas.push(new Promise((chido, fail)=>{
        Catalogos.find({where:{coleccion:buscar}}).exec((err,refs) => {
          if(err) {fail(err);}
          chido(refs);
        });
      }));
    });

    Promise.all(promesas).then((cat)=>{
      cat = _.flattenDeep(cat);
      var resultados = {};
      _.map(cat,(resultado) => {
        if(!resultados[resultado.coleccion]) {resultados[resultado.coleccion] = [];}
        resultados[resultado.coleccion].push(resultado);
        return;
      });
      return exits.success(resultados);
    });

  }

};
