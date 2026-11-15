import { solveMurdoku } from './test_solver.js';

// Test Medium 5x5 case:
// Grid 5x5
// Rooms:
// 1. Parlor: [0,0], [0,1], [1,0], [1,1]
// 2. Dining Room: [0,2], [0,3], [0,4], [1,2], [1,3], [1,4]
// 3. Kitchen: [2,0], [3,0], [4,0], [2,1], [3,1], [4,1]
// 4. Courtyard: [2,2], [2,3], [3,2], [3,3]
// 5. Billiard Room: [2,4], [3,4], [4,2], [4,3], [4,4]
//
// Furniture:
// Piano: [0,4] (Dining Room)
// Stove: [4,0] (Kitchen)
// Fountain: [2,2] (Courtyard)
//
// Target Solution:
// Victim (Baroness Von Bloom): [1, 1] (Parlor)
// Suspect 1 (Lord Sterling, Killer): [0, 0] (Parlor) -> shares Parlor with victim!
// Suspect 2 (Chef Pierre): [3, 1] (Kitchen)
// Suspect 3 (Countess Maria): [2, 3] (Courtyard)
// Suspect 4 (Inspector Vance): [4, 4] (Billiard Room)
// Remaining col needed:
// Cols used:
// Sterling: 0, row 0
// Baroness: 1, row 1
// Maria: 3, row 2
// Pierre: 1? WAIT: Pierre at [3,1] and Baroness at [1,1] share column 1!
// Sudoku rule: Each person must be in a UNIQUE column!
// Let's re-assign:
// Sterling: row 0, col 0 (Parlor)
// Baroness: row 1, col 1 (Parlor)
// Pierre: row 2, col - wait, Kitchen is cols 0, 1. But col 0 and 1 are taken!
// AHA!
// If Parlor takes col 0 and col 1, Kitchen (if it's only in cols 0, 1) cannot have a person!
// Because cols 0 and 1 are already taken by Parlor!
// This is such a critical Sudoku principle!
// Let's ensure the room layouts span across rows and columns so each room can legally hold a person!

const caseMed1 = {
  id: 'case-med-1',
  title: 'The Dining Hall Tragedy',
  gridSize: 5,
  rooms: [
    { id: 'parlor', name: 'Parlor', cells: [[0,0], [0,1], [1,0], [1,1], [1,2]] },
    { id: 'dining', name: 'Dining Hall', cells: [[0,2], [0,3], [0,4], [1,3], [1,4], [2,3], [2,4]] },
    { id: 'kitchen', name: 'Kitchen', cells: [[2,0], [2,1], [3,0], [3,1], [4,0]] },
    { id: 'courtyard', name: 'Courtyard', cells: [[2,2], [3,2], [3,3], [4,1], [4,2]] },
    { id: 'billiard', name: 'Billiard Room', cells: [[3,4], [4,3], [4,4]] }
  ],
  furniture: [
    { id: 'piano', name: 'Grand Piano', row: 0, col: 4 },
    { id: 'stove', name: 'Iron Stove', row: 4, col: 0 },
    { id: 'fountain', name: 'Stone Fountain', row: 3, col: 2 }
  ],
  people: [
    { id: 'victim', name: 'Duke Montgomery', isVictim: true },
    { id: 'scarlett', name: 'Miss Scarlett', isVictim: false }, // Killer in Parlor!
    { id: 'mustard', name: 'Colonel Mustard', isVictim: false }, // Dining
    { id: 'pierre', name: 'Chef Pierre', isVictim: false }, // Kitchen
    { id: 'green', name: 'Mayor Green', isVictim: false } // Billiard
  ],
  // Solution targets:
  // Scarlett: [0, 0] (Parlor)
  // Montgomery (Victim): [1, 1] (Parlor) -> shares Parlor with Scarlett!
  // Pierre: [2, 1] - wait, col 1 taken by victim!
  // Let's make:
  // Scarlett: [0, 1] (Parlor)
  // Montgomery: [1, 0] (Parlor)
  // Mustard: [2, 4] (Dining Hall)
  // Pierre: [3, 0] - col 0 taken!
  // Let's trace cols 0, 1, 2, 3, 4:
  // Person 0 (Scarlett): row 0, col 1 (Parlor)
  // Person 1 (Montgomery): row 1, col 2 (Parlor)
  // Person 2 (Pierre): row 2, col 0 (Kitchen)
  // Person 3 (Green): row 3, col 3 (Courtyard)
  // Person 4 (Mustard): row 4, col 4 (Billiard)
  // Check rows: 0, 1, 2, 3, 4 - ALL UNIQUE!
  // Check cols: 1, 2, 0, 3, 4 - ALL UNIQUE!
  // Check rooms:
  // Scarlett: [0, 1] -> Parlor
  // Montgomery: [1, 2] -> Parlor (Shares room with Scarlett only!)
  // Pierre: [2, 0] -> Kitchen
  // Green: [3, 3] -> Courtyard
  // Mustard: [4, 4] -> Billiard
  // Check furniture:
  // Piano at [0,4], Stove at [4,0], Fountain at [3,2]. None overlap!
  clues: [
    { id: 'c1', type: 'at_cell', p1: 'victim', r: 1, c: 2, text: 'Duke Montgomery was found deceased in the Parlor at Row 2, Column 3.' },
    { id: 'c2', type: 'in_room', p1: 'scarlett', roomId: 'parlor', text: 'Miss Scarlett was present in the Parlor.' },
    { id: 'c3', type: 'in_room', p1: 'pierre', roomId: 'kitchen', text: 'Chef Pierre was working in the Kitchen.' },
    { id: 'c4', type: 'in_room', p1: 'green', roomId: 'courtyard', text: 'Mayor Green was relaxing in the Courtyard.' },
    { id: 'c5', type: 'in_room', p1: 'mustard', roomId: 'billiard', text: 'Colonel Mustard was spotted in the Billiard Room.' },
    { id: 'c6', type: 'directly_east_of_furniture', p1: 'green', furnitureId: 'fountain', text: 'Mayor Green was standing directly east of the Stone Fountain.' },
    { id: 'c7', type: 'same_row_as_furniture', p1: 'mustard', furnitureId: 'stove', text: 'Colonel Mustard was on the same horizontal row as the Iron Stove.' },
    { id: 'c8', type: 'same_col_as_furniture', p1: 'pierre', furnitureId: 'stove', text: 'Chef Pierre was standing in the same column as the Iron Stove.' }
  ]
};

const resMed = solveMurdoku(caseMed1);
console.log('Medium 5x5 solve result:', resMed.unique, 'count:', resMed.count);
if (resMed.unique) {
  console.log('Medium solution:', resMed.solution);
} else {
  console.log('Medium solutions:', JSON.stringify(resMed.solutions, null, 2));
}
