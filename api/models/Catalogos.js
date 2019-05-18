/**
 * Catalogos.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    coleccion:{
      type:'string',
      required: true,
      description: 'Define el nombre del catalogo al que pertenece el registro',
      maxLength: 50,
      example: 'permisos'
    },
    etiqueta:{
      type:'string',
      required:true,
      description: 'El valor a mostrar en la vista donde se necesite este catalogo',
      example: 'Ver Reportes'
    },
    valor: {
      type: 'string',
      description: 'Define el valor del registro del catalogo si este tiene un valor diferente al mostrado (twin)',
      example: 'ver_reportes',
      required:false,
      defaultsTo: '',
      allowNull:false
    },
    orden:{
      type:'number',
      description: 'Este valor puede ser utilizado para ordenar los registros numericamente',
      defaultsTo: 0
    }


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};
