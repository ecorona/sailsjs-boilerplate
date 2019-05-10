ng.filter('siono', () => {
  return function(value, asIcon){
    var wordNo = 'No';
    var wordSi = 'Si';
    if(asIcon) {
      wordNo = '<i class="fas fa-thumbs-down" aria-hidden></i>';
      wordSi = '<i class="fas fa-thumbs-up" aria-hidden></i>';
    }
    return value?wordSi:wordNo;
  };
});

ng.filter('totalizar', () => {
  return function(array, campo){
    if(!campo) {campo='precioNeto';}
    return '$ '+ (_.sumBy(array, campo)).toFixed(2);
  };
});

ng.filter('fecha', () => {
  var format='';
  return function(value, which){
    switch (which) {
      case 'long':
        format='DD [de] MMM [del] YYYY[,] hh:mm a';
        break;
      case 'middle':
        format='DD [de] MMMM [del] YYYY';
        break;
      case 'rh':
        format='DD [de] MMMM [del] YYYY';
        break;
      case 'short+time':
        format = format='DD/MM/YYYY hh:mma';
        break;
      default:
        format='DD/MM/YYYY';
    }
    return moment(value).format(format);
  };
});

ng.filter('resaltar', [function(){
  return function(text, term){
    if (!term) {return text;}
    if(!text){return '';}
    return text.replace(new RegExp(term, 'gi'), '<span class="texto-resaltado">$&</span>');
  };
}]);

ng.filter('nl2br', () => {
  return function(texto){
    if(!texto) {return '';}
    return texto.replace(new RegExp('\n', 'g'), '<br>');
  };
});

ng.filter('toNow', [function(){
  return function(fecha){
    if(!fecha) {return 'Sin registro';}
    return moment(fecha).fromNow();
  };
}]);

ng.filter('nombreMes', () => {
  return function(num){
    var meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ];
    return meses[num-1];
  };
});
