module.exports = {
  friendlyName: 'Save',
  description: 'Save users.',
  inputs: {
    id: {
      type: 'string',
    },
    profile: {
      type: 'string',
    },
    fullName: {
      type: 'string',
      required: true
    },
    agencia: {
      type: 'string',
      required: false
    },
    regiduria: {
      type: 'string',
      required: false
    },
    telefono:{
      type: 'string',
    },
    emailAddress:{
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: false
    },
    activo: {
      type: 'boolean',
    },
    movilAccess: {
      type: 'boolean',
    },
  },
  exits: {
    success:{
      description:'El user fue guardado correctamente.'
    }
  },
  fn: async function (inputs, exits) {
    var user = inputs;
    var registro;
    if(user.password){
      var hashed = await sails.helpers.passwords.hashPassword(user.password);
      user.password = hashed;
    }
    if(inputs.id){
      registro = await User.update({id:user.id}, user).fetch();
      registro = registro[0];
    }else {
      registro = await User.create(user).fetch();
    }
    return exits.success(registro);
  }
};
