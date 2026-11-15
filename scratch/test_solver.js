import fs from 'fs';

function getPermutations(arr) {
  if (arr.length <= 1) return [arr];
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    for (const p of getPermutations(rest)) {
      res.push([arr[i], ...p]);
    }
  }
  return res;
}

export function solveMurdoku(puzzleCase) {
  const N = puzzleCase.gridSize;
  const people = puzzleCase.people;
  const furnitureCells = new Set((puzzleCase.furniture || []).map(f => `${f.row},${f.col}`));

  const cellToRoom = {};
  for (const room of puzzleCase.rooms) {
    for (const [r, c] of room.cells) {
      cellToRoom[`${r},${c}`] = room.id;
    }
  }

  const baseArr = Array.from({ length: N }, (_, i) => i);
  const rowPerms = getPermutations(baseArr);
  const colPerms = getPermutations(baseArr);

  function checkClues(assignment) {
    for (const clue of puzzleCase.clues) {
      const p1 = assignment[clue.p1];
      const p2 = clue.p2 ? assignment[clue.p2] : null;
      const furn = clue.furnitureId ? puzzleCase.furniture.find(f => f.id === clue.furnitureId) : null;

      switch (clue.type) {
        case 'at_cell':
          if (p1.r !== clue.r || p1.c !== clue.c) return false;
          break;
        case 'in_room':
          if (p1.roomId !== clue.roomId) return false;
          break;
        case 'not_in_room':
          if (p1.roomId === clue.roomId) return false;
          break;
        case 'same_room':
          if (p1.roomId !== p2.roomId) return false;
          break;
        case 'diff_room':
          if (p1.roomId === p2.roomId) return false;
          break;
        case 'beside_furniture': {
          if (!furn) return false;
          const dist = Math.abs(p1.r - furn.row) + Math.abs(p1.c - furn.col);
          if (dist !== 1) return false;
          break;
        }
        case 'directly_north_of_furniture':
          if (!furn || p1.r !== furn.row - 1 || p1.c !== furn.col) return false;
          break;
        case 'directly_south_of_furniture':
          if (!furn || p1.r !== furn.row + 1 || p1.c !== furn.col) return false;
          break;
        case 'directly_east_of_furniture':
          if (!furn || p1.r !== furn.row || p1.c !== furn.col + 1) return false;
          break;
        case 'directly_west_of_furniture':
          if (!furn || p1.r !== furn.row || p1.c !== furn.col - 1) return false;
          break;
        case 'same_row_as_furniture':
          if (!furn || p1.r !== furn.row) return false;
          break;
        case 'same_col_as_furniture':
          if (!furn || p1.c !== furn.col) return false;
          break;
        case 'north_of_person':
          if (p1.r >= p2.r) return false;
          break;
        case 'south_of_person':
          if (p1.r <= p2.r) return false;
          break;
        case 'east_of_person':
          if (p1.c <= p2.c) return false;
          break;
        case 'west_of_person':
          if (p1.c >= p2.c) return false;
          break;
        case 'room_empty': {
          for (const pid of Object.keys(assignment)) {
            if (assignment[pid].roomId === clue.roomId) return false;
          }
          break;
        }
        case 'room_count': {
          let count = 0;
          for (const pid of Object.keys(assignment)) {
            if (assignment[pid].roomId === clue.roomId) count++;
          }
          if (count !== clue.count) return false;
          break;
        }
      }
    }
    return true;
  }

  const validSolutions = [];

  for (const rP of rowPerms) {
    for (const cP of colPerms) {
      let onFurn = false;
      const assignment = {};
      for (let i = 0; i < N; i++) {
        const r = rP[i];
        const c = cP[i];
        if (furnitureCells.has(`${r},${c}`)) {
          onFurn = true;
          break;
        }
        assignment[people[i].id] = {
          r,
          c,
          roomId: cellToRoom[`${r},${c}`]
        };
      }
      if (onFurn) continue;

      if (checkClues(assignment)) {
        validSolutions.push(assignment);
        if (validSolutions.length > 1) {
          return { unique: false, count: validSolutions.length, solutions: validSolutions };
        }
      }
    }
  }

  return { unique: validSolutions.length === 1, count: validSolutions.length, solution: validSolutions[0] };
}

// Build a verified Easy Case (4x4)
// Layout:
// Rooms:
// Study: [0,0], [0,1], [1,0], [1,1]
// Library: [0,2], [0,3], [1,2], [1,3]
// Foyer: [2,0], [2,1], [3,0], [3,1]
// Conservatory: [2,2], [2,3], [3,2], [3,3]
// Furniture:
// Bookcase at [0,3] (in Library)
// Fireplace at [3,0] (in Foyer)
//
// Target Solution:
// Victim (Lord Sterling): [1, 1] (Study)
// Suspect 1 (Lady Cynthia, Killer): [0, 0] (Study) -> same room as victim!
// Suspect 2 (Colonel Vance): [2, 3] (Conservatory)
// Suspect 3 (Professor Drake): [3, 2] (Conservatory) -- wait! Drake at [3,2] and Vance at [2,3] -> Vance col 3, Drake col 2, Sterling col 1, Cynthia col 0.
// Rows: Cynthia row 0, Sterling row 1, Vance row 2, Drake row 3.
// ALL ROWS AND COLS DISTINCT:
// Cynthia: [0, 0]
// Sterling: [1, 1]
// Vance: [2, 3]
// Drake: [3, 2]
//
// Rooms:
// Study has Cynthia [0,0] and Sterling [1,1] -> exactly 2 people!
// Library has 0 people!
// Foyer has 0 people!
// Conservatory has Vance [2,3] and Drake [3,2] -> wait! If Conservatory has 2 people, then Vance and Drake ALSO share a room!
// But rule 10 states: "The murderer is the ONLY suspect sharing a room with the victim."
// If Vance and Drake share Conservatory, then they share a room with EACH OTHER, not with the victim. But in each other room there should be at most 1 suspect, or 3 rooms total!
// Let's make:
// Room 1 (Study): [0,0], [0,1], [1,0], [1,1] -> Sterling [1,1] and Cynthia [0,0]
// Room 2 (Library): [0,2], [0,3], [1,2], [1,3], [2,3] -> Vance [2,3]
// Room 3 (Conservatory): [2,2], [3,2], [3,3] -> Drake [3,2]
// Room 4 (Foyer): [2,0], [2,1], [3,0], [3,1] -> empty!
// Then ONLY Cynthia shares a room with the victim!


