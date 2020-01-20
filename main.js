const canvas = document.querySelector(".canvas"),
  context = canvas.getContext("2d");
const background = new Image();
const ground = new Image();
const tree = new Image();
const manr1 = new Image();
const manr2 = new Image();
const spike1 = new Image();

background.src = "images/background.png";
ground.src = "images/ground.png";
tree.src = "images/tree.png";
manr1.src = "images/manr1.png";
manr2.src = "images/manr2.png";
spike1.src = "images/spike monster B.png";

//fruit count
let fruitArray = [];
fruitArray[0] = new Image();
fruitArray[0].src = "images/fruit3.png";
let randomF = 1;

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
let jump = false;
let jumpCnt = 0;
let jumpUp = "";
let jumpDown = "";
let jumpStay = "";

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
function jumpUpnDown() {
  const currentY = charY;
  jumpUp = setInterval(function() {
    charY -= 10;
    if (currentY - charY === 80) {
      clearInterval(jumpUp);
      jumpStay = setTimeout(function() {
        jumpDown = setInterval(function() {
          charY += 10;
          if (charY == 430) {
            jumpCnt = 0;
            clearInterval(jumpDown);
          }
        }, 30);
      }, 200);
    }
  }, 30);
}
function jumpjump() {
  jumpCnt++;
  if (jumpCnt === 1) {
    jumpUpnDown();
  } else if (jumpCnt === 2) {
    clearInterval(jumpUp);
    clearInterval(jumpDown);
    clearTimeout(jumpStay);
    jumpUpnDown();
  }
}
function keydownHandler(event) {
  event.preventDefault();
  if (event.key === "ArrowRight") {
    rightEvent = true;
  }
  if (event.key === " ") {
    jumpjump();
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
function clickHandler(event){
  event.preventDefault();
  location.reload();
}
function gameOver() {
  const gameOVER = document.querySelector(".gameover");
  const tryAgain = gameOVER.querySelector('.try');
  gameOVER.style.top = "150px";
  gameOVER.style.opacity = "1";
  rightEvent = false;
  tryAgain.addEventListener('click', clickHandler)
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
    if (spikes[i].x === 500) {
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

  //set fruit location && count control
  for (let i = 0; i < fruits.length; i++) {
    for (let j = 0; j < fruitArray.length; j++) {
      context.drawImage(fruitArray[j], fruits[j].x, fruits[j].y);
    }
    randomF = Math.floor(Math.random() * 5) + 1;
    //set next fruit count and image
    if (fruits[fruits.length-1].x === 400) {
      const arrayLength = fruitArray.length;
      for (let j = 0; j < randomF; j++) {
        const afterLength = arrayLength + j;
        fruitArray[afterLength] = new Image();
        fruitArray[afterLength].src = `images/fruit${randomF}.png`;
      }
      //next fruit location
      for (let j = 0; j < randomF; j++) {
        if (j == 0) {
          fruits.push({
            x: canvas.width,
            y: 351
          });
        } else {
          fruits.push({
            x: canvas.width + j * 40,
            y: 351
          });
        }
      }
    }
    //eat fruits
    for (let i = 0; i < fruitArray.length; i++) {
      if (
        charX + manr1.width >= fruits[i].x + 25 &&
        charX <= fruits[i].x + fruitArray[i].width &&
        charY <= fruits[i].y + fruitArray[i].height &&
        charY + manr1.height >= fruits[i].y
      ) {
        // fruits[i].x = -50;
        eat.play();
        score++;
        fruitArray.splice(i,1);
        fruits.splice(i,1);
      } else if (
        charX + manr2.width >= fruits[i].x + 25 &&
        charX <= fruits[i].x + fruitArray[i].width &&
        charY <= fruits[i].y + fruitArray[i].height &&
        charY + manr2.height >= fruits[i].y
      ) {
        // fruits[i].x = -50;
        eat.play();
        score++;
        fruitArray.splice(i,1);
        fruits.splice(i,1);
      }
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
  document.addEventListener("keydown", keydownHandler);
  document.addEventListener("keyup", keyupHandler);
}
init();
