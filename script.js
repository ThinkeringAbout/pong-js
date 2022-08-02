function init() {
  game = new rect("#000", 0, 0, 800, 600);
  player1 = new rect("#fff", 10, game.height / 2 - 40, 20, 120);
  player2 = new rect("#fff", game.width - 30, game.height / 2 - 40, 20, 120);
  player1.scores = 0;
  player2.scores = 0;
  ball = new rect("#fad", 40, game.height / 2 - 10, 20, 20);
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
setInterval(draw, 1);
