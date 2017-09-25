var app = angular.module('myApp', []);
 app.controller('myCtrl', function($scope,$http) {
 $scope.data = {};
 
$scope.submit= function(){
   
document.getElementById('loader').style.visibility = 'visible';         // Show
    $http({
        url: 'http://localhost:2017/api/usuario/'+$scope.data.email,
        method: 'POST',
        data: {'clave':$scope.data.clave}
     }).then(function successCallback(response) {
      console.log(response.data.usuario.id);
               document.getElementById('loader').style.visibility = 'hidden';           // Hide
      location.href = '/pages/concurso_admin.html#/concurso/'+response.data.usuario.id; 
      // location.href = 'concurso_admin.html'; 
  }, function errorCallback(response) {
        document.getElementById('loader').style.visibility = 'hidden';           // Hide
    document.getElementById("mensaje_crear_concurso").innerHTML = response.data.mensaje;
    
                 $("#myModal").modal();
    
  });
    
   }
 });