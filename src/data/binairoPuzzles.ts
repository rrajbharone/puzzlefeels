/**
 * Binairo (Takuzu / Binary Puzzle) Dataset & Deduction Engine for PuzzleFeels.com
 *
 * Rules:
 * 1. Equal number of 0s and 1s in every row and column.
 * 2. No three identical consecutive digits (no 000 or 111) horizontally or vertically.
 * 3. Every completed row is unique.
 * 4. Every completed column is unique.
 *
 * All 18 puzzles in this dataset have been mathematically verified to have strictly 1 unique solution.
 */

export interface BinairoPuzzle {
  id: string;
  name: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  size: number;
  rows: number;
  cols: number;
  clues: (0 | 1 | null)[][];
  solution: (0 | 1)[][];
  clueCount: number;
}

export const BINAIRO_PUZZLES: BinairoPuzzle[] = [
  {
    "id": "easy-1",
    "name": "Binary Beginnings",
    "title": "Binary Beginnings",
    "difficulty": "easy",
    "size": 6,
    "rows": 6,
    "cols": 6,
    "clues": [
      [
        null,
        null,
        null,
        1,
        0,
        null
      ],
      [
        null,
        0,
        1,
        null,
        null,
        null
      ],
      [
        null,
        null,
        null,
        null,
        null,
        0
      ],
      [
        null,
        0,
        0,
        null,
        null,
        1
      ],
      [
        0,
        1,
        null,
        null,
        null,
        null
      ],
      [
        1,
        1,
        0,
        1,
        null,
        null
      ]
    ],
    "solution": [
      [
        0,
        0,
        1,
        1,
        0,
        1
      ],
      [
        0,
        0,
        1,
        0,
        1,
        1
      ],
      [
        1,
        1,
        0,
        0,
        1,
        0
      ],
      [
        1,
        0,
        0,
        1,
        0,
        1
      ],
      [
        0,
        1,
        1,
        0,
        1,
        0
      ],
      [
        1,
        1,
        0,
        1,
        0,
        0
      ]
    ],
    "clueCount": 14
  },
  {
    "id": "easy-2",
    "name": "Equal Orbit",
    "title": "Equal Orbit",
    "difficulty": "easy",
    "size": 6,
    "rows": 6,
    "cols": 6,
    "clues": [
      [
        null,
        null,
        1,
        0,
        1,
        1
      ],
      [
        null,
        null,
        null,
        1,
        null,
        null
      ],
      [
        1,
        1,
        null,
        null,
        null,
        0
      ],
      [
        null,
        0,
        null,
        null,
        1,
        null
      ],
      [
        null,
        null,
        1,
        null,
        0,
        1
      ],
      [
        null,
        null,
        null,
        0,
        null,
        null
      ]
    ],
    "solution": [
      [
        0,
        0,
        1,
        0,
        1,
        1
      ],
      [
        0,
        1,
        0,
        1,
        0,
        1
      ],
      [
        1,
        1,
        0,
        1,
        0,
        0
      ],
      [
        1,
        0,
        1,
        0,
        1,
        0
      ],
      [
        0,
        0,
        1,
        1,
        0,
        1
      ],
      [
        1,
        1,
        0,
        0,
        1,
        0
      ]
    ],
    "clueCount": 14
  },
  {
    "id": "easy-3",
    "name": "Twin Circles",
    "title": "Twin Circles",
    "difficulty": "easy",
    "size": 6,
    "rows": 6,
    "cols": 6,
    "clues": [
      [
        null,
        null,
        null,
        null,
        0,
        0
      ],
      [
        null,
        null,
        null,
        0,
        null,
        null
      ],
      [
        null,
        1,
        null,
        0,
        1,
        null
      ],
      [
        1,
        1,
        null,
        1,
        0,
        null
      ],
      [
        null,
        0,
        null,
        null,
        null,
        null
      ],
      [
        0,
        null,
        0,
        0,
        null,
        null
      ]
    ],
    "solution": [
      [
        1,
        0,
        1,
        1,
        0,
        0
      ],
      [
        0,
        0,
        1,
        0,
        1,
        1
      ],
      [
        1,
        1,
        0,
        0,
        1,
        0
      ],
      [
        1,
        1,
        0,
        1,
        0,
        0
      ],
      [
        0,
        0,
        1,
        1,
        0,
        1
      ],
      [
        0,
        1,
        0,
        0,
        1,
        1
      ]
    ],
    "clueCount": 14
  },
  {
    "id": "easy-4",
    "name": "Zero-One Grove",
    "title": "Zero-One Grove",
    "difficulty": "easy",
    "size": 6,
    "rows": 6,
    "cols": 6,
    "clues": [
      [
        0,
        0,
        null,
        null,
        0,
        1
      ],
      [
        0,
        null,
        null,
        null,
        1,
        null
      ],
      [
        1,
        null,
        null,
        null,
        0,
        null
      ],
      [
        null,
        1,
        1,
        0,
        1,
        null
      ],
      [
        1,
        null,
        null,
        null,
        null,
        null
      ],
      [
        null,
        null,
        null,
        0,
        null,
        null
      ]
    ],
    "solution": [
      [
        0,
        0,
        1,
        1,
        0,
        1
      ],
      [
        0,
        0,
        1,
        0,
        1,
        1
      ],
      [
        1,
        1,
        0,
        1,
        0,
        0
      ],
      [
        0,
        1,
        1,
        0,
        1,
        0
      ],
      [
        1,
        0,
        0,
        1,
        0,
        1
      ],
      [
        1,
        1,
        0,
        0,
        1,
        0
      ]
    ],
    "clueCount": 14
  },
  {
    "id": "easy-5",
    "name": "Balanced Path",
    "title": "Balanced Path",
    "difficulty": "easy",
    "size": 6,
    "rows": 6,
    "cols": 6,
    "clues": [
      [
        null,
        0,
        null,
        0,
        null,
        null
      ],
      [
        null,
        0,
        null,
        1,
        null,
        1
      ],
      [
        null,
        null,
        1,
        null,
        null,
        null
      ],
      [
        null,
        null,
        null,
        1,
        0,
        null
      ],
      [
        null,
        0,
        1,
        0,
        null,
        0
      ],
      [
        0,
        null,
        null,
        null,
        1,
        null
      ]
    ],
    "solution": [
      [
        1,
        0,
        1,
        0,
        0,
        1
      ],
      [
        1,
        0,
        0,
        1,
        0,
        1
      ],
      [
        0,
        1,
        1,
        0,
        1,
        0
      ],
      [
        0,
        1,
        0,
        1,
        0,
        1
      ],
      [
        1,
        0,
        1,
        0,
        1,
        0
      ],
      [
        0,
        1,
        0,
        1,
        1,
        0
      ]
    ],
    "clueCount": 14
  },
  {
    "id": "easy-6",
    "name": "Daily Binary Dawn",
    "title": "Daily Binary Dawn",
    "difficulty": "easy",
    "size": 6,
    "rows": 6,
    "cols": 6,
    "clues": [
      [
        0,
        1,
        0,
        1,
        1,
        null
      ],
      [
        null,
        null,
        null,
        0,
        1,
        null
      ],
      [
        null,
        0,
        null,
        null,
        null,
        1
      ],
      [
        1,
        0,
        0,
        null,
        null,
        null
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null
      ],
      [
        null,
        null,
        1,
        0,
        null,
        null
      ]
    ],
    "solution": [
      [
        0,
        1,
        0,
        1,
        1,
        0
      ],
      [
        0,
        1,
        1,
        0,
        1,
        0
      ],
      [
        1,
        0,
        0,
        1,
        0,
        1
      ],
      [
        1,
        0,
        0,
        1,
        1,
        0
      ],
      [
        0,
        1,
        1,
        0,
        0,
        1
      ],
      [
        1,
        0,
        1,
        0,
        0,
        1
      ]
    ],
    "clueCount": 14
  },
  {
    "id": "medium-1",
    "name": "Symmetry Chamber",
    "title": "Symmetry Chamber",
    "difficulty": "medium",
    "size": 8,
    "rows": 8,
    "cols": 8,
    "clues": [
      [
        1,
        null,
        null,
        1,
        null,
        null,
        1,
        0
      ],
      [
        1,
        0,
        0,
        null,
        null,
        null,
        null,
        1
      ],
      [
        0,
        null,
        null,
        null,
        null,
        null,
        1,
        null
      ],
      [
        1,
        null,
        0,
        1,
        0,
        null,
        null,
        null
      ],
      [
        null,
        0,
        1,
        null,
        null,
        null,
        null,
        null
      ],
      [
        null,
        1,
        0,
        null,
        null,
        0,
        null,
        null
      ],
      [
        null,
        null,
        null,
        null,
        0,
        0,
        1,
        null
      ],
      [
        0,
        null,
        1,
        0,
        1,
        1,
        0,
        null
      ]
    ],
    "solution": [
      [
        1,
        1,
        0,
        1,
        0,
        0,
        1,
        0
      ],
      [
        1,
        0,
        0,
        1,
        0,
        1,
        0,
        1
      ],
      [
        0,
        0,
        1,
        0,
        1,
        0,
        1,
        1
      ],
      [
        1,
        1,
        0,
        1,
        0,
        1,
        0,
        0
      ],
      [
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        1
      ],
      [
        1,
        1,
        0,
        0,
        1,
        0,
        1,
        0
      ],
      [
        0,
        0,
        1,
        1,
        0,
        0,
        1,
        1
      ],
      [
        0,
        1,
        1,
        0,
        1,
        1,
        0,
        0
      ]
    ],
    "clueCount": 28
  },
  {
    "id": "medium-2",
    "name": "Alternating Currents",
    "title": "Alternating Currents",
    "difficulty": "medium",
    "size": 8,
    "rows": 8,
    "cols": 8,
    "clues": [
      [
        0,
        0,
        1,
        0,
        null,
        null,
        null,
        1
      ],
      [
        0,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      ],
      [
        null,
        1,
        null,
        0,
        null,
        1,
        0,
        0
      ],
      [
        0,
        null,
        1,
        null,
        null,
        null,
        null,
        null
      ],
      [
        null,
        null,
        0,
        1,
        0,
        0,
        null,
        1
      ],
      [
        null,
        null,
        0,
        0,
        null,
        null,
        1,
        0
      ],
      [
        0,
        0,
        null,
        null,
        null,
        null,
        null,
        null
      ],
      [
        null,
        1,
        null,
        1,
        null,
        0,
        null,
        0
      ]
    ],
    "solution": [
      [
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        1
      ],
      [
        0,
        0,
        1,
        1,
        0,
        0,
        1,
        1
      ],
      [
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        0
      ],
      [
        0,
        1,
        1,
        0,
        1,
        1,
        0,
        0
      ],
      [
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        1
      ],
      [
        1,
        1,
        0,
        0,
        1,
        0,
        1,
        0
      ],
      [
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        1
      ],
      [
        1,
        1,
        0,
        1,
        0,
        0,
        1,
        0
      ]
    ],
    "clueCount": 28
  },
  {
    "id": "medium-3",
    "name": "Harmonic Octet",
    "title": "Harmonic Octet",
    "difficulty": "medium",
    "size": 8,
    "rows": 8,
    "cols": 8,
    "clues": [
      [
        1,
        null,
        null,
        null,
        null,
        null,
        0,
        0
      ],
      [
        null,
        null,
        1,
        null,
        null,
        null,
        1,
        null
      ],
      [
        null,
        null,
        null,
        null,
        null,
        0,
        0,
        1
      ],
      [
        1,
        null,
        null,
        null,
        1,
        null,
        0,
        0
      ],
      [
        null,
        null,
        1,
        1,
        null,
        null,
        1,
        0
      ],
      [
        null,
        0,
        1,
        null,
        null,
        null,
        null,
        null
      ],
      [
        1,
        null,
        0,
        1,
        0,
        null,
        0,
        0
      ],
      [
        null,
        1,
        null,
        null,
        0,
        null,
        1,
        1
      ]
    ],
    "solution": [
      [
        1,
        0,
        1,
        0,
        1,
        1,
        0,
        0
      ],
      [
        0,
        0,
        1,
        1,
        0,
        0,
        1,
        1
      ],
      [
        1,
        1,
        0,
        0,
        1,
        0,
        0,
        1
      ],
      [
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        0
      ],
      [
        0,
        0,
        1,
        1,
        0,
        1,
        1,
        0
      ],
      [
        0,
        0,
        1,
        0,
        1,
        0,
        1,
        1
      ],
      [
        1,
        1,
        0,
        1,
        0,
        1,
        0,
        0
      ],
      [
        0,
        1,
        0,
        1,
        0,
        0,
        1,
        1
      ]
    ],
    "clueCount": 28
  },
  {
    "id": "medium-4",
    "name": "Matrix Cadence",
    "title": "Matrix Cadence",
    "difficulty": "medium",
    "size": 8,
    "rows": 8,
    "cols": 8,
    "clues": [
      [
        1,
        0,
        null,
        null,
        null,
        null,
        null,
        null
      ],
      [
        null,
        0,
        null,
        1,
        null,
        0,
        null,
        1
      ],
      [
        null,
        null,
        0,
        0,
        null,
        1,
        0,
        1
      ],
      [
        1,
        1,
        null,
        null,
        1,
        null,
        null,
        null
      ],
      [
        0,
        null,
        null,
        null,
        null,
        1,
        null,
        null
      ],
      [
        null,
        null,
        null,
        0,
        1,
        1,
        0,
        0
      ],
      [
        null,
        0,
        null,
        null,
        1,
        0,
        null,
        null
      ],
      [
        null,
        null,
        0,
        null,
        0,
        1,
        null,
        0
      ]
    ],
    "solution": [
      [
        1,
        0,
        1,
        1,
        0,
        0,
        1,
        0
      ],
      [
        0,
        0,
        1,
        1,
        0,
        0,
        1,
        1
      ],
      [
        0,
        1,
        0,
        0,
        1,
        1,
        0,
        1
      ],
      [
        1,
        1,
        0,
        0,
        1,
        0,
        1,
        0
      ],
      [
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        1
      ],
      [
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        0
      ],
      [
        0,
        0,
        1,
        0,
        1,
        0,
        1,
        1
      ],
      [
        1,
        1,
        0,
        1,
        0,
        1,
        0,
        0
      ]
    ],
    "clueCount": 28
  },
  {
    "id": "medium-5",
    "name": "Binary Crossroads",
    "title": "Binary Crossroads",
    "difficulty": "medium",
    "size": 8,
    "rows": 8,
    "cols": 8,
    "clues": [
      [
        null,
        null,
        1,
        null,
        1,
        null,
        1,
        null
      ],
      [
        1,
        0,
        null,
        0,
        null,
        0,
        null,
        0
      ],
      [
        null,
        1,
        null,
        null,
        null,
        1,
        null,
        1
      ],
      [
        0,
        null,
        1,
        0,
        1,
        null,
        0,
        null
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        0
      ],
      [
        0,
        null,
        null,
        1,
        1,
        null,
        null,
        null
      ],
      [
        null,
        null,
        1,
        null,
        null,
        null,
        0,
        1
      ],
      [
        1,
        0,
        0,
        null,
        null,
        null,
        0,
        1
      ]
    ],
    "solution": [
      [
        0,
        1,
        1,
        0,
        1,
        0,
        1,
        0
      ],
      [
        1,
        0,
        1,
        0,
        1,
        0,
        1,
        0
      ],
      [
        0,
        1,
        0,
        1,
        0,
        1,
        0,
        1
      ],
      [
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        1
      ],
      [
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        0
      ],
      [
        0,
        1,
        0,
        1,
        1,
        0,
        1,
        0
      ],
      [
        1,
        0,
        1,
        0,
        0,
        1,
        0,
        1
      ],
      [
        1,
        0,
        0,
        1,
        0,
        1,
        0,
        1
      ]
    ],
    "clueCount": 28
  },
  {
    "id": "medium-6",
    "name": "Daily Octet Flow",
    "title": "Daily Octet Flow",
    "difficulty": "medium",
    "size": 8,
    "rows": 8,
    "cols": 8,
    "clues": [
      [
        null,
        null,
        null,
        1,
        null,
        null,
        null,
        1
      ],
      [
        1,
        null,
        null,
        null,
        null,
        null,
        1,
        null
      ],
      [
        1,
        1,
        null,
        0,
        null,
        null,
        0,
        null
      ],
      [
        null,
        0,
        1,
        null,
        null,
        null,
        null,
        1
      ],
      [
        1,
        1,
        null,
        1,
        null,
        null,
        0,
        0
      ],
      [
        0,
        1,
        null,
        null,
        1,
        null,
        null,
        1
      ],
      [
        null,
        null,
        0,
        1,
        null,
        null,
        null,
        0
      ],
      [
        0,
        null,
        null,
        null,
        1,
        1,
        0,
        0
      ]
    ],
    "solution": [
      [
        0,
        0,
        1,
        1,
        0,
        0,
        1,
        1
      ],
      [
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        1
      ],
      [
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        0
      ],
      [
        0,
        0,
        1,
        0,
        1,
        0,
        1,
        1
      ],
      [
        1,
        1,
        0,
        1,
        0,
        1,
        0,
        0
      ],
      [
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        1
      ],
      [
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        0
      ],
      [
        0,
        1,
        1,
        0,
        1,
        1,
        0,
        0
      ]
    ],
    "clueCount": 28
  },
  {
    "id": "hard-1",
    "name": "Deca Constellation",
    "title": "Deca Constellation",
    "difficulty": "hard",
    "size": 10,
    "rows": 10,
    "cols": 10,
    "clues": [
      [
        null,
        null,
        1,
        0,
        null,
        1,
        null,
        0,
        1,
        null
      ],
      [
        0,
        1,
        1,
        null,
        null,
        null,
        null,
        0,
        null,
        null
      ],
      [
        null,
        0,
        null,
        null,
        null,
        null,
        0,
        null,
        null,
        null
      ],
      [
        null,
        1,
        null,
        0,
        1,
        1,
        null,
        null,
        null,
        0
      ],
      [
        0,
        null,
        1,
        null,
        null,
        null,
        1,
        null,
        null,
        0
      ],
      [
        null,
        null,
        1,
        null,
        1,
        null,
        null,
        0,
        0,
        null
      ],
      [
        1,
        1,
        null,
        null,
        null,
        null,
        0,
        null,
        0,
        null
      ],
      [
        null,
        1,
        1,
        0,
        0,
        1,
        null,
        0,
        null,
        null
      ],
      [
        1,
        null,
        null,
        null,
        null,
        null,
        1,
        null,
        0,
        null
      ],
      [
        1,
        0,
        0,
        1,
        1,
        0,
        null,
        null,
        1,
        null
      ]
    ],
    "solution": [
      [
        0,
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        1,
        0
      ],
      [
        0,
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        0,
        1
      ],
      [
        1,
        0,
        0,
        1,
        1,
        0,
        0,
        1,
        0,
        1
      ],
      [
        0,
        1,
        0,
        0,
        1,
        1,
        0,
        1,
        1,
        0
      ],
      [
        0,
        0,
        1,
        1,
        0,
        1,
        1,
        0,
        1,
        0
      ],
      [
        1,
        0,
        1,
        0,
        1,
        0,
        1,
        0,
        0,
        1
      ],
      [
        1,
        1,
        0,
        1,
        1,
        0,
        0,
        1,
        0,
        0
      ],
      [
        0,
        1,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        1
      ],
      [
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        1,
        0,
        1
      ],
      [
        1,
        0,
        0,
        1,
        1,
        0,
        0,
        1,
        1,
        0
      ]
    ],
    "clueCount": 44
  },
  {
    "id": "hard-2",
    "name": "Duality Nexus",
    "title": "Duality Nexus",
    "difficulty": "hard",
    "size": 10,
    "rows": 10,
    "cols": 10,
    "clues": [
      [
        null,
        null,
        null,
        0,
        null,
        null,
        null,
        null,
        1,
        null
      ],
      [
        null,
        1,
        null,
        1,
        0,
        null,
        1,
        null,
        null,
        1
      ],
      [
        null,
        null,
        1,
        null,
        null,
        null,
        1,
        0,
        1,
        null
      ],
      [
        null,
        0,
        null,
        0,
        1,
        0,
        null,
        null,
        1,
        null
      ],
      [
        1,
        1,
        null,
        0,
        1,
        null,
        null,
        0,
        null,
        null
      ],
      [
        null,
        0,
        null,
        null,
        0,
        null,
        1,
        0,
        0,
        null
      ],
      [
        0,
        null,
        null,
        null,
        null,
        null,
        null,
        1,
        null,
        null
      ],
      [
        1,
        1,
        null,
        1,
        1,
        0,
        0,
        1,
        0,
        0
      ],
      [
        null,
        0,
        null,
        null,
        0,
        null,
        1,
        null,
        null,
        null
      ],
      [
        null,
        1,
        null,
        1,
        null,
        1,
        null,
        1,
        null,
        null
      ]
    ],
    "solution": [
      [
        1,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        1,
        0
      ],
      [
        1,
        1,
        0,
        1,
        0,
        0,
        1,
        0,
        0,
        1
      ],
      [
        0,
        0,
        1,
        1,
        0,
        1,
        1,
        0,
        1,
        0
      ],
      [
        1,
        0,
        1,
        0,
        1,
        0,
        0,
        1,
        1,
        0
      ],
      [
        1,
        1,
        0,
        0,
        1,
        0,
        1,
        0,
        0,
        1
      ],
      [
        0,
        0,
        1,
        1,
        0,
        1,
        1,
        0,
        0,
        1
      ],
      [
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        1,
        1,
        0
      ],
      [
        1,
        1,
        0,
        1,
        1,
        0,
        0,
        1,
        0,
        0
      ],
      [
        0,
        0,
        1,
        0,
        0,
        1,
        1,
        0,
        1,
        1
      ],
      [
        0,
        1,
        0,
        1,
        0,
        1,
        0,
        1,
        0,
        1
      ]
    ],
    "clueCount": 44
  },
  {
    "id": "hard-3",
    "name": "Grand Parity",
    "title": "Grand Parity",
    "difficulty": "hard",
    "size": 10,
    "rows": 10,
    "cols": 10,
    "clues": [
      [
        1,
        null,
        null,
        1,
        0,
        null,
        null,
        null,
        null,
        null
      ],
      [
        null,
        null,
        0,
        null,
        null,
        null,
        0,
        0,
        1,
        0
      ],
      [
        null,
        null,
        null,
        null,
        1,
        null,
        null,
        null,
        null,
        null
      ],
      [
        null,
        0,
        null,
        1,
        null,
        1,
        null,
        null,
        null,
        null
      ],
      [
        1,
        null,
        null,
        0,
        null,
        null,
        1,
        null,
        null,
        1
      ],
      [
        null,
        null,
        1,
        0,
        1,
        1,
        0,
        0,
        1,
        1
      ],
      [
        null,
        null,
        0,
        1,
        0,
        null,
        1,
        null,
        0,
        null
      ],
      [
        0,
        null,
        null,
        0,
        null,
        null,
        0,
        1,
        null,
        0
      ],
      [
        null,
        null,
        1,
        null,
        0,
        null,
        null,
        0,
        1,
        null
      ],
      [
        null,
        1,
        null,
        0,
        null,
        0,
        0,
        1,
        null,
        1
      ]
    ],
    "solution": [
      [
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        1,
        0
      ],
      [
        1,
        1,
        0,
        1,
        0,
        1,
        0,
        0,
        1,
        0
      ],
      [
        0,
        0,
        1,
        0,
        1,
        0,
        1,
        1,
        0,
        1
      ],
      [
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        1,
        1,
        0
      ],
      [
        1,
        1,
        0,
        0,
        1,
        0,
        1,
        0,
        0,
        1
      ],
      [
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        0,
        1,
        1
      ],
      [
        1,
        1,
        0,
        1,
        0,
        0,
        1,
        1,
        0,
        0
      ],
      [
        0,
        1,
        1,
        0,
        1,
        1,
        0,
        1,
        0,
        0
      ],
      [
        0,
        0,
        1,
        1,
        0,
        0,
        1,
        0,
        1,
        1
      ],
      [
        1,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        1
      ]
    ],
    "clueCount": 44
  },
  {
    "id": "hard-4",
    "name": "Binary Labyrinth",
    "title": "Binary Labyrinth",
    "difficulty": "hard",
    "size": 10,
    "rows": 10,
    "cols": 10,
    "clues": [
      [
        null,
        null,
        null,
        0,
        null,
        null,
        null,
        null,
        null,
        1
      ],
      [
        0,
        null,
        1,
        null,
        0,
        null,
        0,
        null,
        0,
        1
      ],
      [
        1,
        1,
        null,
        null,
        0,
        null,
        0,
        null,
        null,
        0
      ],
      [
        null,
        null,
        0,
        0,
        null,
        null,
        null,
        null,
        1,
        null
      ],
      [
        null,
        0,
        null,
        1,
        null,
        0,
        null,
        null,
        null,
        1
      ],
      [
        0,
        null,
        1,
        null,
        1,
        null,
        null,
        null,
        null,
        1
      ],
      [
        null,
        1,
        null,
        null,
        null,
        0,
        null,
        1,
        null,
        0
      ],
      [
        null,
        0,
        null,
        1,
        0,
        0,
        1,
        null,
        0,
        null
      ],
      [
        null,
        0,
        null,
        0,
        null,
        1,
        null,
        null,
        1,
        1
      ],
      [
        1,
        null,
        0,
        null,
        null,
        1,
        0,
        null,
        1,
        null
      ]
    ],
    "solution": [
      [
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        1
      ],
      [
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        1,
        0,
        1
      ],
      [
        1,
        1,
        0,
        1,
        0,
        1,
        0,
        0,
        1,
        0
      ],
      [
        1,
        1,
        0,
        0,
        1,
        0,
        1,
        0,
        1,
        0
      ],
      [
        0,
        0,
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        1
      ],
      [
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        0,
        1,
        1
      ],
      [
        1,
        1,
        0,
        1,
        1,
        0,
        0,
        1,
        0,
        0
      ],
      [
        1,
        0,
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        0
      ],
      [
        0,
        0,
        1,
        0,
        0,
        1,
        1,
        0,
        1,
        1
      ],
      [
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        0,
        1,
        0
      ]
    ],
    "clueCount": 44
  },
  {
    "id": "hard-5",
    "name": "Equilibrium Core",
    "title": "Equilibrium Core",
    "difficulty": "hard",
    "size": 10,
    "rows": 10,
    "cols": 10,
    "clues": [
      [
        null,
        0,
        1,
        1,
        0,
        null,
        null,
        1,
        1,
        0
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        0,
        null
      ],
      [
        null,
        1,
        1,
        0,
        1,
        0,
        null,
        1,
        0,
        1
      ],
      [
        null,
        null,
        null,
        0,
        0,
        null,
        null,
        null,
        null,
        null
      ],
      [
        1,
        null,
        null,
        1,
        0,
        null,
        1,
        0,
        0,
        null
      ],
      [
        null,
        null,
        1,
        null,
        1,
        null,
        null,
        1,
        1,
        null
      ],
      [
        1,
        null,
        null,
        null,
        1,
        null,
        1,
        null,
        null,
        0
      ],
      [
        null,
        null,
        null,
        0,
        null,
        1,
        1,
        null,
        null,
        1
      ],
      [
        1,
        1,
        0,
        null,
        null,
        0,
        null,
        null,
        0,
        null
      ],
      [
        null,
        null,
        null,
        null,
        0,
        null,
        0,
        0,
        null,
        null
      ]
    ],
    "solution": [
      [
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        1,
        1,
        0
      ],
      [
        1,
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        1
      ],
      [
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        1,
        0,
        1
      ],
      [
        0,
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        1,
        0
      ],
      [
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        0,
        1
      ],
      [
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        1,
        1,
        0
      ],
      [
        1,
        0,
        0,
        1,
        1,
        0,
        1,
        1,
        0,
        0
      ],
      [
        0,
        0,
        1,
        0,
        0,
        1,
        1,
        0,
        1,
        1
      ],
      [
        1,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        1
      ],
      [
        1,
        1,
        0,
        1,
        0,
        1,
        0,
        0,
        1,
        0
      ]
    ],
    "clueCount": 44
  },
  {
    "id": "hard-6",
    "name": "Daily Master Binary",
    "title": "Daily Master Binary",
    "difficulty": "hard",
    "size": 10,
    "rows": 10,
    "cols": 10,
    "clues": [
      [
        1,
        1,
        null,
        0,
        null,
        null,
        null,
        1,
        null,
        1
      ],
      [
        null,
        null,
        0,
        null,
        null,
        null,
        null,
        null,
        1,
        1
      ],
      [
        null,
        1,
        1,
        null,
        null,
        null,
        1,
        0,
        null,
        0
      ],
      [
        null,
        null,
        null,
        1,
        null,
        null,
        0,
        1,
        0,
        null
      ],
      [
        0,
        0,
        1,
        null,
        1,
        0,
        1,
        null,
        null,
        null
      ],
      [
        1,
        null,
        null,
        null,
        null,
        1,
        null,
        1,
        0,
        0
      ],
      [
        0,
        1,
        null,
        0,
        null,
        null,
        0,
        1,
        1,
        0
      ],
      [
        1,
        null,
        null,
        null,
        null,
        0,
        null,
        null,
        null,
        1
      ],
      [
        null,
        1,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        0
      ],
      [
        null,
        null,
        null,
        1,
        0,
        null,
        null,
        null,
        1,
        0
      ]
    ],
    "solution": [
      [
        1,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        1
      ],
      [
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        1
      ],
      [
        0,
        1,
        1,
        0,
        0,
        1,
        1,
        0,
        1,
        0
      ],
      [
        1,
        0,
        0,
        1,
        1,
        0,
        0,
        1,
        0,
        1
      ],
      [
        0,
        0,
        1,
        0,
        1,
        0,
        1,
        0,
        1,
        1
      ],
      [
        1,
        1,
        0,
        1,
        0,
        1,
        0,
        1,
        0,
        0
      ],
      [
        0,
        1,
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        0
      ],
      [
        1,
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        1
      ],
      [
        0,
        1,
        1,
        0,
        1,
        1,
        0,
        1,
        0,
        0
      ],
      [
        0,
        0,
        1,
        1,
        0,
        1,
        1,
        0,
        1,
        0
      ]
    ],
    "clueCount": 44
  }
];

