module.exports.colecciones = {
  permisos:[
    {nombre:'Ver Usuarios', valor:'ver_usuarios', categoria:'Usuarios'},
    {nombre:'Editar Usuarios', valor: 'editar_usuarios', categoria:'Usuarios'},
    {nombre:'Configuracion', valor:'configuracion', categoria:'Admin'},
  ],
  perfiles:
  [
    { nombre:'super',permisos:['ver_ciudadanos','editar_ciudadanos','ver_expediente','ver_prediales','editar_prediales',
      'ver_agencias','editar_agencias','ver_regidurias','editar_regidurias','ley_ingresos','ver_usuarios','editar_usuarios','configuracion'],visible: false},
    { nombre:'admin', permisos:['ver_ciudadanos','editar_ciudadanos','ver_expediente','ver_prediales','editar_prediales',
      'ver_agencias','editar_agencias','ver_regidurias','editar_regidurias','ley_ingresos','ver_usuarios','editar_usuarios','configuracion']},
    { nombre:'directivo', permisos : []},
    { nombre:'asistente', permisos : []},
    { nombre:'supervisor', permisos : []},
    { nombre:'caja', permisos : ['cobrar']},
  ],
  definiciones: [
    {tipo:'catalogo', nombre : 'unidades', titulo : 'UNIDADES'},
  ],
  catalogos: [
    { etiqueta : 'L', orden : 0, coleccion : 'unidades'},
    { etiqueta : 'M', orden : 0, coleccion : 'unidades'},
    { etiqueta : 'M2', orden : 0, coleccion : 'unidades'},
    { etiqueta : 'M3', orden : 0, coleccion : 'unidades'},

  ],
};
