var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var grid = 16;
var count = 0;
var snake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 4
};
var apple = {
  x: 320,
  y: 320
};
var score = 0;
var scores = JSON.parse(localStorage.getItem('snakeScores')) || [];
var speed = 10; // Початкова швидкість

// Перешкоди
var obstacles = [];

// Функція створення перешкод
function createObstacles() {
  obstacles = [];
  for (var i = 0; i < 10; i++) { // 10 перешкод
    obstacles.push({
      x: getRandomInt(0, 25) * grid,
      y: getRandomInt(0, 25) * grid,
      width: grid,
      height: grid
    });
  }
}

// Функція малювання перешкод
function drawObstacles() {
  context.fillStyle = 'gray';
  obstacles.forEach(function (obstacle) {
    context.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
  requestAnimationFrame(loop);
  if (++count < speed) { // Змінюємо швидкість змійки
    return;
  }
  count = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);

  snake.x += snake.dx;
  snake.y += snake.dy;
  if (snake.x < 0 || snake.x >= canvas.width || snake.y < 0 || snake.y >= canvas.height) {
    endGame();
    return;
  }

  snake.cells.unshift({ x: snake.x, y: snake.y });
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }
  context.fillStyle = 'red';
  context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
  context.fillStyle = 'green';
  snake.cells.forEach(function (cell, index) {
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
      score++;
      if (score % 5 === 0 && speed > 3) { // Збільшуємо швидкість кожних 5 очок, але не менше 10
        speed -= 0.5;
      }
    }
    obstacles.forEach(function (obstacle) {
      if (cell.x === obstacle.x && cell.y === obstacle.y) {
        endGame();
        return;
      }
    });
  });

  // Оновлення рахунку на екрані
  context.fillStyle = 'white';
  context.fillText('Score: ' + score, 10, 10);

  // Виведення найбільших рахунків
  context.fillStyle = 'white';
  context.fillText('Top Scores:', 10, 30);
  scores.sort((a, b) => b - a).slice(0, 3).forEach((value, index) => {
    context.fillText((index + 1) + '. ' + value, 10, 50 + index * 20);
  });

  // Виведення найменших рахунків
  context.fillStyle = 'white';
  context.fillText('Bottom Scores:', 10, canvas.height - 20);
  scores.sort((a, b) => a - b).slice(0, 3).forEach((value, index) => {
    context.fillText((index + 1) + '. ' + value, 10, canvas.height - 40 - index * 20);
  });

  drawObstacles(); // Малюємо перешкоди
}

document.addEventListener('keydown', function (e) {
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  } else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  } else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  } else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

createObstacles(); // Створюємо перешкоди на початку гри
requestAnimationFrame(loop);

function endGame() {
  scores.push(score);
  scores.sort((a, b) => b - a); 
  scores = scores.slice(0, 3); 
  localStorage.setItem('snakeScores', JSON.stringify(scores));
  score = 0;
  snake.x = 160;
  snake.y = 160;
  snake.cells = [];
  snake.maxCells = 4;
  snake.dx = grid;
  snake.dy = 0;
  apple.x = getRandomInt(0, 25) * grid;
  apple.y = getRandomInt(0, 25) * grid;
  speed = 10; // Повертаємо швидкість до початкового значення
  createObstacles(); // Створення нових перешкод
}
