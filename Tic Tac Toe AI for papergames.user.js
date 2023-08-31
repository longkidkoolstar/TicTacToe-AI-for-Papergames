// ==UserScript==
// @name         Tic Tac Toe AI for papergames
// @namespace    https://github.com/longkidkoolstar
// @version      0.1
// @description  Adds an AI player to Tic Tac Toe on papergames.io
// @author       longkidkoolstar
// @match        https://papergames.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var depth = 5; // Set the desired depth value


    function getBoardState() {
        var boardState = [];
        var rows = document.querySelectorAll("#tic-tac-toe table tr");
        rows.forEach(function(row) {
            var cells = row.querySelectorAll("td");
            var rowState = [];
            cells.forEach(function(cell) {
                var svg = cell.querySelector("svg");
                if (svg) {
                    var label = svg.getAttribute("aria-label");
                    rowState.push(label === 'O' ? 'o' : 'x');
                } else {
                    rowState.push('_'); // An empty cell
                }
            });
            boardState.push(rowState);
        });
        return boardState;
    }

    function simulateCellClick(cell) {
        var event = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: null // Pass null as the view parameter
        });
        cell.dispatchEvent(event);
    }

    var prevChronometerValue = null;


      // Check if username is stored in local storage
      var username = localStorage.getItem('username');

      if (!username) {
          // Alert the user
          alert('Username is not stored in local storage.');
      
          // Prompt the user to enter the username
          username = prompt('Please enter your Papergames username (case-sensitive):');
      
          // Save the username to local storage
          localStorage.setItem('username', username);
      }
      
function logout() {
        localStorage.removeItem('username');
        location.reload();
    }

    function createLogoutButton() {
        var logoutButton = document.createElement('button');
        logoutButton.textContent = 'Logout';
        logoutButton.style.position = 'fixed';
        logoutButton.style.bottom = '20px';
        logoutButton.style.right = '20px';
        logoutButton.style.zIndex = '9999';
        logoutButton.style.color = 'white'; // Set the text color to white
        logoutButton.classList.add('btn', 'btn-secondary', 'mb-2', 'ng-star-inserted');
        logoutButton.addEventListener('click', logout);
        logoutButton.addEventListener('mouseover', function() {
            logoutButton.style.opacity = '0.5'; // Dim the button when hovered over
        });
        logoutButton.addEventListener('mouseout', function() {
            logoutButton.style.opacity = '1'; // Restore the button opacity when mouse leaves
        });
        document.body.appendChild(logoutButton);
    }
    createLogoutButton();
//------------------------------------------------

function toggleButtonClick() {
    var leaveRoomButton = document.querySelector("button.btn-light.ng-tns-c189-7");
    var playOnlineButton = document.querySelector("button.btn-secondary.flex-grow-1");

    if (leaveRoomButton) {
        leaveRoomButton.click();
    }

    if (playOnlineButton) {
        playOnlineButton.click();
    }

    // Toggle the state
    var isToggled = localStorage.getItem('isToggled');
    isToggled = isToggled === 'true' ? 'false' : 'true';
    localStorage.setItem('isToggled', isToggled);

    // Update the button text and style based on the state
    toggleButton.textContent = isToggled === 'true' ? 'On' : 'Off';
    toggleButton.style.backgroundColor = isToggled === 'true' ? 'green' : 'red';

    if (isToggled === 'true') {
        setInterval(function() {
            var leaveRoomButton = document.querySelector("button.btn-light.ng-tns-c189-7");
            var playOnlineButton = document.querySelector("button.btn-secondary.flex-grow-1");

            if (leaveRoomButton) {
                leaveRoomButton.click();
            }

            if (playOnlineButton) {
                playOnlineButton.click();
            }
        }, 1000);
    }
}



var toggleButton = document.createElement('button');
toggleButton.textContent = 'Off';
toggleButton.style.position = 'fixed';
toggleButton.style.bottom = '60px';
toggleButton.style.right = '20px';
toggleButton.style.zIndex = '9999';
toggleButton.style.color = 'white';
toggleButton.classList.add('btn', 'btn-primary', 'mb-2', 'ng-star-inserted');
toggleButton.addEventListener('click', toggleButtonClick);
document.body.appendChild(toggleButton);

// Check if the toggle state is stored in local storage
var isToggled = localStorage.getItem('isToggled');

// If the toggle state is not stored, set it to 'false'
if (!isToggled) {
    localStorage.setItem('isToggled', 'false');
} else {
    // Update the button text and style based on the stored state
    toggleButton.textContent = isToggled === 'true' ? 'On' : 'Off';
    toggleButton.style.backgroundColor = isToggled === 'true' ? 'green' : 'red';
}

//------------------------------------------------
        


