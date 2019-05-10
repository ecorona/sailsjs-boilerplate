ng.directive('tituloPagina', [function() {
  return {
    restrict: 'E',
    transclude: true,
    template: JST['assets/templates/sistema/titulo-paginaDirectiva.html']()
  };
}]);
