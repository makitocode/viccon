//en ambas uri esta quemado el id del concurso el cual debe ser recibido por parametro
//esta URI lista el detalle del concurso tanto para la pagina (detalle_concurso_admin-html, que es la que 
//    el adminsitrador ve internamente con todo el detalle como para la pagina detalleconcursopublico.html que es el 
  //  html que el publico ve)
var URI = 'http://localhost:2017/api/concurso/59ad050daf317f13883fb046';
var app = angular.module("plunker", ['ngRoute']);
app.controller("ConcursoPorIdParaPublico", function($scope, $http) {
        $scope.mydata = [];
	    $http.get(URI)
            .then(function(result) {
                $scope.mydata = result.data;
               
             });
    });


   

//esta URI2 lista los videos procesados del concurso que tiene el id quemado
//se utiliza solo en  la pagina detalleconcursopublico.html que es el 
  //  html que el publico ve)
var URI2 = 'http://localhost:2017/api/video/59ad050daf317f13883fb046/Procesado';

app.controller("2ConcursoPorIdParaPublico", function($scope, $http) {
        $scope.mydata2 = [];
	    $http.get(URI2)
            .then(function(result) {
                $scope.mydata2 = result.data;
               
             });
    });


//esta URI 3 es la lista de todos los videos de esa categoria con o sin proceso pues el adminsitrador
//del concurso los puede ver
var URI3 = 'http://localhost:2017/api/video/';

app.controller("3ConcursoPorIdParaPublico", function($scope, $http) {
        $scope.mydata3 = [];
        $http.get(URI3)
            .then(function(result) {
                $scope.mydata3 = result.data;
              
             });
    });

app.directive('dynamicUrl', function () {
    return {
        restrict: 'A',
        link: function postLink(scope, element, attr) {
            element.attr('src', attr.dynamicUrlSrc);
        }
    };
});