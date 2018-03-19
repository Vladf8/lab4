
function disp(arg) {
    var dis = document.getElementById(arg);
    if(dis.style.display!="none")
        dis.style.display = "none";
    else dis.style.display= "block";

}
function checkForm() {
    var form = document.forms.myform;
    var select = form.elements.r;
    var text = form.elements.y.value;
    var checker = form.elements.x;
    var count=0;
    var isnun = isNaN(+text);
    var nentr= (+text <= -5.0)||(+text >= 3.0);
    for(var i =0; i<checker.length; i++){
        if (checker[i].checked){
            count++;
        }
    }
    if(!(count==1)){
        alert("Choose 1 value of x");
        return false;}

    if (isnun){
        alert("Enter numeric value of y. Delimiter of fractional part is '.' ");
        return false;
    }
    if(nentr)
    {
        alert("Value of y should belong (-5;3) ");
        return false;
    }
    if(text=='')
    {
        alert("Enter y ");
        return false;
    }
    if (select.value == '') {
        alert("Choose radius");
        return false;
    }


    return true;
}
window.onload = function load() {
    var paint = document.getElementById('graphen');
    if(paint && paint.getContext){
        var context = paint.getContext("2d");
        
        context.moveTo(300,1);
        context.lineTo(300,500);
        context.moveTo(1, 350);
        context.lineTo(600,350);
        context.strokeStyle="#ffffff";
        context.stroke();
    }
    else{alert("NO");}
}
 function clicked(){
  alert("ooo");
 }
function paint(r){
    var paint= document.getElementById('graphen');
    if(paint && paint.getContext) {
        var context = paint.getContext("2d");
        context.clearRect(0,0,607,505);
         context.moveTo(300,1);
        context.lineTo(300,500);
        context.moveTo(1, 350);
        context.lineTo(600,350);
        context.beginPath();
        context.moveTo(300, 350);
        context.lineTo(300, 350 - r);
        context.lineTo(300 + r / 2, 350);
        context.closePath();
        context.fillStyle = "#33ff99";
        context.fill();
        context.rect(300 - r / 2, 350 - r, r / 2, r);
        context.fill();
        context.moveTo(300, 350);
        context.arc(300, 350, r / 2, (1 / 2) * Math.PI, Math.PI);
        context.fill();
         context.moveTo(300,1);
        context.lineTo(300,500);
        context.moveTo(1, 350);
        context.lineTo(600,350);
        context.strokeStyle="#ffffff";
        context.stroke();
    }else{alert("NO");}
}

