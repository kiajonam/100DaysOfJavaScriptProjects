//  Init Variables               │
let isGameOver = false;
let playerTurn = "x";
let span = document.getElementsByTagName("span");
let moves = 0;
let restartButton = '<button onclick="playAgain()"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16"><path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/><path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/></svg></button>';

//  PLAYER CLICK   
function play(y){
        if(y.dataset.player == "none" && isGameOver == false){
        
            // place X or O
        y.dataset.player = playerTurn;
        y.innerHTML = playerTurn;
        moves++;

        // switch playerTurn o ↔ x 
    if(playerTurn === "x"){
        playerTurn = "o";
    }else if(playerTurn === "o"){
        playerTurn = "x";
    }

    }
    

    // CHECK WIN CONDITIONS(8 combinations)
    checkWinner(1,2,3);
    checkWinner(4,5,6);
    checkWinner(7,8,9);

    checkWinner(1,5,9);
    checkWinner(3,5,7);

    checkWinner(1,4,7);
    checkWinner(2,5,8);
    checkWinner(3,6,9);

    // No winner
    if(isGameOver === false && moves === 9){draw();
    };
  
}


// Check Winner 
function checkWinner(a,b,c){
a--;
b--;
c--;

if((span[a].dataset.player === span[b].dataset.player)
     && (span[b].dataset.player === span[c].dataset.player) 
     && (span[a].dataset.player === "x" || span[a].dataset.player === "o")
     && isGameOver === false){
        span[a].parentNode.className += " activeBox";
        span[b].parentNode.className += " activeBox";
        span[c].parentNode.className += " activeBox";
        gameOver(a);
    }
    
}


// Restart the game after game over
function playAgain(){
    document.getElementsByClassName("alert")[0].parentNode.removeChild(document.getElementsByClassName("alert")[0]);
    resetGame()
    
    isGameOver = false;
    for(let k = 0; k < span.length; k++){
        span[k].parentNode.className = span[k].parentNode.className.replace("activeBox", "")
    }

}


// Reset all game cells and states
function resetGame(){
for(let i = 0; i < span.length; i++){
    span[i].dataset.player = "none";
    span[i].innerHTML = "&nbsp;";
}
isGameOver = false
}

// Create and display alert popup
function showAlert(message) {

    let alertElement = `
        <b>${message}</b><br><br>
        ${restartButton}
    `;

    let div = document.createElement("div");

    div.className = "alert";

    div.innerHTML = alertElement;

    document.body.appendChild(div);

    isGameOver = true;
    moves = 0;
}

// Handle draw condition
function draw(){
    showAlert("Draw");
}

// Handle game over state
function gameOver(a){
 showAlert(`<b>Game Over</b><br><br>${span[a].dataset.player.toUpperCase()} WIN!!!`);
}


