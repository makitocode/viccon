var app = angular.module('myApp', []);
 app.controller('myCtrl', function($scope,$http) {
 $scope.data = {};
$scope.submit= function(){
    $http({
        url: 'http://localhost:2017/api/usuario/'+$scope.data.email,
        method: 'GET'
    }).then(function (httpResponse) {
    		if(httpResponse.status==200){
    			
                console.log(httpResponse.data.email[0]);
                 location.href = '../pages/concurso_admin.html'; 
                 
                    // aqui debe enviar el objeto data que muestro aqui en consola a la pagina de concurso
    		}else{
                //pendiente alert cuando usuario no existe
    		}
        
    })
   }
 });