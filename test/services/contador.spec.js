/*eslint-disable max-nested-callbacks*/
describe('⚡ Contador de sistema.', () => {
  it('⚇ Debe regresar un numero 1 la primera vez, y un 2 la segunda', (done) => {
    var elcontador = 'tester';
    Contadores.destroy({contador:elcontador}).exec((err)=>{
      if(err) {return done(err);}
      contador.incrementar(elcontador, (err, resultado) => {
        if(err) {return done(err);}
        if(resultado !== 1){
          return done(new Error('Salida inesperada del helper contador.incrementar.'));
        }
        contador.incrementar(elcontador, (err, resultado) => {
          if(err) {return done(err);}
          if(resultado !== 2){
            return done(new Error('Salida inesperada del helper contador.incrementar.'));
          }
          Contadores.destroy({contador:elcontador}).exec((err)=>{
            if(err) {return done(err);}
            return done();
          });
        });
      });
    });
  });
});
