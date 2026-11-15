import { solveMurdoku } from './test_solver.js';

export const EXPERT_CASES = [];

// ==========================================
// EXPERT CASE 1: The Shadow at Blackwood Manor
// Grid 6x6
// Target Solution:
// Crowley (Killer): [0, 2] (Master Study)
// Blackwood (Victim): [1, 1] (Master Study) -> shares Master Study!
// Eleanor: [2, 0] (Servants Quarters)
// Sebastian: [3, 4] (Portrait Gallery)
// Gideon: [4, 3] (Grand Hall)
// Beatrice: [5, 5] (Conservatory)
// Rows: [0, 1, 2, 3, 4, 5]
// Cols: [2, 1, 0, 4, 3, 5]
// NOTE: NO `at_cell` clues! Everything is deduced through furniture, rooms, and relative directions!
// ==========================================
EXPERT_CASES.push({
  id: 'expert-1',
  title: 'The Shadow at Blackwood Manor',
  subtitle: 'The master of Blackwood was murdered; the will was stolen from his desk.',
  story: 'Lord Blackwood was found slumped over his desk in the Master Study. Six individuals were locked inside during the heavy snowstorm. No direct eyewitness placed any person in a specific coordinate—only deductive clues remain.',
  difficulty: 'expert',
  gridSize: 6,
  rooms: [
    { id: 'study', name: 'Master Study', color: '#fef2f2', darkColor: '#450a0a', border: '#ef4444', cells: [[0,0], [0,1], [0,2], [1,0], [1,1]] },
    { id: 'library', name: 'Grand Library', color: '#eff6ff', darkColor: '#172554', border: '#3b82f6', cells: [[0,3], [0,4], [0,5], [1,2], [1,3], [1,4], [1,5]] },
    { id: 'quarters', name: 'Servants Quarters', color: '#fffbeb', darkColor: '#451a03', border: '#f59e0b', cells: [[2,0], [2,1], [3,0], [3,1], [4,0]] },
    { id: 'hall', name: 'Grand Hall', color: '#f5f3ff', darkColor: '#2e1065', border: '#8b5cf6', cells: [[2,2], [2,3], [3,2], [3,3], [4,1], [4,2], [4,3]] },
    { id: 'gallery', name: 'Portrait Gallery', color: '#f0fdf4', darkColor: '#052e16', border: '#22c55e', cells: [[2,4], [2,5], [3,4], [3,5], [4,4]] },
    { id: 'conservatory', name: 'Conservatory', color: '#fdf2f8', darkColor: '#500724', border: '#ec4899', cells: [[4,5], [5,0], [5,1], [5,2], [5,3], [5,4], [5,5]] }
  ],
  furniture: [
    { id: 'desk', name: 'Mahogany Desk', row: 1, col: 0, icon: 'desk' },
    { id: 'safe', name: 'Iron Safe', row: 0, col: 0, icon: 'safe' },
    { id: 'fireplace', name: 'Stone Fireplace', row: 3, col: 0, icon: 'fireplace' },
    { id: 'statue', name: 'Knight Statue', row: 3, col: 5, icon: 'statue' }
  ],
  people: [
    { id: 'victim', name: 'Lord Blackwood', role: 'Estate Master', isVictim: true, isMurderer: false, color: '#ef4444' },
    { id: 'crowley', name: 'Executor Crowley', role: 'Family Solicitor', isVictim: false, isMurderer: true, color: '#dc2626' },
    { id: 'eleanor', name: 'Eleanor Vance', role: 'Housekeeper', isVictim: false, isMurderer: false, color: '#3b82f6' },
    { id: 'sebastian', name: 'Sebastian Blackwood', role: 'Estranged Nephew', isVictim: false, isMurderer: false, color: '#8b5cf6' },
    { id: 'gideon', name: 'Dr. Gideon Cross', role: 'Family Physician', isVictim: false, isMurderer: false, color: '#10b981' },
    { id: 'beatrice', name: 'Lady Beatrice', role: 'Wealthy Patron', isVictim: false, isMurderer: false, color: '#f59e0b' }
  ],
  clues: [
    { id: 'x1-1', type: 'in_room', p1: 'victim', roomId: 'study', text: 'Lord Blackwood was discovered in the Master Study.' },
    { id: 'x1-2', type: 'directly_east_of_furniture', p1: 'victim', furnitureId: 'desk', text: 'Lord Blackwood sat directly east of his Mahogany Desk.' },
    { id: 'x1-3', type: 'in_room', p1: 'crowley', roomId: 'study', text: 'Executor Crowley admitted he had an appointment in the Master Study.' },
    { id: 'x1-4', type: 'in_room', p1: 'eleanor', roomId: 'quarters', text: 'Eleanor Vance was in the Servants Quarters.' },
    { id: 'x1-5', type: 'in_room', p1: 'sebastian', roomId: 'gallery', text: 'Sebastian Blackwood was pacing in the Portrait Gallery.' },
    { id: 'x1-6', type: 'in_room', p1: 'gideon', roomId: 'hall', text: 'Dr. Gideon Cross was waiting in the Grand Hall.' },
    { id: 'x1-7', type: 'in_room', p1: 'beatrice', roomId: 'conservatory', text: 'Lady Beatrice was resting in the Conservatory.' },
    { id: 'x1-8', type: 'directly_north_of_furniture', p1: 'eleanor', furnitureId: 'fireplace', text: 'Eleanor Vance stood directly north of the Stone Fireplace.' },
    { id: 'x1-9', type: 'directly_west_of_furniture', p1: 'sebastian', furnitureId: 'statue', text: 'Sebastian Blackwood stood directly west of the Knight Statue.' },
    { id: 'x1-10', type: 'same_row_as_furniture', p1: 'sebastian', furnitureId: 'fireplace', text: 'Sebastian Blackwood was on the same horizontal row as the Stone Fireplace.' },
    { id: 'x1-11', type: 'east_of_person', p1: 'crowley', p2: 'victim', text: 'Executor Crowley was positioned east of Lord Blackwood.' },
    { id: 'x1-12', type: 'east_of_person', p1: 'gideon', p2: 'eleanor', text: 'Dr. Gideon Cross was situated east of Eleanor Vance.' },
    { id: 'x1-13', type: 'east_of_person', p1: 'beatrice', p2: 'gideon', text: 'Lady Beatrice was located in the southeastern quadrant.' }
  ],
  solution: {
    victim: { r: 1, c: 1, roomId: 'study' },
    crowley: { r: 0, c: 2, roomId: 'study' },
    eleanor: { r: 2, c: 0, roomId: 'quarters' },
    sebastian: { r: 3, c: 4, roomId: 'gallery' },
    gideon: { r: 4, c: 3, roomId: 'hall' },
    beatrice: { r: 5, c: 5, roomId: 'conservatory' }
  },
  murdererId: 'crowley'
});

