var URI = 'http://localhost:2017/api/concurso/59ac8c0a305c221cc4926b73';
var app = angular.module("myapp", []);
app.controller("ConcursoPorIdParaPublico", function($scope, $http) {
        $scope.mydata = [];
	    $http.get(URI)
            .then(function(result) {
                $scope.mydata = result.data;
               
             });
    });


   

var URI2 = 'http://localhost:2017/api/video/59ac8c0a305c221cc4926b73/Procesado';

app.controller("2ConcursoPorIdParaPublico", function($scope, $http) {
        $scope.mydata2 = [];
	    $http.get(URI2)
            .then(function(result) {
                $scope.mydata2 = result.data;
               
             });
    });