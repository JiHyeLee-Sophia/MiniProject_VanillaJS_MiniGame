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
manredr1.src = "images/manfirer1.png";
manredr2.src = "images/manfirer2.png";
manr1.src = "images/manr1.png";
manr2.src = "images/manr2.png";
manoldr1.src = "images/manoldr1.png";
manoldr2.src = "images/manoldr2.png";
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
let fromOldtoOrigin = "";
let fromRedtoOrigin = "";
function settingTimeout(changeTor1, changeTor2) {
  //reset previous timeout
  if (fromRedtoOrigin) {
    clearTimeout(fromRedtoOrigin);
  } else if (fromOldtoOrigin) {
    clearTimeout(fromOldtoOrigin);
  }
  //change character image
  manr1 = changeTor1;
  manr2 = changeTor2;
}
function eatFruit(i) {
  const originalMan1 = new Image();
  const originalMan2 = new Image();
  originalMan1.src = "images/manr1.png";
  originalMan2.src = "images/manr2.png";

  eat.play();
  score++;
  //if fruit is watermellon
  if (fruitArray[i].src.endsWith("fruit1.png")) {
    settingTimeout(manoldr1, manoldr2);
    fromOldtoOrigin = setTimeout(() => {
      manr1 = originalMan1;
      manr2 = originalMan2;
      fromOldtoOrigin = "";
    }, 5000);
    //if fruit is icecream
  } else if (fruitArray[i].src.endsWith("fruit0.png")) {
    settingTimeout(manredr1, manredr2);
    fromRedtoOrigin = setTimeout(() => {
      manr1 = originalMan1;
      manr2 = originalMan2;
      fromRedtoOrigin = "";
    }, 5000);
  }
  fruitArray.splice(i, 1);
  fruits.splice(i, 1);
}
function addTrees(tree) {
  trees.push({
    x: canvas.width,
    y: 130,
    next: false
  });
  tree.next = true;
}
function moving(toMove) {
  for (let i = 0; i < toMove.length; i++) {
    if (manr1 === manredr1) {
      toMove[i].x -= 10;
    } else if (manr1 === manoldr1) {
      toMove[i].x -= 3;
    } else {
      toMove[i].x -= 5;
    }
  }
}
function setNextLocation(current, num) {
  let currentArray = "";
  let currentImageS = 0;
  let currentHeight = 0;
  if (spikes.indexOf(current) >= 0) {
    currentArray = spikes;
    currentImageS = spike1.width;
    currentHeight = 471;
  } else if (fruits.indexOf(current) >= 0) {
    currentArray = fruits;
    currentImageS = 40;
    currentHeight = 351;
  }
  for (let i = 0; i < num; i++) {
    if (i === 0) {
      currentArray.push({
        x: canvas.width + currentImageS * i,
        y: currentHeight,
        next: false
      });
    } else {
      currentArray.push({
        x: canvas.width + currentImageS * i,
        y: currentHeight,
        next: true
      });
    }
  }
  current.next = true;
}
function addFruits(fruit) {
  const randomF = Math.floor(Math.random() * 5) + 1;
  const arrayLength = fruitArray.length;
  let num = 0;
  //set watermelon or icecream when it's 1
  if (randomF === 1) {
    num = Math.floor(Math.random() * 2);
  } else {
    num = randomF;
  }
  //other fruits setting
  for (let j = 0; j < randomF; j++) {
    const afterLength = arrayLength + j;
    fruitArray[afterLength] = new Image();
    fruitArray[afterLength].src = `images/fruit${num}.png`;
  }
  //next fruit location
  setNextLocation(fruit, randomF);
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
    moving(trees);
    moving(spikes);
    moving(fruits);
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

  //draw ground
  context.drawImage(ground, 0, groundY);

  //draw spikes
  for (let i = 0; i < spikes.length; i++) {
    context.drawImage(spike1, spikes[i].x, spikes[i].y);
    //add next spikes
    if (spikes[i].x >= 380 && spikes[i].x <= 400) {
      if (!spikes[i].next) {
        const randomSpike = Math.floor(Math.random() * 2) + 1;
        setNextLocation(spikes[i], randomSpike);
      }
    }
    //erase passed spikes
    if (spikes[i].x === -spike1.width) {
      spikes.splice(i, 1);
    }
    //game over
    if (
      (charX + manr1.width >= spikes[i].x + 20 &&
        charX <= spikes[i].x + spike1.width - 20 &&
        charY + manr1.height >= spikes[i].y + 20) ||
      (charX + manr2.width >= spikes[i].x + 20 &&
        charX <= spikes[i].x + spike1.width - 20 &&
        charY + manr2.height >= spikes[i].y + 20)
    ) {
      if (manr1 !== manredr1) {
        gameOver();
      }
    }
  }

  //set fruit location && count control
  for (let i = 0; i < fruits.length; i++) {
    for (let j = 0; j < fruitArray.length; j++) {
      context.drawImage(fruitArray[j], fruits[j].x, fruits[j].y);
      //eat fruit
      if (
        (charX + manr1.width >= fruits[i].x + 25 &&
          charX <= fruits[i].x + fruitArray[i].width &&
          charY <= fruits[i].y + fruitArray[i].height &&
          charY + manr1.height >= fruits[i].y) ||
        (charX + manr2.width >= fruits[i].x + 25 &&
          charX <= fruits[i].x + fruitArray[i].width &&
          charY <= fruits[i].y + fruitArray[i].height &&
          charY + manr2.height >= fruits[i].y)
      ) {
        eatFruit(i);
      }
    }
    //set next fruit count and image
    if (fruits[i].x >= 380 && fruits[i].x <= 400) {
      if (!fruits[i].next) {
        addFruits(fruits[i]);
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

function gameStartHandler(e) {
  e.preventDefault();
  document.querySelector(".coverCanvas").style.display="none"
  e.target.parentNode.style.display = "none";
  gamestart.play();
  document.addEventListener("keydown", keydownHandler);
  document.addEventListener("keyup", keyupHandler);
}
function init() {
  const start = document.querySelector('.start')
  window.addEventListener('load', e=>start.style.display="inline")
  start.addEventListener("click", gameStartHandler);
  draw();
}
init();
