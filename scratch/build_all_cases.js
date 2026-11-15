import { solveMurdoku } from './test_solver.js';

export const ALL_CASES = [];

// ==========================================
// 1. EASY CASES (4x4, 4 People: 1 Victim + 3 Suspects)
// ==========================================

// EASY CASE 1: The Study at Midnight
ALL_CASES.push({
  id: 'easy-1',
  title: 'The Study at Midnight',
  subtitle: 'Lord Sterling has been found slain in his locked estate study.',
  story: 'A thunderous storm rocked Sterling Manor as Lord Sterling was discovered lifeless in his private study. Three guests were on the grounds. Follow the clues, place everyone on the floor plan, and catch the killer.',
  difficulty: 'easy',
  gridSize: 4,
  rooms: [
    { id: 'study', name: 'The Study', color: '#eff6ff', darkColor: '#172554', border: '#3b82f6', cells: [[0,0], [0,1], [1,0], [1,1]] },
    { id: 'library', name: 'Grand Library', color: '#f5f3ff', darkColor: '#2e1065', border: '#8b5cf6', cells: [[0,2], [0,3], [1,2], [1,3], [2,3]] },
    { id: 'conservatory', name: 'Conservatory', color: '#f0fdf4', darkColor: '#052e16', border: '#22c55e', cells: [[2,2], [3,2], [3,3]] },
    { id: 'foyer', name: 'Grand Foyer', color: '#fffbeb', darkColor: '#451a03', border: '#f59e0b', cells: [[2,0], [2,1], [3,0], [3,1]] }
  ],
  furniture: [
    { id: 'bookcase', name: 'Oak Bookcase', row: 0, col: 3, icon: 'bookcase' },
    { id: 'fireplace', name: 'Marble Fireplace', row: 3, col: 0, icon: 'fireplace' }
  ],
  people: [
    { id: 'victim', name: 'Lord Sterling', role: 'Estate Owner', isVictim: true, isMurderer: false, color: '#ef4444' },
    { id: 'cynthia', name: 'Lady Cynthia', role: 'Greedy Heiress', isVictim: false, isMurderer: true, color: '#ec4899' },
    { id: 'vance', name: 'Colonel Vance', role: 'Military Veteran', isVictim: false, isMurderer: false, color: '#3b82f6' },
    { id: 'drake', name: 'Professor Drake', role: 'Antiquities Scholar', isVictim: false, isMurderer: false, color: '#10b981' }
  ],
  clues: [
    { id: 'e1-1', type: 'at_cell', p1: 'victim', r: 1, c: 1, text: 'Lord Sterling was found deceased in the Study at Row 2, Column 2.' },
    { id: 'e1-2', type: 'in_room', p1: 'cynthia', roomId: 'study', text: 'Lady Cynthia admitted she was inside the Study.' },
    { id: 'e1-3', type: 'in_room', p1: 'vance', roomId: 'library', text: 'Colonel Vance was reading undisturbed in the Grand Library.' },
    { id: 'e1-4', type: 'in_room', p1: 'drake', roomId: 'conservatory', text: 'Professor Drake was tending plants in the Conservatory.' },
    { id: 'e1-5', type: 'north_of_person', p1: 'vance', p2: 'drake', text: 'Colonel Vance was located north of Professor Drake.' }
  ],
  solution: {
    victim: { r: 1, c: 1, roomId: 'study' },
    cynthia: { r: 0, c: 0, roomId: 'study' },
    vance: { r: 2, c: 3, roomId: 'library' },
    drake: { r: 3, c: 2, roomId: 'conservatory' }
  },
  murdererId: 'cynthia'
});

