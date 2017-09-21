var app = angular.module('myApp', []);
 app.controller('myCtrl', function($scope,$http) {
 $scope.data = {};
 
$scope.submit= function(){
   

    $http({
        url: 'http://localhost:2017/api/usuario/'+$scope.data.email,
        method: 'POST',
        data: {'clave':$scope.data.clave}
     }).then(function successCallback(response) {
       location.href = 'concurso_admin.html'; 
  }, function errorCallback(response) {
    
    document.getElementById("mensaje_crear_concurso").innerHTML = response.data.mensaje;
    
                 $("#myModal").modal();
    
  });
    
   }
 });