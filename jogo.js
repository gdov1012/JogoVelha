if ('serviceWorker' in navigator) {
    //registro do sw
    navigator.serviceWorker.register('/PWA_lista/sw.js')
        .then(() => console.log('Service Worker registrado com sucesso!'))
        .catch(err => console.log('Erro ao registrar Service Worker:', err));
}


const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('reset');


let board = Array(9).fill('');
let currentPlayer = 'X';
let running = true;

const winCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function createBoard(){
  boardEl.innerHTML = '';
  for(let i=0;i<9;i++){
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;
    cell.addEventListener('click', () => makeMove(i, cell));
    boardEl.appendChild(cell);
  }
  statusEl.textContent = `Vez: ${currentPlayer}`;
}

function makeMove(i, cell){
  if(!running || board[i]) return;
  board[i] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('disabled');
  checkResult();
  if(running) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusEl.textContent = `Vez: ${currentPlayer}`;
  }
}

function checkResult(){
  for(const combo of winCombos){
    const [a,b,c] = combo;
    if(board[a] && board[a] === board[b] && board[a] === board[c]){
      endGame(board[a]);
      return;
    }
  }
  if(board.every(cell => cell)){
    endGame(null); // empate
  }
}

function endGame(winner){
  running = false;
  if(winner) {
    statusEl.textContent = `Vencedor: ${winner}`;
  } else {
    statusEl.textContent = 'Deu Velha!';
  }
}

resetBtn.addEventListener('click', () => {
  board = Array(9).fill('');
  currentPlayer = 'X';
  running = true;
  createBoard();
});

// inicializa
createBoard();