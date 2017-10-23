var app =angular.module('concursomod', ['ngRoute']);
app.config(function($routeProvider){
    $routeProvider.when('/concurso/:id', {
        controller:'ctrlRead',
        templateUrl: 'list_concursos_admin.html'
    })
    .when('/404', {
        templateUrl: 'not_found.html'
    })
    .when('/crear/concurso/:id', {
        controller:'concurso',
        templateUrl: 'crear_concurso.html'
    })
     .when('/ver/concurso/:idconcurso', {
        controller:'concursoDetalleAdmin',
        templateUrl: 'detalle_concurso_admin.html'
    })
         .when('/modificar/concurso/:idconcurso/:id', {
        controller:'concursoModificar',
        templateUrl: 'modificar_concurso.html'
    })
        .when('/concurso/publico/:idconcurso', {
        controller:'ConcursoPorIdParaPublico',
        templateUrl: 'detalle_concurso_publico.html'
    })
        .when('/video/subir/:idconcurso', {
        controller:'ControllerVideo',
        templateUrl: 'subir_video.html'
    })
         .when('/exito/:idconcurso', {
             controller:'exitoController',
        templateUrl: 'mensaje_exito.html'
    })
         .when('/ver/video/:idconcurso/:idvideo/:estado', {
             controller:'videoController',
        templateUrl: 'video_detalle.html'
    })

         

    .otherwise({
        redirectTo: '/404'
    });
});
//renderizar concurso por id de persona logueada
app.controller('ctrlRead', function ($scope, $filter,$http,$routeParams) {

$scope.idUsuario=$routeParams.id;
var URI3 = '/api/concurso/usuario/'+$routeParams.id;

$scope.items=[];
    // init
    $scope.sort = {       
                sortingOrder : 'fechaFin',
                reverse : false
            };
    
     $http.get(URI3)
            .then(function(result) {
                
                $scope.items = result.data;
                
                    $scope.gap = 0;
    
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 4;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
  var searchMatch = function (haystack, needle) {
        if (!needle) {
            return true;
        }
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    };
 // init the filtered items
    $scope.search = function () {
        $scope.filteredItems = $filter('filter')($scope.items.concurso, function (item) {
            for(var attr in item) {
                if (searchMatch(item[attr], $scope.query))
                    return true;
            }
            return false;
        });
        // take care of the sorting order
        if ($scope.sort.sortingOrder !== '') {
            $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sort.sortingOrder, $scope.sort.reverse);
        }
        $scope.currentPage = 0;
        // now group by pages
        $scope.groupToPages();
    };

// calculate page in place
    $scope.groupToPages = function () {
        $scope.pagedItems = [];
        
        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
    };

     $scope.range = function (size,start, end) {
        var ret = [];        
        
                      
        if (size < end) {
            end = size;
            start = size-$scope.gap;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }        
         
        return ret;
    };
    
    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };
    
    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };
    
    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    // functions have been describe process the data for display
    $scope.search();

   

});
    
});
   
app.$inject = ['$scope', '$filter'];