// Run Expert 1
console.log('Testing Expert 1...');
for (const c of EXPERT_CASES) {
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

// ==========================================
// EXPERT CASE 2: The Alchemist's Laboratory
// ==========================================
EXPERT_CASES.push({
  id: 'expert-2',
  title: 'The Alchemist\'s Laboratory',
  subtitle: 'The grandmaster of the guild was slain amidst his bubbling vials.',
  story: 'Deep in the university undercroft, Master Nicholas was found poisoned among rare botanical reagents. Six adepts had keys to the subterranean lab. Trace the reagents, furniture landmarks, and statements to deduce who shared the master’s final chamber.',
  difficulty: 'expert',
  gridSize: 6,
  rooms: [
    { id: 'furnace', name: 'Furnace Room', color: '#eff6ff', darkColor: '#172554', border: '#3b82f6', cells: [[0,0], [0,1], [0,2], [1,0], [1,1]] },
    { id: 'distillation', name: 'Distillation Hall', color: '#f5f3ff', darkColor: '#2e1065', border: '#8b5cf6', cells: [[0,3], [0,4], [0,5], [1,4], [1,5]] },
    { id: 'herbarium', name: 'Secret Herbarium', color: '#fef2f2', darkColor: '#450a0a', border: '#ef4444', cells: [[2,0], [2,1], [3,0], [3,1], [4,0], [4,1]] },
    { id: 'vault', name: 'Reagent Vault', color: '#fffbeb', darkColor: '#451a03', border: '#f59e0b', cells: [[1,2], [1,3], [2,2], [2,3], [3,2], [3,3]] },
    { id: 'balance', name: 'Balance Chamber', color: '#f0fdf4', darkColor: '#052e16', border: '#22c55e', cells: [[2,4], [2,5], [3,4], [3,5], [4,4], [4,5]] },
    { id: 'cistern', name: 'Subterranean Cistern', color: '#fdf2f8', darkColor: '#500724', border: '#ec4899', cells: [[4,2], [4,3], [5,0], [5,1], [5,2], [5,3], [5,4], [5,5]] }
  ],
  furniture: [
    { id: 'crucible', name: 'Alchemical Crucible', row: 0, col: 1, icon: 'stove' },
    { id: 'retort', name: 'Glass Retort', row: 2, col: 3, icon: 'desk' },
    { id: 'dryingrack', name: 'Drying Rack', row: 3, col: 0, icon: 'bookcase' },
    { id: 'well', name: 'Stone Well', row: 4, col: 5, icon: 'fountain' }
  ],
  people: [
    { id: 'victim', name: 'Master Nicholas', role: 'Grand Alchemist', isVictim: true, isMurderer: false, color: '#ef4444' },
    { id: 'joshua', name: 'Apprentice Joshua', role: 'Ambitious Novice', isVictim: false, isMurderer: true, color: '#dc2626' },
    { id: 'corvus', name: 'Brother Corvus', role: 'Furnace Stoker', isVictim: false, isMurderer: false, color: '#3b82f6' },
    { id: 'morgana', name: 'Adept Morgana', role: 'Distiller', isVictim: false, isMurderer: false, color: '#8b5cf6' },
    { id: 'balthazar', name: 'Scholar Balthazar', role: 'Librarian', isVictim: false, isMurderer: false, color: '#10b981' },
    { id: 'thaddeus', name: 'Thaddeus Vance', role: 'Guild Warden', isVictim: false, isMurderer: false, color: '#f59e0b' }
  ],
  clues: [
    { id: 'x2-1', type: 'in_room', p1: 'victim', roomId: 'herbarium', text: 'Master Nicholas was found deceased in the Secret Herbarium.' },
    { id: 'x2-2', type: 'directly_east_of_furniture', p1: 'corvus', furnitureId: 'crucible', text: 'Brother Corvus was standing directly east of the Alchemical Crucible.' },
    { id: 'x2-3', type: 'in_room', p1: 'corvus', roomId: 'furnace', text: 'Brother Corvus was tending fires in the Furnace Room.' },
    { id: 'x2-4', type: 'in_room', p1: 'joshua', roomId: 'herbarium', text: 'Apprentice Joshua was sorting roots in the Secret Herbarium.' },
    { id: 'x2-5', type: 'in_room', p1: 'morgana', roomId: 'distillation', text: 'Adept Morgana was purifying spirits in the Distillation Hall.' },
    { id: 'x2-6', type: 'in_room', p1: 'balthazar', roomId: 'vault', text: 'Scholar Balthazar was cataloging vials in the Reagent Vault.' },
    { id: 'x2-7', type: 'in_room', p1: 'thaddeus', roomId: 'cistern', text: 'Thaddeus Vance was checking water levels in the Subterranean Cistern.' },
    { id: 'x2-8', type: 'directly_south_of_furniture', p1: 'joshua', furnitureId: 'dryingrack', text: 'Apprentice Joshua was standing directly south of the Drying Rack.' },
    { id: 'x2-9', type: 'directly_south_of_furniture', p1: 'balthazar', furnitureId: 'retort', text: 'Scholar Balthazar was standing directly south of the Glass Retort.' },
    { id: 'x2-10', type: 'directly_south_of_furniture', p1: 'thaddeus', furnitureId: 'well', text: 'Thaddeus Vance was standing directly south of the Stone Well.' },
    { id: 'x2-11', type: 'east_of_person', p1: 'morgana', p2: 'corvus', text: 'Adept Morgana was located east of Brother Corvus.' },
    { id: 'x2-12', type: 'directly_north_of_furniture', p1: 'victim', furnitureId: 'dryingrack', text: 'Master Nicholas stood northeast of the Drying Rack.' } // wait, let's say east_of_person victim > joshua!
  ],
  solution: {
    victim: { r: 2, c: 1, roomId: 'herbarium' },
    joshua: { r: 4, c: 0, roomId: 'herbarium' },
    corvus: { r: 0, c: 2, roomId: 'furnace' },
    morgana: { r: 1, c: 4, roomId: 'distillation' },
    balthazar: { r: 3, c: 3, roomId: 'vault' },
    thaddeus: { r: 5, c: 5, roomId: 'cistern' }
  },
  murdererId: 'joshua'
});
EXPERT_CASES[EXPERT_CASES.length - 1].clues[11] = { id: 'x2-12', type: 'east_of_person', p1: 'victim', p2: 'joshua', text: 'Master Nicholas stood east of Apprentice Joshua.' };

// ==========================================
// EXPERT CASE 3: The Observatory Solstice
// ==========================================
EXPERT_CASES.push({
  id: 'expert-3',
  title: 'The Observatory Solstice',
  subtitle: 'The imperial astronomer was silenced as the planetary alignment began.',
  story: 'High in the mountaintop dome of the Royal Observatory, Astronomer Tycho was discovered fallen amidst his celestial maps. Six astronomers were taking readings across the observatory levels. Reconstruct the sightings to reveal who shared the Stellar Archive with Tycho.',
  difficulty: 'expert',
  gridSize: 6,
  rooms: [
    { id: 'dome', name: 'Celestial Dome', color: '#eff6ff', darkColor: '#172554', border: '#3b82f6', cells: [[0,0], [0,1], [0,2], [1,0], [1,1], [1,2]] },
    { id: 'astrolabe', name: 'Astrolabe Chamber', color: '#f5f3ff', darkColor: '#2e1065', border: '#8b5cf6', cells: [[0,3], [0,4], [0,5], [1,3], [1,4]] },
    { id: 'transit', name: 'Transit Room', color: '#f0fdf4', darkColor: '#052e16', border: '#22c55e', cells: [[1,5], [2,4], [2,5], [3,3], [3,4], [3,5]] },
    { id: 'archive', name: 'Stellar Archive', color: '#fef2f2', darkColor: '#450a0a', border: '#ef4444', cells: [[2,0], [2,1], [3,0], [3,1], [4,0], [4,1]] },
    { id: 'clockwork', name: 'Clockwork Gearworks', color: '#fffbeb', darkColor: '#451a03', border: '#f59e0b', cells: [[2,2], [2,3], [3,2], [4,2], [4,3]] },
    { id: 'terrace', name: 'Meridian Terrace', color: '#fdf2f8', darkColor: '#500724', border: '#ec4899', cells: [[4,4], [4,5], [5,0], [5,1], [5,2], [5,3], [5,4], [5,5]] }
  ],
  furniture: [
    { id: 'telescope', name: 'Great Telescope', row: 1, col: 1, icon: 'piano' },
    { id: 'armillary', name: 'Brass Armillary', row: 3, col: 5, icon: 'fountain' },
    { id: 'microtome', name: 'Microtome Desk', row: 2, col: 0, icon: 'desk' },
    { id: 'chronometer', name: 'Chronometer Box', row: 5, col: 4, icon: 'safe' }
  ],
  people: [
    { id: 'victim', name: 'Astronomer Tycho', role: 'Imperial Astronomer', isVictim: true, isMurderer: false, color: '#ef4444' },
    { id: 'cassian', name: 'Assistant Cassian', role: 'Ambitious Assistant', isVictim: false, isMurderer: true, color: '#dc2626' },
    { id: 'halley', name: 'Dr. Halley', role: 'Comet Specialist', isVictim: false, isMurderer: false, color: '#3b82f6' },
    { id: 'kepler', name: 'Johannes Kepler', role: 'Mathematical Theorist', isVictim: false, isMurderer: false, color: '#10b981' },
    { id: 'cassini', name: 'Gian Cassini', role: 'Ring Observer', isVictim: false, isMurderer: false, color: '#8b5cf6' },
    { id: 'galileo', name: 'Galileo Rossi', role: 'Telescope Craftsman', isVictim: false, isMurderer: false, color: '#f59e0b' }
  ],
  clues: [
    { id: 'x3-1', type: 'in_room', p1: 'victim', roomId: 'archive', text: 'Astronomer Tycho was found in the Stellar Archive.' },
    { id: 'x3-2', type: 'in_room', p1: 'cassian', roomId: 'archive', text: 'Assistant Cassian was filing observational charts in the Stellar Archive.' },
    { id: 'x3-3', type: 'in_room', p1: 'halley', roomId: 'astrolabe', text: 'Dr. Halley was computing coordinates in the Astrolabe Chamber.' },
    { id: 'x3-4', type: 'in_room', p1: 'kepler', roomId: 'dome', text: 'Johannes Kepler was calibrating lenses in the Celestial Dome.' },
    { id: 'x3-5', type: 'in_room', p1: 'cassini', roomId: 'transit', text: 'Gian Cassini was tracking satellites in the Transit Room.' },
    { id: 'x3-6', type: 'in_room', p1: 'galileo', roomId: 'terrace', text: 'Galileo Rossi was testing prism glass on the Meridian Terrace.' },
    { id: 'x3-7', type: 'directly_east_of_furniture', p1: 'kepler', furnitureId: 'telescope', text: 'Johannes Kepler stood directly east of the Great Telescope.' },
    { id: 'x3-8', type: 'directly_west_of_furniture', p1: 'cassini', furnitureId: 'armillary', text: 'Gian Cassini stood directly west of the Brass Armillary.' },
    { id: 'x3-9', type: 'directly_east_of_furniture', p1: 'galileo', furnitureId: 'chronometer', text: 'Galileo Rossi stood directly east of the Chronometer Box.' },
    { id: 'x3-10', type: 'directly_east_of_furniture', p1: 'victim', furnitureId: 'microtome', text: 'Astronomer Tycho was sitting directly east of the Microtome Desk.' },
    { id: 'x3-11', type: 'south_of_person', p1: 'cassian', p2: 'victim', text: 'Assistant Cassian was positioned south of Astronomer Tycho.' },
    { id: 'x3-12', type: 'west_of_person', p1: 'halley', p2: 'cassini', text: 'Dr. Halley was positioned west of Gian Cassini.' }
  ],
  solution: {
    victim: { r: 2, c: 1, roomId: 'archive' },
    cassian: { r: 4, c: 0, roomId: 'archive' },
    halley: { r: 0, c: 3, roomId: 'astrolabe' },
    kepler: { r: 1, c: 2, roomId: 'dome' },
    cassini: { r: 3, c: 4, roomId: 'transit' },
    galileo: { r: 5, c: 5, roomId: 'terrace' }
  },
  murdererId: 'cassian'
});

// ==========================================
// EXPERT CASE 4: The Embassy Conspiracy
// ==========================================
EXPERT_CASES.push({
  id: 'expert-4',
  title: 'The Embassy Conspiracy',
  subtitle: 'The peace treaty negotiator was assassinated before the summit.',
  story: 'Tension filled the neutral embassy as Diplomat Vance was struck down inside his private quarters. Six diplomats and security personnel held security clearances. Use the rigorous spatial deductions to name the traitor.',
  difficulty: 'expert',
  gridSize: 6,
  rooms: [
    { id: 'ambassador', name: 'Ambassador Suite', color: '#fef2f2', darkColor: '#450a0a', border: '#ef4444', cells: [[0,0], [0,1], [0,2], [1,1], [1,2], [1,3]] },
    { id: 'cipher', name: 'Cipher Room', color: '#eff6ff', darkColor: '#172554', border: '#3b82f6', cells: [[0,3], [0,4], [0,5], [1,4], [1,5], [2,0], [2,1]] },
    { id: 'banquet', name: 'Banquet Gallery', color: '#fffbeb', darkColor: '#451a03', border: '#f59e0b', cells: [[2,2], [2,3], [3,1], [3,2], [4,1], [4,2]] },
    { id: 'courtyard', name: 'Courtyard Peristyle', color: '#f5f3ff', darkColor: '#2e1065', border: '#8b5cf6', cells: [[2,4], [2,5], [3,3], [3,4], [3,5], [4,3], [4,4]] },
    { id: 'guardhouse', name: 'Guardhouse', color: '#f0fdf4', darkColor: '#052e16', border: '#22c55e', cells: [[3,0], [4,0], [5,0], [5,1]] },
    { id: 'vault', name: 'Secret Archives', color: '#fdf2f8', darkColor: '#500724', border: '#ec4899', cells: [[4,5], [5,2], [5,3], [5,4], [5,5]] }
  ],
  furniture: [
    { id: 'teletype', name: 'Cipher Teletype', row: 0, col: 2, icon: 'clock' },
    { id: 'pouch', name: 'Diplomatic Pouch', row: 4, col: 1, icon: 'desk' },
    { id: 'enigma', name: 'Enigma Safe', row: 3, col: 3, icon: 'safe' },
    { id: 'flagpole', name: 'Brass Flagpole', row: 5, col: 4, icon: 'statue' }
  ],
  people: [
    { id: 'victim', name: 'Diplomat Vance', role: 'Chief Negotiator', isVictim: true, isMurderer: false, color: '#ef4444' },
    { id: 'mireille', name: 'Attaché Mireille', role: 'Second Secretary', isVictim: false, isMurderer: true, color: '#dc2626' },
    { id: 'sterling2', name: 'Special Envoy Sterling', role: 'Foreign Envoy', isVictim: false, isMurderer: false, color: '#3b82f6' },
    { id: 'laurent', name: 'Colonel Laurent', role: 'Military Attaché', isVictim: false, isMurderer: false, color: '#10b981' },
    { id: 'dubois', name: 'Minister Dubois', role: 'Protocol Chief', isVictim: false, isMurderer: false, color: '#8b5cf6' },
    { id: 'thorne2', name: 'Agent Thorne', role: 'Intelligence Officer', isVictim: false, isMurderer: false, color: '#f59e0b' }
  ],
  clues: [
    { id: 'x4-1', type: 'in_room', p1: 'victim', roomId: 'ambassador', text: 'Diplomat Vance was inside the Ambassador Suite.' },
    { id: 'x4-2', type: 'directly_west_of_furniture', p1: 'victim', furnitureId: 'teletype', text: 'Diplomat Vance was directly west of the Cipher Teletype.' },
    { id: 'x4-3', type: 'in_room', p1: 'mireille', roomId: 'ambassador', text: 'Attaché Mireille was conferring inside the Ambassador Suite.' },
    { id: 'x4-4', type: 'in_room', p1: 'sterling2', roomId: 'cipher', text: 'Special Envoy Sterling was translating cables in the Cipher Room.' },
    { id: 'x4-5', type: 'in_room', p1: 'laurent', roomId: 'courtyard', text: 'Colonel Laurent was patrolling the Courtyard Peristyle.' },
    { id: 'x4-6', type: 'in_room', p1: 'dubois', roomId: 'banquet', text: 'Minister Dubois was preparing toasts in the Banquet Gallery.' },
    { id: 'x4-7', type: 'in_room', p1: 'thorne2', roomId: 'vault', text: 'Agent Thorne was guarding state files in the Secret Archives.' },
    { id: 'x4-8', type: 'directly_east_of_furniture', p1: 'dubois', furnitureId: 'pouch', text: 'Minister Dubois was directly east of the Diplomatic Pouch.' },
    { id: 'x4-9', type: 'directly_east_of_furniture', p1: 'laurent', furnitureId: 'enigma', text: 'Colonel Laurent was directly east of the Enigma Safe.' },
    { id: 'x4-10', type: 'directly_east_of_furniture', p1: 'thorne2', furnitureId: 'flagpole', text: 'Agent Thorne was directly east of the Brass Flagpole.' },
    { id: 'x4-11', type: 'east_of_person', p1: 'mireille', p2: 'victim', text: 'Attaché Mireille was situated east of Diplomat Vance.' },
    { id: 'x4-12', type: 'west_of_person', p1: 'sterling2', p2: 'dubois', text: 'Special Envoy Sterling was located west of Minister Dubois.' }
  ],
  solution: {
    victim: { r: 0, c: 1, roomId: 'ambassador' },
    mireille: { r: 1, c: 3, roomId: 'ambassador' },
    sterling2: { r: 2, c: 0, roomId: 'cipher' },
    laurent: { r: 3, c: 4, roomId: 'courtyard' },
    dubois: { r: 4, c: 2, roomId: 'banquet' },
    thorne2: { r: 5, c: 5, roomId: 'vault' }
  },
  murdererId: 'mireille'
});

// Run Expert cases
console.log('Testing all Expert cases...');
for (const c of EXPERT_CASES) {
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
