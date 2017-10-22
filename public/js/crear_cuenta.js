var app = angular.module('myApp', []);
 app.controller('myCtrl', function($scope,$http) {
 $scope.data = {};
 
$scope.submit= function(){
    
    if($('#nombre').val().length==0||$('#apellido').val().length==0||$('#email').val().length==0
        ||$('#txtConfirmPassword').val().length==0){
    document.getElementById("mensaje_crear_concurso").innerHTML = "Todos los campos son requeridos";
      $("#myModal").modal();
  }else{
    
document.getElementById('loader').style.visibility = 'visible';         // Show
    $http({
        url: '/api/usuario',
        method: 'POST',
        
        data: $scope.data
         }).then(function successCallback(response) {
          document.getElementById('loader').style.visibility = 'hidden';           // Hide
        location.href = '../pages/iniciar_sesion.html'; 
  }, function errorCallback(response) {
    document.getElementById('loader').style.visibility = 'hidden';           // Hide
    document.getElementById("mensaje_crear_concurso").innerHTML = response.data.mensaje;
    
                 $("#myModal").modal();
    
  });

  } 
   }
 });