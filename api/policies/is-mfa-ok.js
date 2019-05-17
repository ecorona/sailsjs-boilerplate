module.exports = async function (req, res, proceed) {

  if (req.session.mfaOk) {
    return proceed();
  }

  //almacenamos a donde queria ir...
  req.session.originalUrl = req.originalUrl;

  if(req.wantsJSON || req.isSocket){
    return res.status(403).json({problem:'MFAREQUIRED'});
  }

  res.redirect('/account/validate-mfa');

};
