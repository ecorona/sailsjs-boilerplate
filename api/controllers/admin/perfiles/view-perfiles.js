module.exports = {


  friendlyName: 'View perfiles',


  description: 'Display "Perfiles" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/admin/perfiles'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
