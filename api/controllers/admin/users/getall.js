var moment = require('moment');
module.exports = {

  friendlyName: 'Paginación',

  description: 'Paginación de cualquier modelo.',

  inputs: {
    modelo:{
      type:'string',
      required:true,
      description:'Debe conterner el nombre del modelo a accesar'
    },
    cuantos:{
      type:'number',
      required:true,
      description:'Número de registros que necesitas'
    },
    pag:{
      type:'number',
      required:true,
      description:'Número de página que se necesita'
    },
    searchFor:{
      type:'string',
      required:false,
      description:'Valor por el que se filtrara el grid solicitado'
    },
    search:{
      type:'string',
      required:false,
      description:'Valor a filtrar en el grid actual'
    },
    filtroX:{
      type:'string',
      required:false,
      description:'Si se quiere filtrar sobre un por un valor determinado'
    },
    populate:{
      type:'string',
      required:false,
      description:'Colleciones con las que se ligara y el campo mediante el cual se ligará'
    },
    datosFecha:{
      type: 'json',
      required: false,
      description: 'El objeto contiene datos, para consulta por dia, semana, mes y peridodo en especifico '
    }
  },
  exits: {

  },

  fn: async function (inputs, exits) {
    //sails.log('***************************LISTANDO  REGISTROS********************:');
    //sails.log('datos recibidos del inputs:  :', inputs.datosFecha);
    //sails.log('*********************************************************************:');
    var inicio;
    var fin;
    //fin consulta por fecha
    var skip = (inputs.cuantos * inputs.pag) - inputs.cuantos;
    var queryCount = [];
    var query = [];
    var matchGeneral = {
      $match: {}
    };
    if(inputs.datosFecha && inputs.datosFecha.mostrar && inputs.datosFecha.select){
      switch (inputs.datosFecha.select) {
        case 'dia':
          inicio = moment(moment().format('YYYY-MM-DDT00:00:00Z')).unix()*1000;
          fin = moment(moment().format('YYYY-MM-DDT23:59:59Z')).unix()*1000;
          break;
        case 'semana':
          inicio = moment().startOf('week').unix()*1000;
          fin = moment().endOf('week').unix()*1000;
          break;
        case 'mes':
          inicio = moment().startOf('month').unix()*1000;
          fin = moment().endOf('month').unix()*1000;
          break;
        case 'periodo':
          inicio = moment(moment(inputs.datosFecha.fechaInicio).format('YYYY-MM-DDT00:00:00Z')).unix()*1000;
          fin = moment(moment(inputs.datosFecha.fechaFin).format('YYYY-MM-DDT23:59:59Z')).unix()*1000;
          break;
        default:
      }
      matchGeneral.$match.createdAt = {'$gte':inicio,'$lt':fin};
    }

    var db = User.getDatastore().manager;
    var term = new RegExp(inputs.search,'i');
    var patt = new RegExp(/^[0-9\s]+$/);

    /*
    ██████  ██    ██ ███████  ██████  ██    ██ ███████ ██████   █████
    ██   ██ ██    ██ ██      ██    ██ ██    ██ ██      ██   ██ ██   ██
    ██████  ██    ██ ███████ ██    ██ ██    ██ █████   ██   ██ ███████
    ██   ██ ██    ██      ██ ██ ▄▄ ██ ██    ██ ██      ██   ██ ██   ██
    ██████   ██████  ███████  ██████   ██████  ███████ ██████  ██   ██
                                 ▀▀
    */
    var buscarEn = [];
    if(inputs.searchFor && inputs.search) {
      matchGeneral.$match.$or =[];
      buscarEn = inputs.searchFor.split(' ');
      buscarEn.forEach((ben) => {
        var res = patt.test(inputs.search);
        var linea = {};
        //sails.log('valor que regresa la expresion: ',res);
        if(res){//hay solo numeros
          linea[ben]=parseInt(inputs.search);
        }else{
          linea[ben]={'$regex':term};
        }
        matchGeneral.$match.$or.push(linea);
        //sails.log('match----->', busqueda.$match.$or);
      });
    }

    /*
    ██████   ██████  ██████  ██    ██ ██       █████  ████████ ███████
    ██   ██ ██    ██ ██   ██ ██    ██ ██      ██   ██    ██    ██
    ██████  ██    ██ ██████  ██    ██ ██      ███████    ██    █████
    ██      ██    ██ ██      ██    ██ ██      ██   ██    ██    ██
    ██       ██████  ██       ██████  ███████ ██   ██    ██    ███████
    */
    var populateGral = [];
    var addFields = {
      $addFields: {
        id:'$_id'
      }
    };
    var project = {
      $project:{
        _id:0, password: 0,  passwordResetToken:0, passwordResetTokenExpiresAt:0, stripeCustomerId:0, emailProofToken:0,
        emailProofTokenExpiresAt:0,onesignalid:0,device:0,mfa:0,socket:0
      }
    };
    queryCount.push(matchGeneral);//Agregando el mathc****************************************XD
    query.push(matchGeneral);
    if(inputs.populate && inputs.populate!==''){
      populateGral = inputs.populate.split(',');//total de colleciiones para hacer populate
      populateGral.forEach((popular) => {
        var populate = popular.split(':');//por cada posicion de populateGral, sacamos un arreglo de dos posiciones
        //populate[0] --->plurar(personas)
        //populate[1] --->singular(persona)
        var objP = {
          $lookup:{
            from: populate[0],
            localField: populate[1],
            foreignField: '_id',
            as: populate[1]
          },
        };
        var objunwind = {
          $unwind:{ path: '$'+populate[1], preserveNullAndEmptyArrays:true}
        };
        query.push(objP);//POR CADA RECORRDIO DE MODELOS LE HACEMOS pupulate
        query.push(objunwind);//POR CADA RECORRIDO DE MODELOS LE AGREGAMOS EL $unwind A LA COLECCION
        addFields.$addFields[populate[1]+'.id']= {$toString: '$'+populate[1]+'._id'};
        project.$project[populate[1]+'._id']= 0;
      });//Fin del ciclo
      query.push(addFields);// hasta el final del ciclo agregamos el $addFields
      query.push(project); // hasta el final del ciclo agregamos el $project
    }else{
      query.push(addFields);
      query.push(project);
    }

    queryCount.push({$count:'total'});
    query.push({$limit:inputs.cuantos + skip});

    if(skip>0) {query.push({$skip:skip});}
    db.collection(inputs.modelo).aggregate(queryCount).toArray((err,cResult) => {
      if(err) {return exits.error(err);}
      db.collection(inputs.modelo).aggregate(query).toArray((err, registros) => {
        if(err) {return exits.error(err);}

        //funcion temporal//por registro verifica el num de populate, y quita las relaciones null
        if(populateGral.length>0){
          registros = _.map(registros, (registro) => {
            //sails.log('populateGral-*************', populateGral.length);
            populateGral.forEach((popular) => {
              var populate = popular.split(':');
              if(registro[populate[1]].id===null){
                delete registro[populate[1]];
              }
            });//Fin del ciclo
            return registro;
          });
        }
        //fin ciclo
        var respuesta = {
          total:cResult[0]?cResult[0].total:0,
          registros:registros,
          skip:skip
        };
        return exits.success(respuesta);
      });
    });
  }

};
