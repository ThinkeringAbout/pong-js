function init() {
  game = new rect("#000", 0, 0, 800, 600);
  player1 = new rect("#fff", 10, game.height / 2 - 40, 20, 120);
  player2 = new rect("#fff", game.width - 30, game.height / 2 - 40, 20, 120);
  player1.scores = 0;
  player2.scores = 0;
  ball = new rect("#fad", game.width / 2, game.height / 2 , 20, 20);
  canvas = document.querySelector(".pong");
  canvas.width = game.width;
  canvas.height = game.height;
  context = canvas.getContext('2d');
  draw();
}

function draw() {
  game.draw();
  context.font = 'bold 128px courier';
  context.textAlign = 'center';
  context.textBaseline = 'top';
  context.fillStyle = "#ccc";
  context.fillText(player1.scores, 100, 0);
  context.fillText(player2.scores, game.width - 100, 0);
  for (let i = 10; i < game.height; i += 45) {
    context.fillStyle = "#ccc";
    context.fillRect(game.width/2 - 10, i, 20, 30);
  }
  player1.draw();
  player2.draw();
  ball.draw();
  ball.x += xOffset;
  ball.y += yOffset;
  if (ball.y > game.height - ball.height || ball.y == 0) {
    yOffset *= -1;
  }
  if (ball.y > player2.y && ball.y < player2.y + player2.height && ball.x > 750 && ball.x < 752) {
    xOffset *= -1;
  } else if (ball.x > 770) {
    player1.scores++;
    ball.x = game.width / 2;
    ball.y = game.height / 2;
    xOffset *= -1;
  }
  if (ball.y > player1.y && ball.y < player1.y + player1.height && ball.x < 30 && ball.x > 28) {
    xOffset *= -1;
  } else if (ball.x < 10) {
    player2.scores++;
    ball.x = game.width / 2;
    ball.y = game.height / 2;
    xOffset *= -1;
  }
  if (player1.scores > player2.scores && player1.scores == 5) {
    xOffset = 0;
    yOffset = 0;
    context.clearRect(0, 0, game.width, game.height);
    context.font = 'bold 64px courier';
    context.fillText("Player 1 wins", game.width / 2, 0);
  } else if (player2.scores > player1.scores && player2.scores == 5){
    xOffset = 0;
    yOffset = 0;
    context.clearRect(0, 0, game.width, game.height);
    context.font = 'bold 64px courier';
    context.fillText("Player 2 wins", game.width / 2, 0);
  }
}

function rect(color, x, y, width, height) {
  this.color = color;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.draw = function() {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

let xOffset = 1;
let yOffset = 1;
let speed = 10;
window.onload = init;
document.addEventListener('keydown', function(event) {
  if (event.code == "ArrowDown") {
    if (player2.y < game.height - player2.height) {
      player2.y += 20;
    }
  } else if (event.code == "ArrowUp") {
    if (player2.y > 0) {
      player2.y -= 20;
    }
  } else if (event.code == "KeyS") {
    if (player1.y < game.height - player1.height) {
      player1.y += 20;
    }
  } else if (event.code == "KeyW") {
    if (player1.y > 0) {
      player1.y -= 20;
    }
  }
})
setInterval(draw, speed);
