const ctx = canvas.getContext('2d');

let score = 0;
let brickRowCount = 11;
let brickColumnCount = 5;
const bricks = [];

window.addEventListener('resize', handleBrickNumChanges);

function handleBrickNumChanges() {
  if (window.innerWidth >= 1250) {
    brickRowCount = 11;
    brickColumnCount = 5;
  } else if (window.innerWidth >= 1000) {
    brickRowCount = 9;
    brickColumnCount = 5;
  } else if (window.innerWidth >= 760) {
    brickRowCount = 8;
    brickColumnCount = 5;
  }
}
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x + r, y);
  this.arcTo(x + w, y, x + w, y + h, r / 2);
  this.arcTo(x + w, y + h, x, y + h, r / 2);
  this.arcTo(x, y + h, x, y, r / 2);
  this.arcTo(x, y, x + w, y, r / 2);
  this.closePath();
  return this;
}

function decideBrickColor(key) {
  if (key % 6 === 0) {
    return "#efc40f";
  } else if (key % 6 === 1) {
    return "#ff6200";
  } else if (key % 6 === 2) {
    return "#df18c1";
  } else if (key % 6 === 3) {
    return "#21d511";
  } else if (key % 6 === 4) {
    return "#4399de";
  } else if (key % 6 === 5) {
    return "#5639cb";
  }
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

const brickPrototype = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true
}

function createBricks() {
  handleBrickNumChanges();
  for (let i = 0; i < brickRowCount; i++) {
    bricks[i] = [];
    for (let j = 0; j < brickColumnCount; j++) {
      const x = i * (brickPrototype.padding + brickPrototype.w) + brickPrototype.offsetX;
      const y = j * (brickPrototype.padding + brickPrototype.h) + brickPrototype.offsetY;
      bricks[i][j] = {
        key: i + j,
        x,
        y,
        ...brickPrototype
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#efc40f";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.roundRect(paddle.x, paddle.y, paddle.width, paddle.height, paddle.height / 2);
  ctx.fillStyle = "#ffffffbe";
  ctx.fill();
}

function drawScore() {
  ctx.font = '20px Lato';
  ctx.fillStyle = "#ffffffbe";
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

function drawBricks() {
  bricks.forEach(row => {
    row.forEach(brick => {
      ctx.roundRect(brick.x, brick.y, brick.w, brick.h, brick.h / 2);
      ctx.fillStyle = brick.visible ? decideBrickColor(brick.key) : 'transparent';
      ctx.fill();
    })
  })

}

function draw() {
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

createBricks();
draw();