document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll(".grid div");
  const result = document.querySelector("#result");
  const displayCurrentPlayer = document.querySelector("#current-player");
  let currentplayer = 1;

  function checkWinner(i) {
    if (squares[i].classList.contains("taken")) {
      if (
        squares[i].classList.toString() ===
          squares[i + 7].classList.toString() &&
        squares[i].classList.toString() ===
          squares[i + 14].classList.toString() &&
        squares[i].classList.toString() === squares[i + 21].classList.toString()
      ) {
        if (squares[i].classList[1] === "player-one")
          result.innerHTML = "game Over <br>player 1 won";
        else result.innerHTML = "game Over <br>player 2 won";
        gameComplete();
      } else {
        horizontalCheck();
      }
    }

    
  }

  function horizontalCheck() {
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        const idx = row * 7 + col; // Calculate the correct index based on the row and col
        if (
          squares[idx].classList.contains("taken") &&
          squares[idx].classList.toString() ===
            squares[idx + 1].classList.toString() &&
          squares[idx].classList.toString() ===
            squares[idx + 2].classList.toString() &&
          squares[idx].classList.toString() ===
            squares[idx + 3].classList.toString()
        ) {
          if (squares[idx].classList[1] === "player-one")
            result.innerHTML = "Game Over <br>Player 1 won!";
          else result.innerHTML = "Game Over <br>Player 2 won!";
          gameComplete();
        }
      }
    }
  }

  let gameOver = 0;

  for (let i = 0; i < squares.length; i++) {
    squares[i].onclick = () => {
      if (!gameOver) {
        // if the clicked square is already clicked :

        let alreadyChosen = 0; //indication for the above statement :
        if (squares[i].classList.contains("taken")) {
          alert("andha hai kya!");
          alreadyChosen = 1;
        }

        //if square below the current square is taken , then you can go on it :

        if (squares[i + 7].classList.contains("taken")) {
          if (!alreadyChosen) {
            if (currentplayer == 1) {
              squares[i].classList.add("taken");
              squares[i].classList.add("player-one");
              currentplayer = 2;
              displayCurrentPlayer.innerHTML = currentplayer;
            } else if (currentplayer == 2) {
              squares[i].classList.add("taken");
              squares[i].classList.add("player-two");
              currentplayer = 1;
              displayCurrentPlayer.innerHTML = currentplayer;
            }
          }
          checkWinner(i);
        } 
        else alert("udhar nahi rakh skte!!");
      }
       else {
        alert("bas bhai ho gaya ab!!");
      }
    };
  }

  function gameComplete() {
    for (let j = 0; j < squares.length; j++) squares[j].classList.add("taken");
    gameOver = 1;
  }
});
