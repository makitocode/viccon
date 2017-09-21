//trae la data de un solo concurso por id concurso
var URI = 'http://localhost:2017/api/concurso/59bb8669d5aabc296c5c05c2';
var app = angular.module("plunker", ['ngRoute']);
app.controller("ConcursoPorIdParaPublico", function($scope, $http) {
        $scope.mydata = [];
	    $http.get(URI)
            .then(function(result) {
                $scope.mydata = result.data;
               
             });
///boton actualizar
$scope.submit= function(){

    var nombre=$scope.mydata.concurso.imagen;
    if($('#imagen').get(0).files.length>0){
      nombre=$('#imagen').get(0).files[0].name;
    }


 $http({
        url: 'http://localhost:2017/api/concurso/59bb8669d5aabc296c5c05c2',
        method: 'PUT',
  
              data: {'userId':'59bb51a9080d9718086a47b4','nombre':$('#nombre').val(),
          'fechaInicio':$('#fechaInicio').val(),'fechaFin':$('#fechaFin').val(),
          'premio':$('#premio').val(),'imagen':nombre
          }
          }).then(function successCallback(response) {
       location.href = 'concurso_admin.html'; 
  }, function errorCallback(response) {
    
    document.getElementById("mensaje_crear_concurso").innerHTML = response.data.mensaje;
    
                 $("#myModal").modal();
    
  });
  
   }
//boton eliminar

$scope.submit2= function(){

  
 $http({
        url: 'http://localhost:2017/api/concurso/59c32742e7409f23fcacb825sd',
        method: 'DELETE'
      }).then(function successCallback(response) {
       location.href = 'concurso_admin.html'; 
  }, function errorCallback(response) {
    
    document.getElementById("mensaje_crear_concurso").innerHTML = response.data.mensaje;
    
                 $("#myModal").modal();
    
  });

   }
    });