function updateBoard(squareId) {
            var row = parseInt(squareId[0]);
            var col = parseInt(squareId[1]);
            var cell = document.querySelector("#tic-tac-toe table tr:nth-child(" + (row + 1) + ") td:nth-child(" + (col + 1) + ")");
            console.log("Selected Cell: ", cell); // Debug log for the selected cell
        
            var profileOpeners = document.querySelectorAll(".text-truncate.cursor-pointer");
            var profileOpener = null;
        
            profileOpeners.forEach(function(opener) {
                if (opener.textContent.trim() === username) {
                    profileOpener = opener;
                }
            });
       
            console.log("Profile Opener: ", profileOpener); // Debug log for the profile opener element
    
            var chronometer = document.querySelector("app-chronometer");
            console.log("Chronometer Element: ", chronometer); // Debug log for the chronometer element
        
            var numberElement = profileOpener.parentNode.querySelectorAll("span[_ngcontent-serverapp-c155]")[2]; // Select the third element with the number
            var profileOpenerParent = profileOpener.parentNode.parentNode;
            console.log("Profile Opener Parent: ", profileOpenerParent); // Debug log for the profile opener parent element
                                                var svgElement = profileOpenerParent.querySelector("circle[_ngcontent-serverApp-c176][cx='50'][cy='50'][r='35'][class='shape circle-dark-stroked']");
                        if (!svgElement) {
                            svgElement = profileOpenerParent.querySelector("svg[role='img'][aria-hidden='true'][focusable='false'][data-prefix='fas'][data-icon='xmark'][class='svg-inline--fa fa-xmark']");
                        }
                        if (svgElement && svgElement === profileOpenerParent.querySelector("circle[_ngcontent-serverApp-c176][cx='50'][cy='50'][r='35'][class='shape circle-dark-stroked']")) {
                            
                            player = 'o'; // Player is playing as "O"
                        }
            if (svgElement == profileOpenerParent.querySelector("svg[role='img'][aria-hidden='true'][focusable='false'][data-prefix='fas'][data-icon='xmark'][class='svg-inline--fa fa-xmark']")) {
                player = 'x'; // Player is playing as "X"
            }
            console.log("svgElement", svgElement);

            console.log("Number Element: ", numberElement); // Debug log for the number element
            var currentElement = chronometer || numberElement; // Use chronometer if it exists, otherwise use the number element
            console.log("Current Element: ", currentElement); // Debug log for the current element

            console.log("Cell: ", cell);
            console.log("Current Element: ", currentElement);

            if (cell && currentElement.textContent !== prevChronometerValue && profileOpener) {
                prevChronometerValue = currentElement.textContent;
                simulateCellClick(cell);
            } else {
                console.log("Waiting for AI's turn...");
            }
        
            return player;
        }

var player;



    function initGame() {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.target.id === 'tic-tac-toe-board') {
                    initAITurn();
                }
            });
        });
    
        observer.observe(document.getElementById('tic-tac-toe-board'), { attributes: true, childList: true, subtree: true });
    }
console.log(player)

function initAITurn() {
    displayBoardAndPlayer();
    var boardState = getBoardState();
    var bestMove = findBestMove(boardState, player);
    updateBoard(bestMove.row.toString() + bestMove.col.toString());
}

function findBestMove(board, player) {
    console.log("Current player: " + player); // Debug statement to show the value of the player variable

    var bestVal = -1000;
    var bestMove = { row: -1, col: -1 };

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] === '_') {
                board[i][j] = player;
                var moveVal = minimax(board, 0, false, depth);
                board[i][j] = '_';

                if (moveVal > bestVal) {
                    bestMove.row = i;
                    bestMove.col = j;
                    bestVal = moveVal;
                }
            }
        }
    }

    console.log("The value of the best Move is: " + bestVal);
    return bestMove;
}
    
    function displayBoardAndPlayer() {
        var boardState = getBoardState();
        //console.log("AI Player: " + player);
        console.log("Board State:");
        boardState.forEach(function(row) {
            console.log(row.join(' | '));
        });
    }

    function getOpponent(player) {
        return player === 'x' ? 'o' : 'x';
    }
    function minimax(board, depth, isMaximizingPlayer, maxDepth) {
        var score = evaluateBoard(board);
    
        if (depth === maxDepth) {
            return evaluateBoard(board);
        }
    
        if (score === 10)
            return score - depth;
    
        if (score === -10)
            return score + depth;
    
        if (areMovesLeft(board) === false)
            return 0;
    
        if (isMaximizingPlayer) {
            var best = -1000;
    
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    if (board[i][j] === '_') {
                        board[i][j] = player; // AI places the current player's symbol
                        best = Math.max(best, minimax(board, depth + 1, !isMaximizingPlayer));
                        board[i][j] = '_';
                    }
                }
            }
            return best;
        } else {
            var best = 1000;
    
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    if (board[i][j] === '_') {
                        board[i][j] = getOpponent(player); // Opponent places the opposite symbol of the current player
                        best = Math.min(best, minimax(board, depth + 1, !isMaximizingPlayer));
                        board[i][j] = '_';
                    }
                }
            }
            return best;
        }
    }
    function evaluateBoard(board) {
        // Check rows for victory
        for (let row = 0; row < 3; row++) {
            if (board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
                if (board[row][0] === player) return +10;
                else if (board[row][0] !== '_') return -10;
            }
        }
    
        // Check columns for victory
        for (let col = 0; col < 3; col++) {
            if (board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
                if (board[0][col] === player) return +10;
                else if (board[0][col] !== '_') return -10;
            }
        }
    
        // Check diagonals for victory
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            if (board[0][0] === player) return +10;
            else if (board[0][0] !== '_') return -10;
        }
    
        if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            if (board[0][2] === player) return +10;
            else if (board[0][2] !== '_') return -10;
        }
    
        // If no one has won, return 0
        return 0;
    }
    
    function areMovesLeft(board) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '_') return true;
            }
        }
        return false;
    }

    setInterval(function() {
        initAITurn();
    }, 1000);

    document.addEventListener('DOMContentLoaded', function() {
        initGame();
        console.log(player);
    });
})();