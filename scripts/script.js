const gameBoard = (() => {
    let board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return { board };
})();

const displayController = (() => {
    const boardDiv = document.querySelector('#board');
    gameBoard.board.forEach((location) => {
        const boardLocation = document.createElement('div');
        boardLocation.className = 'board-tile';
        boardLocation.setAttribute('data-tile', `${location}`);
        boardDiv.appendChild(boardLocation);
        console.log(location);
    });
})();
