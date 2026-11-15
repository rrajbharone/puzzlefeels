/**
 * Sliding Number Puzzle Game core logic and solvability verification.
 * 
 * Solvability theorem for standard sliding tile puzzles with empty cell in goal at bottom-right:
 * - Odd-width boards (3x3, 5x5): Solvable if and only if the inversion count is even.
 * - Even-width boards (4x4): Solvable if and only if (inversion count + blank row counted from bottom) is odd.
 */

/**
 * Counts the number of inversions in the board, ignoring the empty cell (0).
 * An inversion is any pair (i, j) where i < j and board[i] > board[j].
 * @param {number[]} board 
 * @returns {number}
 */
export function countInversions(board) {
  let inversions = 0;
  const tiles = board.filter(val => val !== 0);
  const len = tiles.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (tiles[i] > tiles[j]) {
        inversions++;
      }
    }
  }
  return inversions;
}

/**
 * Determines whether a given board configuration is mathematically solvable.
 * @param {number[]} board 
 * @param {number} width 
 * @returns {boolean}
 */
export function isSolvable(board, width) {
  if (!Array.isArray(board) || board.length !== width * width) {
    return false;
  }
  const blankIndex = board.indexOf(0);
  if (blankIndex === -1) {
    return false;
  }
  // Verify all elements 0..width*width-1 are present
  const seen = new Set(board);
  if (seen.size !== width * width) {
    return false;
  }
  for (let i = 0; i < width * width; i++) {
    if (!seen.has(i)) return false;
  }

  const inversions = countInversions(board);

  if (width % 2 !== 0) {
    // Odd board width (3x3, 5x5): Solvable iff inversion count is even
    return inversions % 2 === 0;
  } else {
    // Even board width (4x4): Solvable iff (inversions + blank row from bottom) is odd
    const blankRowFromTop = Math.floor(blankIndex / width);
    const blankRowFromBottom = width - blankRowFromTop; // 1-indexed from bottom
    return (inversions + blankRowFromBottom) % 2 === 1;
  }
}

/**
 * Checks whether the board has reached the winning goal state.
 * Solved state: 1, 2, ..., N-1 in ascending order, followed by 0 at the bottom-right corner.
 * @param {number[]} board 
 * @returns {boolean}
 */
export function isGoal(board) {
  if (!Array.isArray(board) || board.length === 0) return false;
  const len = board.length;
  if (board[len - 1] !== 0) return false;
  for (let i = 0; i < len - 1; i++) {
    if (board[i] !== i + 1) return false;
  }
  return true;
}

/**
 * Returns the legal neighbor indices of a given cell index.
 * Only horizontal and vertical moves are allowed; diagonals are strictly prohibited.
 * @param {number} index 
 * @param {number} width 
 * @returns {number[]}
 */
export function getNeighbors(index, width) {
  const row = Math.floor(index / width);
  const col = index % width;
  const neighbors = [];

  if (row > 0) neighbors.push(index - width); // Above
  if (row < width - 1) neighbors.push(index + width); // Below
  if (col > 0) neighbors.push(index - 1); // Left
  if (col < width - 1) neighbors.push(index + 1); // Right

  return neighbors;
}

/**
 * Verifies if moving the tile at tileIndex into the empty cell at blankIndex is legal.
 * @param {number} tileIndex 
 * @param {number} blankIndex 
 * @param {number} width 
 * @returns {boolean}
 */
export function isMoveLegal(tileIndex, blankIndex, width) {
  if (tileIndex < 0 || tileIndex >= width * width) return false;
  if (blankIndex < 0 || blankIndex >= width * width) return false;
  const tileRow = Math.floor(tileIndex / width);
  const tileCol = tileIndex % width;
  const blankRow = Math.floor(blankIndex / width);
  const blankCol = blankIndex % width;
  return Math.abs(tileRow - blankRow) + Math.abs(tileCol - blankCol) === 1;
}

/**
 * Generates a guaranteed solvable puzzle by performing random legal moves from the goal state.
 * Never performs immediate reversals to ensure effective scrambling.
 * Also verifies via the mathematical solvability check.
 * @param {number} width Board dimension (3, 4, or 5)
 * @param {number} [customMoves] Optional scramble move count
 * @returns {{ board: number[], initialBoard: number[] }}
 */
export function generateSolvablePuzzle(width, customMoves) {
  const size = width * width;
  const defaultMoves = width === 3 ? 100 : (width === 4 ? 200 : 300);
  const totalMoves = customMoves || defaultMoves;

  let board = Array.from({ length: size - 1 }, (_, i) => i + 1);
  board.push(0);

  let blankIndex = size - 1;
  let lastMovedTile = -1;

  for (let step = 0; step < totalMoves; step++) {
    const neighbors = getNeighbors(blankIndex, width);
    // Avoid immediate reversal of previous move
    const nonReversing = neighbors.filter(idx => board[idx] !== lastMovedTile);
    const pool = nonReversing.length > 0 ? nonReversing : neighbors;
    const chosenIndex = pool[Math.floor(Math.random() * pool.length)];

    lastMovedTile = board[chosenIndex];
    board[blankIndex] = board[chosenIndex];
    board[chosenIndex] = 0;
    blankIndex = chosenIndex;
  }

  // Ensure board is not accidentally already solved or trivially close
  if (isGoal(board)) {
    // Scramble a few more moves
    for (let extra = 0; extra < 15; extra++) {
      const neighbors = getNeighbors(blankIndex, width);
      const chosen = neighbors[Math.floor(Math.random() * neighbors.length)];
      board[blankIndex] = board[chosen];
      board[chosen] = 0;
      blankIndex = chosen;
    }
  }

  // Mathematical double-check
  if (!isSolvable(board, width)) {
    throw new Error('Mathematical integrity error: generated puzzle failed solvability check');
  }

  return {
    board: [...board],
    initialBoard: [...board]
  };
}

/**
 * Formats a duration in seconds to "mm:ss".
 * @param {number} totalSeconds 
 * @returns {string}
 */
export function formatTime(totalSeconds) {
  const safe = Math.max(0, Math.floor(totalSeconds || 0));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
