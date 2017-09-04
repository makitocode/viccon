var app = angular.module('myApp', []);
 app.controller('myCtrl', function($scope,$http) {
 $scope.data = {};
$scope.submit= function(){
    console.log('clicked submit');
    $http({
        url: 'http://localhost:2017/api/usuario',
        method: 'POST',
        data: $scope.data
    }).then(function (httpResponse) {
    		if(httpResponse.status==200){
    			 location.href = '../pages/iniciar_sesion.html'; 
    		}else{
                    //pendiente mostrar alert de que cambie correo para crear cuenta
    		} 
    })
   }
 });