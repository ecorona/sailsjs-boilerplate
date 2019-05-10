
/**
 * Verificar que el usuario pueda accesar al dashboard (debe hacer login primero)
 *
 * usa: autenticado
 */
describe('⚡ GET /dashboard', () => {
  it('⚇ Debe regresar un codigo 200 y contenido html.', (done) => {
    autenticado
      .get('/dashboard')
      .expect(200) //debe regresar un 200
      .end((err, res) => {
        if (err) {return done(err);}
        if(res.type!=='text/html' && res.charset !=='utf8'){
          return done( new Error('☹ Tipo de respuesta inesperada (esperabamos "text/html - utf8")!'));
        }
        var html = res.text;
        if(!html || !html.length){
          return done( new Error('☹ Dashboard inesperado!'));
        }
        return done();
      });
  });
});
