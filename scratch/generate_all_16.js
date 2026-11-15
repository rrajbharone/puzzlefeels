import { solveMurdoku } from './test_solver.js';

// We will construct Medium 2, 3, 4, Hard 2, 3, 4, and Expert 1, 2, 3, 4,
// and run the solver on each to verify unique solutions.

export const CASES = [];

// ==========================================
// MEDIUM CASES (5x5, 5 People: 1 Victim + 4 Suspects)
// ==========================================

// MEDIUM 1: The Dining Hall Tragedy
CASES.push({
  id: 'medium-1',
  title: 'The Dining Hall Tragedy',
  subtitle: 'Duke Montgomery was poisoned before the banquet concluded.',
  story: 'During an extravagant seven-course banquet at Montgomery Hall, the Duke collapsed in the Parlor. Five figures were present across the grand wing. Interrogate the statements and uncover the killer.',
  difficulty: 'medium',
  gridSize: 5,
  rooms: [
    { id: 'parlor', name: 'Parlor', color: '#eff6ff', darkColor: '#172554', border: '#3b82f6', cells: [[0,0], [0,1], [1,0], [1,1], [1,2]] },
    { id: 'dining', name: 'Dining Hall', color: '#f5f3ff', darkColor: '#2e1065', border: '#8b5cf6', cells: [[0,2], [0,3], [0,4], [1,3], [1,4], [2,3], [2,4]] },
    { id: 'kitchen', name: 'Kitchen', color: '#fffbeb', darkColor: '#451a03', border: '#f59e0b', cells: [[2,0], [2,1], [3,0], [3,1], [4,0]] },
    { id: 'courtyard', name: 'Courtyard', color: '#f0fdf4', darkColor: '#052e16', border: '#22c55e', cells: [[2,2], [3,2], [3,3], [4,1], [4,2]] },
    { id: 'billiard', name: 'Billiard Room', color: '#fdf2f8', darkColor: '#500724', border: '#ec4899', cells: [[3,4], [4,3], [4,4]] }
  ],
  furniture: [
    { id: 'piano', name: 'Grand Piano', row: 0, col: 4, icon: 'piano' },
    { id: 'stove', name: 'Iron Stove', row: 4, col: 0, icon: 'stove' },
    { id: 'fountain', name: 'Stone Fountain', row: 3, col: 2, icon: 'fountain' }
  ],
  people: [
    { id: 'victim', name: 'Duke Montgomery', role: 'Banquet Host', isVictim: true, isMurderer: false, color: '#ef4444' },
    { id: 'scarlett', name: 'Miss Scarlett', role: 'Vengeful Heiress', isVictim: false, isMurderer: true, color: '#dc2626' },
    { id: 'pierre', name: 'Chef Pierre', role: 'Head Caterer', isVictim: false, isMurderer: false, color: '#f97316' },
    { id: 'green', name: 'Mayor Green', role: 'Town Politician', isVictim: false, isMurderer: false, color: '#10b981' },
    { id: 'mustard', name: 'Colonel Mustard', role: 'Retired Officer', isVictim: false, isMurderer: false, color: '#3b82f6' }
  ],
  clues: [
    { id: 'm1-1', type: 'at_cell', p1: 'victim', r: 1, c: 2, text: 'Duke Montgomery was found collapsed in the Parlor at Row 2, Column 3.' },
    { id: 'm1-2', type: 'in_room', p1: 'scarlett', roomId: 'parlor', text: 'Miss Scarlett was present inside the Parlor.' },
    { id: 'm1-3', type: 'in_room', p1: 'pierre', roomId: 'kitchen', text: 'Chef Pierre was busy preparing desserts in the Kitchen.' },
    { id: 'm1-4', type: 'in_room', p1: 'green', roomId: 'courtyard', text: 'Mayor Green was relaxing outdoors in the Courtyard.' },
    { id: 'm1-5', type: 'in_room', p1: 'mustard', roomId: 'billiard', text: 'Colonel Mustard was practicing cue shots in the Billiard Room.' },
    { id: 'm1-6', type: 'directly_east_of_furniture', p1: 'green', furnitureId: 'fountain', text: 'Mayor Green was standing directly east of the Stone Fountain.' },
    { id: 'm1-7', type: 'same_row_as_furniture', p1: 'mustard', furnitureId: 'stove', text: 'Colonel Mustard was on the same horizontal row as the Iron Stove.' },
    { id: 'm1-8', type: 'same_col_as_furniture', p1: 'pierre', furnitureId: 'stove', text: 'Chef Pierre was standing in the same column as the Iron Stove.' }
  ],
  solution: {
    victim: { r: 1, c: 2, roomId: 'parlor' },
    scarlett: { r: 0, c: 1, roomId: 'parlor' },
    pierre: { r: 2, c: 0, roomId: 'kitchen' },
    green: { r: 3, c: 3, roomId: 'courtyard' },
    mustard: { r: 4, c: 4, roomId: 'billiard' }
  },
  murdererId: 'scarlett'
});

