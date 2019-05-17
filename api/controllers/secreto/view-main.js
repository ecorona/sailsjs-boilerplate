module.exports = {


  friendlyName: 'View main',


  description: 'Display "Main" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/secreto/main'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
