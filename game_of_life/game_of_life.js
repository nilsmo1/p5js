let grid, start;
function setup() {
  let w = 800; let h = 800;
  let cellSize = 8;
  let cellsX = w / cellSize;
  let cellsY = h / cellSize;
  let fr = 30;
  start = false;
  createCanvas(w, h);
  frameRate(fr);
  grid = initGrid(cellsX, cellsY, cellSize);
  
}

function keyPressed() {
  if (keyCode === ENTER && start == false) {
    start = true;
  } else if (keyCode === ENTER){
    start = false;
  }
  if (key === 'r') {
    killGrid();
  }
  if (key === 's') {
    initSpaceShip();
  }
}

function draw() {
  if (start) {
    updateGrid(grid);
  }
  drawGrid(grid);
  pick(grid);
}

function initGrid(x, y, cellSize) {
  let grid = [];
  for (let i = 0; i < y; i++) {
    let row = [];
    for (let j = 0; j < x; j++) {
      row.push(new Cell(j*cellSize, i*cellSize, cellSize, 0));
    }
    grid.push(row);
  }
  return grid;
}

function drawGrid(grid) {
  for (let row of grid) {
    for (let cell of row) {
      cell.show();
    }
  }
}

function getNeighbours(grid, y, x) {
  let w = grid[0].length;
  let h = grid.length;
  let neighbours = 0;
  for (let i = y-1; i < y+2; i++) {
    for (let j = x-1; j < x+2; j++) {
      if (!(j >= w || j < 0 || i >= h || i < 0) && !(j == x && i == y)) {
        if (grid[i][j].getState() == 1) {
          neighbours++;
        }
      }
    }
  }
  return neighbours;
}

function setNextState(grid, y, x) {
  let nextState;
  let neighbours = getNeighbours(grid, y, x);
  let cell = grid[y][x];
  if (neighbours < 2  && cell.getState() == 1) {cell.setNextState(0);}
  else if (2 <= neighbours && neighbours <= 3  && cell.getState() == 1) {cell.setNextState(1);}
  else if (3 < neighbours && cell.getState() == 1) {cell.setNextState(0);}
  else if (neighbours == 3 && cell.getState() == 0) {cell.setNextState(1);}
  else {cell.setNextState(0);}
}

function updateGrid(grid) {
  let w = grid[0].length;
  let h = grid.length;
  for (let i = 0; i < h; i++) {
     for (let j = 0; j < w; j++) {
       setNextState(grid, i, j);
     } 
  }
  for (let i = 0; i < h; i++) {
     for (let j = 0; j < w; j++) {
       grid[i][j].updateState();
     } 
  }
}

function initSpaceShip() {
  grid[1][1].setState(1);
  grid[2][2].setState(1);
  grid[2][3].setState(1);
  grid[3][1].setState(1);
  grid[3][2].setState(1);
}

function pick(grid) {
  for (let row of grid) {
    for (let cell of row) {
      if (cell.contains(mouseX, mouseY) && mouseIsPressed && cell.getState() == 1) {
        cell.setState(0);
      } else if (cell.contains(mouseX, mouseY) && mouseIsPressed && cell.getState() == 0) {
        cell.setState(1);
      }
    }
  }
}

function killGrid() {
  for (let row of grid) {
    for (let cell of row) {
      cell.setState(0);
      cell.setNextState(null);
    }
  }
}
