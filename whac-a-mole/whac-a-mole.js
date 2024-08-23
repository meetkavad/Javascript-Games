const holes = document.querySelectorAll('.holes');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');

let result = 0;
let currentholeId;
let currenttime = 10;
let timeInterval =null;


timeLeft.textContent = currenttime;

 function moleinthehole(){
    holes.forEach(hole => {
        hole.classList.remove('mole');
    });

    let randomhole = holes[Math.floor(Math.random()*9)];
    randomhole.classList.add('mole');
 
     currentholeId =  randomhole.id;

 }

 holes.forEach(hole => {
    hole.addEventListener('mousedown' , ()=>{
          if(hole.id == currentholeId  )
          {
            result++;
            score.innerHTML = result;
            currentholeId = null;
          }
        
    })
 })

 function movemole()
 {
    timeInterval = setInterval(moleinthehole,600);
 }

 movemole();

 function countdown()
 {
    currenttime--;
    timeLeft.textContent = currenttime;
    if(currenttime== 0){
    clearInterval(timerIntervalId);
    clearInterval(timeInterval);
    

    alert('Game Over \n your final score is :' + result);
    }

 }

 let timerIntervalId = setInterval(countdown, 1000);