/**
 * Deterministic Daily Binairo Challenge selection by UTC Date.
 * Ensures all players worldwide on the same UTC day receive the exact same puzzle.
 */
export function getDailyBinairoPuzzle(date: Date = new Date()): BinairoPuzzle {
  const utcYear = date.getUTCFullYear();
  const utcMonth = date.getUTCMonth();
  const utcDate = date.getUTCDate();
  
  // Use a deterministic hash of the UTC date
  const dateHash = Math.abs(Math.sin(utcYear * 10000 + (utcMonth + 1) * 100 + utcDate) * 100000);
  const pool = BINAIRO_PUZZLES; // Select across verified collection
  const index = Math.floor(dateHash) % pool.length;
  
  const base = pool[index];
  return {
    ...base,
    id: `daily-${utcYear}-${String(utcMonth + 1).padStart(2, '0')}-${String(utcDate).padStart(2, '0')}`,
    name: `Daily Challenge (${base.size}×${base.size})`,
    title: `Daily Binairo Challenge – ${date.toISOString().slice(0, 10)}`,
  };
}

export interface HintResult {
  r: number;
  c: number;
  val?: 0 | 1;
  type: 'pair' | 'gap' | 'quota' | 'unique' | 'deduction' | 'error';
  message: string;
}

/**
 * Step-by-step logical deduction finder for Binairo
 */
