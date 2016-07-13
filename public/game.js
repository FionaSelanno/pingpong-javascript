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
  ball.update();
};


var render = function(){
  context.fillStyle = "#000";
  // Paints the given rectangle onto the bitmap, using the current fill style.
  context.fillRect(0, 0, width, height);
  player.render();
  ball.render();
  computer.render();
};

function Bat(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.x_speed = 0;
  this.y_speed = 0;
};

Bat.prototype.render = function(){
  context.fillStyle = "#fff";
  context.fillRect(this.x, this.y, this.width, this.height);
};


function Player(){
  this.bat = new Bat(275, 380, 10, 50);
};
function Computer(){
  this.bat = new Bat(275, 10, 10, 50);
};

Player.prototype.render = function() {
  this.bat.render();
};

Computer.prototype.render = function() {
  this.bat.render();
};


function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.x_speed = 3;
  this.y_speed = 0;
  this.radius = 5;
};

Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = "#fff";
  context.fill();
};

Ball.prototype.update = function(){
  this.x += this.x_speed;
  this.y += this.y_speed;
};

var player = new Player();
var computer = new Computer();
var ball = new Ball(300, 200);
