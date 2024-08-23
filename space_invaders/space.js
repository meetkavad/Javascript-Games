const form = document.getElementById("form");
const playBtn = document.querySelector('input[type="submit"]');
const grid = document.querySelector(".grid");
const player_name = document.querySelector(".player-name");
const resultDisplay = document.querySelector(".result");
grid.style.display = "none";
resultDisplay.style.display = "none";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const form_name = document.querySelector('input[type = "text"]').value;
  const form_age = document.querySelector('input[type="number"]').value;

  if (form_age <= 18) {
    playBtn.style.display = "none";
    form.style.display = "none";
    grid.style.display = "flex";
    resultDisplay.style.display = "flex";

    player_name.innerHTML = form_name + "'s game :";
    score = 30;
    resultDisplay.innerHTML = score;
    let currentShooterIndex = 202;
    let invadersId;
    let width = 15;
    let direction = 1;
    let goingRight = true; //used in moving the invaders properly
    let aliensRemoved = []; // it stores the indexes(from the alienInvaders array) of the aliens that are removed;
    let gameOver = 0; // to stop the laser id to stop fire;

    //creating the squares :
    for (let i = 0; i < 225; i++) {
      const square = document.createElement("div");
      grid.appendChild(square);
    }

    const squares = Array.from(document.querySelectorAll(".grid div"));

    const alienInvaders = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30,
      31, 32, 33, 34, 35, 36, 37, 38, 39,
    ];

    // drawing the alienInvaders:
    function draw() {
      for (let i = 0; i < alienInvaders.length; i++) {
        if (!aliensRemoved.includes(i))
          squares[alienInvaders[i]].classList.add("invader");
      }
    }

    draw();

    // removing the alienInvaders:
    function remove() {
      for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove("invader");
      }
    }

    squares[currentShooterIndex].classList.add("shooter"); //to assign shooter it's index;

    function moveShooter(e) {
      if (!gameOver) {
        squares[currentShooterIndex].classList.remove("shooter");
        switch (e.key) {
          case "ArrowLeft":
            if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
            break;
          case "ArrowRight":
            if (currentShooterIndex % width !== width - 1)
              currentShooterIndex += 1;
            break;
        }
        squares[currentShooterIndex].classList.add("shooter");
      }
      
    }

    document.addEventListener("keydown", moveShooter);

    function moveInvaders() {
      const leftEdge = alienInvaders[0] % width;
      const rightEdge = alienInvaders[alienInvaders.length - 1] % width;
      remove();
      //at the right edge :
      if (rightEdge === width - 1 && goingRight) {
        direction = -1;

        for (let i = 0; i < alienInvaders.length; i++) {
          alienInvaders[i] += 16; //15
          goingRight = false;
        }
      }
      // at the left edge :
      if (leftEdge === 0 && !goingRight) {
        direction = 1;
        for (let i = 0; i < alienInvaders.length; i++) {
          alienInvaders[i] += 14;
          goingRight = true;
        }
      }

      //moving the invaders in a particular direction ( 1 for right and -1 for left)
      for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction;
      }

      draw();

      // game over time :
      if (squares[currentShooterIndex].classList.contains("invader")) {
        resultDisplay.innerHTML = "GAME OVER";
        clearInterval(invadersId);
        gameOver = 1;
      }
      for (let i = 0; i < alienInvaders.length; i++) {
        if (alienInvaders[i] >= squares.length) {
          resultDisplay.innerHTML = "GAME OVER";
          clearInterval(invadersId);
          gameOver = 1;
        }
      }
      if (aliensRemoved.length === alienInvaders.length) {
        resultDisplay.innerHTML = "you won";
        clearInterval(invadersId);
        gameOver = 1;
      }
    }

    invadersId = setInterval(moveInvaders, 200);

    function shoot(e) {
      let laserId;
      let currentLaserIndex = currentShooterIndex;
      function moveLaser() {
        squares[currentLaserIndex].classList.remove("laser");
        currentLaserIndex -= width;
        squares[currentLaserIndex].classList.add("laser");

        if (squares[currentLaserIndex].classList.contains("invader")) {
          squares[currentLaserIndex].classList.remove("laser");
          squares[currentLaserIndex].classList.remove("invader");
          squares[currentLaserIndex].classList.add("boom");
          setTimeout(
            () => squares[currentLaserIndex].classList.remove("boom"),
            200
          );
          clearInterval(laserId);

          const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
          aliensRemoved.push(alienRemoved);
          score--;
          resultDisplay.innerHTML = score;
        }
      }
      switch (e.key) {
        case "ArrowUp":
          if (!gameOver) laserId = setInterval(moveLaser, 100);
          else clearInterval(laserId);
      }
    }

    document.addEventListener("keydown", shoot);
  } else {
    resultDisplay.style.display = "flex";
    resultDisplay.innerHTML = "NOT FOR ADULTS";
    resultDisplay.style.color = "red";
    resultDisplay.style.fontSize = "50px";
    resultDisplay.style.margin = "0px auto";
    resultDisplay.style.width = "1000px";
    resultDisplay.style.textAlign = "center";
  }
});
