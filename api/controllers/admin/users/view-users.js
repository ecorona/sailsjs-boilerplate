module.exports = {


  friendlyName: 'View users',


  description: 'Display "Users" page.',

  inputs:{
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/admin/users'
    }

  },


  fn: async function (inputs, exits) {
    // Respond with view.
    return exits.success();

  }


};
