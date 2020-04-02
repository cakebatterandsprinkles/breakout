const ctx = canvas.getContext('2d');

let score = 0;
let brickRowCount = 11;
let brickColumnCount = 5;
let stopped = false;
const bricks = [];

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  dx: Math.ceil(Math.random() + 3 * 1.5),
  dy: -Math.ceil(Math.random() + 3 * 1.5),
  speed: 1
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

document.addEventListener('keydown', e => {
  if (e.key === "ArrowRight" || e.key === "Right") {
    paddle.dx = paddle.speed;
  } else if (e.key === "ArrowLeft" || e.key === "Left") {
    paddle.dx = -paddle.speed;
  }
})

document.addEventListener('keyup', e => {
  if (e.key === "ArrowRight" || e.key === "Right" || e.key === "ArrowLeft" || e.key === "Left") {
    paddle.dx = 0;
  }
})

document.addEventListener('keydown', e => {
  if (e.key === "Spacebar" || e.key === " ") {
    e.preventDefault();
    setTimeout(() => {
      score = 0;
      stopped = false;
      update();
    }, 500);
  }
})

window.addEventListener('resize', () => {
  createBricks();
  draw();
});

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

function movePaddle() {
  paddle.x += paddle.dx;
  if (paddle.x + paddle.width > canvas.width) {
    paddle.x = canvas.width - paddle.width;
  }
  if (paddle.x < 0) {
    paddle.x = 0
  }
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.dx *= -1;
  }
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy *= -1;
  }

  if (ball.x + ball.radius >= paddle.x &&
    ball.x - ball.radius <= paddle.x + paddle.width &&
    ball.y + ball.radius >= paddle.y) {
    ball.speed++;
    ball.dy = -ball.speed;
    paddle.width = Math.ceil(Math.random() * 50) + 60;

    if (ball.speed >= 10) {
      ball.speed = 4
    }
  }

  let hit = false;

  bricks.forEach(column => {
    column.forEach(brick => {
      if (brick.visible && !hit) {
        if (ball.x + ball.radius >= brick.x &&
          ball.x - ball.radius <= brick.x + brick.w &&
          ball.y - ball.radius <= brick.y + brick.h &&
          ball.y + ball.radius >= brick.y
        ) {
          hit = true;
          ball.dy *= -1;
          brick.visible = false;
          increaseScore();
        }
      }
    })
  })

  if (ball.y + ball.radius >= canvas.height) {
    stop();
    draw();
  }
  if (score === (brickRowCount * brickColumnCount)) {
    stop();
    draw();
  }
}

function increaseScore() {
  score++;
}

function showAllBricks() {
  bricks.forEach(col =>
    col.forEach(brick => {
      brick.visible = true;
    }))
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

function stop() {
  stopped = true;
  showAllBricks();
  score = 0;
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = 4;
  ball.dy = -4;
  ball.speed = 1;
  paddle.x = canvas.width / 2;
  paddle.dx = 0;
  paddle.x = canvas.width / 2 - paddle.width / 2;
  paddle.y = canvas.height - 20;
  directions.classList.remove('invisible');
}

function update() {
  movePaddle();
  moveBall();
  draw();

  if (!stopped) {
    requestAnimationFrame(update);
  }
}

createBricks();
draw();