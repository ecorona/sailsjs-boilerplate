module.exports = {


  friendlyName: 'Download photo',


  description: 'Download a photo of a user.',


  inputs: {
    id: {
      description: 'The id of the user whose photo we\'re downloading.',
      type: 'string',
      required: true
    }
  },


  exits: {
    success: {
      outputDescription: 'The streaming bytes of the specified user\'s photo.',
      outputType: 'ref'
    },
    forbidden: { responseType: 'forbidden' },
    notFound: { responseType: 'notFound' }
  },


  fn: async function (inputs, exits) {

    var user = await User.findOne({id: inputs.id});
    if (!user) { throw 'notFound'; }

    this.res.type(user.imageUploadMime);

    var downloading = await sails.startDownload(user.imageUploadFd);

    return exits.success(downloading);

  }


};
