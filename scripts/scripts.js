var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var isDrawing;
var color;
var backgroundSet = false;
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
  var fillColor = color;
  ctx.fillCircle(x, y, radius, fillColor);
}, false);


document.getElementById("clearcanvas").onclick = function() {
  backgroundSet = false;
  ctx.clearRect(0,0,canvas.width, canvas.height);
}
document.getElementById("saveimage").onclick = function() {
  window.open(canvas.toDataURL());
}
document.getElementById("colorselect").onclick = function(e) {
  openModal("colormodal")
}
document.getElementById("close").onclick = function(e) {
  color = document.getElementById("color").value
  closeModal("colormodal");
}
document.getElementById("addbackground").onclick = function(e) {
  if(!backgroundSet) {
    document.getElementById("background").value = null;
  }
  openModal("backgroundmodal");
}
document.getElementById("bclose").onclick = function() {
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function() {
    var canvasImage = new Image();
    canvasImage.src = canvas.toDataURL();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(canvasImage, 0, 0,canvas.width, canvas.height);
    backgroundSet = true;
  }
  img.src = document.getElementById("background").value;
  closeModal("backgroundmodal");
  document.getElementById("background").value = null;
}


function openModal(id) {
  canvas.style.pointerEvents = "none";
  document.getElementById(id).style.display = "block";
}

function closeModal(id) {
  canvas.style.pointerEvents = "auto";
  document.getElementById(id).style.display = "none";
}
