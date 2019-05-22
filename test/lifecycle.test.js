/*eslint-disable no-unused-vars*/

require('console-stamp')(console, {
  label:false,
  pattern:'yyyy-mm-dd HH:MM:ss.l',
  colors:{
    stamp: ['gray', 'bgBlack']
  }
});

var sails = require('sails');
var supertest;
var agent;
var autenticado;
var csrfToken;
var testUser;

/**
 * Este archivo inicializa sails para ejecutar las pruebas en el orden establecido por main.test.js
 */

before(function(done) {
  console.log('⛵ Preparando entorno de pruebas SailsJS...');

  // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.
  this.timeout(10000);

  sails.lift({
    hooks: {
      grunt: false, //vamos a probar el api, no levantamos las tareas.
      apianalytics: false //no levantamos este hook
    },
    models:{
      migrate:'alter'
    },
    port: 1381,
    custom:{
      baseUrl:'http://localhost:1381',
      firstPassword:'tester123!'
    },
    datastores:{
      default:{
        adapter: 'sails-mongo',
        url: 'mongodb://localhost:27017/sailsjs_test',
      }
    },
    session:{
      adapter:'connect-mongo',
      url: 'mongodb://localhost:27017/sailsjs_test',
    },
    log: { level: 'warn' }, //solo mostrar error y warning
  }, (err) => {
    if (err) {
      sails.log.warn('☠️ Error al inicializar el entorno de pruebas SailsJS', err);
      return done(err);
    }
    console.log('🔴 Entorno de pruebas SailsJS iniciado!');
    console.log();
    return done();
  });
});

after((done) => {
  console.log('⛵ Finalizando entorno de pruebas SailsJS...');
  sails.lower((err) => {
    if (err) {
      sails.log.warn('☠️ Error al finalizar el entorno de pruebas SailsJS: ', err);
      return done(err);
    }
    console.log('⚪ Entorno de pruebas SailsJS finalizado!');
    return done();
  });
});
