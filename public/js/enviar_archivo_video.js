var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope,$http) {
 $scope.data = {};
 
$scope.submit= function(){
   
//$('.upload-btn').on('click', function (){
   // $('#upload-input').click();
  var files = $('#imagen').get(0).files;
  if (files.length > 0){
    // create a FormData object which will be sent as the data payload in the
    // AJAX request
    var formData = new FormData();
    // loop through all the selected files and add them to the formData object
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      // add the files to formData object for the data payload
      formData.append('uploads[]', file, file.name);
    }
    $.ajax({
      url: '/subir_video',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data){
          console.log('upload successful!\n' + data+" "+file.name);
           //
           
var splitString = $('#imagen').get(0).files[0].name.split(".");
var nombreVideo = splitString[0];
var nombreExtensionVideoOriginal= splitString[1];
 
    $http({
        url: 'http://localhost:2017/api/video',
        method: 'POST',
              data: {'idConcurso':'59bb8669d5aabc296c5c05c2','nombreAutor':$scope.data.nombreAutor,
          'apellidosAutor':$scope.data.apellidosAutor,'email':$scope.data.email,
          'mensaje':$scope.data.mensaje  ,'nombreVideo':nombreVideo,'nombreExtensionVideoOriginal':nombreExtensionVideoOriginal,
          'fechaCarga':$scope.data.fechaFin,'porqueLeGusta':$scope.data.porqueLeGusta
          }
  }).then(function successCallback(response) {
       location.href = 'detalle_concurso_publico.html'; 
     
  }, function errorCallback(response) {
    
    document.getElementById("mensaje_crear_concurso").innerHTML = response.data.mensaje;
    
                 $("#myModal").modal();
    
  });
           //
     },
      xhr: function() {
        // create an XMLHttpRequest
        var xhr = new XMLHttpRequest();
        // listen to the 'progress' event
        xhr.upload.addEventListener('progress', function(evt) {
        }, false);

        return xhr;
      }
    });

  }  
//});

   }
 });

