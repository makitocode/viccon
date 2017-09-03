angular.module('demo', [])
.controller('ConcursoListController', function($scope, $http) {
    $http.get('http://localhost:2017/api/concurso').
        then(function(response) {
            $scope.concursos = response.data;
        });
});