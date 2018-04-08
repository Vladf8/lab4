
var app = angular.module("myApp",[]);
angular.element(document).ready(function () {
    var paint = document.getElementById('graphen');
    var context = paint.getContext("2d");
    var width = document.body.clientWidth;
    function load(x,y) {
        context.moveTo(x/2, 1);
        context.lineTo(x/2, y);
        context.moveTo(1, y/2);
        context.lineTo(x, y/2);
        context.strokeStyle = "#ffffff";
        context.stroke();

    }
    load(650,650);
    /*if ((width >= 672)&&(width<1187)) {

        paint=document.getElementById('graphen_tabl');
        context = paint.getContext("2d");
        load(500,600);
    }
    if (width <672) {
        paint=document.getElementById('graphen_mob');
        context = paint.getContext("2d");
        load(350,350);
    }*/

});

app.controller('canvasController',['$scope','$window', '$http','$httpParamSerializer',function ($scope, $window, $http, $httpParamSerializer) {


    $scope.paint=function (r){
        $scope.rad = r;
        var width =document.body.clientWidth;
        var paint = document.getElementById('graphen');;
        /*if(width>=1248) {
            paint = document.getElementById('graphen');
        }
        else if(width>=821&&width<1248) {
            paint = document.getElementById('graphen_tab1');
        }
        else if(width<821) {
            paint = document.getElementById('graphen_mob');
        }*/
        var context = paint.getContext("2d");
        function paint_dep(x,y,k) {
            context.clearRect(0, 0, x, y);
            context.beginPath();
            context.moveTo(x/2, y/2);
            context.lineTo(x/2, y/2 + r / 2 * k);
            context.lineTo(x/2 + r * k, y/2);
            context.closePath();
            context.fillStyle = "#1E90FF";
            context.fill();
            context.rect(x/2, y/2, -r / 2  * k, r  * k);
            context.fill();
            context.moveTo(x/2, y/2);
            context.arc(x/2, y/2, r * k, Math.PI, 1.5 * Math.PI);
            context.fill();
            context.moveTo(x/2, y);
            context.lineTo(x/2, 1);
            context.moveTo(x, y/2);
            context.lineTo(1, y/2);
            context.strokeStyle = "#ffffff";
            context.stroke();
            //
        }
        paint_dep(650,650,60);
        /*if     (width >= 1248) {
        paint_dep(650,650,60);
        }
        if((width>=821)&&(width<1248)){
            paint_dep(500,600,50);

        }
    if (width < 821) {
 paint_dep(350,350,30);
    }*/

    };
    /* $scope.listen=function (r) {
          var rad = document.forms.checker.r;
          for(var i =0;i<rad.length;i++) {
              if (i !== r) {
                  rad[i].checked = false;
              }
          }
          if(rad[r].checked){
              $scope.paint(r);
          }if(!rad[r].checked){
             $scope.paint(0);

         }
     };
  $scope.listenX=function (n) {
      var xfield =document.forms.checker.x;
      for(var i = 0;i<xfield.length;i++){
          if(i!==n){
              xfield[i].checked=false;
          }
      }
  };*/

    $scope.checkX=function () {
        var text = document.forms.checker.x;

        if((text.value < -3)||(text.value > 5)||(isNaN(text.value))||(text.value==='')){
            text.style.backgroundColor="#f80040";

        }else{ text.style.backgroundColor="#fff";

        }
    };
    $scope.checkR=function () {
        var text = document.forms.checker.r;

        if((text.value <= 0)||(text.value > 5)||(isNaN(text.value))||(text.value==='')){
            text.style.backgroundColor="#f80040";

        }else{ text.style.backgroundColor="#fff";

        }
    };
    $scope.checkY=function () {
        var text = document.forms.checker.y;

        if((text.value < -3)||(text.value > 5)||(isNaN(text.value))||(text.value==='')){
            text.style.backgroundColor="#f80040";

        }else{ text.style.backgroundColor="#fff";

        }
    };



    $scope.paintPoint= function (x, y, color) {
        var width =document.body.clientWidth;
        var paint = document.getElementById('graphen');
        var context = paint.getContext("2d");
        function paint_dep_point(x, y, w, h, k, color) {
            context.fillStyle = color;
            context.beginPath();
            context.arc(w+x*k, h-y*k, 4, 0, 2*Math.PI);
            context.fill();
        }


        //if (width >= 1248) {

        paint_dep_point(x,y,325,325,60,color);

        //}
        /* if((width>=821)&&(width<1248)){
             paint = document.getElementById('graphen_tabl');
             context = paint.getContext("2d");
             paint_dep_point(x,y,250,300,50,color);

         }
         if (width < 821) {
             paint = document.getElementById('graphen_mob');
             context = paint.getContext("2d");
             paint_dep_point(x,y,175,175,30,color);
         }*/
    };





    $scope.onClickCanvas=function () {

    };
    $scope.touch = function () {
        $http.post('rest/usr/secur').then(function (result) {
            if(result.data.length===0){
                $window.location.replace('http://localhost:8080/laba4-1.0/error_page.html');
            }
        });


        var x=0;
        var y=0;
        var r=0;
        var fit;
        var color;


        $http.get('rest/point/getpoints').
        then(function (result) {
            $scope.shots = result.data;
            var len =$scope.shots.length;
            //document.forms.checker.r[$scope.shots[len].r].checked=true;
            //$scope.paint($scope.shots[len].r);
            for(var i = 0; i < len; i++){
                x = $scope.shots[i].x;
                y = $scope.shots[i].y;
                r = document.forms.checker.r.value;
                fit = $scope.shots[i].fit;
                //alert(x,y,r,fit);
                if (((y >= x/2 - r/2) && (x >= 0) && (y <= 0)) || ((y <= 0) && (x <= 0) && (x >= -r/2) && (y >= -r)) || ((x <= 0) && (y >= 0) && (Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r, 2)))) {
                    //alert("green");
                    color = '#00ff00';
                }
                else {
                    //alert("red");
                    color = '#ff0000';
                }
                $scope.paintPoint(x, y, color);
            }

        });

    };
    $scope.changeR=function () {
        var rad = document.forms.checker.r.value;
        if(rad > 0 && rad <= 5)
        {
            var data={
                'r': rad
            };
            $http.post('rest/point/update',$httpParamSerializer({r:rad})).then(function (success)
            {
            }, function(res)
            {
            });
            $scope.paint(document.forms.checker.r.value);
            $scope.touch();
        }
        else if(rad==0)
        {
            var data={
                'r': rad
            };
            $http.post('rest/point/update',$httpParamSerializer({r:rad})).then(function (success) {
            },function(res){});
            $scope.paint(0);
            $scope.touch();
        }
        else if(document.forms.checker.r.value===''){
            $scope.paint(0);
        }
        else {
            $scope.paint(0);
        }
    };

    $scope.click=function clicked(arg, event){
        //alert('Click');
        var elem = document.getElementById(arg);
        var br = elem.getBoundingClientRect();
        var left = br.left;
        var top = br.top;
        //var event = window.event;
        //alert(event);
        var x = event.clientX-left;
        var y = event.clientY-top;
        //var x = (evt.pageX - arg.offsetLeft - 240) / 40; // читаю с канвы
        //var y = (240 - evt.pageY + arg.offsetTop) / 40; // читаю с канвы
        var form = document.forms.checker;
        //alert(form);
        var r = form.elements.r;
        //alert('x: ' + x + 'y: ' + y + 'r: ' + r);
        var rad=-1;
        var newx;
        var newy;
        rad = r.value;
        var width = document.body.clientWidth;
        if(rad < 5 && rad >= 0){
            //if(width>=1248){
            newx=(x-325)/60;
            newy=(325-y)/60;
            /*}if((width<1248)&&(width>=821)){
                   newx=(x-250)/50;
                   newy=(300-y)/50;
               }
               if(width<821){
                   newx=(x-175)/30;
                   newy=(175-y)/30;
               }*/
            var data={
                'x': newx,
                'y': newy,
                'r': rad
            };
        //alert('start paint');
            $http.post('rest/point/check',$httpParamSerializer({x:newx,y:newy,r:rad})).then(function(result){
                //alert('paint point');
//$window.location.reload(true);
                $scope.touch();
                resultController.show_table();
            });
        }else{
            alert("Не выбран или введен неверный радиус ");
        }
    };
    $window.onload = function () {
        $http.get('rest/usr/secur').then(function success(resp) {
            if(resp.data.length===0){
                $window.location.replace('http://localhost:8080/laba4-1.0/error_page.html');
            }
        });
       $http.get('rest/point/getpoints').then(function (result) {
            $scope.shots=result.data;
            document.forms.checker.r.value=$scope.shots[$scope.shots.length-1].r;
            $scope.paint($scope.shots[$scope.shots.length-1].r);
            $scope.touch();
        })
    };
}]);
app.controller('resultController', ['$scope','$http', function ($scope,$http) {
    $scope.show_table =function () {
        $http.get('rest/point/getpoints').then(function (result) {
            $scope.shots=result.data;
            for(var i=0;i<$scope.shots.length;i++){
                if($scope.shots[i].fit===true){
                    $scope.shots[i].fit='Входит';
                }
                else {
                    $scope.shots[i].fit='Не входит';
                }
            }
            $scope.$apply();
        },function (response) {
        });
    };

}]);



function validate() {
    if(isNaN( document.forms.checker.x.value) ||(document.forms.checker.x.value==='')||
        isNaN( document.forms.checker.y.value) ||(document.forms.checker.y.value==='')||
        isNaN( document.forms.checker.r.value) ||(document.forms.checker.r.value==='')) {
        alert('Проверьте введенные данные');
        return false;
    }else{

        return true;}
}



