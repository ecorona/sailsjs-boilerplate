module.exports = {


  friendlyName: 'View configuracion',


  description: 'Display "Configuracion" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/admin/configuracion'
    }

  },


  fn: async function (inputs, exits) {
    var path = require('path');

    var configuracionPath = path.resolve(sails.config.appPath, '.tmp/configuracion.json');
    var configuracionInfo = await sails.helpers.fs.readJson(configuracionPath).tolerate('doesNotExist');

    // Respond with view.
    return exits.success({configuracion:configuracionInfo});

  }


};
