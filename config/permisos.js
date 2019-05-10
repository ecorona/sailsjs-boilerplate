module.exports.permisos = {
  routes:{
    //views
    '/admin/users':                               ['ver_usuarios'],
    '/admin/configuracion':                       ['configuracion'],
    //api
    '/api/v1/admin/users/getall':                 ['ver_usuarios'],
    '/api/v1/admin/users/save':                   ['editar_usuarios'],
    '/api/v1/procedimientos/guardar-cambios':     ['configuracion']
  }
};