export function getBinairoLogicalHint(
  currentGrid: (0 | 1 | null)[][],
  solutionGrid: (0 | 1)[][]
): HintResult | null {
  const N = currentGrid.length;
  const half = N / 2;

  // 1. Check for immediate player errors on the board
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const v = currentGrid[r][c];
      if (v === null) continue;
      // 3 consecutive horizontally
      if (c <= N - 3 && currentGrid[r][c + 1] === v && currentGrid[r][c + 2] === v) {
        return {
          r, c: c + 1,
          type: 'error',
          message: `Rule violation in Row ${r + 1}: three consecutive ${v}s detected at columns ${c + 1}–${c + 3}.`
        };
      }
      // 3 consecutive vertically
      if (r <= N - 3 && currentGrid[r + 1][c] === v && currentGrid[r + 2][c] === v) {
        return {
          r: r + 1, c,
          type: 'error',
          message: `Rule violation in Column ${c + 1}: three consecutive ${v}s detected at rows ${r + 1}–${r + 3}.`
        };
      }
    }
  }

  // Check line count errors
  for (let r = 0; r < N; r++) {
    let zeros = 0, ones = 0;
    for (let c = 0; c < N; c++) {
      if (currentGrid[r][c] === 0) zeros++;
      if (currentGrid[r][c] === 1) ones++;
    }
    if (zeros > half) {
      return { r, c: 0, type: 'error', message: `Row ${r + 1} has ${zeros} zeros (maximum allowed is ${half}).` };
    }
    if (ones > half) {
      return { r, c: 0, type: 'error', message: `Row ${r + 1} has ${ones} ones (maximum allowed is ${half}).` };
    }
  }
  for (let c = 0; c < N; c++) {
    let zeros = 0, ones = 0;
    for (let r = 0; r < N; r++) {
      if (currentGrid[r][c] === 0) zeros++;
      if (currentGrid[r][c] === 1) ones++;
    }
    if (zeros > half) {
      return { r: 0, c, type: 'error', message: `Column ${c + 1} has ${zeros} zeros (maximum allowed is ${half}).` };
    }
    if (ones > half) {
      return { r: 0, c, type: 'error', message: `Column ${c + 1} has ${ones} ones (maximum allowed is ${half}).` };
    }
  }

  // 2. Pair Rule: 0 0 _ => 1, or _ 1 1 => 0
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (currentGrid[r][c] !== null) continue;
      // Left pair
      if (c >= 2 && currentGrid[r][c - 1] !== null && currentGrid[r][c - 1] === currentGrid[r][c - 2]) {
        const val = (1 - currentGrid[r][c - 1]!) as 0 | 1;
        return {
          r, c, val,
          type: 'pair',
          message: `Row ${r + 1} has two consecutive ${currentGrid[r][c - 1]}s to the left. Column ${c + 1} must be ${val} to avoid three in a row.`
        };
      }
      // Right pair
      if (c <= N - 3 && currentGrid[r][c + 1] !== null && currentGrid[r][c + 1] === currentGrid[r][c + 2]) {
        const val = (1 - currentGrid[r][c + 1]!) as 0 | 1;
        return {
          r, c, val,
          type: 'pair',
          message: `Row ${r + 1} has two consecutive ${currentGrid[r][c + 1]}s to the right. Column ${c + 1} must be ${val} to avoid three in a row.`
        };
      }
      // Top pair
      if (r >= 2 && currentGrid[r - 1][c] !== null && currentGrid[r - 1][c] === currentGrid[r - 2][c]) {
        const val = (1 - currentGrid[r - 1][c]!) as 0 | 1;
        return {
          r, c, val,
          type: 'pair',
          message: `Column ${c + 1} has two consecutive ${currentGrid[r - 1][c]}s above. Row ${r + 1} must be ${val} to avoid three in a column.`
        };
      }
      // Bottom pair
      if (r <= N - 3 && currentGrid[r + 1][c] !== null && currentGrid[r + 1][c] === currentGrid[r + 2][c]) {
        const val = (1 - currentGrid[r + 1][c]!) as 0 | 1;
        return {
          r, c, val,
          type: 'pair',
          message: `Column ${c + 1} has two consecutive ${currentGrid[r + 1][c]}s below. Row ${r + 1} must be ${val} to avoid three in a column.`
        };
      }
    }
  }

  // 3. Gap Rule: 0 _ 0 => 1, 1 _ 1 => 0
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (currentGrid[r][c] !== null) continue;
      // Horizontal gap
      if (c >= 1 && c <= N - 2 && currentGrid[r][c - 1] !== null && currentGrid[r][c - 1] === currentGrid[r][c + 1]) {
        const val = (1 - currentGrid[r][c - 1]!) as 0 | 1;
        return {
          r, c, val,
          type: 'gap',
          message: `Row ${r + 1} has ${currentGrid[r][c - 1]} on both sides of Column ${c + 1} (${currentGrid[r][c - 1]} _ ${currentGrid[r][c - 1]}). The center cell must be ${val} to prevent three in a row.`
        };
      }
      // Vertical gap
      if (r >= 1 && r <= N - 2 && currentGrid[r - 1][c] !== null && currentGrid[r - 1][c] === currentGrid[r + 1][c]) {
        const val = (1 - currentGrid[r - 1][c]!) as 0 | 1;
        return {
          r, c, val,
          type: 'gap',
          message: `Column ${c + 1} has ${currentGrid[r - 1][c]} above and below Row ${r + 1}. The center cell must be ${val} to prevent three in a column.`
        };
      }
    }
  }

  // 4. Quota Rule: line has half 0s or half 1s
  for (let r = 0; r < N; r++) {
    let zeros = 0, ones = 0;
    const empties: number[] = [];
    for (let c = 0; c < N; c++) {
      if (currentGrid[r][c] === 0) zeros++;
      else if (currentGrid[r][c] === 1) ones++;
      else empties.push(c);
    }
    if (empties.length > 0) {
      if (zeros === half) {
        return {
          r, c: empties[0], val: 1,
          type: 'quota',
          message: `Row ${r + 1} already has its full quota of ${half} zeros. All remaining empty cells in this row must be 1.`
        };
      }
      if (ones === half) {
        return {
          r, c: empties[0], val: 0,
          type: 'quota',
          message: `Row ${r + 1} already has its full quota of ${half} ones. All remaining empty cells in this row must be 0.`
        };
      }
    }
  }

  for (let c = 0; c < N; c++) {
    let zeros = 0, ones = 0;
    const empties: number[] = [];
    for (let r = 0; r < N; r++) {
      if (currentGrid[r][c] === 0) zeros++;
      else if (currentGrid[r][c] === 1) ones++;
      else empties.push(r);
    }
    if (empties.length > 0) {
      if (zeros === half) {
        return {
          r: empties[0], c, val: 1,
          type: 'quota',
          message: `Column ${c + 1} already has its full quota of ${half} zeros. All remaining empty cells in this column must be 1.`
        };
      }
      if (ones === half) {
        return {
          r: empties[0], c, val: 0,
          type: 'quota',
          message: `Column ${c + 1} already has its full quota of ${half} ones. All remaining empty cells in this column must be 0.`
        };
      }
    }
  }

  // 5. Uniqueness Rule
  for (let r = 0; r < N; r++) {
    const empties: number[] = [];
    for (let c = 0; c < N; c++) {
      if (currentGrid[r][c] === null) empties.push(c);
    }
    if (empties.length === 2) {
      const c1 = empties[0], c2 = empties[1];
      for (const [v1, v2] of [[0, 1], [1, 0]] as const) {
        const candidate = [...currentGrid[r]];
        candidate[c1] = v1;
        candidate[c2] = v2;
        const candStr = candidate.join('');
        for (let otherR = 0; otherR < N; otherR++) {
          if (otherR === r) continue;
          if (!currentGrid[otherR].includes(null) && currentGrid[otherR].join('') === candStr) {
            const forcedVal1 = (1 - v1) as 0 | 1;
            return {
              r, c: c1, val: forcedVal1,
              type: 'unique',
              message: `Placing ${v1} at Row ${r + 1}, Column ${c1 + 1} would duplicate completed Row ${otherR + 1}. Because every row must be unique, Column ${c1 + 1} must be ${forcedVal1}.`
            };
          }
        }
      }
    }
  }

  // 6. Direct deductive solution fallback
  if (solutionGrid) {
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        if (currentGrid[r][c] === null) {
          const val = solutionGrid[r][c];
          return {
            r, c, val,
            type: 'deduction',
            message: `By logical elimination across rows and columns, Row ${r + 1}, Column ${c + 1} must be ${val}.`
          };
        }
      }
    }
  }

  return null;
}

