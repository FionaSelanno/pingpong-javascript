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
  player.render();
  computer.render();
  ball.render();
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
  this.x_speed = -3;
  this.y_speed = 0;
  this.radius = 5;
};

Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = "#fff";
  context.fill();
};

//-------Objects---------------------------------------------------------
var player = new Player();
var computer = new Computer();
var ball = new Ball(300, 200);

//----------------------------------------------------------------------
// var update = function(){
//   ball.update();
// };
//
// Ball.prototype.update = function() {
//   this.x += this.x_speed;
//   this.y += this.y_speed;
// };

var update = function(){
  ball.update(player.bat, computer.bat);
};

Ball.prototype.update = function(bat1, bat2){
  this.x += this.x_speed;
  this.y += this.y_speed;
  var top_x = this.x - 5;
  var top_y = this.y - 5;
  var bottom_x = this.x + 5;
  var bottom_y = this.y + 5;

  if(this.y - 5 < 0) { // hitting the bottom
   this.y = 5;
   this.y_speed = -this.y_speed;
  } else if(this.y + 5 > 400) { // hitting the top
   this.y = 395;
   this.y_speed = -this.y_speed;
 }

  if(this.x < 0 || this.x > 600) { // a point was scored
    this.x_speed = 3;
    this.y_speed = 0;
    this.x = 300;
    this.y = 200;
  }

  if(top_x > 300) {
    if(top_x < (bat1.x + bat1.width) && top_x > bat1.x && bottom_y < (bat1.y + bat1.height) && top_y > bat1.y) {
      // hit the player's bat
      this.x_speed = -3;
      this.y_speed += (bat1.y_speed / 2);
      this.x += this.x_speed;
    }
  }
   else {
    if(top_x < (bat2.x + bat2.width) && top_x > bat2.x && bottom_y < (bat2.y + bat2.height) && top_y > bat2.y) {
      // hit the computer's paddle
      this.x_speed = 3;
      this.y_speed += (bat2.y_speed / 2);
      this.x += this.x_speed;
    }
  }
};


//-------Controllers---------------------------------------------------
var keysDown = {};

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

//------Controller player: keys, direction-movement---------------------------------------------


Player.prototype.update = function() {
  for(var key in keysDown) {
    var value = Number(key);
    if(value == 38) { // up arrow
      this.bat.move(0, -4);
    } else if (value == 40) { // down arrow
      this.bat.move(0, 4);
    } else {
      this.bat.move(0, 0); //if hitting anything else, nothing moves
    }
  }
};

Bat.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  this.x_speed = x;
  this.y_speed = y;
  if(this.y < 0) { // all the way to the bottom
    this.y = 0;
    this.y_speed = 0;
  } else if (this.y + this.height > 400) { // all the way to the top
    this.y = 400 - this.height;
    this.y_speed = 0;
  }
}
