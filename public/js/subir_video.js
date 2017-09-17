var app = angular.module('myApp', []);
 app.controller('myCtrl', function($scope,$http) {
 $scope.data = {};
 
$scope.submit= function(){
    console.log('clicked submit');

var splitString = $('#imagen').get(0).files[0].name.split(".");
var nombreVideo = splitString[0];
var nombreExtensionVideoOriginal= splitString[1];
 
    $http({
        url: 'http://localhost:2017/api/video',
        method: 'POST',
              data: {'idConcurso':'59bb8669d5aabc296c5c05c2','nombreAutor':$scope.data.nombreAutor,
       		'apellidosAutor':$scope.data.apellidosAutor,'email':$scope.data.email,
       		'mensaje':$scope.data.premio	,'nombreVideo':nombreVideo,'nombreExtensionVideoOriginal':nombreExtensionVideoOriginal
          }
    }).then(function (httpResponse) {
    		if(httpResponse.status==200){
    			 location.href = 'mensaje_exito.html'; 
    		}else{
                    //pendiente mostrar alert de que cambie correo para crear cuenta
    		}
        
    })
   }
 });