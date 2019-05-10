module.exports = {


  friendlyName: 'View site',


  description: 'Display "Site" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/contacto'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
