import { solveMurdoku } from './test_solver.js';

const caseEasy1 = {
  id: 'case-easy-1',
  title: 'The Study at Midnight',
  gridSize: 4,
  rooms: [
    { id: 'study', name: 'The Study', cells: [[0,0], [0,1], [1,0], [1,1]] },
    { id: 'library', name: 'Grand Library', cells: [[0,2], [0,3], [1,2], [1,3], [2,3]] },
    { id: 'conservatory', name: 'Conservatory', cells: [[2,2], [3,2], [3,3]] },
    { id: 'foyer', name: 'Grand Foyer', cells: [[2,0], [2,1], [3,0], [3,1]] }
  ],
  furniture: [
    { id: 'bookcase', name: 'Bookcase', row: 0, col: 3 },
    { id: 'fireplace', name: 'Fireplace', row: 3, col: 0 }
  ],
  people: [
    { id: 'victim', name: 'Lord Sterling', isVictim: true },
    { id: 'cynthia', name: 'Lady Cynthia', isVictim: false },
    { id: 'vance', name: 'Colonel Vance', isVictim: false },
    { id: 'drake', name: 'Professor Drake', isVictim: false }
  ],
  clues: [
    { id: 'c1', type: 'at_cell', p1: 'victim', r: 1, c: 1, text: 'Lord Sterling was found deceased in the Study at Row 2, Column 2.' },
    { id: 'c2', type: 'in_room', p1: 'cynthia', roomId: 'study', text: 'Lady Cynthia admits she was in the Study.' },
    { id: 'c3', type: 'in_room', p1: 'vance', roomId: 'library', text: 'Colonel Vance was seen reading in the Grand Library.' },
    { id: 'c4', type: 'in_room', p1: 'drake', roomId: 'conservatory', text: 'Professor Drake was tending plants in the Conservatory.' },
    { id: 'c5', type: 'north_of_person', p1: 'vance', p2: 'drake', text: 'Colonel Vance was located north of Professor Drake.' }
  ]
};

const result = solveMurdoku(caseEasy1);
console.log('Case Easy 1 solve result:', result.unique, 'count:', result.count);
if (result.unique) {
  console.log('Solution:', result.solution);
} else {
  console.log('Solutions:', result.solutions);
}
