module.exports = {


  friendlyName: 'View nosotros',


  description: 'Display "Nosotros" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/nosotros'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};