app.directive("customSort", function() {
return {
    restrict: 'A',
    transclude: true,    
    scope: {
      order: '=',
      sort: '='
    },
    template : 
      ' <a ng-click="sort_by(order)" style="color: #555555;">'+
      '    <span ng-transclude></span>'+
      '    <i ng-class="selectedCls(order)"></i>'+
      '</a>',
    link: function(scope) {
                
    // change sorting order
    scope.sort_by = function(newSortingOrder) {       
        var sort = scope.sort;
        
        if (sort.sortingOrder == newSortingOrder){
            sort.reverse = !sort.reverse;
        }                    

        sort.sortingOrder = newSortingOrder;        
    };
    
   
    scope.selectedCls = function(column) {
        if(column == scope.sort.sortingOrder){
            return ('icon-chevron-' + ((scope.sort.reverse) ? 'down' : 'up'));
        }
        else{            
            return'icon-sort' 
        } 
    };      
  }// end link
}
});
//crear concurso
 app.controller('concurso', function($scope,$http,$routeParams) {
 $scope.data = {};

$scope.submit= function(){

    if($('#nombre').val().length==0||$('#fechaInicio').val().length==0||$('#fechaFin').val().length==0
        ||$('#premio').val().length==0||$('imagen').val()==0){
    alert("Todos los campos son requeridos");
        }

 else{
    var date1= new Date ($scope.data.fechaInicio);
    var date2= new Date ($scope.data.fechaFin);
 if(date1<date2){
//envio imagen a bucket
  document.getElementById('loader').style.visibility = 'visible';         // Show

  var files = $('#imagen').get(0).files;
  if (files.length > 0){
   
    var formData = new FormData();
    // loop through all the selected files and add them to the formData object
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      // add the files to formData object for the data payload
      formData.append('uploads[]', file, file.name);
    }
    $.ajax({
      url: '/crear_concurso',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data){
             if(data==="success"){
             
    $http({
        url: '/api/concurso',
        method: 'POST',
              data: {'userId':$routeParams.id,'nombre':$scope.data.nombre,
            'fechaInicio':$scope.data.fechaInicio,'fechaFin':$scope.data.fechaFin,
            'premio':$scope.data.premio ,'imagen':$('#imagen').get(0).files[0].name
          }
    }).then(function successCallback(response) {
                  document.getElementById('loader').style.visibility = 'hidden';   
       location.href = '#/concurso/'+$routeParams.id; 
  }, function errorCallback(response) {
          document.getElementById('loader').style.visibility = 'hidden';   
          alert(response.data.mensaje);
  });
             }else{
      document.getElementById('loader').style.visibility = 'hidden';         // Show
    alert("ha ocurrido un problema intente nuevamente");          

             }
     },
      xhr: function() {
        
        var xhr = new XMLHttpRequest();
        
        xhr.upload.addEventListener('progress', function(evt) {
        }, false);

        return xhr;
      }
    });

  }   

}else{
                  alert("Favor validar las fechas");
    }

}

   }
 });
//ver concurso admin
//para mostrar los videos en el  ng-repeat
app.directive('dynamicUrl', function () {
    return {
        restrict: 'A',
        link: function postLink(scope, element, attr) {
            element.attr('src', attr.dynamicUrlSrc);
        }
    };
});
app.$inject = ['$scope', '$filter'];

 app.controller('concursoDetalleAdmin', function($scope,$http,$routeParams,$filter) {
  $scope.mydata = [];
var URI = '/api/concurso/'+$routeParams.idconcurso;

        $scope.mydata = [];
        $http.get(URI)
            .then(function(result) {
                $scope.mydata = result.data;
             });

var URI3 = '/api/video/concurso/'+$routeParams.idconcurso;

$scope.items=[];
    
    $scope.sort = {       
                sortingOrder : 'fechaCarga',
                reverse : false
            };
    
     $http.get(URI3)
            .then(function(result) {
                
                $scope.items = result.data;
                   
                    $scope.gap = 0;
    
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 4;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
  var searchMatch = function (haystack, needle) {
        if (!needle) {
            return true;
        }
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    };
 // init the filtered items
    $scope.search = function () {
        $scope.filteredItems = $filter('filter')($scope.items.video, function (item) {
            for(var attr in item) {
                if (searchMatch(item[attr], $scope.query))
                    return true;
            }
            return false;
        });
        // take care of the sorting order
        if ($scope.sort.sortingOrder !== '') {
            $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sort.sortingOrder, $scope.sort.reverse);
        }
        $scope.currentPage = 0;
        // now group by pages
        $scope.groupToPages();
    };

// calculate page in place
    $scope.groupToPages = function () {
        $scope.pagedItems = [];
        
        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
    };

     $scope.range = function (size,start, end) {
        var ret = [];        
        
                      
        if (size < end) {
            end = size;
            start = size-$scope.gap;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }        
         
        return ret;
    };
    
    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };
    
    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };
    
    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    // functions have been describe process the data for display
    $scope.search();
});
///modal 
 });
 
