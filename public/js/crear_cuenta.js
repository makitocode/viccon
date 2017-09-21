var app = angular.module('myApp', []);
 app.controller('myCtrl', function($scope,$http) {
 $scope.data = {};
 
$scope.submit= function(){
    console.log('clicked submit');

    $http({
        url: 'http://localhost:2017/api/usuario',
        method: 'POST',
        
        data: $scope.data
         }).then(function successCallback(response) {
        location.href = '../pages/iniciar_sesion.html'; 
  }, function errorCallback(response) {
    
    document.getElementById("mensaje_crear_concurso").innerHTML = response.data.mensaje;
    
                 $("#myModal").modal();
    
  });

   
   }
 });