supertest = require('supertest-session');
/**
 * Este archivo define el orden en el cual se ejecutarán las pruebas
 *
 */
require('./models/user.spec'); //crea y verifica que exista el usuario testing@snell.com.mx
require('./controllers/security/csrf.spec'); //obtiene un token csrf
require('./controllers/entrance/login.spec'); //hace login con el usuario de pruebas creado
require('./controllers/dashboard/view-dashboard.spec'); //verifica el dashboard del usuario
require('./helpers/qrcode.spec'); //verifica salida svg y png del generador de QRs
require('./services/contador.spec'); //crea un contador, lo incrementa y lo borra
require('./models/delete-test-user.spec'); //borrar el usaurio de pruebas
