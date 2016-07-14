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
 //--------Bat----------------------------------------------------------------
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
  this.bat = new Bat(580, 175, 10, 50);
};
function Computer(){
  this.bat = new Bat(10, 175, 10, 50);
};

Player.prototype.render = function() { //player
  this.bat.render();
};

Computer.prototype.render = function() { //player Computer
  this.bat.render();
};


//-------------Ball-------------------------------------------------
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

Ball.prototype.update = function(bat1, bat2){
  this.x += this.x_speed;
  this.y += this.y_speed;
  var top_x = this.x - 5;
  var top_y = this.y - 5;
  var bottom_x = this.x + 5;
  var bottom_y = this.y + 5;

  if(this.x - 5 < 15) { // hitting the left bat
    this.x = 20;
    this.x_speed = -this.x_speed;
  } else if(this.x + 5 > 582) { // hitting the right bat
    this.x = 577;
    this.x_speed = -this.x_speed;
  }

  // if(this.x < 0 || this.x > 600) { // a point was scored
  //   this.x_speed = 0;
  //   this.y_speed = 3;
  //   this.x = 200;
  //   this.y = 300;
  // }
  //
  // if(top_y > 300) {
  //   if(top_y < (bat1.y + bat1.height) && bottom_y > bat1.y && top_x < (bat1.x + bat1.width) && bottom_x > bat1.x) {
  //     // hit the player's bat
  //     this.y_speed = -3;
  //     this.x_speed += (bat1.x_speed / 2);
  //     this.y += this.y_speed;
  //   }
  // }
  //  else {
  //   if(top_y < (bat2.y + bat2.height) && bottom_y > bat2.y && top_x < (bat2.x + bat2.width) && bottom_x > bat2.x) {
  //     // hit the computer's paddle
  //     this.y_speed = 3;
  //     this.x_speed += (bat2.x_speed / 2);
  //     this.y += this.y_speed;
  //   }
  // }
};

//-------Objects---------------------------------------------------------
var player = new Player();
var computer = new Computer();
var ball = new Ball(300, 200);
var keysDown = {};

//-------Controllers---------------------------------------------------

window.addEventListener("keydown", function(event) { //whenever pressing the key and keep pressing the key the controller is activated
  keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) { //whenever you stop pressing the key, the controller stops
  delete keysDown[event.keyCode];
});

var update = function() {
  player.update();
  ball.update(player.bat, computer.bat);
};

//------Controller player---------------------------------------------

Player.prototype.update = function() {
  for(var key in keys) {
    var value = Number(key);
    if(value == 37) { // left arrow
      this.bat.move(-4, 0);
    } else if (value == 39) { // right arrow
      this.bat.move(4, 0);
    } else {
      this.bat.move(0, 0);
    }
  }
};

// Bat.prototype.move = function(x, y) {
//   this.x += x;
//   this.y += y;
//   this.x_speed = x;
//   this.y_speed = y;
//   if(this.x < 0) { // all the way to the left
//     this.x = 0;
//     this.x_speed = 0;
//   } else if (this.x + this.width > 600) { // all the way to the right
//     this.x = 600 - this.width;
//     this.x_speed = 0;
//   }
// }
