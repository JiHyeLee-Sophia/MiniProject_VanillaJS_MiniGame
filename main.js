const canvas = document.querySelector('.canvas'),
    context = canvas.getContext('2d');
const background = new Image();
const ground = new Image();
const tree = new Image();
const manr1 = new Image();
const manr2 = new Image();
const spike1 = new Image();
const fruit = new Image();

background.src = 'images/background.png';
ground.src = 'images/ground.png';
tree.src = 'images/tree.png';
manr1.src = 'images/manr1.png';
manr2.src = 'images/manr2.png';
spike1.src = 'images/spike monster B.png';
fruit.src = 'images/fruit3.png';

const trees = [];
trees[0] = {
    x: 600,
    y: 130
}
const spikes = [];
spikes[0] = {
    x: canvas.width,
    y: 471
}
const fruits = [];
fruits[0] = {
    x: canvas.width + 15,
    y: 351
}
let score = 0;
let charM = true;
let charC = 0;
let charY = 430;
let keyPressed = {};
let moveBG1 = '';
let moveBG2 = '';

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

function movemove(){
    moveBG1 = setTimeout(function () {
        moveTree();
        moveSpikes();
        moveFruits();
        moveCharater();
    }, 30)
}
function keydownHandler(event) {
    // event.preventDefault();
    keyPressed[event.key] = true;
    if (keyPressed['ArrowRight']) {
        if (charC % 30 === 0) {
            score++;
        }
        movemove();
    }
    if (keyPressed[' ']&&keyPressed['ArrowRight']) {
        if (charC % 30 === 0) {
            score++;
        }
            moveBG2 = setInterval(function(){
            moveTree();
            moveSpikes();
            moveFruits();
            moveCharater();
        },30)

        const jump = setInterval(function () {
            charY -= 10;
            if (charY == 350) {
                clearInterval(jump);
                setTimeout(function () {
                    var land = setInterval(function () {
                        charY+=10;
                        if (charY == 430) {
                            clearInterval(land)
                            clearInterval(moveBG2)
                        }
                    }, 30)
                }, 400)
            }
        }, 30)
    
    }

}
function keyupHandler(event) {
    delete keyPressed[event.key];
}
function getScore() {
    const mainScore = document.querySelector('.score');

    mainScore.innerText = `Score : ${score}`;
}
function draw() {
    const groundY = canvas.height - ground.height;
    context.drawImage(background, 0, 0, canvas.width, canvas.height)

    //add tree
    for (let i = 0; i < trees.length; i++) {
        context.drawImage(tree, trees[i].x, trees[i].y);
        if (trees[i].x === 300) {
            trees.push({
                x: canvas.width,
                y: canvas.height - ground.height - tree.height + 50
            })
        }
        if(trees[i].x === -tree.width){
            trees.shift();
        }
    }

    context.drawImage(ground, 0, groundY);
    //add spikes
    for (let i = 0; i < spikes.length; i++) {
        context.drawImage(spike1, spikes[i].x, spikes[i].y, spike1.width - 30, spike1.height - 10);
        if (spikes[i].x === 600) {
            spikes.push({
                x: canvas.width + 200,
                y: canvas.height - ground.height + 50
            })
        }
        if(spikes[i].x === -spike1.width){
            spikes.shift();
        }
    }

    //add fruits
    for (let i = 0; i < fruits.length; i++) {
        context.drawImage(fruit, fruits[i].x, fruits[i].y);
        if (fruits[i].x === 400) {
            // const randomF = Math.floor(Math.random()*5)+1;
            fruits.push({
                x: canvas.width,
                y: canvas.height - ground.height - 70
            }
            )
        }
        if(fruits[i].x === -fruit.width){
            fruits.shift();
        }
    }

    //character walk Image
    if (charM) {
        context.drawImage(manr1, 80, charY, 80, 80);
    } else {
        context.drawImage(manr2, 80, charY, 80, 80);
    }

    //eat fruits
    
    //gameover

    
    getScore();
    requestAnimationFrame(draw)
}
function init() {
    draw()
    document.addEventListener('keydown', keydownHandler)
    document.addEventListener('keyup', keyupHandler)
    // document.addEventListener('keypress',keypressHandler)
}
init();