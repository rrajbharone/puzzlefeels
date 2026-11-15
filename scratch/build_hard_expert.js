import { solveMurdoku } from './test_solver.js';

export const HARD_CASES = [];

// ==========================================
// HARD CASE 1: The Midnight Masquerade (Lord Ravenscroft)
// ==========================================
HARD_CASES.push({
  id: 'hard-1',
  title: 'The Midnight Masquerade',
  subtitle: 'The host was found poisoned behind heavy velvet curtains.',
  story: 'Beneath the glittering crystal chandeliers of Blackwood Hall, Lord Ravenscroft was found poisoned in the Master Suite. Six masquerade guests held secrets. Follow the intricate clues to isolate the assassin.',
  difficulty: 'hard',
  gridSize: 6,
  rooms: [
    { id: 'suite', name: 'Master Suite', color: '#fef2f2', darkColor: '#450a0a', border: '#ef4444', cells: [[0,0], [0,1], [0,2], [1,0], [1,1]] },
    { id: 'ballroom', name: 'Grand Ballroom', color: '#eff6ff', darkColor: '#172554', border: '#3b82f6', cells: [[0,3], [0,4], [0,5], [1,2], [1,3], [1,4], [1,5]] },
    { id: 'cellar', name: 'Wine Cellar', color: '#fffbeb', darkColor: '#451a03', border: '#f59e0b', cells: [[2,0], [2,1], [3,0], [3,1], [4,0]] },
    { id: 'grandhall', name: 'Grand Hall', color: '#f5f3ff', darkColor: '#2e1065', border: '#8b5cf6', cells: [[2,2], [2,3], [3,2], [3,3], [4,1], [4,2], [4,3]] },
    { id: 'gallery', name: 'Art Gallery', color: '#f0fdf4', darkColor: '#052e16', border: '#22c55e', cells: [[2,4], [2,5], [3,4], [3,5], [4,4]] },
    { id: 'conservatory', name: 'Conservatory', color: '#fdf2f8', darkColor: '#500724', border: '#ec4899', cells: [[4,5], [5,0], [5,1], [5,2], [5,3], [5,4], [5,5]] }
  ],
  furniture: [
    { id: 'chandelier', name: 'Crystal Chandelier', row: 2, col: 2, icon: 'fountain' },
    { id: 'winerack', name: 'Vintage Wine Rack', row: 3, col: 0, icon: 'bookcase' },
    { id: 'statue', name: 'Marble Statue', row: 3, col: 5, icon: 'statue' },
    { id: 'bed', name: 'Canopy Bed', row: 0, col: 0, icon: 'desk' }
  ],
  people: [
    { id: 'victim', name: 'Lord Ravenscroft', role: 'Estate Lord', isVictim: true, isMurderer: false, color: '#ef4444' },
    { id: 'genevieve', name: 'Lady Genevieve', role: 'Devious Heiress', isVictim: false, isMurderer: true, color: '#ec4899' },
    { id: 'higgins', name: 'Butler Higgins', role: 'Senior Butler', isVictim: false, isMurderer: false, color: '#3b82f6' },
    { id: 'sterling', name: 'Baron Sterling', role: 'Rival Collector', isVictim: false, isMurderer: false, color: '#8b5cf6' },
    { id: 'clara', name: 'Maid Clara', role: 'Head Housekeeper', isVictim: false, isMurderer: false, color: '#10b981' },
    { id: 'arthur', name: 'Duke Arthur', role: 'Royal Dignitary', isVictim: false, isMurderer: false, color: '#f59e0b' }
  ],
  clues: [
    { id: 'h1-1', type: 'at_cell', p1: 'victim', r: 1, c: 1, text: 'Lord Ravenscroft was found poisoned in the Master Suite at Row 2, Column 2.' },
    { id: 'h1-2', type: 'in_room', p1: 'genevieve', roomId: 'suite', text: 'Lady Genevieve was seen slipping into the Master Suite.' },
    { id: 'h1-3', type: 'in_room', p1: 'higgins', roomId: 'cellar', text: 'Butler Higgins was fetching wine in the Wine Cellar.' },
    { id: 'h1-4', type: 'in_room', p1: 'sterling', roomId: 'gallery', text: 'Baron Sterling was admiring paintings in the Art Gallery.' },
    { id: 'h1-5', type: 'in_room', p1: 'clara', roomId: 'grandhall', text: 'Maid Clara was attending guests in the Grand Hall.' },
    { id: 'h1-6', type: 'in_room', p1: 'arthur', roomId: 'conservatory', text: 'Duke Arthur was smoking a pipe in the Conservatory.' },
    { id: 'h1-7', type: 'directly_north_of_furniture', p1: 'higgins', furnitureId: 'winerack', text: 'Butler Higgins was standing directly north of the Vintage Wine Rack.' },
    { id: 'h1-8', type: 'east_of_person', p1: 'clara', p2: 'higgins', text: 'Maid Clara was situated east of Butler Higgins.' },
    { id: 'h1-9', type: 'same_row_as_furniture', p1: 'sterling', furnitureId: 'winerack', text: 'Baron Sterling was on the same horizontal row as the Vintage Wine Rack.' },
    { id: 'h1-10', type: 'east_of_person', p1: 'arthur', p2: 'clara', text: 'Duke Arthur was in the southeastern corner of the estate.' },
    { id: 'h1-11', type: 'east_of_person', p1: 'genevieve', p2: 'victim', text: 'Lady Genevieve was standing east of Lord Ravenscroft.' },
    { id: 'h1-12', type: 'directly_west_of_furniture', p1: 'sterling', furnitureId: 'statue', text: 'Baron Sterling was standing directly west of the Marble Statue.' }
  ],
  solution: {
    victim: { r: 1, c: 1, roomId: 'suite' },
    genevieve: { r: 0, c: 2, roomId: 'suite' },
    higgins: { r: 2, c: 0, roomId: 'cellar' },
    sterling: { r: 3, c: 4, roomId: 'gallery' },
    clara: { r: 4, c: 3, roomId: 'grandhall' },
    arthur: { r: 5, c: 5, roomId: 'conservatory' }
  },
  murdererId: 'genevieve'
});

