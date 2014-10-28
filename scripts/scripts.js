var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var isDrawing;
ctx.fillCircle = function(x, y, radius, fillColor) {
  this.fillStyle = fillColor;
  this.beginPath();
  this.arc(x, y, radius, 0, Math.PI * 2, false);
  this.fill();
};
canvas.addEventListener("mousedown", function(){isDrawing = true;}, false);
canvas.addEventListener("mouseup", function(){isDrawing = false;}, false);
canvas.addEventListener("mousemove", function(e){
  if(!isDrawing) {
    return;
  }
  var x = e.pageX - this.offsetLeft;
  var y = e.pageY - this.offsetTop;
  var radius = 10; // or whatever
  var fillColor = '#ff0000';
  ctx.fillCircle(x, y, radius, fillColor);
}, false);


document.getElementById("clearcanvas").onclick = function() {
  ctx.clearRect(0,0,canvas.width, canvas.height);
}
document.getElementById("saveimage").onclick = function() {
  window.open(canvas.toDataURL());
}
