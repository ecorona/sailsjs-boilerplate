module.exports = async function(req, res, next) {

  sails.log.verbose('evaluando ruta:', req.route.path);
  //si la ruta no es de api lo dejamos pasar.
  if (req.route.path.indexOf('/api/vi/') === -1){
    return next();
  }


  if (!req.headers.authorization) {
    sails.log.warn('POLICY REJECTION: jwt : !authorization', req.url);
    return res.status(401).send('authorization header required');
  }

  const token = req.headers.authorization.split(' ')[1];

  var valid = jwt.verify(token);

  if(!valid || !valid.id){
    return res.status(401).send('Sesión jwt no válida.');
  }

  var loggedInUser = await User.findOne({id: valid.id});

  if (!loggedInUser) { //el usuario no existe mas...
    sails.log.warn('Token de usuario no existente.');
    return res.status(401).send('Sesión  jwt no válida.');
  }

  //si aun no tenemos identidad de la solicitud...
  if(!req.me){
    var sanitizedFields = ['password', 'passwordResetToken', 'passwordResetTokenExpiresAt', 'stripeCustomerId', 'emailProofToken', 'emailProofTokenExpiresAt'];
    req.me = _.omit(loggedInUser, sanitizedFields);
    sails.log.verbose('Identidad de solicitud creada en policy jwt.');
  }

  return next();
};
