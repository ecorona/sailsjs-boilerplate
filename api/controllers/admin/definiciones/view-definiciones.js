module.exports = {


  friendlyName: 'View definiciones',


  description: 'Display "Definiciones" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/admin/definiciones/definiciones'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success({'estatus':'1'});

  }


};