// MEDIUM 2: The Conservatory Poisoning
// 5x5 grid
// Target Solution:
// victim (Thorne): [0, 3] (Conservatory)
// drake (Killer): [1, 4] (Conservatory) - shares room!
// celeste: [2, 1] (Glasshouse)
// julian: [3, 0] (Potting Shed)
// beatrice: [4, 2] (Rose Garden)
// Rows: [0, 1, 2, 3, 4] -> 0: Thorne, 1: Drake, 2: Celeste, 3: Julian, 4: Beatrice
// Cols: [3, 4, 1, 0, 2] -> All distinct!
CASES.push({
  id: 'medium-2',
  title: 'The Conservatory Poisoning',
  subtitle: 'The master botanist took his last breath among rare orchids.',
  story: 'Botanist Thorne was found expired beside his prized exotic specimens. Four visitors had access to the botanical gardens that evening. Trace the footsteps to identify the assassin.',
  difficulty: 'medium',
  gridSize: 5,
  rooms: [
    { id: 'conservatory', name: 'Main Conservatory', color: '#f0fdf4', darkColor: '#052e16', border: '#22c55e', cells: [[0,2], [0,3], [0,4], [1,3], [1,4]] },
    { id: 'glasshouse', name: 'Tropical Glasshouse', color: '#eff6ff', darkColor: '#172554', border: '#3b82f6', cells: [[0,0], [0,1], [1,0], [1,1], [1,2], [2,1], [2,2]] },
    { id: 'shed', name: 'Potting Shed', color: '#fffbeb', darkColor: '#451a03', border: '#f59e0b', cells: [[2,0], [3,0], [4,0], [3,1], [4,1]] },
    { id: 'rosegarden', name: 'Rose Garden', color: '#fdf2f8', darkColor: '#500724', border: '#ec4899', cells: [[2,3], [2,4], [3,2], [3,3], [4,2], [4,3]] },
    { id: 'gazebo', name: 'Stone Gazebo', color: '#f5f3ff', darkColor: '#2e1065', border: '#8b5cf6', cells: [[3,4], [4,4]] }
  ],
  furniture: [
    { id: 'fountain2', name: 'Marble Basin', row: 2, col: 2, icon: 'fountain' },
    { id: 'workbench', name: 'Gardener Bench', row: 4, col: 0, icon: 'desk' },
    { id: 'trellis', name: 'Iron Trellis', row: 0, col: 2, icon: 'bookcase' }
  ],
  people: [
    { id: 'victim', name: 'Botanist Thorne', role: 'Head Horticulturist', isVictim: true, isMurderer: false, color: '#ef4444' },
    { id: 'drake', name: 'Professor Drake', role: 'Rival Herbalist', isVictim: false, isMurderer: true, color: '#7c3aed' },
    { id: 'celeste', name: 'Celeste Fontaine', role: 'Orchid Collector', isVictim: false, isMurderer: false, color: '#0ea5e9' },
    { id: 'julian', name: 'Julian Vance', role: 'Groundskeeper', isVictim: false, isMurderer: false, color: '#10b981' },
    { id: 'beatrice', name: 'Lady Beatrice', role: 'Estate Benefactor', isVictim: false, isMurderer: false, color: '#f59e0b' }
  ],
  clues: [
    { id: 'm2-1', type: 'at_cell', p1: 'victim', r: 0, c: 3, text: 'Botanist Thorne was found in the Main Conservatory at Row 1, Column 4.' },
    { id: 'm2-2', type: 'in_room', p1: 'drake', roomId: 'conservatory', text: 'Professor Drake admitted entering the Main Conservatory.' },
    { id: 'm2-3', type: 'in_room', p1: 'celeste', roomId: 'glasshouse', text: 'Celeste Fontaine was admiring ferns in the Tropical Glasshouse.' },
    { id: 'm2-4', type: 'in_room', p1: 'julian', roomId: 'shed', text: 'Julian Vance was stowing shears in the Potting Shed.' },
    { id: 'm2-5', type: 'in_room', p1: 'beatrice', roomId: 'rosegarden', text: 'Lady Beatrice was strolling through the Rose Garden.' },
    { id: 'm2-6', type: 'east_of_person', p1: 'drake', p2: 'victim', text: 'Professor Drake stood east of Botanist Thorne.' },
    { id: 'm2-7', type: 'directly_west_of_furniture', p1: 'celeste', furnitureId: 'fountain2', text: 'Celeste Fontaine was standing directly west of the Marble Basin.' },
    { id: 'm2-8', type: 'directly_north_of_furniture', p1: 'julian', furnitureId: 'workbench', text: 'Julian Vance was standing directly north of the Gardener Bench.' }
  ],
  solution: {
    victim: { r: 0, c: 3, roomId: 'conservatory' },
    drake: { r: 0, c: 4, roomId: 'conservatory' }, // wait, row 0 col 4 is same row as Thorne! Row 1 Col 4 is in conservatory!
    celeste: { r: 2, c: 1, roomId: 'glasshouse' },
    julian: { r: 3, c: 0, roomId: 'shed' },
    beatrice: { r: 4, c: 2, roomId: 'rosegarden' }
  },
  murdererId: 'drake'
});
// Note: Drake's row must be 1, col 4! Let's update solution row to 1.
CASES[CASES.length - 1].solution.drake = { r: 1, c: 4, roomId: 'conservatory' };