// ==========================================
// HARD CASE 2: The Cathedral Crypt
// Target Solution:
// Rows: [0, 1, 2, 3, 4, 5]
// Cols: [2, 4, 1, 3, 0, 5]
// Paul: [0, 2] (Sanctuary)
// Beatrice: [1, 4] (Bell Tower)
// Ignatius (Victim): [2, 1] (Crypt)
// Thomas: [3, 3] (Nave)
// Vane (Killer): [4, 0] (Crypt) -> shares Crypt!
// Sean: [5, 5] (Catacombs)
// ==========================================
HARD_CASES.push({
  id: 'hard-2',
  title: 'The Cathedral Crypt',
  subtitle: 'The venerable Archbishop was silenced before the holy relics.',
  story: 'Deep beneath the vaulted arches of St. Jude Cathedral, Archbishop Ignatius was discovered near the stone tombs. Six clergy and visitors were in the subterranean complex. Trace their steps to name the traitor.',
  difficulty: 'hard',
  gridSize: 6,
  rooms: [
    { id: 'sanctuary', name: 'High Sanctuary', color: '#eff6ff', darkColor: '#172554', border: '#3b82f6', cells: [[0,0], [0,1], [0,2], [1,0], [1,1]] },
    { id: 'tower', name: 'Bell Tower Base', color: '#f5f3ff', darkColor: '#2e1065', border: '#8b5cf6', cells: [[0,3], [0,4], [0,5], [1,4], [1,5]] },
    { id: 'crypt', name: 'Ancient Crypt', color: '#fef2f2', darkColor: '#450a0a', border: '#ef4444', cells: [[2,0], [2,1], [3,0], [3,1], [4,0], [4,1]] },
    { id: 'nave', name: 'Lower Nave', color: '#fffbeb', darkColor: '#451a03', border: '#f59e0b', cells: [[1,2], [1,3], [2,2], [2,3], [3,2], [3,3]] },
    { id: 'cloister', name: 'Inner Cloister', color: '#f0fdf4', darkColor: '#052e16', border: '#22c55e', cells: [[2,4], [2,5], [3,4], [3,5], [4,4], [4,5]] },
    { id: 'catacombs', name: 'Deep Catacombs', color: '#fdf2f8', darkColor: '#500724', border: '#ec4899', cells: [[4,2], [4,3], [5,0], [5,1], [5,2], [5,3], [5,4], [5,5]] }
  ],
  furniture: [
    { id: 'altar', name: 'Gilded Altar', row: 0, col: 1, icon: 'desk' },
    { id: 'sarcophagus', name: 'Stone Sarcophagus', row: 3, col: 0, icon: 'safe' },
    { id: 'font', name: 'Holy Water Font', row: 2, col: 3, icon: 'fountain' },
    { id: 'reliquary', name: 'Relic Chest', row: 4, col: 5, icon: 'bookcase' }
  ],
  people: [
    { id: 'victim', name: 'Archbishop Ignatius', role: 'Cathedral Prelate', isVictim: true, isMurderer: false, color: '#ef4444' },
    { id: 'vane', name: 'Inquisitor Vane', role: 'Fanatical Inquisitor', isVictim: false, isMurderer: true, color: '#dc2626' },
    { id: 'paul', name: 'Deacon Paul', role: 'Archivist Priest', isVictim: false, isMurderer: false, color: '#3b82f6' },
    { id: 'beatrice', name: 'Sister Beatrice', role: 'Abbey Nun', isVictim: false, isMurderer: false, color: '#8b5cf6' },
    { id: 'thomas', name: 'Gravekeeper Thomas', role: 'Sexton', isVictim: false, isMurderer: false, color: '#10b981' },
    { id: 'sean', name: 'Sean O’Malley', role: 'Antiquarian', isVictim: false, isMurderer: false, color: '#f59e0b' }
  ],
  clues: [
    { id: 'h2-1', type: 'at_cell', p1: 'victim', r: 2, c: 1, text: 'Archbishop Ignatius was found in the Ancient Crypt at Row 3, Column 2.' },
    { id: 'h2-2', type: 'in_room', p1: 'vane', roomId: 'crypt', text: 'Inquisitor Vane was praying in the Ancient Crypt.' },
    { id: 'h2-3', type: 'in_room', p1: 'paul', roomId: 'sanctuary', text: 'Deacon Paul was preparing incense in the High Sanctuary.' },
    { id: 'h2-4', type: 'in_room', p1: 'beatrice', roomId: 'tower', text: 'Sister Beatrice was winding the chime ropes in the Bell Tower Base.' },
    { id: 'h2-5', type: 'in_room', p1: 'thomas', roomId: 'nave', text: 'Gravekeeper Thomas was lighting candles in the Lower Nave.' },
    { id: 'h2-6', type: 'in_room', p1: 'sean', roomId: 'catacombs', text: 'Sean O’Malley was studying inscriptions in the Deep Catacombs.' },
    { id: 'h2-7', type: 'directly_east_of_furniture', p1: 'paul', furnitureId: 'altar', text: 'Deacon Paul was standing directly east of the Gilded Altar.' },
    { id: 'h2-8', type: 'directly_north_of_furniture', p1: 'sean', furnitureId: 'reliquary', text: 'Sean O’Malley was standing in Column 6, southeast of the relic chest.' }, // wait, Sean is at [5,5], reliquary is at [4,5], Sean is directly SOUTH of reliquary!
    { id: 'h2-9', type: 'directly_south_of_furniture', p1: 'vane', furnitureId: 'sarcophagus', text: 'Inquisitor Vane stood directly south of the Stone Sarcophagus.' },
    { id: 'h2-10', type: 'directly_south_of_furniture', p1: 'thomas', furnitureId: 'font', text: 'Gravekeeper Thomas stood directly south of the Holy Water Font.' },
    { id: 'h2-11', type: 'east_of_person', p1: 'beatrice', p2: 'paul', text: 'Sister Beatrice was positioned east of Deacon Paul.' }
  ],
  solution: {
    victim: { r: 2, c: 1, roomId: 'crypt' },
    vane: { r: 4, c: 0, roomId: 'crypt' },
    paul: { r: 0, c: 2, roomId: 'sanctuary' },
    beatrice: { r: 1, c: 4, roomId: 'tower' },
    thomas: { r: 3, c: 3, roomId: 'nave' },
    sean: { r: 5, c: 5, roomId: 'catacombs' }
  },
  murdererId: 'vane'
});
// Clue h2-8 fix:
HARD_CASES[HARD_CASES.length - 1].clues[7] = { id: 'h2-8', type: 'directly_south_of_furniture', p1: 'sean', furnitureId: 'reliquary', text: 'Sean O’Malley stood directly south of the Relic Chest.' };

