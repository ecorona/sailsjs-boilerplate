/**
 * Logsistema.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    user:{
      model:'user'
    },
    userName:{
      type:'string',
      defaultsTo:''
    },
    profile:{
      type:'string',
      defaultsTo:''
    },
    lastSeenAt:{
      type:'number',
      defaultsTo:0
    },
    originalUrl:{
      type:'string',
      defaultsTo:''
    },
    modelo:{
      type:'string',
      defaultsTo:''
    },
    action:{
      type:'string',
      defaultsTo:''
    },
    parameters:{
      type:'ref',
      defaultsTo:''
    },
    method:{
      type:'string',
      defaultsTo:''
    },
    url:{
      type:'string',
      defaultsTo:''
    },
    routePath:{
      type:'string',
      defaultsTo:''
    },
    isSocket:{
      type:'boolean',
      defaultsTo:false
    },
    /*headers:{
      type:'ref',
      defaultsTo:''
    },*/
    ip:{
      type:'string',
      defaultsTo:'',
    },
    host:{
      type:'string',
      defaultsTo:'',
    },
    userAgent:{
      type:'string',
      defaultsTo:'',
    },
    referer:{
      type:'string',
      defaultsTo:'',
    },
    req:{
      type:'ref',
      defaultsTo:''
    },
    body:{
      type:'ref',
      defaultsTo:''
    },
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};
