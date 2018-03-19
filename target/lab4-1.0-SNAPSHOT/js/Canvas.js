
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
        //alert("paint");
        $scope.rad=r;
       // alert("after rad");
      var width =document.body.clientWidth;
      var paint = document.getElementById('graphen');;
     // alert("after width");
      /*if(width>=1248) {
          alert('1248');
          paint = document.getElementById('graphen');
          alert('1248');
      }
      else if(width>=821&&width<1248) {
          alert('between');
          paint = document.getElementById('graphen_tab1');
          alert('between');
      }
      else if(width<821) {
          alert('821');
          paint = document.getElementById('graphen_mob');
          alert('821');
      }*/
    //  alert("after width check");
      var context = paint.getContext("2d");
     // alert("before paint dep");
  function paint_dep(x,y,k) {
      //alert("paintstart");
      context.clearRect(0, 0, x, y);
     // alert("trytopaint");
      context.beginPath();
      context.moveTo(x/2, y/2);
      context.lineTo(x/2, y/2 + r * k/2);
      context.lineTo(x/2 + r * k, y/2);
      context.closePath();
      context.fillStyle = "#1e90ff";
      context.fill();
      context.rect(x/2 - r * k, y/2, r * k, r * k/2);
      context.fill();
      context.moveTo(x/2, y/2);
      context.arc(x/2, y/2, r * k / 2, (3 / 2) * Math.PI, 0);
      context.fill();
      //axis
      context.moveTo(x/2, 1);
      context.lineTo(x/2, y);
      context.moveTo(1, y/2);
      context.lineTo(x, y/2);
      context.strokeStyle = "#000";
      context.stroke();
      //
     // alert("readypaint");
  }
        //alert("before paint_dep call");
        paint_dep(650,650,60);
            /*if (width >= 1248) {
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

        if((text.value<=-5)||(text.value>=3)||(isNaN(text.value))||(text.value==='')){
            text.style.backgroundColor="#f80040";

        }else{ text.style.backgroundColor="#fff";

        }
    };
    $scope.checkR=function () {
        var text = document.forms.checker.r;

        if((text.value<0)||(text.value>=3)||(isNaN(text.value))||(text.value==='')){
            text.style.backgroundColor="#f80040";

        }else{ text.style.backgroundColor="#fff";

        }
    };
    $scope.checkY=function () {
     var text = document.forms.checker.y;

     if((text.value<=-5)||(text.value>=5)||(isNaN(text.value))||(text.value==='')){
         text.style.backgroundColor="#f80040";

     }else{ text.style.backgroundColor="#fff";

    }
 };



$scope.paintPoint= function (x,y,color) {
    //alert("3");
    var width =document.body.clientWidth;
    var paint = document.getElementById('graphen');
    var context = paint.getContext("2d");
     function paint_dep_point(x,y,w,h,k,color) {
         //alert("2");
         context.fillStyle=color;
         context.beginPath();
         context.arc(w+x*k,h-y*k,4,0,2*Math.PI);
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
            $window.location.replace('http://localhost:41310/lab4-11782673497812496982.0-SNAPSHOT/error_page.html');
        }
     });


var x=0;
var y=0;
var r=0;
var fit;
  var color;


  $http.post('rest/point/getpoints').
     then(function (result) {
         //alert("touch");
         $scope.shots = result.data;
        var len =$scope.shots.length;
         //document.forms.checker.r[$scope.shots[len].r].checked=true;
         //alert(len);
         //$scope.paint($scope.shots[len].r);
         for(var i = 0; i < len; i++){
            //alert("1");
              x = $scope.shots[i].x;
             y = $scope.shots[i].y;
             r = document.forms.checker.r.value;
             fit = $scope.shots[i].fit;
             if (((x >= -r) && (y >= -r/2) && (x <= 0) && (y <= 0)) ||
                 ((x >= 0) && (y <= 0) && (y >= 0.5*x-r/2))
                 || ((x >= 0) && (y >= 0) && (Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r/2, 2)))) {
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
        //alert("changing");
        var rad = document.forms.checker.r.value;
        //alert(r);
        if(rad>0&&rad<3){
            var data={
                'r': rad
            };
            $http.post('rest/point/update',$httpParamSerializer({r:rad})).then(function (success) {
            },function(res){alert(res.data);});
            $scope.paint(document.forms.checker.r.value);
            $scope.touch();
        }
        else if(rad==0){
            var data={
                'r': rad
            };
            $http.post('rest/point/update',$httpParamSerializer({r:rad})).then(function (success) {
            },function(res){alert(res.data);});
            $scope.paint(0);
            $scope.touch();
        }
        else if(document.forms.checker.r.value===''){
            $scope.paint(0);
           // alert("without points!");
        }
        else {
            $scope.paint(0);
           // alert("without points!");
        }
    };

 $scope.click=function clicked(arg){

     var elem = document.getElementById(arg);
     var br = elem.getBoundingClientRect();
     var left = br.left;
     var top = br.top;
     var event = window.event;
     var x = event.clientX-left;
     var y = event.clientY-top;
     var form = document.forms.checker;
     var r = form.elements.r;
     var rad=-1;
     var newx;
     var newy;
     rad = r.value;
     var width = document.body.clientWidth;
     if(rad<3&&rad>=0){
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
         console.log(x);
         console.log(y);
         console.log(data);
     $http.post('rest/point/check',$httpParamSerializer({x:newx,y:newy,r:rad})).then(function(result){
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
                $window.location.replace('http://localhost:3377/laba4-1.0/error_page.html');
            }
        });
        $http.post('rest/point/getpoints').then(function (result) {
            $scope.shots=result.data;
            document.forms.checker.r.value=$scope.shots[$scope.shots.length-1].r;
            $scope.paint($scope.shots[$scope.shots.length-1].r);
            $scope.touch();
        });
    };
}]);
app.controller('resultController', ['$scope','$http', function ($scope,$http) {
$scope.show_table =function () {
    $http.post('rest/point/getpoints').then(function (result) {
        //alert("showtable");
        $scope.shots=result.data;
        for(var i=0;i<$scope.shots.length;i++){
            //alert("iterate");
            if($scope.shots[i].fit===true){
                $scope.shots[i].fit='Входит';
            }else {$scope.shots[i].fit='Не входит';}
        }
        $scope.$apply();
    },function (response) {
        //alert("neudacha");
        //alert(response.data);
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