// ==========================================
// HARD CASE 3: The Royal Opera Gala
// ==========================================
HARD_CASES.push({
  id: 'hard-3',
  title: 'The Royal Opera Gala',
  subtitle: 'The renowned maestro was struck down moments before the overture.',
  story: 'Just as the orchestra tuned in the pit, Maestro Bellini was found breathless in the Dressing Rooms. Five attendees and artists were within earshot. Untangle the intricate alibis to uncover the killer.',
  difficulty: 'hard',
  gridSize: 6,
  rooms: [
    { id: 'stage', name: 'Grand Stage', color: '#eff6ff', darkColor: '#172554', border: '#3b82f6', cells: [[0,0], [0,1], [0,2], [1,0], [1,1], [1,2]] },
    { id: 'royalbox', name: 'Royal Box', color: '#f5f3ff', darkColor: '#2e1065', border: '#8b5cf6', cells: [[0,3], [0,4], [0,5], [1,3], [1,4]] },
    { id: 'pit', name: 'Orchestra Pit', color: '#f0fdf4', darkColor: '#052e16', border: '#22c55e', cells: [[1,5], [2,4], [2,5], [3,3], [3,4], [3,5]] },
    { id: 'dressing', name: 'Dressing Rooms', color: '#fef2f2', darkColor: '#450a0a', border: '#ef4444', cells: [[2,0], [2,1], [3,0], [3,1], [4,0], [4,1]] },
    { id: 'foyer', name: 'Grand Foyer', color: '#fffbeb', darkColor: '#451a03', border: '#f59e0b', cells: [[2,2], [2,3], [3,2], [4,2], [4,3]] },
    { id: 'backstage', name: 'Backstage Props', color: '#fdf2f8', darkColor: '#500724', border: '#ec4899', cells: [[4,4], [4,5], [5,0], [5,1], [5,2], [5,3], [5,4], [5,5]] }
  ],
  furniture: [
    { id: 'piano3', name: 'Grand Piano', row: 1, col: 1, icon: 'piano' },
    { id: 'harp', name: 'Concert Harp', row: 3, col: 5, icon: 'fountain' },
    { id: 'mirror', name: 'Vanity Mirror', row: 2, col: 0, icon: 'desk' },
    { id: 'propbox', name: 'Costume Chest', row: 5, col: 4, icon: 'safe' }
  ],
  people: [
    { id: 'victim', name: 'Maestro Bellini', role: 'Chief Conductor', isVictim: true, isMurderer: false, color: '#ef4444' },
    { id: 'isabella', name: 'Prima Donna Isabella', role: 'Lead Soprano', isVictim: false, isMurderer: true, color: '#ec4899' },
    { id: 'marco', name: 'Tenor Marco', role: 'Lead Tenor', isVictim: false, isMurderer: false, color: '#3b82f6' },
    { id: 'fritz', name: 'Fritz Krause', role: 'Concertmaster', isVictim: false, isMurderer: false, color: '#10b981' },
    { id: 'alistair', name: 'Alistair Vance', role: 'Music Critic', isVictim: false, isMurderer: false, color: '#8b5cf6' },
    { id: 'boris', name: 'Boris Volkov', role: 'Stage Carpenter', isVictim: false, isMurderer: false, color: '#f59e0b' }
  ],
  clues: [
    { id: 'h3-1', type: 'at_cell', p1: 'victim', r: 2, c: 1, text: 'Maestro Bellini was found in the Dressing Rooms at Row 3, Column 2.' },
    { id: 'h3-2', type: 'in_room', p1: 'isabella', roomId: 'dressing', text: 'Prima Donna Isabella admitted she was in the Dressing Rooms.' },
    { id: 'h3-3', type: 'in_room', p1: 'alistair', roomId: 'royalbox', text: 'Critic Alistair Vance was seated in the Royal Box.' },
    { id: 'h3-4', type: 'in_room', p1: 'marco', roomId: 'stage', text: 'Tenor Marco was rehearsing scales on the Grand Stage.' },
    { id: 'h3-5', type: 'in_room', p1: 'fritz', roomId: 'pit', text: 'Fritz Krause was tuning violins in the Orchestra Pit.' },
    { id: 'h3-6', type: 'in_room', p1: 'boris', roomId: 'backstage', text: 'Boris Volkov was securing scenery ropes in Backstage Props.' },
    { id: 'h3-7', type: 'directly_east_of_furniture', p1: 'marco', furnitureId: 'piano3', text: 'Tenor Marco was standing directly east of the Grand Piano.' },
    { id: 'h3-8', type: 'directly_west_of_furniture', p1: 'fritz', furnitureId: 'harp', text: 'Fritz Krause was standing directly west of the Concert Harp.' },
    { id: 'h3-9', type: 'directly_east_of_furniture', p1: 'boris', furnitureId: 'propbox', text: 'Boris Volkov was standing directly east of the Costume Chest.' },
    { id: 'h3-10', type: 'same_row_as_furniture', p1: 'alistair', furnitureId: 'mirror', text: 'Critic Alistair Vance was in Column 4.' }, // wait, column 4 is c: 3! Let's say at Row 1, Column 4
    { id: 'h3-11', type: 'south_of_person', p1: 'isabella', p2: 'victim', text: 'Prima Donna Isabella stood south of Maestro Bellini.' }
  ],
  solution: {
    victim: { r: 2, c: 1, roomId: 'dressing' },
    isabella: { r: 4, c: 0, roomId: 'dressing' },
    alistair: { r: 0, c: 3, roomId: 'royalbox' },
    marco: { r: 1, c: 2, roomId: 'stage' },
    fritz: { r: 3, c: 4, roomId: 'pit' },
    boris: { r: 5, c: 5, roomId: 'backstage' }
  },
  murdererId: 'isabella'
});
// Update clue h3-10
HARD_CASES[HARD_CASES.length - 1].clues[9] = { id: 'h3-10', type: 'same_col_as_person', p1: 'alistair', p2: 'fritz', text: 'Critic Alistair Vance was located west of Fritz Krause.' };
// Wait, Alistair is col 3, Fritz is col 4, so Alistair is indeed west of Fritz!

