
/**
 * module - incrementar
 *
 * @param  {String} elcontador  nombre del contador a incrementar
 * @param  {type} cb         callback con err y valor del contador
 */
module.exports.incrementar = function(elcontador, cb){
  var db = Contadores.getDatastore().manager;
  db.collection('contadores').findOneAndUpdate(
    { contador: elcontador }, //contador a incrementar
    //en caso que no exista, establecer su nombre
    { '$inc': {valor: 1}, '$set': {contador: elcontador}},
    {upsert: true}, //crearlo si no existe
    (err, result) => {
      if(err) {return cb(err);}
      if(!result.value && result.ok===1){
        // fué nuevo, se acaba de crear,
        // cuando es nuevo regresa null en value, regresar 1
        return cb(err, 1);
      }else{
        if(!result.value || !result.value.valor){ return cb('Algo salió mal al incrementar contador '+elcontador);}
        //regresó el documento anterior a la modificación, asi que regresarlo incrementado
        return cb(err, result.value.valor + 1);
      }
    }
  );
};
