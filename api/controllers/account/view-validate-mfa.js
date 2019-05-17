module.exports = {


  friendlyName: 'View validate mfa',


  description: 'Display "Validate mfa" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/account/validate-mfa'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