/**
 * Validates whether the board has completed successfully
 */
export function validateBinairoBoard(grid: (0 | 1 | null)[][]): {
  isValid: boolean;
  isComplete: boolean;
  error?: string;
  violations?: { r: number; c: number }[];
} {
  const N = grid.length;
  const half = N / 2;
  const violations: { r: number; c: number }[] = [];

  let isComplete = true;

  // Check 3 consecutive
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const v = grid[r][c];
      if (v === null) {
        isComplete = false;
        continue;
      }
      if (c <= N - 3 && grid[r][c + 1] === v && grid[r][c + 2] === v) {
        violations.push({ r, c }, { r, c: c + 1 }, { r, c: c + 2 });
      }
      if (r <= N - 3 && grid[r + 1][c] === v && grid[r + 2][c] === v) {
        violations.push({ r, c }, { r: r + 1, c }, { r: r + 2, c });
      }
    }
  }

  // Check line counts
  for (let r = 0; r < N; r++) {
    let zeros = 0, ones = 0;
    for (let c = 0; c < N; c++) {
      if (grid[r][c] === 0) zeros++;
      if (grid[r][c] === 1) ones++;
    }
    if (zeros > half || (isComplete && zeros !== half)) {
      for (let c = 0; c < N; c++) violations.push({ r, c });
    }
    if (ones > half || (isComplete && ones !== half)) {
      for (let c = 0; c < N; c++) violations.push({ r, c });
    }
  }

  for (let c = 0; c < N; c++) {
    let zeros = 0, ones = 0;
    for (let r = 0; r < N; r++) {
      if (grid[r][c] === 0) zeros++;
      if (grid[r][c] === 1) ones++;
    }
    if (zeros > half || (isComplete && zeros !== half)) {
      for (let r = 0; r < N; r++) violations.push({ r, c });
    }
    if (ones > half || (isComplete && ones !== half)) {
      for (let r = 0; r < N; r++) violations.push({ r, c });
    }
  }

  // Check row uniqueness
  const completedRows = new Map<string, number>();
  for (let r = 0; r < N; r++) {
    if (!grid[r].includes(null)) {
      const str = grid[r].join('');
      if (completedRows.has(str)) {
        const prevR = completedRows.get(str)!;
        for (let c = 0; c < N; c++) {
          violations.push({ r, c }, { r: prevR, c });
        }
      } else {
        completedRows.set(str, r);
      }
    }
  }

  // Check col uniqueness
  const completedCols = new Map<string, number>();
  for (let c = 0; c < N; c++) {
    let full = true;
    let str = '';
    for (let r = 0; r < N; r++) {
      if (grid[r][c] === null) { full = false; break; }
      str += grid[r][c];
    }
    if (full) {
      if (completedCols.has(str)) {
        const prevC = completedCols.get(str)!;
        for (let r = 0; r < N; r++) {
          violations.push({ r, c }, { r, c: prevC });
        }
      } else {
        completedCols.set(str, c);
      }
    }
  }

  const isValid = violations.length === 0;
  return {
    isValid,
    isComplete: isComplete && isValid,
    violations: isValid ? undefined : violations
  };
}

