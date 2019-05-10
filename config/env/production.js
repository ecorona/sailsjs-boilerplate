/**
 * Production environment settings
 * (sails.config.*)
 *
 * What you see below is a quick outline of the built-in settings you need
 * to configure your Sails app for production.  The configuration in this file
 * is only used in your production environment, i.e. when you lift your app using:
 *
 * ```
 * NODE_ENV=production node app
 * ```
 *
 * > If you're using git as a version control solution for your Sails app,
 * > this file WILL BE COMMITTED to your repository by default, unless you add
 * > it to your .gitignore file.  If your repository will be publicly viewable,
 * > don't add private/sensitive data (like API secrets / db passwords) to this file!
 *
 * For more best practices and tips, see:
 * https://sailsjs.com/docs/concepts/deployment
 */

require('dotenv').config();

module.exports = {
  models: {
    migrate: 'safe',
    cascadeOnDestroy: false,
  },

  blueprints: {
    shortcuts: false,
  },

  datastores:{
    default: {
      adapter: 'sails-mongo',
      url: 'mongodb://localhost:27017/' + process.env.DB_NAME,
    },
  },
  security: {
    cors: {
      allowOrigins: [
        'https://midominio.com.mx',
      ]
    },
  },
  session: {
    cookie: {
      //secure: true,
      maxAge: 24 * 60 * 60 * 1000,  // 24 hours
    },
    adapter:'connect-mongo',
    url: 'mongodb://localhost:27017/' + process.env.DB_NAME,
    secret: process.env.SESSION_SECRET,
  },
  sockets: {
    onlyAllowOrigins: [
      'https://midominio.com.mx',
    ],
  },
  log: {
    level: 'debug'
  },

  http: {
    cache: 365.25 * 24 * 60 * 60 * 1000, // One year
    trustProxy: true,
  },

  port: 1380,

  custom: {
    baseUrl: 'https://midominio.com.mx',
    internalEmailAddress: 'soporte@snell.com.mx',
  },

};
