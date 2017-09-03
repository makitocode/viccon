var URI = 'http://localhost:2017/api/concurso/59ac60c4305c221cc4926b61';
angular.module("myapp", [])
    .controller("ConcursoPorIdParaPublico", function($scope, $http) {
        $scope.mydata = [];
	    $http.get(URI)
            .then(function(result) {
                $scope.mydata = result.data;
             });
    });