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
console.log('clicked submit' +nombre);    
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
    }).then(function (httpResponse) {
        if(httpResponse.status==200){
           location.href = 'concurso_admin.html'; 
        }else{
                    //pendiente mostrar alert 
        }
        
    })
  
   }
//boton eliminar

$scope.submit2= function(){
console.log('clicked submit2 ');    
  
 $http({
        url: 'http://localhost:2017/api/concurso/59bd418c3d4a0623b48f7b0f',
        method: 'DELETE',
  
              data: {'userId':'59bb51a9080d9718086a47b4'
          }
    }).then(function (httpResponse) {
        if(httpResponse.status==200){
           location.href = 'concurso_admin.html'; 
        }else{
                    //pendiente mostrar alert 
        }
      
    })

   }
    });