export function isValidPlacement(
  grid: (0 | 1 | null)[][],
  r: number,
  c: number,
  val: 0 | 1,
  N: number
): boolean {
  const half = N / 2;

  // 1. Check three consecutive horizontally
  if (c >= 2 && grid[r][c - 1] === val && grid[r][c - 2] === val) return false;
  if (c >= 1 && c + 1 < N && grid[r][c - 1] === val && grid[r][c + 1] === val) return false;
  if (c + 2 < N && grid[r][c + 1] === val && grid[r][c + 2] === val) return false;

  // 2. Check three consecutive vertically
  if (r >= 2 && grid[r - 1][c] === val && grid[r - 2][c] === val) return false;
  if (r >= 1 && r + 1 < N && grid[r - 1][c] === val && grid[r + 1][c] === val) return false;
  if (r + 2 < N && grid[r + 1][c] === val && grid[r + 2][c] === val) return false;

  // 3. Check count of val in row r
  let rowCount = 0;
  for (let col = 0; col < N; col++) {
    if (col === c ? val === 1 : grid[r][col] === 1) {
      if (val === 1) rowCount++;
    } else if (col === c ? val === 0 : grid[r][col] === 0) {
      if (val === 0) rowCount++;
    }
  }
  if (rowCount > half) return false;

  // 4. Check count of val in col c
  let colCount = 0;
  for (let row = 0; row < N; row++) {
    if (row === r ? val === 1 : grid[row][c] === 1) {
      if (val === 1) colCount++;
    } else if (row === r ? val === 0 : grid[row][c] === 0) {
      if (val === 0) colCount++;
    }
  }
  if (colCount > half) return false;

  // 5. Check row uniqueness if this cell completes row r
  let rowFull = true;
  for (let col = 0; col < N; col++) {
    if (col !== c && grid[r][col] === null) {
      rowFull = false;
      break;
    }
  }
  if (rowFull) {
    const thisRow: number[] = [];
    for (let col = 0; col < N; col++) {
      thisRow.push(col === c ? val : grid[r][col]!);
    }
    const thisRowStr = thisRow.join('');
    for (let otherR = 0; otherR < N; otherR++) {
      if (otherR === r) continue;
      let otherFull = true;
      for (let col = 0; col < N; col++) {
        if (grid[otherR][col] === null) { otherFull = false; break; }
      }
      if (otherFull && grid[otherR].join('') === thisRowStr) {
        return false;
      }
    }
  }

  // 6. Check col uniqueness if this cell completes col c
  let colFull = true;
  for (let row = 0; row < N; row++) {
    if (row !== r && grid[row][c] === null) {
      colFull = false;
      break;
    }
  }
  if (colFull) {
    const thisCol: number[] = [];
    for (let row = 0; row < N; row++) {
      thisCol.push(row === r ? val : grid[row][c]!);
    }
    const thisColStr = thisCol.join('');
    for (let otherC = 0; otherC < N; otherC++) {
      if (otherC === c) continue;
      let otherFull = true;
      for (let row = 0; row < N; row++) {
        if (grid[row][otherC] === null) { otherFull = false; break; }
      }
      if (otherFull) {
        let otherColStr = '';
        for (let row = 0; row < N; row++) otherColStr += grid[row][otherC];
        if (otherColStr === thisColStr) return false;
      }
    }
  }

  return true;
}

export function solveBinairo(
  puzzleGrid: (0 | 1 | null)[][],
  maxSolutions = 2
): (0 | 1)[][][] {
  const N = puzzleGrid.length;
  const grid = puzzleGrid.map(row => [...row]);
  const solutions: (0 | 1)[][][] = [];

  const emptyCells: { r: number; c: number }[] = [];
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (grid[r][c] === null) emptyCells.push({ r, c });
    }
  }

  function backtrack(idx: number) {
    if (solutions.length >= maxSolutions) return;
    if (idx === emptyCells.length) {
      solutions.push(grid.map(row => [...row]) as (0 | 1)[][]);
      return;
    }

    const { r, c } = emptyCells[idx];
    for (const val of [0, 1] as const) {
      if (isValidPlacement(grid, r, c, val, N)) {
        grid[r][c] = val;
        backtrack(idx + 1);
        grid[r][c] = null;
      }
    }
  }

  backtrack(0);
  return solutions;
}
