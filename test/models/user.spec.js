/*eslint-disable max-nested-callbacks*/
/**
 * Probar que exista el usuario super@snell.com.mx
 */
describe('⚡ Crear usuario para pruebas', () => {
  it('⚇ Debe regresar 1 user', (done) => {
    sails.helpers.passwords.hashPassword(sails.config.custom.firstPassword).then((password) => {
      //nos aseguramos que no exista primero
      User.destroy({emailAddress:'testing@snell.com.mx'}).exec((err) => {
        if(err) {return done(err);}
        User.create({
          permisos: [],
          emailAddress: 'testing@snell.com.mx',
          authorized: true,
          fullName: 'Tester de Sistema',
          isSuperAdmin: true,
          profile:'super',
          password: password
        }).meta({fetch:true}).exec((err, uSuario) => {
          if(err) {return done(err);}
          if (!uSuario || !uSuario.id || !uSuario.profile || uSuario.profile !== 'super') {
            return done(new Error('☹ No se pudo crear usuario de pruebas de sistema!.'));
          }
          testUser = uSuario;
          return done();
        });
      });
    });
  });
});

describe('⚡ Verificar que existe el usuario de pruebas', () => {
  it('⚇ Debe regresar 1 user', (done) => {
    User.findOne({emailAddress: 'testing@snell.com.mx'}).exec((err, uSuario) => {
      if(err) {return done(err);}
      if (!uSuario||!uSuario.id) {
        return done(new Error('☹ No se encuentra usuario de pruebas de sistema!.'));
      }
      return done();
    });
  });
});
