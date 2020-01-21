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

manr1.src="images/manr1.png";
manr2.src="images/manr2.png";
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
let spikeCnt = false;
let fruitCnt = false;
let treeCnt = false;
// a181878a!!
function eatFruit(i) {
  eat.play();
  score++;
  //if fruit is watermellon
  if (manr1.src.endsWith('manr1.png')) {
    const originalMan1 = manr1;
    const originalMan2 = manr2;
    manr1 = manoldr1;
    manr2 = manoldr2;
    setTimeout(() => {
      manr1 = originalMan1;
      manr2 = originalMan2;
    }, 5000);
  }
  fruitArray.splice(i, 1);
  fruits.splice(i, 1);
}
function moveTree() {
  if (manr1.src.endsWith('manoldr1.png')) {
    for (let i = 0; i < trees.length; i++) {
      trees[i].x -= 2.5;
    }
  } else {
    for (let i = 0; i < trees.length; i++) {
      trees[i].x -= 5;
    }
  }
}
function addTrees() {
  setTimeout(()=>{
        trees.push({
        x: canvas.width,
        y: 130
      });
    treeCnt = false;
  },2000)
}
function moveSpikes() {
  if (manr1.src.endsWith('manoldr1.png')) {
    for (let i = 0; i < spikes.length; i++) {
      spikes[i].x -= 2.5;
    }
  } else {
    for (let i = 0; i < spikes.length; i++) {
      spikes[i].x -= 5;
    }
  }
}
function addSpikes(randomSpike) {
  let time = 600;
  setTimeout(()=>{
    for(let i=0; i<randomSpike;i++){
      spikes.push({
        x: canvas.width +spike1.width*i,
        y: 471
      });
    }
    spikeCnt = false;
  },time)
}
function moveFruits() {
  if (manr1.src.endsWith('manoldr1.png')) {
    for (let i = 0; i < fruits.length; i++) {
      fruits[i].x -= 2.5;
    }
  } else {
    for (let i = 0; i < fruits.length; i++) {
      fruits[i].x -= 5;
    }
  }
}
function addFruits(){
  setTimeout(()=>{
    const arrayLength = fruitArray.length;
      for (let j = 0; j < randomF; j++) {
        const afterLength = arrayLength + j;
        fruitArray[afterLength] = new Image();
        fruitArray[afterLength].src = `images/fruit${randomF}.png`;
      }
      //next fruit location
      for (let j = 0; j < randomF; j++) {
          fruits.push({
            x: canvas.width + j * 40,
            y: 351
          });
      }
    fruitCnt = false;
  },800)
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
      if (!treeCnt) {
        addTrees();
        treeCnt = true;
      }
    }
  }

  context.drawImage(ground, 0, groundY);
  //draw spikes
  for (let i = 0; i < spikes.length; i++) {
    context.drawImage(spike1, spikes[i].x, spikes[i].y);
    if (spikes[i].x >= 480 && spikes[i].x <= 500) {
      if (!spikeCnt) {
        const randomSpike = Math.floor(Math.random()*3)+1;
        addSpikes(randomSpike);
        spikeCnt = true;
      }
    }
    if(spikes[i].x === -spike1.width){
      spikes.splice(i,1);
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
    const lastX = fruits[fruits.length - 1].x;
    if (lastX>=380&&lastX <= 400) {
      if(!fruitCnt){
      addFruits();
      fruitCnt=true;
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
