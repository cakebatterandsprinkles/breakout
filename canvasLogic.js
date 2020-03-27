const ctx = canvas.getContext('2d');

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x + r, y);
  this.arcTo(x + w, y, x + w, y + h, r);
  this.arcTo(x + w, y + h, x, y + h, r);
  this.arcTo(x, y + h, x, y, r);
  this.arcTo(x, y, x + w, y, r);
  this.closePath();
  return this;
}

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  dx: 4,
  dy: -4,
  speed: 4
}

const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  width: 80,
  height: 10,
  dx: 0,
  speed: 8
}

function drawPaddle() {
  ctx.beginPath();
  ctx.roundRect(paddle.x, paddle.y, paddle.width, paddle.height, paddle.height / 2);
  ctx.fillStyle = "#ffffffbe";
  ctx.fill();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#efc40f";
  ctx.fill();
  ctx.closePath();
}

drawBall();
drawPaddle();