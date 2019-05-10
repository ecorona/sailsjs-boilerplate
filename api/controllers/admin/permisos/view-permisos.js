module.exports = {


  friendlyName: 'Ver permisos',


  description: 'Mostrar "Permisos" pagina.',


  exits: {

    success: {
      viewTemplatePath: 'pages/admin/permisos/permisos'
    }

  },


  fn: async function (inputs, exits) {


    return exits.success();

  }


};
