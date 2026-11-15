import { solveMurdoku } from './test_solver.js';

// Hard 6x6 Case:
// Grid 6x6
// 6 people: 1 Victim + 5 Suspects
// Rooms:
// 1. Master Suite: [0,0], [0,1], [0,2], [1,0], [1,1]
// 2. Ballroom: [0,3], [0,4], [0,5], [1,2], [1,3], [1,4]
// 3. Gallery: [1,5], [2,4], [2,5], [3,4], [3,5]
// 4. Wine Cellar: [2,0], [2,1], [3,0], [3,1], [4,0]
// 5. Grand Hall: [2,2], [2,3], [3,2], [3,3], [4,1], [4,2]
// 6. Conservatory: [4,3], [4,4], [4,5], [5,0], [5,1], [5,2], [5,3], [5,4], [5,5]
//
// Furniture:
// Chandelier: [2,2] (Grand Hall)
// Wine Rack: [3,0] (Wine Cellar)
// Statuary: [2,5] (Gallery)
// Four-Poster Bed: [0,0] (Master Suite)
//
// Target Solution:
// Rows: 0..5, Cols: 0..5 permutation
// Target assignments:
// Victim (Lord Ravenscroft): row 1, col 1 (Master Suite)
// Suspect 1 (Lady Genevieve, Killer): row 0, col 2 (Master Suite) -> shares room!
// Suspect 2 (Baron Sterling): row 0? no, row 2, col 4 (Gallery)
// Suspect 3 (Butler Higgins): row 3, col 1 (Wine Cellar)
// Suspect 4 (Maid Clara): row 4, col 3 (Grand Hall? wait, [4,3] is Conservatory! Grand Hall is [4,1], [4,2]. Let's say row 4, col 2 in Grand Hall!)
// Suspect 5 (Countess Vivienne): row 5, col 5 (Conservatory)
// Cols used:
// Genevieve: col 2 (row 0)
// Ravenscroft: col 1 (row 1)
// Sterling: col 4 (row 2)
// Higgins: col 0 or 1? Wait, Ravenscroft is col 1, Higgins cannot be col 1!
// If Higgins is at [3, 0] -> but [3,0] is Wine Rack!
// If Higgins is at [2, 1] -> but row 2 has Sterling at col 4! Higgins can be row 2? No, 1 person per row!
// Let's trace all 6 people:
// Person 0 (Genevieve): [0, 1] (Master Suite)
// Person 1 (Ravenscroft, Victim): [1, 0] (Master Suite) - shares Master Suite!
// Person 2 (Sterling): [2, 4] (Gallery)
// Person 3 (Higgins): [3, 1] (Wait, Ravenscroft was col 0, Genevieve col 1, Higgins could be col 1? No! Col 1 is Genevieve!).
// Let's systematically pick distinct rows and cols:
// Rows: [0, 1, 2, 3, 4, 5]
// Cols: [3, 0, 4, 1, 2, 5]
// Person 0 (Ballroom): [0, 3] -> Duke Arthur (Ballroom)
// Person 1 (Master Suite): [1, 0] -> Ravenscroft (Victim, Master Suite)
// Person 2 (Gallery): [2, 4] -> Baron Sterling (Gallery)
// Person 3 (Wine Cellar): [3, 1] -> Butler Higgins (Wine Cellar)
// Person 4 (Grand Hall): [4, 2] -> Maid Clara (Grand Hall)
// Person 5 (Conservatory): [5, 5] -> Lady Genevieve (Wait, who is in Master Suite with Victim?)
// Let's put Genevieve in Master Suite!
// In Master Suite: cells are [0,0], [0,1], [0,2], [1,0], [1,1]
// If Ravenscroft is at [1, 1] and Genevieve is at [0, 2]:
// Then:
// Row 0: Genevieve [0, 2] (Master Suite)
// Row 1: Ravenscroft [1, 1] (Master Suite, Victim)
// Row 2: Higgins [2, 0] (Wine Cellar)
// Row 3: Sterling [3, 4] (Gallery)
// Row 4: Clara [4, 3] (Grand Hall - wait, let's include [4,3] in Grand Hall)
// Row 5: Arthur [5, 5] (Conservatory)
// Check cols:
// Genevieve: 2
// Ravenscroft: 1
// Higgins: 0
// Sterling: 4
// Clara: 3
// Arthur: 5
// Cols: [2, 1, 0, 4, 3, 5] -> ALL DISTINCT!
// Rows: [0, 1, 2, 3, 4, 5] -> ALL DISTINCT!
// Rooms:
// Genevieve: [0, 2] in Master Suite
// Ravenscroft: [1, 1] in Master Suite (Murderer is Genevieve!)
// Higgins: [2, 0] in Wine Cellar
// Sterling: [3, 4] in Gallery
// Clara: [4, 3] in Grand Hall
// Arthur: [5, 5] in Conservatory
// All other rooms have exactly 1 person!

