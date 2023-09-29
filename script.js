document.addEventListener("DOMContentLoaded", function () {
    const sudokuPuzzles = [
      [
        [5, 0, 4, 6, 0, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 0, 6, 8, 0, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 0, 5, 6],
        [9, 6, 0, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
      ],
      [
        [0, 0, 4, 6, 0, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 0, 6, 8, 0, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 0, 5, 6],
        [9, 6, 0, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
      ],
      [
        [5, 0, 4, 6, 0, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 0, 6, 8, 0, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 0, 5, 6],
        [9, 6, 0, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 0]
      ],
      [
        [0, 2, 0, 0, 0, 5, 0, 0, 4],
        [0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 7, 8, 0, 6, 5, 0, 0],
        [0, 8, 0, 0, 7, 0, 0, 0, 3],
        [0, 0, 3, 0, 0, 0, 9, 0, 0],
        [1, 0, 0, 0, 9, 0, 0, 4, 0],
        [0, 0, 6, 2, 0, 8, 7, 0, 0],
        [0, 0, 0, 0, 6, 0, 0, 0, 0],
        [2, 0, 0, 3, 0, 0, 0, 1, 0]
      ],
      [
        [5, 3, 0, 0, 0, 7, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 0, 0, 0, 7, 9]
      ]
    ];
  
    let currentPuzzleIndex = 0;
    let currentPuzzle = sudokuPuzzles[currentPuzzleIndex];
    let solvedPuzzle = JSON.parse(JSON.stringify(currentPuzzle));
    const grid = document.querySelector(".sudoku-board");
    const checkButton = document.getElementById("check-button");
    const newGameButton = document.getElementById("new-game-button");
    const message = document.getElementById("message");
    const keypad = document.querySelector(".keypad");
  
  
    // Initialize the Board
    function initializeBoard() {
      grid.innerHTML = '';
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          const cell = document.createElement("input");
          cell.type = "text";
          cell.className = "cell";
          cell.dataset.row = i;
          cell.dataset.col = j;
          cell.addEventListener("focus", function () {
            // Get the cell in focus
            selectedCell = cell;
          });
          grid.appendChild(cell);
        }
      }
      loadPuzzle(currentPuzzle);
    }
  
  
    // Function to load a Sudoku puzzle into the board
    function loadPuzzle(puzzle) {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          const cell = grid.querySelector(`[data-row="${i}"][data-col="${j}"]`);
          if (puzzle[i][j] !== 0) {
            cell.value = puzzle[i][j];
            cell.classList.add('preloaded');
          } else {
            cell.value = '';
            cell.classList.remove('preloaded');
          }
          cell.readOnly = puzzle[i][j] !== 0;
        }      
      }
    }
  
    // Function to update solvedPuzzle arrary with user input
    function updateUserInputInSolvedPuzzle(cell, value) {
    const row = cell.dataset.row;
    const col = cell.dataset.col;
    solvedPuzzle[row][col] = parseInt(value);
  }
  
    // Event listener for the "input" event on Sudoku cells
  grid.addEventListener("input", function (event) {
    const cell = event.target;
    const value = parseInt(cell.value);
    // Update the solvedPuzzle array with the user's input
    updateUserInputInSolvedPuzzle(cell, value);
  });
  
    // Check if a Sudoku puzzle is solved
    function isSolved() {
      // Check rows, columns, and 3x3 sub grids for uniqueness
      for (let i = 0; i < 9; i++) {
        if (!isUnique(solvedPuzzle[i]) || !isUnique(getColumn(solvedPuzzle, i)) || !isUnique(getSubgrid(solvedPuzzle, i))) {
          return false;
        }
      }
      return true;
    }
  
    // Function to check if an array has unique values
    function isUnique(arr) {
      const seen = new Set();
      for (const num of arr) {
        if (num !== 0 && seen.has(num)) {
          return false;
        }
        seen.add(num);
      }
      return true;
    }
  
    // Function to get a column from the Sudoku grid
    function getColumn(grid, colIdx) {
      return grid.map(row => row[colIdx]);
    }
  
    // Function to get a 3x3 sub grid from the Sudoku grid
    function getSubgrid(grid, subgridIdx) {
      const rowStart = Math.floor(subgridIdx / 3) * 3;
      const colStart = (subgridIdx % 3) * 3;
      const subgrid = [];
      for (let i = rowStart; i < rowStart + 3; i++) {
        for (let j = colStart; j < colStart + 3; j++) {
          subgrid.push(grid[i][j]);
        }
      }
      return subgrid;
    }
  
    // Event listener for the "Check Solution" button
    checkButton.addEventListener("click", function () {
      if (isBoardValid()) {
        if (isSolved()) {
          alert("Congratulations! Puzzle solved.");
        } else {
          alert("Not solved yet. Keep trying!");
        }
      } else {
        alert("Please fill in all cells with valid numbers (1-9) before checking.");
      }
  
  
    });
  
    // Function to check if the Sudoku board is valid
    function isBoardValid() {
      const cells = grid.querySelectorAll(".cell");
      for (const cell of cells) {
        if (!cell.value || isNaN(cell.value) || cell.value < 1 || cell.value > 9) {
          return false;
        }
      }
      return true;
    }
  
    // Event listener for the "New Game" button
    newGameButton.addEventListener("click", function () {  
      currentPuzzleIndex = (currentPuzzleIndex + 1) % sudokuPuzzles.length;
      currentPuzzle = sudokuPuzzles[currentPuzzleIndex];
      solvedPuzzle = JSON.parse(JSON.stringify(currentPuzzle));
      clearBoard();
      initializeBoard();
      message.textContent = '';
    });
  
    // Function to check if the Sudoku board is valid
    function clearBoard() {
      const cells = grid.querySelectorAll(".cell");
      for (const cell of cells) {  
        cell.value = '';
        cell.classList.remove('preloaded');
        cell.readOnly = false;
        }
    }
   
    // Event listener for the keypad buttons (1-9)
    for (let num = 1; num <= 9; num++) {
      const button = document.createElement("button");
      button.textContent = num;
      keypad.addEventListener("click", function (event) {
        if (selectedCell && !selectedCell.readOnly) {
          const num = event.target.textContent;
          selectedCell.value = num;
         // Update the solvedPuzzle array with the user's input
          updateUserInputInSolvedPuzzle(selectedCell, num);
        }
      });
      keypad.appendChild(button);
    }
   
    // Initialize the board with the first puzzle
    initializeBoard();
   
  });
  