// ==========================================
// HARD CASE 4: The Shipwreck of the Gorgon
// ==========================================
HARD_CASES.push({
  id: 'hard-4',
  title: 'The Shipwreck of the Gorgon',
  subtitle: 'The flagship admiral was betrayed as the frigate battered the shoals.',
  story: 'Amid tempestuous waves off the rocky reef, Admiral Hawke was murdered on the Quarterdeck of HMS Gorgon. Six officers and hands were on duty. Read their sworn logs and find the mutinous killer.',
  difficulty: 'hard',
  gridSize: 6,
  rooms: [
    { id: 'quarterdeck', name: 'Quarterdeck', color: '#fef2f2', darkColor: '#450a0a', border: '#ef4444', cells: [[0,0], [0,1], [0,2], [1,1], [1,2], [1,3]] },
    { id: 'charthouse', name: 'Chart House', color: '#eff6ff', darkColor: '#172554', border: '#3b82f6', cells: [[0,3], [0,4], [0,5], [1,4], [1,5], [2,0], [2,1]] },
    { id: 'gundeck', name: 'Upper Gun Deck', color: '#fffbeb', darkColor: '#451a03', border: '#f59e0b', cells: [[2,2], [2,3], [3,1], [3,2], [4,1], [4,2]] },
    { id: 'sickbay', name: 'Orlop Sickbay', color: '#f5f3ff', darkColor: '#2e1065', border: '#8b5cf6', cells: [[2,4], [2,5], [3,3], [3,4], [3,5], [4,3], [4,4]] },
    { id: 'galley', name: 'Ship Galley', color: '#f0fdf4', darkColor: '#052e16', border: '#22c55e', cells: [[3,0], [4,0], [5,0], [5,1]] },
    { id: 'magazine', name: 'Powder Magazine', color: '#fdf2f8', darkColor: '#500724', border: '#ec4899', cells: [[4,5], [5,2], [5,3], [5,4], [5,5]] }
  ],
  furniture: [
    { id: 'wheel', name: 'Ship Helm Wheel', row: 0, col: 2, icon: 'clock' },
    { id: 'cannons', name: 'Brass Cannon', row: 4, col: 1, icon: 'desk' },
    { id: 'cot', name: 'Surgeon Cot', row: 3, col: 3, icon: 'safe' },
    { id: 'barrel', name: 'Powder Keg', row: 5, col: 4, icon: 'stove' }
  ],
  people: [
    { id: 'victim', name: 'Admiral Hawke', role: 'Fleet Commander', isVictim: true, isMurderer: false, color: '#ef4444' },
    { id: 'flint', name: 'Quartermaster Flint', role: 'Corrupt Quartermaster', isVictim: false, isMurderer: true, color: '#dc2626' },
    { id: 'sterling', name: 'Navigator Sterling', role: 'Master Navigator', isVictim: false, isMurderer: false, color: '#3b82f6' },
    { id: 'graves', name: 'Surgeon Graves', role: 'Ship Doctor', isVictim: false, isMurderer: false, color: '#10b981' },
    { id: 'morgan', name: 'Boatswain Morgan', role: 'Chief Petty Officer', isVictim: false, isMurderer: false, color: '#8b5cf6' },
    { id: 'drake', name: 'Gunner Drake', role: 'Master Gunner', isVictim: false, isMurderer: false, color: '#f59e0b' }
  ],
  clues: [
    { id: 'h4-1', type: 'at_cell', p1: 'victim', r: 0, c: 1, text: 'Admiral Hawke was found on the Quarterdeck at Row 1, Column 2.' },
    { id: 'h4-2', type: 'in_room', p1: 'flint', roomId: 'quarterdeck', text: 'Quartermaster Flint was on duty on the Quarterdeck.' },
    { id: 'h4-3', type: 'in_room', p1: 'sterling', roomId: 'charthouse', text: 'Navigator Sterling was plotting courses in the Chart House.' },
    { id: 'h4-4', type: 'in_room', p1: 'graves', roomId: 'sickbay', text: 'Surgeon Graves was tending wounded in the Orlop Sickbay.' },
    { id: 'h4-5', type: 'in_room', p1: 'morgan', roomId: 'gundeck', text: 'Boatswain Morgan was checking cannon lashings on the Upper Gun Deck.' },
    { id: 'h4-6', type: 'in_room', p1: 'drake', roomId: 'magazine', text: 'Gunner Drake was inspecting munitions in the Powder Magazine.' },
    { id: 'h4-7', type: 'directly_west_of_furniture', p1: 'victim', furnitureId: 'wheel', text: 'Admiral Hawke fell directly west of the Ship Helm Wheel.' },
    { id: 'h4-8', type: 'directly_east_of_furniture', p1: 'flint', furnitureId: 'wheel', text: 'Quartermaster Flint was standing directly east of the Ship Helm Wheel.' }, // wait, wheel is [0,2], Flint is at [1,3], south-east! Let's use east_of_person flint > victim!
    { id: 'h4-9', type: 'directly_east_of_furniture', p1: 'morgan', furnitureId: 'cannons', text: 'Boatswain Morgan was standing directly east of the Brass Cannon.' },
    { id: 'h4-10', type: 'directly_east_of_furniture', p1: 'graves', furnitureId: 'cot', text: 'Surgeon Graves was standing directly east of the Surgeon Cot.' },
    { id: 'h4-11', type: 'directly_east_of_furniture', p1: 'drake', furnitureId: 'barrel', text: 'Gunner Drake was standing directly east of the Powder Keg.' }
  ],
  solution: {
    victim: { r: 0, c: 1, roomId: 'quarterdeck' },
    flint: { r: 1, c: 3, roomId: 'quarterdeck' },
    sterling: { r: 2, c: 0, roomId: 'charthouse' },
    morgan: { r: 4, c: 2, roomId: 'gundeck' },
    graves: { r: 3, c: 4, roomId: 'sickbay' },
    drake: { r: 5, c: 5, roomId: 'magazine' }
  },
  murdererId: 'flint'
});
HARD_CASES[HARD_CASES.length - 1].clues[7] = { id: 'h4-8', type: 'east_of_person', p1: 'flint', p2: 'victim', text: 'Quartermaster Flint stood east of Admiral Hawke.' };

// Run Hard cases
console.log('Testing all Hard cases...');
for (const c of HARD_CASES) {
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