app.directive("customSort", function() {
return {
    restrict: 'A',
    transclude: true,    
    scope: {
      order: '=',
      sort: '='
    },
    template : 
      ' <a ng-click="sort_by(order)" style="color: #555555;">'+
      '    <span ng-transclude></span>'+
      '    <i ng-class="selectedCls(order)"></i>'+
      '</a>',
    link: function(scope) {
                
    // change sorting order
    scope.sort_by = function(newSortingOrder) {       
        var sort = scope.sort;
        
        if (sort.sortingOrder == newSortingOrder){
            sort.reverse = !sort.reverse;
        }                    

        sort.sortingOrder = newSortingOrder;        
    };
    
   
    scope.selectedCls = function(column) {
        if(column == scope.sort.sortingOrder){
            return ('icon-chevron-' + ((scope.sort.reverse) ? 'down' : 'up'));
        }
        else{            
            return'icon-sort' 
        } 
    };      
  }// end link
}
});
//modificar concurso
 app.controller('concursoModificar', function($scope,$http,$routeParams) {
$scope.data = {};

var URI = '/api/concurso/'+$routeParams.idconcurso;

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


    if($('#nombre').val().length==0||$('#fechaInicio').val().length==0||$('#fechaFin').val().length==0
            ||$('#premio').val().length==0||nombre.length==0){
        alert("Todos los campos son requeridos");
    }else{
         var date1= new Date ($('#fechaInicio').val());
    var date2= new Date ($('#fechaFin').val());
    if(date1<date2){
        document.getElementById('loader').style.visibility = 'visible';         // Show
var files  =$('#imagen').get(0).files;

 if (files.length > 0){
   
    var formData = new FormData();
    // loop through all the selected files and add them to the formData object
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      // add the files to formData object for the data payload
      formData.append('uploads[]', file, file.name);
    }
    $.ajax({
      url: '/crear_concurso',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data){
             if(data==="success"){
              $http({
        url: '/api/concurso/'+$routeParams.idconcurso,
        method: 'PUT',
  
              data: {'nombre':$('#nombre').val(),
          'fechaInicio':$('#fechaInicio').val(),'fechaFin':$('#fechaFin').val(),
          'premio':$('#premio').val(),'imagen':nombre
          }
          }).then(function successCallback(response) {
            document.getElementById('loader').style.visibility = 'hidden';   
                location.href = '#/concurso/'+$routeParams.id; 
  }, function errorCallback(response) {
    document.getElementById('loader').style.visibility = 'hidden';   
    alert(response.data.mensaje);
    
  });
         

             }else{
      document.getElementById('loader').style.visibility = 'hidden';         // Show
    alert("ha ocurrido un problema intente nuevamente");          

             }
     },
      xhr: function() {
        
        var xhr = new XMLHttpRequest();
        
        xhr.upload.addEventListener('progress', function(evt) {
        }, false);

        return xhr;
      }
    });

  }   else{
     $http({
        url: '/api/concurso/'+$routeParams.idconcurso,
        method: 'PUT',
  
              data: {'nombre':$('#nombre').val(),
          'fechaInicio':$('#fechaInicio').val(),'fechaFin':$('#fechaFin').val(),
          'premio':$('#premio').val(),'imagen':nombre
          }
          }).then(function successCallback(response) {
            document.getElementById('loader').style.visibility = 'hidden';   
                location.href = '#/concurso/'+$routeParams.id; 
  }, function errorCallback(response) {
    document.getElementById('loader').style.visibility = 'hidden';   
    alert(response.data.mensaje);
    
  });
  }
/*
 $http({
        url: '/api/concurso/'+$routeParams.idconcurso,
        method: 'PUT',
  
              data: {'nombre':$('#nombre').val(),
          'fechaInicio':$('#fechaInicio').val(),'fechaFin':$('#fechaFin').val(),
          'premio':$('#premio').val(),'imagen':nombre
          }
          }).then(function successCallback(response) {
            document.getElementById('loader').style.visibility = 'hidden';   
                location.href = '#/concurso/'+$routeParams.id; 
  }, function errorCallback(response) {
    document.getElementById('loader').style.visibility = 'hidden';   
    alert(response.data.mensaje);
    
  });
  */
    }else{

         alert("Favor validar las fechas");
    }

    }
   }

