let lives = 3, round = 1;
let tileCount, gridSize;
let sequence = [];
let selected = [];
let clickable = false;

const menu = document.getElementById("menu");
const game = document.getElementById("game");
const board = document.getElementById("board");
const result = document.getElementById("result");

function startGame(level) {
  if (level === 'easy') gridSize = 3;
  if (level === 'medium') gridSize = 5;
  if (level === 'hard') gridSize = 6;

  tileCount = gridSize * gridSize;
  sequence = [];
  selected = [];
  lives = 3;
  round = 1;

  menu.classList.add("hidden");
  result.classList.add("hidden");
  game.classList.remove("hidden");

  setupBoard();
  generateSequence();
  showSequence();
}

function setupBoard() {
  board.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  board.innerHTML = "";
  for (let i = 0; i < tileCount; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.dataset.id = i;
    tile.addEventListener("click", () => chooseTile(i));
    board.appendChild(tile);
  }
}

function generateSequence() {
  let numbers = Array.from({ length: tileCount }, (_, i) => i);
  sequence = [];
  for (let i = 0; i < round + 2; i++) {
    let index = Math.floor(Math.random() * numbers.length);
    sequence.push(numbers[index]);
    numbers.splice(index, 1);
  }
}

function showSequence() {
  clickable = false;
  let tiles = document.querySelectorAll(".tile");
  sequence.forEach((id, index) => {
    setTimeout(() => {
      tiles[id].classList.add("reveal");
      tiles[id].innerText = index + 1;
      setTimeout(() => {
        tiles[id].classList.remove("reveal");
        tiles[id].innerText = "";
        if (index === sequence.length - 1) clickable = true;
      }, 700);
    }, 900 * index);
  });
}

function chooseTile(id) {
  if (!clickable) return;

  selected.push(id);
  let correctId = sequence[selected.length - 1];

  if (id !== correctId) {
    lives--;
    updateStatus();
    if (lives <= 0) return gameOver();
    selected = [];
    showSequence();
    return;
  }

  if (selected.length === sequence.length) {
    round++;
    updateStatus();
    selected = [];
    generateSequence();
    setTimeout(showSequence, 700);
  }
}

function updateStatus() {
  document.getElementById("lives").innerText = lives;
  document.getElementById("round").innerText = round;
}

function gameOver() {
  game.classList.add("hidden");
  result.classList.remove("hidden");
  document.getElementById("message").innerText =
    `Game Over! Your Final Round: ${round}`;
}

function restartGame() {
  startGame('easy');
}

function goHome() {
  result.classList.add("hidden");
  game.classList.add("hidden");
  menu.classList.remove("hidden");
    }
