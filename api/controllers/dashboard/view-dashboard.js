module.exports = {


  friendlyName: 'View welcome page',


  description: 'Display the dashboard "Welcome" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/dashboard',
      description: 'Desplegando dashboard a usuarios autenticados.'
    },

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