//boton eliminar

$scope.submit2= function(){
        document.getElementById('loader').style.visibility = 'visible';         // Show

  
 $http({
          url: '/api/concurso/'+$routeParams.idconcurso,
        method: 'DELETE'
      }).then(function successCallback(response) {
     document.getElementById('loader').style.visibility = 'hidden';   
          location.href = '#/concurso/'+$routeParams.id; 
  }, function errorCallback(response) {
     document.getElementById('loader').style.visibility = 'hidden';   
    alert(response.data.mensaje);
  
  });

   }

 });

//ver video publico

//para mostrar los videos en el  ng-repeat
app.directive('dynamicUrl', function () {
    return {
        restrict: 'A',
        link: function postLink(scope, element, attr) {
            element.attr('src', attr.dynamicUrlSrc);
        }
    };
});

app.controller("ConcursoPorIdParaPublico", function($scope, $http,$routeParams,$filter) {
    var URI = '/api/concurso/'+$routeParams.idconcurso;
        $scope.mydata = [];
        $http.get(URI)
            .then(function(result) {
                $scope.mydata = result.data;
               var currentDate = new Date();
               var inicioConcurso = new Date($scope.mydata.concurso.fechaInicio);
               var finConcurso = new Date($scope.mydata.concurso.fechaFin);
               if(currentDate>inicioConcurso&&currentDate<finConcurso){
                
                document.getElementById("concursoCerrado").style.visibility = "hidden";
                document.getElementById("irVideo").style.visibility = "visible";
               }else {
                
                document.getElementById("irVideo").style.visibility = "hidden";
                document.getElementById("concursoCerrado").style.visibility = "visible";
               }
                
             });

            //mostrar videos procesados por concurso de aqui
var URI3 = '/api/video/'+$routeParams.idconcurso+'/Procesado';

$scope.items=[];
    // init
    $scope.sort = {       
                sortingOrder : 'fechaCarga',
                reverse : false
            };
    
     $http.get(URI3)
            .then(function(result) {
                $scope.items = result.data;
                
                    $scope.gap = 0;
    
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 5;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
  var searchMatch = function (haystack, needle) {
        if (!needle) {
            return true;
        }
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    };
 // init the filtered items
    $scope.search = function () {
        $scope.filteredItems = $filter('filter')($scope.items.video, function (item) {
            for(var attr in item) {
                if (searchMatch(item[attr], $scope.query))
                    return true;
            }
            return false;
        });
        // take care of the sorting order
        if ($scope.sort.sortingOrder !== '') {
            $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sort.sortingOrder, $scope.sort.reverse);
        }
        $scope.currentPage = 0;
        // now group by pages
        $scope.groupToPages();
    };

// calculate page in place
    $scope.groupToPages = function () {
        $scope.pagedItems = [];
        
        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
    };

     $scope.range = function (size,start, end) {
        var ret = [];        
        
                      
        if (size < end) {
            end = size;
            start = size-$scope.gap;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }        
         
        return ret;
    };
    
    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };
    
    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };
    
    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    // functions have been describe process the data for display
    $scope.search();
});
    
//aqui cierra el controller
    });
//mostrar vidos procesados
   
app.$inject = ['$scope', '$filter'];

