const canvas = document.querySelector(".canvas"),
  context = canvas.getContext("2d");
const background = new Image();
const ground = new Image();
const tree = new Image();
const manr1 = new Image();
const manr2 = new Image();
const spike1 = new Image();
const fruit = new Image();

background.src = "images/background.png";
ground.src = "images/ground.png";
tree.src = "images/tree.png";
manr1.src = "images/manr1.png";
manr2.src = "images/manr2.png";
spike1.src = "images/spike monster B.png";
fruit.src = "images/fruit3.png";

//audio
const eat = new Audio();
const gamestart = new Audio();
eat.src = "audio/score.mp3";
gamestart.src = "audio/music.wav";

const trees = [];
trees[0] = {
  x: 600,
  y: 130
};
const spikes = [];
spikes[0] = {
  x: canvas.width,
  y: 471
};
const fruits = [];
fruits[0] = {
  x: canvas.width + 15,
  y: 351
};
let score = 0;
let charM = true;
let charC = 0;
let charX = 80;
let charY = 430;
let moveBG1 = "";
let moveBG2 = "";
let rightEvent = false;

function moveTree() {
  for (let i = 0; i < trees.length; i++) {
    trees[i].x -= 5;
  }
}
function moveSpikes() {
  for (let i = 0; i < spikes.length; i++) {
    spikes[i].x -= 5;
  }
}
function moveFruits() {
  for (let i = 0; i < fruits.length; i++) {
    fruits[i].x -= 5;
  }
}
function moveCharater() {
  charC++;
  if (charC % 30 >= 0 && charC % 30 < 15) {
    charM = false;
  } else {
    charM = true;
  }
}
function movemove() {
  moveBG1 = setTimeout(function() {
    moveTree();
    moveSpikes();
    moveFruits();
    moveCharater();
  }, 30);
}
function keydownHandler(event) {
  event.preventDefault();
  if (event.key === "ArrowRight") {
    rightEvent = true;
  }
  if (event.key === " ") {
    const jump = setInterval(function() {
      charY -= 10;
      if (charY == 350) {
        clearInterval(jump);
        setTimeout(function() {
          let land = setInterval(function() {
            charY += 10;
            if (charY == 430) {
              clearInterval(land);
            }
          }, 30);
        }, 200);
      }
    }, 30);
  }
}
function keyupHandler(event) {
  event.preventDefault();
  if (event.key === "ArrowRight") {
    rightEvent = false;
  }
}
function getScore() {
  const mainScore = document.querySelector(".score h1");
  mainScore.innerText = `Score : ${score}`;
}
function gameOver() {
  const gameOVER = document.querySelector(".gameover");
  gameOVER.style.top = "150px";
  gameOVER.style.opacity = "1";
  rightEvent = false;
  setTimeout(() => location.reload(), 2000);
}
function draw() {
  const groundY = canvas.height - ground.height;
  context.drawImage(background, 0, 0, canvas.width, canvas.height);

  //add tree
  for (let i = 0; i < trees.length; i++) {
    context.drawImage(tree, trees[i].x, trees[i].y);
    if (trees[i].x === 300) {
      trees.push({
        x: canvas.width,
        y: 130
      });
    }
  }

  context.drawImage(ground, 0, groundY);
  //add spikes
  for (let i = 0; i < spikes.length; i++) {
    context.drawImage(spike1, spikes[i].x, spikes[i].y);
    if (spikes[i].x === 600) {
      spikes.push({
        x: canvas.width + 200,
        y: 471
      });
    }
    //game over
    if (
      charX + manr1.width >= spikes[i].x + 20 &&
      charX <= spikes[i].x + spike1.width - 20 &&
      charY + manr1.height >= spikes[i].y + 20
    ) {
      gameOver();
    } else if (
      charX + manr2.width >= spikes[i].x + 20 &&
      charX <= spikes[i].x + spike1.width - 20 &&
      charY + manr2.height >= spikes[i].y + 20
    ) {
      gameOver();
    }
  }

  //add fruits
  for (let i = 0; i < fruits.length; i++) {
    context.drawImage(fruit, fruits[i].x, fruits[i].y);
    if (fruits[i].x === 400) {
      // const randomF = Math.floor(Math.random()*5)+1;
      // const fruitSrc = `images/fruit${randomF}.png`;
      fruits.push({
        x: canvas.width,
        y: 351
      });
    }
    //eat fruits
    if (
      charX + manr1.width >= fruits[i].x+25 &&
      charX <= fruits[i].x + fruit.width &&
      charY <= fruits[i].y + fruit.height &&
      charY + manr1.height >= fruits[i].y
    ) {
      fruits[i].x = -50;
      eat.play();
      score++;
    } else if (
      charX + manr2.width >= fruits[i].x+25 &&
      charX <= fruits[i].x + fruit.width &&
      charY <= fruits[i].y + fruit.height &&
      charY + manr2.height >= fruits[i].y
    ) {
      fruits[i].x = -50;
      eat.play();
      score++;
    }
  }

  //character walk Image
  if (charM) {
    context.drawImage(manr1, charX, charY);
  } else {
    context.drawImage(manr2, charX, charY);
  }
  //background moves by user key press
  if (rightEvent) {
    movemove();
  }

  getScore();
  requestAnimationFrame(draw);
}
function init() {
  draw();
  gamestart.play();
  document.addEventListener("keydown", keydownHandler);
  document.addEventListener("keyup", keyupHandler);
}
init();
