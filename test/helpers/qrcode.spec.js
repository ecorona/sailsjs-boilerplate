describe('⚡ Generador de códigos QR', () => {

  describe('⚡ base64', () => {
    it('⚇ Debe regresar string con código QR en imagedata base64', (done) => {
      sails.helpers.qrcode('Hola Mundo!').then((response) => {
        if(response.indexOf('data:image/png;base64,')>-1){
          return done();
        }
        return done(new Error('Respuesta inesperada del helper qrcode->base64:', response));
      }, (err) => {
        return done(err);
      });
    });
  });

  describe('⚡ SVG', () => {
    it('⚇ Debe regresar string con código QR en SVG', (done) => {
      sails.helpers.qrcode('Hola Mundo!','M',1,'svg').then((response) => {
        if(response.indexOf('<svg xmlns="http://www.w3.org/2000/svg"')>-1){
          return done();
        }
        return done(new Error('Respuesta inesperada del helper qrcode->svg:', response));
      }, (err) => {
        return done(err);
      });
    });
  });

});