app.directive("customSort", function() {
return {
    restrict: 'A',
    transclude: true,    
    scope: {
      order: '=',
      sort: '='
    },
    template : 
      ' <a ng-click="sort_by(order)" style="color: #555555;">'+
      '    <span ng-transclude></span>'+
      '    <i ng-class="selectedCls(order)"></i>'+
      '</a>',
    link: function(scope) {
                
    // change sorting order
    scope.sort_by = function(newSortingOrder) {       
        var sort = scope.sort;
        
        if (sort.sortingOrder == newSortingOrder){
            sort.reverse = !sort.reverse;
        }                    

        sort.sortingOrder = newSortingOrder;        
    };
    
   
    scope.selectedCls = function(column) {
        if(column == scope.sort.sortingOrder){
            return ('icon-chevron-' + ((scope.sort.reverse) ? 'down' : 'up'));
        }
        else{            
            return'icon-sort' 
        } 
    };      
  }// end link
}
});
//subir video
 app.controller('ControllerVideo', function($scope,$http,$routeParams) {
  $scope.data = {};
  $scope.submit= function(){
//envia de aqui

 if($('#nombreAutor').val().length==0||$('#apellidosAutor').val().length==0||$('#email').val().length==0
        ||$('#mensaje').val().length==0||$('#porqueLeGusta').val()==0||$('#imagen').val()==0){
    alert("Todos los campos son requeridos");
 }else{
    document.getElementById('loader').style.visibility = 'visible';         // Show
 
  var files = $('#imagen').get(0).files;
  if (files.length > 0){
    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
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
            if(data==="success"){
                var splitString = $('#imagen').get(0).files[0].name.split(".");
                var nombreVideo = splitString[0];
                var nombreExtensionVideoOriginal= splitString[1];
                var currentDate = new Date();
                $http({
                    url: '/api/video',
                    method: 'POST',
                    data: {'idConcurso':$routeParams.idconcurso,'nombreAutor':$scope.data.nombreAutor,
                        'apellidosAutor':$scope.data.apellidosAutor,'email':$scope.data.email,
                        'mensaje':$scope.data.mensaje  ,'nombreVideo':nombreVideo,
                        'nombreExtensionVideoOriginal':nombreExtensionVideoOriginal,
                        'fechaCarga':currentDate,'porqueLeGusta':$scope.data.porqueLeGusta
                        }
                }).then(function successCallback(response) {
                    document.getElementById('loader').style.visibility = 'hidden';         // Show
                    location.href =  '#/exito/'+$routeParams.idconcurso;
                    }, 
                    function errorCallback(response) {
                    document.getElementById('loader').style.visibility = 'hidden';         // Show
                    alert(response.data.mensaje);
                    }
                );
            }
            else{
                    document.getElementById('loader').style.visibility = 'hidden';         // Show
                    alert("ha ocurrido un problema intente nuevamente");
            }
      },
      xhr: function(){
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', function(evt) { }, false);
        return xhr;
      }
    });
  }  
}
//envia hasta aqui  
  }
 });


app.controller('exitoController', function($scope,$http,$routeParams) {
    $scope.idconcurso=$routeParams.idconcurso;
    

});  
//video_detalle_reproducir
app.controller('videoController', function($scope,$http,$routeParams) {

    $scope.idconcurso=$routeParams.idconcurso;
    $scope.idvideo=$routeParams.idvideo;
    $scope.estado=$routeParams.estado;
$scope.mydata = [];
$scope.item = [];
var URI = '/api/concurso/'+$routeParams.idconcurso;
        $http.get(URI)
            .then(function(result) {
                $scope.mydata = result.data;
             });
//traer video
    var URI2='/api/video/'+$routeParams.idvideo;
        $http.get(URI2)
            .then(function(result) {
               $scope.item = result.data;
            var video="";
var rutaBucket="http://d22xnaumubkj85.cloudfront.net/media/";
            if($scope.estado==="ed"){//editado
video=rutaBucket+"conversion/"+$scope.item.video.nombreVideoConvertido;
            }else{//original
video=rutaBucket+"original/"+$scope.item.video.nombreVideo+"."+$scope.item.video.nombreExtensionVideoOriginal;
            }
            
    jwplayer("myElement").setup({
    "file": video,
    "hlslabels": {
        "331": "Lowest",
        "688": "Low",
        "1427": "Medium",
        "2962": "High"
    }
    
  });
         });

});    