// EASY CASE 2: The Gallery Vault Mystery
ALL_CASES.push({
  id: 'easy-2',
  title: 'The Gallery Vault Mystery',
  subtitle: 'The chief curator was silenced inside the secure archive vault.',
  story: 'Curator Aris was found fallen beside the high-security archives. Three individuals had access to the museum wing. Reconstruct their exact stations and find the killer.',
  difficulty: 'easy',
  gridSize: 4,
  rooms: [
    { id: 'gallery', name: 'Master Gallery', color: '#eff6ff', darkColor: '#172554', border: '#3b82f6', cells: [[0,0], [0,1], [0,2], [1,0], [1,1]] },
    { id: 'vault', name: 'Archive Vault', color: '#fef2f2', darkColor: '#450a0a', border: '#ef4444', cells: [[0,3], [1,2], [1,3]] },
    { id: 'workshop', name: 'Artisan Workshop', color: '#f5f3ff', darkColor: '#2e1065', border: '#8b5cf6', cells: [[2,0], [2,1], [3,0]] },
    { id: 'courtyard', name: 'Stone Courtyard', color: '#f0fdf4', darkColor: '#052e16', border: '#22c55e', cells: [[2,2], [2,3], [3,1], [3,2], [3,3]] }
  ],
  furniture: [
    { id: 'safe', name: 'Reinforced Safe', row: 0, col: 2, icon: 'safe' },
    { id: 'sculpture', name: 'Bronze Sculpture', row: 3, col: 0, icon: 'statue' }
  ],
  people: [
    { id: 'victim', name: 'Curator Aris', role: 'Head of Archives', isVictim: true, isMurderer: false, color: '#ef4444' },
    { id: 'marcus', name: 'Marcus Cole', role: 'Disgraced Collector', isVictim: false, isMurderer: true, color: '#dc2626' },
    { id: 'elena', name: 'Elena Rostova', role: 'Appraiser', isVictim: false, isMurderer: false, color: '#8b5cf6' },
    { id: 'victor', name: 'Victor Hayes', role: 'Night Guard', isVictim: false, isMurderer: false, color: '#3b82f6' }
  ],
  clues: [
    { id: 'e2-1', type: 'at_cell', p1: 'victim', r: 1, c: 2, text: 'Curator Aris was discovered in the Archive Vault at Row 2, Column 3.' },
    { id: 'e2-2', type: 'in_room', p1: 'marcus', roomId: 'vault', text: 'Marcus Cole was seen lingering inside the Archive Vault.' },
    { id: 'e2-3', type: 'in_room', p1: 'elena', roomId: 'workshop', text: 'Elena Rostova was cataloging relics in the Artisan Workshop.' },
    { id: 'e2-4', type: 'in_room', p1: 'victor', roomId: 'courtyard', text: 'Victor Hayes was stationed on watch in the Stone Courtyard.' },
    { id: 'e2-5', type: 'east_of_person', p1: 'marcus', p2: 'victim', text: 'Marcus Cole was positioned east of Curator Aris.' }
  ],
  solution: {
    victim: { r: 1, c: 2, roomId: 'vault' },
    marcus: { r: 0, c: 3, roomId: 'vault' },
    elena: { r: 2, c: 0, roomId: 'workshop' },
    victor: { r: 3, c: 1, roomId: 'courtyard' }
  },
  murdererId: 'marcus'
});

// EASY CASE 3: The Lighthouse Watch
ALL_CASES.push({
  id: 'easy-3',
  title: 'The Lighthouse Watch',
  subtitle: 'The beacon keeper was struck down during a dense fog.',
  story: 'High atop Blackwood Crag, Keeper Silas was found beside the lantern controls. Only three crew members were inside the lighthouse tower. Reconstruct their positions to uncover who shared the lantern chamber.',
  difficulty: 'easy',
  gridSize: 4,
  rooms: [
    { id: 'lantern', name: 'Lantern Chamber', color: '#fef2f2', darkColor: '#450a0a', border: '#ef4444', cells: [[0,0], [0,1], [1,0], [1,1]] },
    { id: 'signals', name: 'Signal Room', color: '#eff6ff', darkColor: '#172554', border: '#3b82f6', cells: [[0,2], [0,3], [1,2], [1,3], [2,2]] },
    { id: 'keep', name: 'Lower Keep', color: '#fffbeb', darkColor: '#451a03', border: '#f59e0b', cells: [[2,0], [2,1], [3,0], [3,1]] },
    { id: 'boathouse', name: 'Boathouse', color: '#f0fdf4', darkColor: '#052e16', border: '#22c55e', cells: [[2,3], [3,2], [3,3]] }
  ],
  furniture: [
    { id: 'beacon', name: 'Fresnel Lens', row: 0, col: 0, icon: 'clock' },
    { id: 'radio', name: 'Telegraph Set', row: 3, col: 0, icon: 'desk' }
  ],
  people: [
    { id: 'victim', name: 'Keeper Silas', role: 'Head Lighthouse Keeper', isVictim: true, isMurderer: false, color: '#ef4444' },
    { id: 'jonah', name: 'First Mate Jonah', role: 'Disgruntled Mate', isVictim: false, isMurderer: true, color: '#f97316' },
    { id: 'vance2', name: 'Captain Vance', role: 'Harbor Master', isVictim: false, isMurderer: false, color: '#0ea5e9' },
    { id: 'clara', name: 'Clara Oswald', role: 'Radio Operator', isVictim: false, isMurderer: false, color: '#10b981' }
  ],
  clues: [
    { id: 'e3-1', type: 'at_cell', p1: 'victim', r: 1, c: 0, text: 'Keeper Silas fell at Row 2, Column 1 inside the Lantern Chamber.' },
    { id: 'e3-2', type: 'in_room', p1: 'jonah', roomId: 'lantern', text: 'First Mate Jonah was stationed in the Lantern Chamber.' },
    { id: 'e3-3', type: 'in_room', p1: 'vance2', roomId: 'signals', text: 'Captain Vance was monitoring flags in the Signal Room.' },
    { id: 'e3-4', type: 'in_room', p1: 'clara', roomId: 'boathouse', text: 'Clara Oswald was inspecting mooring lines in the Boathouse.' },
    { id: 'e3-5', type: 'north_of_person', p1: 'jonah', p2: 'vance2', text: 'First Mate Jonah was stationed north of Captain Vance.' }
  ],
  solution: {
    victim: { r: 1, c: 0, roomId: 'lantern' },
    jonah: { r: 0, c: 1, roomId: 'lantern' },
    vance2: { r: 2, c: 2, roomId: 'signals' },
    clara: { r: 3, c: 3, roomId: 'boathouse' }
  },
  murdererId: 'jonah'
});

