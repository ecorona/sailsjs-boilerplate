/*eslint-disable max-nested-callbacks*/
/**
 * Verificar que el usuario pueda iniciar sesion
 *
 * usa:
 *    supertest:    Se inicializa aqui, es una global que viene desde lifecycle.test.js
 *    autenticado:  Se instancia aqui despues de hacer el login, tambien es global y conserva la sesion del login.
 *                  se usará en adelante para las solicitudes que deban llevar sesión.
 *                  Este sería el mismo procedimiento para probar cualquier funcionalidad de otros usuarios.
 *                  para lo cual primero se tendria que hacer logout y repetir el procedimiento.
 */
describe('⚡ Prueba de Inicio de Sesión', () => {
  it('⚇ Debe regresar un codigo 200 un OK en texto.', (done) => {
    agent
        .put('/api/v1/entrance/login/?_csrf='+csrfToken)
        .send({
          'emailAddress': 'testing@snell.com.mx',
          'password': sails.config.custom.firstPassword,
        })
        .expect(200) //debe regresar un 200
        .expect('OK')
        .end((err)=>{
          if (err) {return done(err);}
          autenticado = agent;
          return done();
        });
  });
});
