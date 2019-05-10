module.exports = {


  friendlyName: 'Cambiar de estado permiso',


  description: 'Función que actualiza el permiso de un user ',


  inputs: {
    perm:{
      type:'string',
      required:true,
      description:'Valor del permiso a modificar',
      example:'ver_reportes'
    },
    id:{
      type:'string',
      required:true,
      description:'El ID del user al que se le modificara el permiso'
    }
  },

  exits: {
    nouser : {
      statusCode:404,
      description:'No existe user'
    }
  },


  fn: async function (inputs, exits) {
    //init
    var user = await User.findOne({id:inputs.id});
    if(!user) {return exits.nouser('No existe user');}
    if(!user.permisos) {user.permisos = [];}

    //procedure
    var idxpermiso = _.findIndex(user.permisos,(ep) => {return ep === inputs.perm;});
    if(idxpermiso > -1) {user.permisos.splice(idxpermiso,1);}
    else {user.permisos.push(inputs.perm);}

    //finish
    await User.update({id:user.id},{permisos:user.permisos}).fetch();
    return exits.success(user.permisos);
  }
};
