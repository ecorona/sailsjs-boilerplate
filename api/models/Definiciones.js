/**
 * Definiciones.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    tipo: {
      type: 'string',
      required: true,
      description: 'Define el tipo de definición guardada',
      example: 'catalogo',
      protect:true
    },
    nombre: {
      type: 'string',
      required: true,
      description: 'Define el nombre del catalogo, este se va a ocupar en Catalogos',
      unique: true,
      maxLength: 50,
      example: 'colores',
      protect:true
    },
    titulo:{
      type: 'string',
      required: false,
      defaultsTo: '',
      description: 'Define el nombre del catalogo que se mostrará en la vista.',
      maxLength: 50,
      example: 'Colores'
    },
    label:{
      type:'string',
      required: false,
      defaultsTo: '',
      description:'El placeholder del campo principal del catalogo',
      example: 'Color'
    },
    icon:{
      type:'string',
      required: false,
      description: 'Define el icono a mostrar en la interfaz de usuario',
      defaultsTo:'',
      example: 'fa-tag'
    },
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },
  /*
███    ███ ███████ ████████  ██████  ██████   ██████  ███████
████  ████ ██         ██    ██    ██ ██   ██ ██    ██ ██
██ ████ ██ █████      ██    ██    ██ ██   ██ ██    ██ ███████
██  ██  ██ ██         ██    ██    ██ ██   ██ ██    ██      ██
██      ██ ███████    ██     ██████  ██████   ██████  ███████
*/


};
