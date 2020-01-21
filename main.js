const canvas = document.querySelector(".canvas"),
  context = canvas.getContext("2d");
const background = new Image();
const ground = new Image();
const tree = new Image();
const spike1 = new Image();
let manr1 = new Image();
let manr2 = new Image();
const manoldr1 = new Image();
const manoldr2 = new Image();
const manredr1 = new Image();
const manredr2 = new Image();

manr1.src = "images/manr1.png";
manr2.src = "images/manr2.png";
manoldr1.src = "images/manoldr1.png";
manoldr2.src = "images/manoldr2.png";
manredr1.src = "images/manfirer1.png";
manredr2.src = "images/manfirer2.png";
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

//audio
const eat = new Audio();
const gamestart = new Audio();
eat.src = "audio/score.mp3";
gamestart.src = "audio/music.wav";

const trees = [];
trees[0] = {
  x: 600,
  y: 130,
  next: false
};
const spikes = [];
spikes[0] = {
  x: canvas.width,
  y: 471,
  next: false
};
const fruits = [];
fruits[0] = {
  x: canvas.width + 15,
  y: 351,
  next: false
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

function eatFruit(i) {
  eat.play();
  score++;
  //if fruit is watermellon
  const originalMan1 = new Image();
  const originalMan2 = new Image();
  originalMan1.src = "images/manr1.png";
  originalMan2.src = "images/manr2.png";
  if (fruitArray[i].src.endsWith("fruit1.png")) {
    manr1 = manoldr1;
    manr2 = manoldr2;
    setTimeout(() => {
      manr1 = originalMan1;
      manr2 = originalMan2;
    }, 5000);
  //if fruit is icecream
  } else if (fruitArray[i].src.endsWith("fruit0.png")) {
    manr1 = manredr1;
    manr2 = manredr2;
    setTimeout(() => {
      manr1 = originalMan1;
      manr2 = originalMan2;
    }, 5000);
  }
  fruitArray.splice(i, 1);
  fruits.splice(i, 1);
}
function moveTree() {
  if (manr1===manredr1) {
    for (let i = 0; i < trees.length; i++) {
      trees[i].x -= 10;
    }
  }else if (manr1===manoldr1) {
    for (let i = 0; i < trees.length; i++) {
      trees[i].x -= 3;
    }
  } else {
    for (let i = 0; i < trees.length; i++) {
      trees[i].x -= 5;
    }
  }
}
function addTrees(tree) {
  trees.push({
    x: canvas.width,
    y: 130,
    next: false
  });
  tree.next = true;
}
function moveSpikes() {
  if (manr1===manredr1) {
    for (let i = 0; i < spikes.length; i++) {
      spikes[i].x -= 10;
    }
  }else if (manr1===manoldr1) {
  // if (manr1.src.endsWith("manoldr1.png")) {
    for (let i = 0; i < spikes.length; i++) {
      spikes[i].x -= 3;
    }
  } else {
    for (let i = 0; i < spikes.length; i++) {
      spikes[i].x -= 5;
    }
  }
}
function addSpikes(randomSpike, spike) {
  for (let i = 0; i < randomSpike; i++) {
    if (i === 0) {
      spikes.push({
        x: canvas.width + spike1.width * i,
        y: 471,
        next: false
      });
    } else {
      spikes.push({
        x: canvas.width + spike1.width * i,
        y: 471,
        next: true
      });
    }
  }
  spike.next = true;
}
function moveFruits() {
  if (manr1===manredr1) {
    for (let i = 0; i < fruits.length; i++) {
      fruits[i].x -= 10;
    }
  }else if (manr1===manoldr1) {
    for (let i = 0; i < fruits.length; i++) {
      fruits[i].x -= 3;
    }
  } else {
    for (let i = 0; i < fruits.length; i++) {
      fruits[i].x -= 5;
    }
  }
}
function addFruits(fruit) {
  const randomF = Math.floor(Math.random() * 5) + 1;
  const arrayLength = fruitArray.length;
  let num = 0;
  for (let j = 0; j < randomF; j++) {
    if (randomF === 1) {
      num = Math.floor(Math.random() * 2);
    } else {
      num = randomF;
    }
    const afterLength = arrayLength + j;
    fruitArray[afterLength] = new Image();
    fruitArray[afterLength].src = `images/fruit${num}.png`;
  }
  //next fruit location
  for (let j = 0; j < randomF; j++) {
    if (j === 0) {
      fruits.push({
        x: canvas.width + j * 40,
        y: 351,
        next: false
      });
    } else {
      fruits.push({
        x: canvas.width + j * 40,
        y: 351,
        next: true
      });
    }
  }

  fruit.next = true;
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
function clickHandler(event) {
  event.preventDefault();
  location.reload();
}
function gameOver() {
  const gameOVER = document.querySelector(".gameover");
  const tryAgain = gameOVER.querySelector(".try");
  gameOVER.style.top = "150px";
  gameOVER.style.opacity = "1";
  rightEvent = false;
  tryAgain.style.display = "inline";
  tryAgain.addEventListener("click", clickHandler);
}
function draw() {
  const groundY = canvas.height - ground.height;
  context.drawImage(background, 0, 0, canvas.width, canvas.height);

  //draw tree
  for (let i = 0; i < trees.length; i++) {
    context.drawImage(tree, trees[i].x, trees[i].y);
    if (trees[i].x >= 280 && trees[i].x <= 300) {
      if (!trees[i].next) {
        addTrees(trees[i]);
      }
    }
  }

  context.drawImage(ground, 0, groundY);
  //draw spikes
  for (let i = 0; i < spikes.length; i++) {
    context.drawImage(spike1, spikes[i].x, spikes[i].y);
    if (spikes[i].x >= 380 && spikes[i].x <= 390) {
      if (!spikes[i].next) {
        const randomSpike = Math.floor(Math.random() * 2) + 1;
        addSpikes(randomSpike, spikes[i]);
      }
    }
    if (spikes[i].x === -spike1.width) {
      spikes.splice(i, 1);
    }
    //game over
    if (
      charX + manr1.width >= spikes[i].x + 20 &&
      charX <= spikes[i].x + spike1.width - 20 &&
      charY + manr1.height >= spikes[i].y + 20
    ) {
      if(manr1!==manredr1){
        gameOver();
      }
    } else if (
      charX + manr2.width >= spikes[i].x + 20 &&
      charX <= spikes[i].x + spike1.width - 20 &&
      charY + manr2.height >= spikes[i].y + 20
    ) {
      if(manr2!==manredr2){
        gameOver();
      }
    }
  }

  //set fruit location && count control
  for (let i = 0; i < fruits.length; i++) {
    for (let j = 0; j < fruitArray.length; j++) {
      context.drawImage(fruitArray[j], fruits[j].x, fruits[j].y);
    }
    //set next fruit count and image
    if (fruits[i].x >= 380 && fruits[i].x <= 400) {
      if (!fruits[i].next) {
        addFruits(fruits[i]);
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
        eatFruit(i);
      } else if (
        charX + manr2.width >= fruits[i].x + 25 &&
        charX <= fruits[i].x + fruitArray[i].width &&
        charY <= fruits[i].y + fruitArray[i].height &&
        charY + manr2.height >= fruits[i].y
      ) {
        eatFruit(i);
      }
    }
  }

  //character walk Image
  // manr1 = manredr
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
