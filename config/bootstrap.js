// Import dependencies

/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function(done) {
  var path = require('path');

  var configuracionPath = path.resolve(sails.config.appPath, '.tmp/configuracion.json');
  var configuracionInfoJson = await sails.helpers.fs.readJson(configuracionPath).tolerate('doesNotExist');


  if(configuracionInfoJson && configuracionInfoJson.leyendaAnual !=='undefined'){
    //si existe el json, restaurar desde ahi!
    sails.config.opciones = configuracionInfoJson;
    sails.log(`★ Configuración inicializada (JSON)...`);
  }else{//no está el json... inicializarlo

    var opciones = {
      rejectUnauthorized: false,
      smtpPort: 587,
      smtpSecure: false,
      flashType: 'alertify', // [alertify|alert]
      emailFromName: '',
      smtpUser: '',
      invitarMultiFactor:false,
      smtpPassword: '',
      smtpHost: '',
      internalEmailAddress: '',
      verifyEmailAddresses: false,
    };

    //inicializar JSON
    await sails.helpers.fs.writeJson.with({
      destination: configuracionPath,
      json: opciones,
      force: true
    }).tolerate((err)=>{
      return done('☠ No se pudo generar el archivo .json de configuración. appPath: `'+sails.config.appPath+'`.  Error: '+err.stack+'\n\n');
    });

    sails.config.opciones = opciones;
    sails.log(`★ Configuración generada (JSON)...`);
  }

  //verificar que existan los permisos que usamos
  if(await Permisos.count()===0){
    sails.log('◊ Generando permisos.');
    await Permisos.createEach(
        sails.config.colecciones.permisos
    );
  }
  // si no existe el usuario superadmin lo creamos
  if (await User.count({emailAddress: 'super@misitio.com'})===0) {
    sails.log('◊ Generando usuario super...');
    await User.create(
        {
          permisos: [ 'ver_usuarios','editar_usuarios','configuracion'],
          emailAddress: 'super@misitio.com',
          authorized: true, //autorizado para iniciar sesión.
          fullName: 'Super Administrador de Sistema',
          isSuperAdmin: true,
          perfil: 'superadmin',
          password: await sails.helpers.passwords.hashPassword(sails.config.custom.firstPassword)
        }
    );
  }
  // si no existe el usuario admin lo creamos
  if (await User.count({emailAddress: 'admin@misitio.com'})===0) {
    sails.log('◊ Generando usuario admin...');
    await User.create(
        {
          permisos : ['configuracion'],
          emailAddress: 'admin@misitio.com',
          authorized: true,
          fullName: 'Administrador de Sistema',
          isSuperAdmin: false,
          perfil:'admin',
          password: await sails.helpers.passwords.hashPassword(sails.config.custom.firstPassword)
        });
  }

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  return done();

};