// MEDIUM 3: The Grand Hotel Penthouse
// Target Solution:
// victim (Vance): [1, 1] (Master Suite)
// delacroix (Killer): [0, 2] (Master Suite)
// hugo: [2, 0] (Lobby Lounge)
// valeria: [3, 4] (Rooftop Terrace)
// felix: [4, 3] (Wine Bar)
// Rows: [0, 1, 2, 3, 4]
// Cols: [2, 1, 0, 4, 3] -> Distinct!
CASES.push({
  id: 'medium-3',
  title: 'The Grand Hotel Penthouse',
  subtitle: 'A high-stakes investor met his demise on the 40th floor.',
  story: 'Hotelier Vance was discovered lifeless in his penthouse suite. Four elite patrons had card-key access to the private level. Examine the security logs and locate the killer.',
  difficulty: 'medium',
  gridSize: 5,
  rooms: [
    { id: 'suite', name: 'Master Suite', color: '#fef2f2', darkColor: '#450a0a', border: '#ef4444', cells: [[0,1], [0,2], [1,1], [1,2], [1,3]] },
    { id: 'lounge', name: 'Lobby Lounge', color: '#eff6ff', darkColor: '#172554', border: '#3b82f6', cells: [[0,0], [1,0], [2,0], [2,1], [3,0], [3,1]] },
    { id: 'terrace', name: 'Rooftop Terrace', color: '#f0fdf4', darkColor: '#052e16', border: '#22c55e', cells: [[0,3], [0,4], [1,4], [2,4], [3,4]] },
    { id: 'bar', name: 'Private Wine Bar', color: '#fffbeb', darkColor: '#451a03', border: '#f59e0b', cells: [[2,2], [2,3], [3,2], [3,3], [4,2], [4,3]] },
    { id: 'spa', name: 'Sky Spa', color: '#f5f3ff', darkColor: '#2e1065', border: '#8b5cf6', cells: [[4,0], [4,1], [4,4]] }
  ],
  furniture: [
    { id: 'fireplace3', name: 'Gas Fireplace', row: 1, col: 2, icon: 'fireplace' }, // wait, victim is at [1,1], fireplace at [1,2]!
    { id: 'safe3', name: 'Wall Safe', row: 0, col: 1, icon: 'safe' },
    { id: 'barcounter', name: 'Marble Bar', row: 4, col: 2, icon: 'desk' }
  ],
  people: [
    { id: 'victim', name: 'Hotelier Vance', role: 'Penthouse Owner', isVictim: true, isMurderer: false, color: '#ef4444' },
    { id: 'delacroix', name: 'Countess Delacroix', role: 'Foreign Investor', isVictim: false, isMurderer: true, color: '#ec4899' },
    { id: 'hugo', name: 'Hugo Trent', role: 'Security Director', isVictim: false, isMurderer: false, color: '#3b82f6' },
    { id: 'valeria', name: 'Valeria Voss', role: 'Casino Mogul', isVictim: false, isMurderer: false, color: '#8b5cf6' },
    { id: 'felix', name: 'Felix Moreau', role: 'Concierge', isVictim: false, isMurderer: false, color: '#10b981' }
  ],
  clues: [
    { id: 'm3-1', type: 'at_cell', p1: 'victim', r: 1, c: 1, text: 'Hotelier Vance was found at Row 2, Column 2 in the Master Suite.' },
    { id: 'm3-2', type: 'in_room', p1: 'delacroix', roomId: 'suite', text: 'Countess Delacroix was present in the Master Suite.' },
    { id: 'm3-3', type: 'in_room', p1: 'hugo', roomId: 'lounge', text: 'Hugo Trent was stationed in the Lobby Lounge.' },
    { id: 'm3-4', type: 'in_room', p1: 'valeria', roomId: 'terrace', text: 'Valeria Voss was enjoying champagne on the Rooftop Terrace.' },
    { id: 'm3-5', type: 'in_room', p1: 'felix', roomId: 'bar', text: 'Felix Moreau was restocking glasses in the Private Wine Bar.' },
    { id: 'm3-6', type: 'directly_east_of_furniture', p1: 'felix', furnitureId: 'barcounter', text: 'Felix Moreau was standing directly east of the Marble Bar.' },
    { id: 'm3-7', type: 'west_of_person', p1: 'hugo', p2: 'victim', text: 'Hugo Trent was located west of Hotelier Vance.' },
    { id: 'm3-8', type: 'north_of_person', p1: 'delacroix', p2: 'victim', text: 'Countess Delacroix was positioned north of Hotelier Vance.' },
    { id: 'm3-9', type: 'north_of_person', p1: 'hugo', p2: 'valeria', text: 'Hugo Trent was stationed further north than Valeria Voss.' }
  ],
  solution: {
    victim: { r: 1, c: 1, roomId: 'suite' },
    delacroix: { r: 0, c: 2, roomId: 'suite' },
    hugo: { r: 2, c: 0, roomId: 'lounge' },
    valeria: { r: 3, c: 4, roomId: 'terrace' },
    felix: { r: 4, c: 3, roomId: 'bar' }
  },
  murdererId: 'delacroix'
});

