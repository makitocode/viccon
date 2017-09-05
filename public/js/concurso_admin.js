//este debe recibir de iniciar_Sesion el objeto que trae el id del usuario y el nombre del usaurio
//para poder pasar por parametro en esta url quemada el id del usuario y asi le traiga solo los 
//concursos que a el le tocan
//o crear un nuevo servicio ConsultarConcursoPorIdUsuario que haga eso, tener por parametro get el id 
//del usuari y que solo traiga los concursos por usuario
angular.module('concursomod', [])
.controller('ConcursoListController', function($scope, $http) {
    $http.get('http://localhost:2017/api/concurso').
        then(function(response) {
            $scope.concursos = response.data;
        });		
});