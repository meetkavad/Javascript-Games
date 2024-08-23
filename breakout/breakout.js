const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('.score');
const textDisplay = document.querySelector('.text');
let button = document.querySelector('#button'); 

button.addEventListener('click' , ()=>{
    location.reload();
})

const blockHeight = 20;
const blockWidth = 100;
const boardWidth = 560;
const boardHeight = 300;
const ballDiameter = 20;
let score = 0;
let timerId;

const userStart = [230,10];
let userCurrentPosition = userStart;

const ballStart = [270, 30];
let ballCurrrentPosition = ballStart;

let xDirection = 2;
let yDirection = 2;

class Block{
        constructor(xAxis, yAxis)
        {
            this.bottomLeft = [xAxis,yAxis];
            this.bottomRight= [xAxis + blockWidth, yAxis];
            this.topLeft = [xAxis, yAxis +blockHeight ];
            this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
        }
}

// all my blocks
const blocks =[
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),

]


// draw all my blocks 
function addBlock(){
    
    for(let i = 0 ;i< blocks.length ; i++){

        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left =blocks[i].bottomLeft[0]+ "px" ;
        block.style.bottom = blocks[i].bottomLeft[1] + "px";
        grid.appendChild(block);

    }

}

addBlock();

//add user block :
const user = document.createElement('div');
user.classList.add('userBlock');
drawUser();
grid.appendChild(user);

//draw user :
function drawUser(){
    user.style.left =userCurrentPosition[0] + "px";
    user.style.bottom = userCurrentPosition[1] + "px";
}

//move user :

function moveUser(e){
      switch(e.key)
      {
        case 'ArrowLeft' : 
            if(userCurrentPosition[0] > 0)
            {
                    userCurrentPosition[0]-=10;
                    drawUser();
            }
            break;
        case 'ArrowRight' :
            if(userCurrentPosition[0] < boardWidth-blockWidth )
            {
                userCurrentPosition[0]+=10;
                drawUser();
            }
            break;
      }
}

document.addEventListener('keydown', moveUser);


// add ball :

const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);

// draw ball : 

function drawBall(){
    ball.style.left = ballCurrrentPosition[0] + "px";
    ball.style.bottom = ballCurrrentPosition[1] + "px";
}

//move ball :

function moveBall(){
     ballCurrrentPosition[0] += xDirection ;
     ballCurrrentPosition[1] += yDirection;
     drawBall();
     checkCollisions();
}

 timerId = setInterval(moveBall, 20);

// check for collisions :

function checkCollisions(){

    // check for block collisions :

    for(let i =0 ;i<blocks.length ; i++)
    {
       if(ballCurrrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrrentPosition[0] < blocks[i].bottomRight[0] 
          && (ballCurrrentPosition[1]+ ballDiameter) >  blocks[i].bottomLeft[1]  && ballCurrrentPosition[1] < blocks[i].topLeft[1])
       {
        const Allblocks = Array.from(document.querySelectorAll('.block'));
          Allblocks[i].classList.remove('block');
          blocks.splice(i,1);     
          changeDirection();
          score++;
          scoreDisplay.innerHTML = score;
       }

       if(blocks.length == 0)
       {
        grid.style.display = "none";
        textDisplay.innerHTML = "you won";
        button.style.display = "block";
        clearInterval(timerId);
        document.removeEventListener('keydown',moveUser);
       }
    }

    // check for wall collisions :
     if ( 
         ballCurrrentPosition[0] >= (boardWidth-ballDiameter) ||  
         ballCurrrentPosition[0] <= 0  ||
         ballCurrrentPosition[1] >= (boardHeight - ballDiameter)
        )
            {
                changeDirection();
            }
    
    // check for user block's collisions :
    if(ballCurrrentPosition[0] > userCurrentPosition[0] && ballCurrrentPosition[0] < userCurrentPosition[0] + blockWidth 
        && ballCurrrentPosition[1]  > userCurrentPosition[1] && ballCurrrentPosition[1] < userCurrentPosition[1] + blockHeight)
        {
            changeDirection();
        }

    //check for game over : 
    if(ballCurrrentPosition[1] <= 0)
    {
       clearInterval(timerId);
       grid.style.display = "none";
       textDisplay.innerHTML = "you lose";
       button.style.display = "block";

       document.removeEventListener('keydown', moveUser);
    }

}

function changeDirection(){

    if(xDirection === 2 && yDirection === 2){
    yDirection =  -2;
    return;
    }
    if(xDirection === 2 && yDirection === -2){
    xDirection =  -2;
    return;
    }
    if(xDirection === -2 && yDirection === -2){
    yDirection =  2;
    return;
    }
    if(xDirection === -2 && yDirection === 2){
    xDirection =  2;
    return;
    }
    
}

