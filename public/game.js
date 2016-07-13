var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60) };

var canvas = document.createElement('canvas');
var width = 600;
var height = 400;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

window.onload = function(){
  document.body.appendChild(canvas);
  animate(step);
};

var step = function(){
  update();
  render();
  animate(step);
};

var update = function() {
};

var render = function(){
  context.fillStyle = "#000";
  // Paints the given rectangle onto the bitmap, using the current fill style.
  context.fillRect(0, 0, width, height);
}

function Bat(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.x_speed = 0;
  this.y_speed = 0;
}

Bat.prototype.render = function(){
  context.fillStyle = "#fff";
  context.fillRect(this.x, this.y, this.width, this.height);
};

function Player(){
  this.bat = new Bat(175, 300, 50, 10);
}
function Computer(){
  this.bat = new Bat(175, 10, 50, 10);
};

Player.prototype.render = function() {
  this.bat.render();
};

Computer.prototype.render = function() {
  this.bat.render();
};
