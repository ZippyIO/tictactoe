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
        boardLocation.addEventListener('click', () => {
            console.log(`clicked tile ${location}`);
            updateTile(location);
        });
    });
    const updateTile = (tile, player) => {
        const playedTile = document.querySelector(`[data-tile="${tile}"]`);
        const tileSelected = document.createElement('p');
        tileSelected.classList = 'played-tile';
        tileSelected.textContent = 'X';
        playedTile.appendChild(tileSelected);
    };

    return { addTiles, updateTile };
})();

const Player = (id) => {};
