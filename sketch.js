let player;
let bgImage;
let playerImage;
let obstacleImage;
let obstacles = [];
let isGameOver = false;
let wordClassifier;
function preload() {
  bgImage = loadImage("background.jpg");
  playerImage = loadImage("Jerry - player.png");
  obstacleImage = loadImage("Tom - obstacle.png");
  let options = {
    probabilityThershold: 0.85,
  };
  wordClassifier = ml5.soundClassifier("SpeechCommands18w", options);
}
function setup() {
  createCanvas(1100, 510);
  player = new Player();
  wordClassifier.classify(heardWord);
}
function heardWord(error, results) {
  if (error) {
    console.error(error);
  }
  if (results[0].label === "up") player.jump();
}

function keyPressed() {
  if (key === " " && isGameOver === false) {
    player.jump();
  } else {
    obstacles = [];
    isGameOver = false;
    loop();
    reDraw();
  }
}

function draw() {
  if (random(1) < 0.01) {
    obstacles.push(new Obstacle());
  }
  background(bgImage);
  player.show();
  player.move();
  for (let obs of obstacles) {
    obs.show();
    obs.move();
    if (player.collided(obs) === true) {
      console.log("Game-Over");
      push();
      fill("red");
      textSize(50);
      stroke(255);
      strokeWeight(1);
      text("Game Over", 405, 205);
      isGameOver = true;
      pop();
      noLoop();
    }
  }
}