// EASY CASE 4: The Orient Express Carriage
ALL_CASES.push({
  id: 'easy-4',
  title: 'The Midnight Express',
  subtitle: 'A diplomat was eliminated as the train sped through the mountain pass.',
  story: 'Ambassador Sterling was found murdered in his private First Class compartment. Three passengers occupied the sleeper car. Use the cabin clues to isolate the assassin.',
  difficulty: 'easy',
  gridSize: 4,
  rooms: [
    { id: 'firstclass', name: 'First Class Cabin', color: '#fef2f2', darkColor: '#450a0a', border: '#ef4444', cells: [[0,0], [0,1], [1,0], [1,1]] },
    { id: 'dining', name: 'Dining Salon', color: '#eff6ff', darkColor: '#172554', border: '#3b82f6', cells: [[0,2], [1,2], [2,2], [2,3]] },
    { id: 'luggage', name: 'Baggage Compartment', color: '#fffbeb', darkColor: '#451a03', border: '#f59e0b', cells: [[1,3], [2,0], [2,1], [3,0]] },
    { id: 'deck', name: 'Observation Deck', color: '#f0fdf4', darkColor: '#052e16', border: '#22c55e', cells: [[3,1], [3,2], [3,3]] }
  ],
  furniture: [
    { id: 'cart', name: 'Silver Bar Cart', row: 0, col: 2, icon: 'desk' },
    { id: 'trunk', name: 'Steamer Trunk', row: 2, col: 0, icon: 'safe' }
  ],
  people: [
    { id: 'victim', name: 'Ambassador Sterling', role: 'Foreign Diplomat', isVictim: true, isMurderer: false, color: '#ef4444' },
    { id: 'baroness', name: 'Baroness Von Bloom', role: 'Secret Agent', isVictim: false, isMurderer: true, color: '#a855f7' },
    { id: 'nadia', name: 'Countess Nadia', role: 'Socialite', isVictim: false, isMurderer: false, color: '#3b82f6' },
    { id: 'pierre', name: 'Conductor Pierre', role: 'Train Purser', isVictim: false, isMurderer: false, color: '#10b981' }
  ],
  clues: [
    { id: 'e4-1', type: 'at_cell', p1: 'victim', r: 0, c: 1, text: 'Ambassador Sterling was seated at Row 1, Column 2 in First Class.' },
    { id: 'e4-2', type: 'in_room', p1: 'baroness', roomId: 'firstclass', text: 'Baroness Von Bloom was also in the First Class Cabin.' },
    { id: 'e4-3', type: 'in_room', p1: 'nadia', roomId: 'dining', text: 'Countess Nadia was dining in the Dining Salon.' },
    { id: 'e4-4', type: 'in_room', p1: 'pierre', roomId: 'deck', text: 'Conductor Pierre was punching tickets on the Observation Deck.' },
    { id: 'e4-5', type: 'east_of_person', p1: 'nadia', p2: 'baroness', text: 'Countess Nadia was positioned east of Baroness Von Bloom.' },
    { id: 'e4-6', type: 'west_of_person', p1: 'nadia', p2: 'pierre', text: 'Countess Nadia was seated west of Conductor Pierre.' }
  ],
  solution: {
    victim: { r: 0, c: 1, roomId: 'firstclass' },
    baroness: { r: 1, c: 0, roomId: 'firstclass' },
    nadia: { r: 2, c: 2, roomId: 'dining' },
    pierre: { r: 3, c: 3, roomId: 'deck' }
  },
  murdererId: 'baroness'
});

// Run solver on all cases
let allPassed = true;
for (const c of ALL_CASES) {
  const res = solveMurdoku(c);
  if (!res.unique) {
    console.error(`FAILED: ${c.id} (${c.title}) - count: ${res.count}`);
    allPassed = false;
  } else {
    console.log(`PASSED: ${c.id} (${c.title}) -> 1 unique solution!`);
  }
}
if (allPassed) console.log("ALL 4 EASY CASES VERIFIED!");
