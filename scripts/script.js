const gameBoard = (() => {
    let board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return { board };
})();

const displayController = (() => {
    const boardDiv = document.querySelector('#board');
    const addTiles = gameBoard.board.forEach((location) => {
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
    const updateTile = (tile) => {
        const playedTile = document.querySelector(`[data-tile="${tile}"]`);
        const tileSelected = document.createElement('p');
        tileSelected.classList = 'played-tile';
        if (game.playerID == 1) {
            tileSelected.textContent = 'X';
            playedTile.setAttribute('data-tile', 'X');
            gameBoard.board.splice(tile - 1, 1, 'X');
        } else if (game.playerID == 2) {
            tileSelected.textContent = 'O';
            playedTile.setAttribute('data-tile', 'O');
            gameBoard.board.splice(tile - 1, 1, 'O');
        }
        playedTile.appendChild(tileSelected);
        game.checkWin(gameBoard.board);
    };

    return { addTiles, updateTile };
})();

const Player = () => {
    const changePlayer = () => {
        addEventListener('keydown', (event) => {
            if (event.key == 1 || event.key == 2) {
                game.playerID = parseInt(event.key);
            }
        });
    };

    return { changePlayer };
};

const game = (() => {
    let playerID;
    const player = Player();
    //player.changePlayer();
    const setPlayer = () => {
        playerID = 1;
        player.changePlayer();
    };
    setPlayer();
    const checkWin = (board) => {};
    return { playerID, checkWin };
})();
