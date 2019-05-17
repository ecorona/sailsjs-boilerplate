module.exports = {


  friendlyName: 'Disable mfa',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    await User.update({id:this.req.me.id},{mfa:{enrolled:false}});
    this.req.session.mfaPassed = false;
    return exits.success();

  }


};
