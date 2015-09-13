var canvas = document.getElementById("canvas");
var width = window.innerWidth*0.8;
var height = window.innerHeight*0.7;
canvas.width = width;
canvas.height = height;
var ctx = canvas.getContext('2d');
var isDrawing, color, bgSrc;
var backgroundSet = false;

var clrCanvas = document.getElementById("clearcanvas");
var saveImg = document.getElementById("saveimage");
var clrSelect = document.getElementById("colorselect");
var clrClose = document.getElementById("close");
var bgClose = document.getElementById("bclose");
var addbg = document.getElementById("addbackground");
var bgInput = document.getElementById("background");

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


clrCanvas.onclick = function() {
  backgroundSet = false;
  ctx.clearRect(0,0,canvas.width, canvas.height);
}
saveImg.onclick = function() {
  window.open(canvas.toDataURL());
}
clrSelect.onclick = function(e) {
  openModal("colormodal")
}
clrClose.onclick = function(e) {
  color = document.getElementById("color").value
  closeModal("colormodal");
}
addbg.onclick = function(e) {
  if(!backgroundSet) {
    document.getElementById("background").value = null;
  }
  openModal("backgroundmodal");
}
bgClose.onclick = function() {
  var img = new Image();
  img.onload = function() {
    if(backgroundSet) {
      ctx.clearRect(0,0,canvas.width, canvas.height);
    }
    var canvasImage = new Image();
    canvasImage.src = canvas.toDataURL();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(canvasImage, 0, 0, canvas.width, canvas.height);
    backgroundSet = true;
  }
  img.src = bgSrc;
  closeModal("backgroundmodal");
}


function openModal(id) {
  canvas.style.pointerEvents = "none";
  document.getElementById(id).style.display = "block";
}

function closeModal(id) {
  canvas.style.pointerEvents = "auto";
  document.getElementById(id).style.display = "none";
}

bgInput.addEventListener("change", function() {
  var reader = new FileReader();
  var file = bgInput.files[0];

  reader.onloadend = function() {
    bgSrc = reader.result;
  }

  reader.readAsDataURL(file);

}, false);
