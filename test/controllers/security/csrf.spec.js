describe('⚡ GET /csrftoken', () => {
  it('⚇ Debe regresar un objeto JSON con la llave _csrf string de 36 caracteres.', (done) => {
    agent = supertest(sails.hooks.http.app);
    agent
      .get('/csrftoken')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {return done(err);}
        if(!res.body || !res.body._csrf){
          return done(new Error('☹ No se encontró token csrf en la respuesta.'));
        }
        csrfToken = res.body._csrf;
        if(!csrfToken || !csrfToken.length || csrfToken.length!==36){
          return done( new Error('☹ _csrf debe ser string de 36 caracteres.::'+csrfToken.length));
        }
        return done();
      });
  });
});
