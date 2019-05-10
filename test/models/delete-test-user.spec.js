
describe('⚡ Eliminar el usuario de pruebas', () => {
  it('⚇ Debe regresar 1 user', (done) => {
    User.destroy({emailAddress: 'testing@snell.com.mx'}).meta({fetch:true}).exec((err, user) => {
      if(err) {return done(err);}
      if(!user || !user.length || user.length!==1 || !user[0].emailAddress || user[0].emailAddress !=='testing@snell.com.mx'){
        return done(new Error('☹ Respuesta inesperada al eliminar el usuario. '));
      }
      return done();
    });
  });
});
