module.exports = {


  friendlyName: 'Signup',


  description: 'Sign up for a new user account.',


  extendedDescription:
`This creates a new user record in the database, signs in the requesting user agent
by modifying its [session](https://sailsjs.com/documentation/concepts/sessions), and
(if emailing with Mailgun is enabled) sends an account verification email.

If a verification email is sent, the new user's account is put in an "unconfirmed" state
until they confirm they are using a legitimate email address (by clicking the link in
the account verification message.)`,


  inputs: {

    emailAddress: {
      required: true,
      type: 'string',
      isEmail: true,
      description: 'The email address for the new account, e.g. m@example.com.',
      extendedDescription: 'Must be a valid email address.',
    },

    origen: {
      required: true,
      type: 'string',
      description: 'El origen del registro: Empresa, Escuela: ITO',
      extendedDescription: 'Debe especificar el nombre de la empresa o escuela.',
    },
    telefono: {
      required: true,
      type: 'string',
      description: 'El telefono del registro.',
      extendedDescription: 'Debe especificar el número de telefono.',
    },

    password: {
      required: true,
      type: 'string',
      maxLength: 200,
      example: 'passwordlol',
      description: 'The unencrypted password to use for the new account.'
    },

    fullName:  {
      required: true,
      type: 'string',
      example: 'Frida Kahlo de Rivera',
      description: 'The user\'s full name.',
    }

  },


  exits: {

    invalid: {
      responseType: 'badRequest',
      description: 'Los datos proporcionados no son válidos.',
      extendedDescription: 'Todos los parametros se deben validar antes de ser enviados al servidor.'
    },
    emailAlreadyInUse: {
      statusCode: 409,
      description: 'El email que intenta registrar ya existe en nuestra base de datos.',
      extendedDescription: 'Puede intentar con otra cuenta.'
    },

  },


  fn: async function (inputs, exits) {

    var newEmailAddress = inputs.emailAddress.toLowerCase();

    // Build up data for the new user record and save it to the database.
    // (Also use `fetch` to retrieve the new ID so that we can use it below.)
    var newUserRecord = await User.create(Object.assign({
      emailAddress: newEmailAddress,
      password: await sails.helpers.passwords.hashPassword(inputs.password),
      fullName: inputs.fullName,
      origen: inputs.origen,
      profile: 'publico',
      telefono: inputs.telefono,
      disabled: true,
      tosAcceptedByIp: this.req.ip
    }, sails.config.opciones.verifyEmailAddresses? {
      emailProofToken: await sails.helpers.strings.random('url-friendly'),
      emailProofTokenExpiresAt: Date.now() + sails.config.custom.emailProofTokenTTL,
      emailStatus: 'unconfirmed'
    }:{}))
    .intercept('E_UNIQUE', 'emailAlreadyInUse')
    .intercept('E_MISSING_OR_INVALID_PARAMS', 'invalid')
    .intercept({name: 'UsageError'}, 'invalid')
    .fetch();

    // If billing feaures are enabled, save a new customer entry in the Stripe API.
    // Then persist the Stripe customer id in the database.
    if (sails.config.custom.enableBillingFeatures) {
      let stripeCustomerId = await sails.helpers.stripe.saveBillingInfo.with({
        emailAddress: newEmailAddress
      });
      await User.update(newUserRecord.id).set({
        stripeCustomerId
      });
    }

    this.req.session.userId = newUserRecord.id;

    if (sails.config.opciones.verifyEmailAddresses) {
      // Send "confirm account" email
      await notificaService.templateEmail({
        to: newEmailAddress,
        subject: 'Porfavor verifique su cuenta',
        template: 'email-verify-account',
        templateData: {
          fullName: inputs.fullName,
          token: newUserRecord.emailProofToken
        }
      });
    } else {
      sails.log.info('Skipping new account email verification... (since `verifyEmailAddresses` is disabled)');
    }
    // Since everything went ok, send our 200 response.
    return exits.success();

  }

};