// MEDIUM 4: The Clocktower Sabotage
// Target Solution:
// victim (Finch): [2, 2] (Belfry)
// tobias (Killer): [1, 3] (Belfry)
// agatha: [0, 1] (Archive)
// bartholomew: [3, 0] (Workshop)
// cecily: [4, 4] (Observation Ring)
// Rows: [0, 1, 2, 3, 4] -> agatha: 0, tobias: 1, finch: 2, bartholomew: 3, cecily: 4
// Cols: [1, 3, 2, 0, 4] -> All distinct!
CASES.push({
  id: 'medium-4',
  title: 'The Clocktower Sabotage',
  subtitle: 'The master horologist fell among the giant brass gears.',
  story: 'High in the historic St. Jude Clocktower, Horologist Finch was crushed beneath the great pendulum. Four associates were in the tower works. Piece together their locations to find the culprit.',
  difficulty: 'medium',
  gridSize: 5,
  rooms: [
    { id: 'archive', name: 'Schematic Archive', color: '#eff6ff', darkColor: '#172554', border: '#3b82f6', cells: [[0,0], [0,1], [0,2], [1,0], [1,1]] },
    { id: 'belfry', name: 'Great Belfry', color: '#fef2f2', darkColor: '#450a0a', border: '#ef4444', cells: [[1,2], [1,3], [2,2], [2,3], [3,2], [3,3]] },
    { id: 'workshop', name: 'Clockwork Workshop', color: '#fffbeb', darkColor: '#451a03', border: '#f59e0b', cells: [[2,0], [2,1], [3,0], [3,1], [4,0], [4,1]] },
    { id: 'dial', name: 'Dial Chamber', color: '#f5f3ff', darkColor: '#2e1065', border: '#8b5cf6', cells: [[0,3], [0,4], [1,4], [2,4]] },
    { id: 'ring', name: 'Observation Ring', color: '#f0fdf4', darkColor: '#052e16', border: '#22c55e', cells: [[3,4], [4,2], [4,3], [4,4]] }
  ],
  furniture: [
    { id: 'pendulum', name: 'Grand Pendulum', row: 2, col: 3, icon: 'clock' },
    { id: 'lathe', name: 'Brass Lathe', row: 4, col: 0, icon: 'desk' },
    { id: 'blueprint', name: 'Drafting Table', row: 0, col: 0, icon: 'bookcase' }
  ],
  people: [
    { id: 'victim', name: 'Horologist Finch', role: 'Master Clockmaker', isVictim: true, isMurderer: false, color: '#ef4444' },
    { id: 'tobias', name: 'Tobias Vance', role: 'Disgruntled Apprentice', isVictim: false, isMurderer: true, color: '#dc2626' },
    { id: 'agatha', name: 'Agatha Crowley', role: 'Municipal Inspector', isVictim: false, isMurderer: false, color: '#0ea5e9' },
    { id: 'bartholomew', name: 'Bartholomew Hyde', role: 'Bellringer', isVictim: false, isMurderer: false, color: '#8b5cf6' },
    { id: 'cecily', name: 'Cecily Barnes', role: 'Tower Historian', isVictim: false, isMurderer: false, color: '#10b981' }
  ],
  clues: [
    { id: 'm4-1', type: 'at_cell', p1: 'victim', r: 2, c: 2, text: 'Horologist Finch was found beside the gears at Row 3, Column 3 in the Great Belfry.' },
    { id: 'm4-2', type: 'in_room', p1: 'tobias', roomId: 'belfry', text: 'Tobias Vance admitted he was in the Great Belfry.' },
    { id: 'm4-3', type: 'in_room', p1: 'agatha', roomId: 'archive', text: 'Agatha Crowley was reviewing permits in the Schematic Archive.' },
    { id: 'm4-4', type: 'in_room', p1: 'bartholomew', roomId: 'workshop', text: 'Bartholomew Hyde was cleaning gear wheels in the Clockwork Workshop.' },
    { id: 'm4-5', type: 'in_room', p1: 'cecily', roomId: 'ring', text: 'Cecily Barnes was recording panoramic views from the Observation Ring.' },
    { id: 'm4-6', type: 'north_of_person', p1: 'tobias', p2: 'victim', text: 'Tobias Vance stood north of Horologist Finch.' },
    { id: 'm4-7', type: 'directly_north_of_furniture', p1: 'bartholomew', furnitureId: 'lathe', text: 'Bartholomew Hyde stood directly north of the Brass Lathe.' },
    { id: 'm4-8', type: 'east_of_furniture', p1: 'cecily', furnitureId: 'pendulum', text: 'Cecily Barnes was located east of the Grand Pendulum.' },
    { id: 'm4-9', type: 'directly_east_of_furniture', p1: 'agatha', furnitureId: 'blueprint', text: 'Agatha Crowley stood directly east of the Drafting Table.' }
  ],
  solution: {
    victim: { r: 2, c: 2, roomId: 'belfry' },
    tobias: { r: 1, c: 3, roomId: 'belfry' },
    agatha: { r: 0, c: 1, roomId: 'archive' },
    bartholomew: { r: 3, c: 0, roomId: 'workshop' },
    cecily: { r: 4, c: 4, roomId: 'ring' }
  },
  murdererId: 'tobias'
});

// Run medium cases
console.log('Testing Medium cases...');
for (const c of CASES) {
  const t0 = Date.now();
  const res = solveMurdoku(c);
  const dt = Date.now() - t0;
  if (!res.unique) {
    console.error(`FAILED: ${c.id} (${c.title}) - count: ${res.count}`);
    if (res.solutions) console.log(JSON.stringify(res.solutions, null, 2));
  } else {
    console.log(`PASSED: ${c.id} (${c.title}) in ${dt}ms -> 1 unique solution!`);
  }
}
