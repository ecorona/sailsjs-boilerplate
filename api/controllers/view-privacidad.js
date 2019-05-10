module.exports = {


  friendlyName: 'View privacidad',


  description: 'Display "Privacidad" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/privacidad'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
