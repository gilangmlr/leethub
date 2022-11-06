/**
 * @param {number[][]} grid
 * @return {number[]}
 */
var findBall = function(grid) {
  const VISITED = 0;
  const SPAN_RIGHT = 1;
  const SPAN_LEFT = -1;

  const dfs = (prevRow, prevCol, row, col, grid) => {
    if (row === grid.length) {
      return prevCol;
    }

    if (row < 0 || row > grid.length - 1 ||
        col < 0 || col > grid[row].length - 1 ||
        grid[row][col] === VISITED) {
      return -1;
    }

    const cell = grid[row][col];
    grid[row][col] = VISITED;
    let res = -1;

    if (prevRow < row) {
      // from the top
      if (cell === SPAN_RIGHT) {
        // go to right
        res = dfs(row, col, row, col + 1, grid);
      } else if (cell === SPAN_LEFT) {
        // go to left
        res = dfs(row, col, row, col - 1, grid);
      }
    } else if (prevRow === row) {
      if (prevCol < col) {
        // from the left
        if (cell === SPAN_RIGHT) {
          // go to bottom
          res = dfs(row, col, row + 1, col, grid);
        } else if (cell === SPAN_LEFT) {
          // stuck
        }
      } else if (prevCol > col) {
        // from the right
        if (cell === SPAN_RIGHT) {
          // stuck
        } else if (cell === SPAN_LEFT) {
          // go to bottom
          res = dfs(row, col, row + 1, col, grid);
        }
      }
    }

    grid[row][col] = cell;

    return res;
  }

  const n = grid[0].length;
  const res = [];

  for (let col = 0; col < n; col++) {
    res.push(dfs(-1, col, 0, col, grid));
  }

  return res;
};