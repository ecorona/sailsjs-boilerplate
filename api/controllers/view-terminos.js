module.exports = {


  friendlyName: 'View terminos',


  description: 'Display "Terminos" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/terminos'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
