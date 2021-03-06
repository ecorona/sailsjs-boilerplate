/**
 * Session Configuration
 * (sails.config.session)
 *
 * Use the settings below to configure session integration in your app.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For all available options, see:
 * https://sailsjs.com/config/session
 */
require('dotenv').config();

module.exports.session = {

  /***************************************************************************
  *                                                                          *
  * Session secret is automatically generated when your new app is created   *
  * Replace at your own risk in production-- you will invalidate the cookies *
  * of your users, forcing them to log in again.                             *
  *                                                                          *
  ***************************************************************************/
  secret: process.env.SESSION_SECRET,


  /***************************************************************************
  *                                                                          *
  * Customize when built-in session support will be skipped.                 *
  *                                                                          *
  * (Useful for performance tuning; particularly to avoid wasting cycles on  *
  * session management when responding to simple requests for static assets, *
  * like images or stylesheets.)                                             *
  *                                                                          *
  * https://sailsjs.com/config/session                                       *
  *                                                                          *
  ***************************************************************************/
  isSessionDisabled: function (req){
    return !!req.path.match(req._sails.LOOKS_LIKE_ASSET_RX);
  },
  //adapter:'connect-mongo',
  //url: 'mongodb://mongodb:27017/' + process.env.DB_NAME,
  //si se va a usar docker, cambiar localhost por mongodb

  //REDIS
  /**/
  adapter: '@sailshq/connect-redis',
  url: 'redis://redis:6379/1',
  //si no vas a usar docker, cambiar redis por el host redis deseado
  onRedisDisconnect: function() {
    sails.hooks.panico.panic();
  },
  onRedisReconnect: function() {
    sails.hooks.panico.chill();
  },
  /**/
};
