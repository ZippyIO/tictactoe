const gameBoard = (() => {
    let board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const setEmptyBoard = () => {
        gameBoard.board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    };
    return { board, setEmptyBoard };
})();

const displayController = (() => {
    const boardDiv = document.querySelector('#board');
    const addTiles = () => {
        gameBoard.board.forEach((location) => {
            const boardLocation = document.createElement('div');
            boardLocation.className = 'board-tile';
            boardLocation.setAttribute('data-tile', `${location}`);
            boardDiv.appendChild(boardLocation);
            boardLocation.addEventListener(
                'click',
                () => {
                    updateTile(location);
                },
                { once: true },
            );
        });
    };

    const updateTile = (tile) => {
        if (!game.gameOver) {
            const playedTile = document.querySelector(`[data-tile="${tile}"]`);
            const tileSelected = document.createElement('p');
            tileSelected.classList = 'played-tile';
            if (player.playerID == 1) {
                tileSelected.textContent = 'X';
                playedTile.setAttribute('data-tile', 'X');
                gameBoard.board.splice(tile - 1, 1, 'X');
            } else if (player.playerID == 2) {
                tileSelected.textContent = 'O';
                playedTile.setAttribute('data-tile', 'O');
                gameBoard.board.splice(tile - 1, 1, 'O');
            }
            playedTile.appendChild(tileSelected);
            game.checkWin(gameBoard.board);
        } else if (game.gameOver) {
            boardDiv.removeEventListener('click', () => {
                updateTile();
            });
        }
    };

    const removeTiles = () => {
        if (game.gameOver) {
            while (boardDiv.firstChild) {
                boardDiv.removeChild(boardDiv.firstChild);
            }
            gameBoard.setEmptyBoard();
            addTiles();
            game.gameOver = false;
        }
    };

    const updatePlayerUI = (e) => {
        playerOnePara = document.querySelector('.player-one');
        playerTwoPara = document.querySelector('.player-two');
        if (e.key == 1 || e.key == 2) {
            player.playerID = parseInt(e.key);
            if (player.playerID == 1) {
                playerOnePara.classList.add('current-player');
                playerTwoPara.classList.remove('current-player');
            } else if (player.playerID == 2) {
                playerTwoPara.classList.add('current-player');
                playerOnePara.classList.remove('current-player');
            }
        }
    };

    const updateScoreUI = () => {
        gameScorePara = document.querySelector('.game-stats');
        gameScorePara.textContent = `X: ${game.playerOneScore} - O: ${game.playerTwoScore}`;
    };

    return { addTiles, updateTile, removeTiles, updatePlayerUI, updateScoreUI };
})();

const player = (() => {
    let playerID;
    const changePlayer = () => {
        addEventListener('keydown', (event) => {
            displayController.updatePlayerUI(event);
        });
    };

    return { playerID, changePlayer };
})();

const game = (() => {
    let playerOneScore;
    let playerTwoScore;
    let gameOver = false;
    displayController.addTiles();
    const setPlayer = () => {
        player.playerID = 1;
        playerOneScore = 0;
        playerTwoScore = 0;
        player.changePlayer();
    };
    setPlayer();
    const checkWin = (board) => {
        let winner;
        if (
            (board[0] == 'X' && board[1] == 'X' && board[2] == 'X') ||
            (board[3] == 'X' && board[4] == 'X' && board[5] == 'X') ||
            (board[6] == 'X' && board[7] == 'X' && board[8] == 'X') ||
            (board[0] == 'X' && board[3] == 'X' && board[6] == 'X') ||
            (board[1] == 'X' && board[4] == 'X' && board[7] == 'X') ||
            (board[2] == 'X' && board[5] == 'X' && board[8] == 'X') ||
            (board[0] == 'X' && board[4] == 'X' && board[8] == 'X') ||
            (board[2] == 'X' && board[4] == 'X' && board[6] == 'X')
        ) {
            winner = 'X';
            console.log(`winner: ${winner}`);
            endGame(winner);
        } else if (
            (board[0] == 'O' && board[1] == 'O' && board[2] == 'O') ||
            (board[3] == 'O' && board[4] == 'O' && board[5] == 'O') ||
            (board[6] == 'O' && board[7] == 'O' && board[8] == 'O') ||
            (board[0] == 'O' && board[3] == 'O' && board[6] == 'O') ||
            (board[1] == 'O' && board[4] == 'O' && board[7] == 'O') ||
            (board[2] == 'O' && board[5] == 'O' && board[8] == 'O') ||
            (board[0] == 'O' && board[4] == 'O' && board[8] == 'O') ||
            (board[2] == 'O' && board[4] == 'O' && board[6] == 'O')
        ) {
            winner = 'O';
            endGame(winner);
        }
    };

    const endGame = (winner) => {
        if (winner == 'X') {
            game.playerOneScore += 1;
            displayController.updateScoreUI();
            game.gameOver = true;
        } else if (winner == 'O') {
            game.playerTwoScore += 1;
            displayController.updateScoreUI();
            game.gameOver = true;
        }
        nextGame();
    };

    const nextGame = () => {
        const nextGameBtn = document.querySelector('#next-game-btn');
        nextGameBtn.addEventListener(
            'click',
            () => {
                displayController.removeTiles();
            },
            { once: true },
        );
    };

    const restartGame = () => {
        const restartGameBtn = document.querySelector('#restart-btn');
        restartGameBtn.addEventListener('click', () => {
            game.gameOver = true;
            game.playerOneScore = 0;
            game.playerTwoScore = 0;
            displayController.removeTiles();
            displayController.updateScoreUI();
        });
    };
    restartGame();

    return { playerOneScore, playerTwoScore, gameOver, checkWin };
})();