const caseHard1 = {
  id: 'case-hard-1',
  title: 'The Midnight Masquerade',
  gridSize: 6,
  rooms: [
    { id: 'suite', name: 'Master Suite', cells: [[0,0], [0,1], [0,2], [1,0], [1,1]] },
    { id: 'ballroom', name: 'Ballroom', cells: [[0,3], [0,4], [0,5], [1,2], [1,3], [1,4], [1,5]] },
    { id: 'cellar', name: 'Wine Cellar', cells: [[2,0], [2,1], [3,0], [3,1], [4,0]] },
    { id: 'grandhall', name: 'Grand Hall', cells: [[2,2], [2,3], [3,2], [3,3], [4,1], [4,2], [4,3]] },
    { id: 'gallery', name: 'Art Gallery', cells: [[2,4], [2,5], [3,4], [3,5], [4,4]] },
    { id: 'conservatory', name: 'Conservatory', cells: [[4,5], [5,0], [5,1], [5,2], [5,3], [5,4], [5,5]] }
  ],
  furniture: [
    { id: 'chandelier', name: 'Crystal Chandelier', row: 2, col: 2 },
    { id: 'winerack', name: 'Vintage Wine Rack', row: 3, col: 0 },
    { id: 'statue', name: 'Marble Statue', row: 3, col: 5 },
    { id: 'bed', name: 'Canopy Bed', row: 0, col: 0 }
  ],
  people: [
    { id: 'victim', name: 'Lord Ravenscroft', isVictim: true },
    { id: 'genevieve', name: 'Lady Genevieve', isVictim: false }, // Killer in Master Suite
    { id: 'higgins', name: 'Butler Higgins', isVictim: false },
    { id: 'sterling', name: 'Baron Sterling', isVictim: false },
    { id: 'clara', name: 'Maid Clara', isVictim: false },
    { id: 'arthur', name: 'Duke Arthur', isVictim: false }
  ],
  clues: [
    { id: 'c1', type: 'at_cell', p1: 'victim', r: 1, c: 1, text: 'Lord Ravenscroft was found poisoned in the Master Suite at Row 2, Column 2.' },
    { id: 'c2', type: 'in_room', p1: 'genevieve', roomId: 'suite', text: 'Lady Genevieve was seen slipping into the Master Suite.' },
    { id: 'c3', type: 'in_room', p1: 'higgins', roomId: 'cellar', text: 'Butler Higgins was fetching wine in the Wine Cellar.' },
    { id: 'c4', type: 'in_room', p1: 'sterling', roomId: 'gallery', text: 'Baron Sterling was admiring paintings in the Art Gallery.' },
    { id: 'c5', type: 'in_room', p1: 'clara', roomId: 'grandhall', text: 'Maid Clara was attending guests in the Grand Hall.' },
    { id: 'c6', type: 'in_room', p1: 'arthur', roomId: 'conservatory', text: 'Duke Arthur was smoking a pipe in the Conservatory.' },
    { id: 'c7', type: 'directly_north_of_furniture', p1: 'higgins', furnitureId: 'winerack', text: 'Butler Higgins was standing directly north of the Vintage Wine Rack.' },
    { id: 'c8', type: 'east_of_person', p1: 'clara', p2: 'higgins', text: 'Maid Clara was situated east of Butler Higgins.' },
    { id: 'c9', type: 'same_row_as_furniture', p1: 'sterling', furnitureId: 'winerack', text: 'Baron Sterling was on the same horizontal row as the Vintage Wine Rack.' },
    { id: 'c10', type: 'east_of_person', p1: 'arthur', p2: 'clara', text: 'Duke Arthur was in the southeastern corner of the estate.' },
    { id: 'c11', type: 'east_of_person', p1: 'genevieve', p2: 'victim', text: 'Lady Genevieve was standing east of Lord Ravenscroft.' },
    { id: 'c12', type: 'directly_west_of_furniture', p1: 'sterling', furnitureId: 'statue', text: 'Baron Sterling was standing directly west of the Marble Statue.' }
  ]
};

console.time('solve 6x6');
const resHard = solveMurdoku(caseHard1);
console.timeEnd('solve 6x6');
console.log('Hard 6x6 solve result:', resHard.unique, 'count:', resHard.count);
if (resHard.unique) {
  console.log('Hard solution:', resHard.solution);
} else {
  console.log('Hard solutions:', resHard.solutions);
}
