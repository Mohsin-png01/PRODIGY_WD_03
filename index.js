document.addEventListener('DOMContentLoaded', () => {
    const tiles = document.querySelectorAll('.tile');
    const playerDisplay = document.querySelector('.display-player');
    const announcer = document.querySelector('.announcer');
    const resetButton = document.getElementById('reset');
    let currentPlayer = 'X';
    let gameActive = true;
    let board = ['', '', '', '', '', '', '', '', ''];
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O') {
            return false;
        }
        return true;
    };
    const updateBoard = (index) => {
        board[index] = currentPlayer;
    };
    const handleResultValidation = () => {
        let roundWon = false;
        for (let i = 0; i < winningCombinations.length; i++) {
            const winCondition = winningCombinations[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }
        if (roundWon) {
            announce(currentPlayer === 'X' ? 'PLAYERX_WON' : 'PLAYERO_WON');
            gameActive = false;
            return;
        }
        if (!board.includes('')) announce('TIE');
    };
        const announce = (type) => {
        switch (type) {
            case 'PLAYERX_WON':
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case 'PLAYERO_WON':
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case 'TIE':
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    };
    const userAction = (tile, index) => {
        if (isValidAction(tile) && gameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            togglePlayer();
        }
    };
    const togglePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    };
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        announcer.classList.add('hide');
        if (currentPlayer === 'O') {
            togglePlayer();
        }
        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    };
    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);
});