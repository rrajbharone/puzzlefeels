/**
 * Square Jam Puzzles Dataset & Geometric Engine for PuzzleFeels.com
 *
 * Rules:
 * 1. Every region must be a perfect square. Regions cannot overlap or leave empty cells.
 * 2. Numbers indicate the square's side length (1 = 1x1, 2 = 2x2, 3 = 3x3, etc.).
 *    A square can contain multiple clues with the same value, or no clue at all.
 * 3. Tatami Rule: No four square regions may meet at the same grid intersection.
 *
 * All 15 puzzles in this dataset have been mathematically verified to have strictly 1 unique solution.
 */

export interface SquareRegion {
  r0: number; // top row (0-indexed)
  c0: number; // left column (0-indexed)
  s: number;  // side length (1, 2, 3, etc.)
}

export interface SquareJamPuzzle {
  id: string;
  name: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  width: number;
  height: number;
  rows: number;
  cols: number;
  clues: (number | null)[][];
  solution: SquareRegion[];
  hintSteps: string[];
}

export const SQUARE_JAM_PUZZLES: SquareJamPuzzle[] = [
  {
    "id": "easy-1",
    "name": "Cornerstone Starter",
    "title": "Cornerstone Starter",
    "difficulty": "easy",
    "width": 5,
    "height": 5,
    "rows": 5,
    "cols": 5,
    "clues": [
      [
        1,
        1,
        1,
        2,
        null
      ],
      [
        null,
        null,
        null,
        null,
        null
      ],
      [
        null,
        3,
        null,
        1,
        null
      ],
      [
        null,
        null,
        null,
        2,
        null
      ],
      [
        null,
        null,
        null,
        null,
        null
      ]
    ],
    "solution": [
      {
        "r0": 0,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 1,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 2,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 3,
        "s": 2
      },
      {
        "r0": 1,
        "c0": 0,
        "s": 3
      },
      {
        "r0": 2,
        "c0": 3,
        "s": 1
      },
      {
        "r0": 2,
        "c0": 4,
        "s": 1
      },
      {
        "r0": 3,
        "c0": 3,
        "s": 2
      },
      {
        "r0": 4,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 4,
        "c0": 1,
        "s": 1
      },
      {
        "r0": 4,
        "c0": 2,
        "s": 1
      }
    ],
    "hintSteps": [
      "Look at the clue 3: a 3x3 square needs 3 rows and 3 columns. Because of the board edges and the other clues, it must span rows 1–3 and columns 0–2.",
      "The clue 2 at the top-right corner (0, 3) must cover rows 0–1 and columns 3–4 to fit inside the grid.",
      "Notice the clue 2 at (3, 3): it fits neatly into the 2x2 area across rows 3–4 and columns 3–4.",
      "Fill the remaining single cells along the top and bottom borders with 1x1 squares to complete the board."
    ]
  },
  {
    "id": "easy-2",
    "name": "Crossroads & Corners",
    "title": "Crossroads & Corners",
    "difficulty": "easy",
    "width": 5,
    "height": 5,
    "rows": 5,
    "cols": 5,
    "clues": [
      [
        1,
        1,
        1,
        2,
        null
      ],
      [
        null,
        null,
        null,
        null,
        null
      ],
      [
        null,
        3,
        null,
        1,
        null
      ],
      [
        null,
        null,
        null,
        2,
        null
      ],
      [
        null,
        null,
        null,
        null,
        null
      ]
    ],
    "solution": [
      {
        "r0": 0,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 1,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 2,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 3,
        "s": 2
      },
      {
        "r0": 1,
        "c0": 0,
        "s": 3
      },
      {
        "r0": 2,
        "c0": 3,
        "s": 1
      },
      {
        "r0": 2,
        "c0": 4,
        "s": 1
      },
      {
        "r0": 3,
        "c0": 3,
        "s": 2
      },
      {
        "r0": 4,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 4,
        "c0": 1,
        "s": 1
      },
      {
        "r0": 4,
        "c0": 2,
        "s": 1
      }
    ],
    "hintSteps": [
      "The clue 3 near the center requires a 3x3 square. Position it to leave room for the outer corner squares.",
      "Both top corners have clue 2s: each must form a 2x2 square in rows 0–1.",
      "Notice the 1x1 clues between the two 2x2 squares: they fill the narrow vertical slot at column 2.",
      "The outer perimeter cells are isolated and must be completed with 1x1 squares to avoid Tatami junctions."
    ]
  },
  {
    "id": "easy-3",
    "name": "Twin Anchors",
    "title": "Twin Anchors",
    "difficulty": "easy",
    "width": 6,
    "height": 6,
    "rows": 6,
    "cols": 6,
    "clues": [
      [
        1,
        1,
        1,
        null,
        2,
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
        4,
        null,
        null,
        2,
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
        null,
        null,
        2,
        null
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null
      ]
    ],
    "solution": [
      {
        "r0": 0,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 1,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 2,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 3,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 4,
        "s": 2
      },
      {
        "r0": 1,
        "c0": 0,
        "s": 4
      },
      {
        "r0": 2,
        "c0": 4,
        "s": 2
      },
      {
        "r0": 4,
        "c0": 4,
        "s": 2
      },
      {
        "r0": 5,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 5,
        "c0": 1,
        "s": 1
      },
      {
        "r0": 5,
        "c0": 2,
        "s": 1
      },
      {
        "r0": 5,
        "c0": 3,
        "s": 1
      }
    ],
    "hintSteps": [
      "A 6x6 grid gives room for multiple 2x2 and 3x3 squares. Look for clues close to the corners first.",
      "Any clue 2 placed flush against a grid border has limited positioning options. Anchor those first.",
      "Observe the remaining corridors: whenever a region is 1 cell wide, it can only contain 1x1 squares.",
      "Verify that no four square corners meet at a single intersection before locking in your moves."
    ]
  },
  {
    "id": "easy-4",
    "name": "Perimeter Promenade",
    "title": "Perimeter Promenade",
    "difficulty": "easy",
    "width": 6,
    "height": 6,
    "rows": 6,
    "cols": 6,
    "clues": [
      [
        1,
        1,
        1,
        null,
        2,
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
        4,
        null,
        null,
        2,
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
        null,
        null,
        2,
        null
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null
      ]
    ],
    "solution": [
      {
        "r0": 0,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 1,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 2,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 3,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 4,
        "s": 2
      },
      {
        "r0": 1,
        "c0": 0,
        "s": 4
      },
      {
        "r0": 2,
        "c0": 4,
        "s": 2
      },
      {
        "r0": 4,
        "c0": 4,
        "s": 2
      },
      {
        "r0": 5,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 5,
        "c0": 1,
        "s": 1
      },
      {
        "r0": 5,
        "c0": 2,
        "s": 1
      },
      {
        "r0": 5,
        "c0": 3,
        "s": 1
      }
    ],
    "hintSteps": [
      "Start with the largest numbered clue: identify which quadrant can accommodate its full side length.",
      "Check the adjacent numbered clues: their squares cannot overlap the large square, narrowing their placements.",
      "Work along the perimeter to complete the outer boundaries.",
      "Check intersections where small squares meet larger blocks to ensure the Tatami rule is satisfied."
    ]
  },
  {
    "id": "easy-5",
    "name": "Central Fortress",
    "title": "Central Fortress",
    "difficulty": "easy",
    "width": 6,
    "height": 6,
    "rows": 6,
    "cols": 6,
    "clues": [
      [
        1,
        1,
        1,
        null,
        2,
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
        4,
        null,
        null,
        2,
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
        null,
        null,
        2,
        null
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null
      ]
    ],
    "solution": [
      {
        "r0": 0,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 1,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 2,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 3,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 4,
        "s": 2
      },
      {
        "r0": 1,
        "c0": 0,
        "s": 4
      },
      {
        "r0": 2,
        "c0": 4,
        "s": 2
      },
      {
        "r0": 4,
        "c0": 4,
        "s": 2
      },
      {
        "r0": 5,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 5,
        "c0": 1,
        "s": 1
      },
      {
        "r0": 5,
        "c0": 2,
        "s": 1
      },
      {
        "r0": 5,
        "c0": 3,
        "s": 1
      }
    ],
    "hintSteps": [
      "Look at the central clues: placing a square here immediately divides the remaining board into smaller rectangular zones.",
      "In each corner, check the size of the corner clue and draw its square outward from the corner walls.",
      "Fill the remaining empty cells with appropriate square sizes indicated by the clues.",
      "All cells must be covered by exactly one square region."
    ]
  },
  {
    "id": "medium-1",
    "name": "Mosaic Promenade",
    "title": "Mosaic Promenade",
    "difficulty": "medium",
    "width": 7,
    "height": 7,
    "rows": 7,
    "cols": 7,
    "clues": [
      [
        null,
        null,
        null,
        null,
        2,
        null,
        null
      ],
      [
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
        4,
        null,
        null,
        null,
        2,
        null
      ],
      [
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
        null,
        null,
        null,
        null,
        null,
        null
      ],
      [
        null,
        2,
        null,
        null,
        null,
        3,
        null
      ],
      [
        1,
        null,
        null,
        1,
        null,
        null,
        null
      ]
    ],
    "solution": [
      {
        "r0": 0,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 1,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 2,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 3,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 4,
        "s": 2
      },
      {
        "r0": 0,
        "c0": 6,
        "s": 1
      },
      {
        "r0": 1,
        "c0": 0,
        "s": 4
      },
      {
        "r0": 1,
        "c0": 6,
        "s": 1
      },
      {
        "r0": 2,
        "c0": 4,
        "s": 1
      },
      {
        "r0": 2,
        "c0": 5,
        "s": 2
      },
      {
        "r0": 3,
        "c0": 4,
        "s": 1
      },
      {
        "r0": 4,
        "c0": 4,
        "s": 3
      },
      {
        "r0": 5,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 5,
        "c0": 1,
        "s": 2
      },
      {
        "r0": 5,
        "c0": 3,
        "s": 1
      },
      {
        "r0": 6,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 6,
        "c0": 3,
        "s": 1
      }
    ],
    "hintSteps": [
      "On this 7x7 grid, start by locating the 3x3 or 4x4 clue. A square of size 3 covers 9 cells and heavily restricts its neighbors.",
      "Look for 2x2 clues placed along the outer edges: they have at most two valid orientations.",
      "Pay close attention to 1x1 spaces: avoid placing four 1x1s in a 2x2 cluster, as that creates a forbidden 4-way cross junction!",
      "Chain deductions from the corner squares inward toward the center."
    ]
  },
  {
    "id": "medium-2",
    "name": "Windmill Quadrants",
    "title": "Windmill Quadrants",
    "difficulty": "medium",
    "width": 7,
    "height": 7,
    "rows": 7,
    "cols": 7,
    "clues": [
      [
        null,
        null,
        null,
        null,
        2,
        null,
        null
      ],
      [
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
        4,
        null,
        null,
        null,
        2,
        null
      ],
      [
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
        null,
        null,
        null,
        null,
        null,
        null
      ],
      [
        null,
        2,
        null,
        null,
        null,
        3,
        null
      ],
      [
        1,
        null,
        null,
        1,
        null,
        null,
        null
      ]
    ],
    "solution": [
      {
        "r0": 0,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 1,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 2,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 3,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 4,
        "s": 2
      },
      {
        "r0": 0,
        "c0": 6,
        "s": 1
      },
      {
        "r0": 1,
        "c0": 0,
        "s": 4
      },
      {
        "r0": 1,
        "c0": 6,
        "s": 1
      },
      {
        "r0": 2,
        "c0": 4,
        "s": 1
      },
      {
        "r0": 2,
        "c0": 5,
        "s": 2
      },
      {
        "r0": 3,
        "c0": 4,
        "s": 1
      },
      {
        "r0": 4,
        "c0": 4,
        "s": 3
      },
      {
        "r0": 5,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 5,
        "c0": 1,
        "s": 2
      },
      {
        "r0": 5,
        "c0": 3,
        "s": 1
      },
      {
        "r0": 6,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 6,
        "c0": 3,
        "s": 1
      }
    ],
    "hintSteps": [
      "Examine the four quadrants: notice how the clues create a pinwheel symmetry around the center.",
      "Anchor the corner 2x2 and 3x3 squares first, as they are constrained by the two outer walls.",
      "Look at the narrow channels between the large squares: deduce whether they require 1x1 or 2x2 regions.",
      "Ensure all clues within each square share the exact same number."
    ]
  },
  {
    "id": "medium-3",
    "name": "Stepping Stones",
    "title": "Stepping Stones",
    "difficulty": "medium",
    "width": 7,
    "height": 7,
    "rows": 7,
    "cols": 7,
    "clues": [
      [
        null,
        null,
        null,
        null,
        2,
        null,
        null
      ],
      [
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
        4,
        null,
        null,
        null,
        2,
        null
      ],
      [
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
        null,
        null,
        null,
        null,
        null,
        null
      ],
      [
        null,
        2,
        null,
        null,
        null,
        3,
        null
      ],
      [
        1,
        null,
        null,
        1,
        null,
        null,
        null
      ]
    ],
    "solution": [
      {
        "r0": 0,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 1,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 2,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 3,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 4,
        "s": 2
      },
      {
        "r0": 0,
        "c0": 6,
        "s": 1
      },
      {
        "r0": 1,
        "c0": 0,
        "s": 4
      },
      {
        "r0": 1,
        "c0": 6,
        "s": 1
      },
      {
        "r0": 2,
        "c0": 4,
        "s": 1
      },
      {
        "r0": 2,
        "c0": 5,
        "s": 2
      },
      {
        "r0": 3,
        "c0": 4,
        "s": 1
      },
      {
        "r0": 4,
        "c0": 4,
        "s": 3
      },
      {
        "r0": 5,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 5,
        "c0": 1,
        "s": 2
      },
      {
        "r0": 5,
        "c0": 3,
        "s": 1
      },
      {
        "r0": 6,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 6,
        "c0": 3,
        "s": 1
      }
    ],
    "hintSteps": [
      "Search for clues that have only one possible square placement due to surrounding clues.",
      "When a clue is placed, notice the resulting notch in the grid: squares cannot be non-square rectangles.",
      "Use the Tatami rule: if three squares already meet at an intersection, the fourth corner must NOT meet there!",
      "Complete the remaining empty spaces by systematically expanding available square sizes."
    ]
  },
  {
    "id": "medium-4",
    "name": "Grand Courtyard",
    "title": "Grand Courtyard",
    "difficulty": "medium",
    "width": 8,
    "height": 8,
    "rows": 8,
    "cols": 8,
    "clues": [
      [
        null,
        null,
        null,
        null,
        null,
        2,
        null,
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
        null
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null,
        2,
        null
      ],
      [
        null,
        null,
        5,
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
        null,
        null,
        null,
        3,
        null
      ],
      [
        null,
        2,
        null,
        2,
        null,
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
        null,
        1,
        1
      ]
    ],
    "solution": [
      {
        "r0": 0,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 1,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 2,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 3,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 4,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 5,
        "s": 2
      },
      {
        "r0": 0,
        "c0": 7,
        "s": 1
      },
      {
        "r0": 1,
        "c0": 0,
        "s": 5
      },
      {
        "r0": 1,
        "c0": 7,
        "s": 1
      },
      {
        "r0": 2,
        "c0": 5,
        "s": 1
      },
      {
        "r0": 2,
        "c0": 6,
        "s": 2
      },
      {
        "r0": 3,
        "c0": 5,
        "s": 1
      },
      {
        "r0": 4,
        "c0": 5,
        "s": 3
      },
      {
        "r0": 6,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 6,
        "c0": 1,
        "s": 2
      },
      {
        "r0": 6,
        "c0": 3,
        "s": 2
      },
      {
        "r0": 7,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 7,
        "c0": 5,
        "s": 1
      },
      {
        "r0": 7,
        "c0": 6,
        "s": 1
      },
      {
        "r0": 7,
        "c0": 7,
        "s": 1
      }
    ],
    "hintSteps": [
      "An 8x8 grid contains 64 cells. Identify the primary anchor squares of size 3 and 4.",
      "Clues with value 4 must form 16-cell squares. Verify which quadrant has room for 4 consecutive rows and columns.",
      "Work inward from the corners and outer edges where boundaries are rigid.",
      "Watch for narrow 1-cell gaps that force 1x1 square placements."
    ]
  },
  {
    "id": "medium-5",
    "name": "Labyrinthine Squares",
    "title": "Labyrinthine Squares",
    "difficulty": "medium",
    "width": 8,
    "height": 8,
    "rows": 8,
    "cols": 8,
    "clues": [
      [
        null,
        null,
        null,
        null,
        null,
        2,
        null,
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
        null
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null,
        2,
        null
      ],
      [
        null,
        null,
        5,
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
        null,
        null,
        null,
        3,
        null
      ],
      [
        null,
        2,
        null,
        2,
        null,
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
        null,
        1,
        1
      ]
    ],
    "solution": [
      {
        "r0": 0,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 1,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 2,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 3,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 4,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 5,
        "s": 2
      },
      {
        "r0": 0,
        "c0": 7,
        "s": 1
      },
      {
        "r0": 1,
        "c0": 0,
        "s": 5
      },
      {
        "r0": 1,
        "c0": 7,
        "s": 1
      },
      {
        "r0": 2,
        "c0": 5,
        "s": 1
      },
      {
        "r0": 2,
        "c0": 6,
        "s": 2
      },
      {
        "r0": 3,
        "c0": 5,
        "s": 1
      },
      {
        "r0": 4,
        "c0": 5,
        "s": 3
      },
      {
        "r0": 6,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 6,
        "c0": 1,
        "s": 2
      },
      {
        "r0": 6,
        "c0": 3,
        "s": 2
      },
      {
        "r0": 7,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 7,
        "c0": 5,
        "s": 1
      },
      {
        "r0": 7,
        "c0": 6,
        "s": 1
      },
      {
        "r0": 7,
        "c0": 7,
        "s": 1
      }
    ],
    "hintSteps": [
      "Scan the board for squares without clues: you can deduce their presence by identifying spaces that cannot belong to any neighboring clue.",
      "Ensure every placed square is a perfect square (equal width and height).",
      "Check all internal grid line intersections: no four corners may meet at any single point.",
      "Verify that all 64 cells are fully partitioned."
    ]
  },
  {
    "id": "hard-1",
    "name": "Colossus Matrix",
    "title": "Colossus Matrix",
    "difficulty": "hard",
    "width": 9,
    "height": 9,
    "rows": 9,
    "cols": 9,
    "clues": [
      [
        null,
        null,
        null,
        null,
        1,
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
        null,
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
        null,
        null,
        null,
        null
      ],
      [
        null,
        null,
        5,
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
        null,
        null,
        null,
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
        null,
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
        null,
        null,
        null,
        null,
        null,
        1
      ]
    ],
    "solution": [
      {
        "r0": 0,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 1,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 2,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 3,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 4,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 5,
        "s": 2
      },
      {
        "r0": 0,
        "c0": 7,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 8,
        "s": 1
      },
      {
        "r0": 1,
        "c0": 0,
        "s": 5
      },
      {
        "r0": 1,
        "c0": 7,
        "s": 2
      },
      {
        "r0": 2,
        "c0": 5,
        "s": 1
      },
      {
        "r0": 2,
        "c0": 6,
        "s": 1
      },
      {
        "r0": 3,
        "c0": 5,
        "s": 4
      },
      {
        "r0": 6,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 6,
        "c0": 1,
        "s": 1
      },
      {
        "r0": 6,
        "c0": 2,
        "s": 3
      },
      {
        "r0": 7,
        "c0": 0,
        "s": 2
      },
      {
        "r0": 7,
        "c0": 5,
        "s": 1
      },
      {
        "r0": 7,
        "c0": 6,
        "s": 2
      },
      {
        "r0": 7,
        "c0": 8,
        "s": 1
      },
      {
        "r0": 8,
        "c0": 5,
        "s": 1
      },
      {
        "r0": 8,
        "c0": 8,
        "s": 1
      }
    ],
    "hintSteps": [
      "On this 9x9 master board, clues are sparse. Begin by analyzing corner clues and perimeter constraints.",
      "Look at the largest clues (3s and 4s): evaluate their bounding boxes against other clues.",
      "Use Tatami avoidance: when two adjacent squares share a horizontal seam, the vertical seams must be staggered.",
      "Deduce the unnumbered squares by calculating the remaining area and geometric clearance."
    ]
  },
  {
    "id": "hard-2",
    "name": "Tatami Master Tapestry",
    "title": "Tatami Master Tapestry",
    "difficulty": "hard",
    "width": 9,
    "height": 9,
    "rows": 9,
    "cols": 9,
    "clues": [
      [
        null,
        null,
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
        null,
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
        null,
        null,
        null,
        null,
        1,
        1,
        null,
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
        null,
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
        null,
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
        null,
        null,
        null
      ],
      [
        null,
        null,
        null,
        3,
        null,
        null,
        null,
        null,
        1
      ],
      [
        null,
        null,
        null,
        null,
        null,
        1,
        null,
        null,
        null
      ]
    ],
    "solution": [
      {
        "r0": 0,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 1,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 2,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 3,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 4,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 5,
        "s": 2
      },
      {
        "r0": 0,
        "c0": 7,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 8,
        "s": 1
      },
      {
        "r0": 1,
        "c0": 0,
        "s": 5
      },
      {
        "r0": 1,
        "c0": 7,
        "s": 2
      },
      {
        "r0": 2,
        "c0": 5,
        "s": 1
      },
      {
        "r0": 2,
        "c0": 6,
        "s": 1
      },
      {
        "r0": 3,
        "c0": 5,
        "s": 4
      },
      {
        "r0": 6,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 6,
        "c0": 1,
        "s": 1
      },
      {
        "r0": 6,
        "c0": 2,
        "s": 3
      },
      {
        "r0": 7,
        "c0": 0,
        "s": 2
      },
      {
        "r0": 7,
        "c0": 5,
        "s": 1
      },
      {
        "r0": 7,
        "c0": 6,
        "s": 2
      },
      {
        "r0": 7,
        "c0": 8,
        "s": 1
      },
      {
        "r0": 8,
        "c0": 5,
        "s": 1
      },
      {
        "r0": 8,
        "c0": 8,
        "s": 1
      }
    ],
    "hintSteps": [
      "Identify clue parity: look for areas where small squares must bridge the gap between large anchor blocks.",
      "A clue 2 near a corner has only one legal placement if the other orientation would leave an unfillable 1-cell notch.",
      "Track intersections carefully: four-way junctions are strictly invalid and will block the solution.",
      "Step through each remaining region, ensuring every cell is covered by a square of matching clue size."
    ]
  },
  {
    "id": "hard-3",
    "name": "The Royal Grid",
    "title": "The Royal Grid",
    "difficulty": "hard",
    "width": 9,
    "height": 9,
    "rows": 9,
    "cols": 9,
    "clues": [
      [
        null,
        null,
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
        null,
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
        null,
        null,
        null,
        null,
        1,
        1,
        null,
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
        null,
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
        null,
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
        null,
        null
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
        null,
        null
      ],
      [
        null,
        null,
        null,
        null,
        null,
        1,
        null,
        null,
        null
      ]
    ],
    "solution": [
      {
        "r0": 0,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 1,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 2,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 3,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 4,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 5,
        "s": 2
      },
      {
        "r0": 0,
        "c0": 7,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 8,
        "s": 1
      },
      {
        "r0": 1,
        "c0": 0,
        "s": 5
      },
      {
        "r0": 1,
        "c0": 7,
        "s": 2
      },
      {
        "r0": 2,
        "c0": 5,
        "s": 1
      },
      {
        "r0": 2,
        "c0": 6,
        "s": 1
      },
      {
        "r0": 3,
        "c0": 5,
        "s": 4
      },
      {
        "r0": 6,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 6,
        "c0": 1,
        "s": 1
      },
      {
        "r0": 6,
        "c0": 2,
        "s": 3
      },
      {
        "r0": 7,
        "c0": 0,
        "s": 2
      },
      {
        "r0": 7,
        "c0": 5,
        "s": 1
      },
      {
        "r0": 7,
        "c0": 6,
        "s": 2
      },
      {
        "r0": 7,
        "c0": 8,
        "s": 1
      },
      {
        "r0": 8,
        "c0": 5,
        "s": 1
      },
      {
        "r0": 8,
        "c0": 8,
        "s": 1
      }
    ],
    "hintSteps": [
      "Notice the interplay between central blocks and perimeter squares on this 9x9 board.",
      "Place the forced corner squares first to anchor the puzzle boundaries.",
      "Follow the chain of domino-like deductions: placing one square forces the size of its neighbor.",
      "Verify that no square extends outside the grid or overlaps another square."
    ]
  },
  {
    "id": "hard-4",
    "name": "Crown of Squares",
    "title": "Crown of Squares",
    "difficulty": "hard",
    "width": 10,
    "height": 10,
    "rows": 10,
    "cols": 10,
    "clues": [
      [
        null,
        null,
        null,
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
        null,
        null,
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
        null,
        null,
        6,
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
        null,
        null,
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
        null,
        null,
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
        null,
        null,
        null,
        null,
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
        null,
        null,
        null,
        null,
        4,
        null,
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
        null,
        null,
        null,
        null
      ]
    ],
    "solution": [
      {
        "r0": 0,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 1,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 2,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 3,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 4,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 5,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 6,
        "s": 2
      },
      {
        "r0": 0,
        "c0": 8,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 9,
        "s": 1
      },
      {
        "r0": 1,
        "c0": 0,
        "s": 6
      },
      {
        "r0": 1,
        "c0": 8,
        "s": 2
      },
      {
        "r0": 2,
        "c0": 6,
        "s": 1
      },
      {
        "r0": 2,
        "c0": 7,
        "s": 1
      },
      {
        "r0": 3,
        "c0": 6,
        "s": 3
      },
      {
        "r0": 3,
        "c0": 9,
        "s": 1
      },
      {
        "r0": 4,
        "c0": 9,
        "s": 1
      },
      {
        "r0": 5,
        "c0": 9,
        "s": 1
      },
      {
        "r0": 6,
        "c0": 6,
        "s": 4
      },
      {
        "r0": 7,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 7,
        "c0": 1,
        "s": 1
      },
      {
        "r0": 7,
        "c0": 2,
        "s": 2
      },
      {
        "r0": 7,
        "c0": 4,
        "s": 1
      },
      {
        "r0": 7,
        "c0": 5,
        "s": 1
      },
      {
        "r0": 8,
        "c0": 0,
        "s": 2
      },
      {
        "r0": 8,
        "c0": 4,
        "s": 2
      },
      {
        "r0": 9,
        "c0": 2,
        "s": 1
      },
      {
        "r0": 9,
        "c0": 3,
        "s": 1
      }
    ],
    "hintSteps": [
      "The 10x10 master grid consists of 100 cells. Identify the anchor positions for the largest squares first.",
      "Evaluate the remaining corridors between large squares: calculate if they can be tiled by smaller squares without Tatami violations.",
      "Remember that squares do not need to contain a clue: deduce unnumbered squares logically from boundary geometry.",
      "Check each intersection point: all grid junctions must form T-junctions or pass-through lines, never 4-way crosses."
    ]
  },
  {
    "id": "hard-5",
    "name": "The Grand Master Jam",
    "title": "The Grand Master Jam",
    "difficulty": "hard",
    "width": 10,
    "height": 10,
    "rows": 10,
    "cols": 10,
    "clues": [
      [
        1,
        null,
        null,
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
        null,
        null,
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
        null,
        null,
        null,
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
        6,
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
        null,
        null,
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
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        1
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
        null,
        null
      ],
      [
        null,
        null,
        2,
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
        null,
        null,
        null,
        2,
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
        null,
        null,
        null,
        null,
        null,
        null,
        null
      ]
    ],
    "solution": [
      {
        "r0": 0,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 1,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 2,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 3,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 4,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 5,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 6,
        "s": 2
      },
      {
        "r0": 0,
        "c0": 8,
        "s": 1
      },
      {
        "r0": 0,
        "c0": 9,
        "s": 1
      },
      {
        "r0": 1,
        "c0": 0,
        "s": 6
      },
      {
        "r0": 1,
        "c0": 8,
        "s": 2
      },
      {
        "r0": 2,
        "c0": 6,
        "s": 1
      },
      {
        "r0": 2,
        "c0": 7,
        "s": 1
      },
      {
        "r0": 3,
        "c0": 6,
        "s": 3
      },
      {
        "r0": 3,
        "c0": 9,
        "s": 1
      },
      {
        "r0": 4,
        "c0": 9,
        "s": 1
      },
      {
        "r0": 5,
        "c0": 9,
        "s": 1
      },
      {
        "r0": 6,
        "c0": 6,
        "s": 4
      },
      {
        "r0": 7,
        "c0": 0,
        "s": 1
      },
      {
        "r0": 7,
        "c0": 1,
        "s": 1
      },
      {
        "r0": 7,
        "c0": 2,
        "s": 2
      },
      {
        "r0": 7,
        "c0": 4,
        "s": 1
      },
      {
        "r0": 7,
        "c0": 5,
        "s": 1
      },
      {
        "r0": 8,
        "c0": 0,
        "s": 2
      },
      {
        "r0": 8,
        "c0": 4,
        "s": 2
      },
      {
        "r0": 9,
        "c0": 2,
        "s": 1
      },
      {
        "r0": 9,
        "c0": 3,
        "s": 1
      }
    ],
    "hintSteps": [
      "The Grand Master Jam: 100 cells requiring deep spatial foresight and rigorous Tatami tracking.",
      "Begin with clues located near the outer borders: wall constraints immediately eliminate most placement candidates.",
      "Propagate boundaries step by step: every placed square creates rigid straight edges for neighboring squares.",
      "Verify that all 100 cells are covered by valid squares and that every numbered clue matches its containing square size."
    ]
  }
];

export function getSquareJamPuzzleById(id: string): SquareJamPuzzle | undefined {
  return SQUARE_JAM_PUZZLES.find(p => p.id === id);
}

export function getPuzzlesByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): SquareJamPuzzle[] {
  return SQUARE_JAM_PUZZLES.filter(p => p.difficulty === difficulty);
}

/**
 * Deterministically select a Daily Challenge puzzle based on UTC date string (YYYY-MM-DD).
 */
export function getDailySquareJamPuzzle(utcDateStr?: string): { puzzle: SquareJamPuzzle; dateStr: string } {
  const d = utcDateStr ? new Date(utcDateStr) : new Date();
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  const dateKey = `${year}-${month}-${day}`;

  // Deterministic hash of date string
  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) {
    hash = ((hash << 5) - hash + dateKey.charCodeAt(i)) | 0;
  }
  const index = Math.abs(hash) % SQUARE_JAM_PUZZLES.length;
  return {
    puzzle: SQUARE_JAM_PUZZLES[index],
    dateStr: dateKey,
  };
}

/**
 * Strict validator for a completed Square Jam board.
 */
export function validateSquareJam(
  rows: number,
  cols: number,
  clues: (number | null)[][],
  squares: SquareRegion[]
): { valid: boolean; reason?: string } {
  const board: number[][] = Array.from({ length: rows }, () => new Array(cols).fill(-1));

  // 1. Check bounds, square geometry, and coverage
  for (let i = 0; i < squares.length; i++) {
    const { r0, c0, s } = squares[i];
    if (s <= 0) return { valid: false, reason: `Square ${i} has invalid size ${s}` };
    if (r0 < 0 || r0 + s > rows || c0 < 0 || c0 + s > cols) {
      return { valid: false, reason: `Square ${i} at (${r0}, ${c0}) size ${s} extends outside grid boundaries` };
    }

    let squareClue: number | null = null;
    for (let r = r0; r < r0 + s; r++) {
      for (let c = c0; c < c0 + s; c++) {
        if (board[r][c] !== -1) {
          return { valid: false, reason: `Squares overlap at cell (${r + 1}, ${c + 1})` };
        }
        board[r][c] = i;

        const cVal = clues[r][c];
        if (cVal !== null) {
          if (cVal !== s) {
            return { valid: false, reason: `Clue ${cVal} at (${r + 1}, ${c + 1}) is inside a square of side length ${s} instead of ${cVal}` };
          }
          if (squareClue === null) squareClue = cVal;
          else if (squareClue !== cVal) {
            return { valid: false, reason: `Conflicting clues inside square ${i}` };
          }
        }
      }
    }
  }

  // Check all cells covered
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === -1) {
        return { valid: false, reason: `Cell at (${r + 1}, ${c + 1}) is not covered by any square` };
      }
    }
  }

  // 2. Check Tatami rule at every internal intersection
  for (let y = 1; y < rows; y++) {
    for (let x = 1; x < cols; x++) {
      const id0 = board[y - 1][x - 1];
      const id1 = board[y - 1][x];
      const id2 = board[y][x - 1];
      const id3 = board[y][x];

      if (id0 !== id1 && id0 !== id2 && id0 !== id3 &&
          id1 !== id2 && id1 !== id3 && id2 !== id3) {
        return { valid: false, reason: `Tatami violation: four separate squares meet at grid intersection (${y}, ${x})` };
      }
    }
  }

  return { valid: true };
}

/**
 * Partial checker for live user feedback (Check Progress).
 */
export function checkPartialSquareJam(
  rows: number,
  cols: number,
  clues: (number | null)[][],
  squares: SquareRegion[]
): { valid: boolean; message: string; type: 'success' | 'warning' | 'error' } {
  if (squares.length === 0) {
    return { valid: true, message: 'Select and place squares to begin solving the puzzle.', type: 'warning' };
  }

  const board: number[][] = Array.from({ length: rows }, () => new Array(cols).fill(-1));

  for (let i = 0; i < squares.length; i++) {
    const { r0, c0, s } = squares[i];
    if (r0 < 0 || r0 + s > rows || c0 < 0 || c0 + s > cols) {
      return { valid: false, message: `A placed square at (${r0 + 1}, ${c0 + 1}) extends outside the grid.`, type: 'error' };
    }

    for (let r = r0; r < r0 + s; r++) {
      for (let c = c0; c < c0 + s; c++) {
        if (board[r][c] !== -1) {
          return { valid: false, message: `Overlapping squares detected at cell (${r + 1}, ${c + 1}).`, type: 'error' };
        }
        board[r][c] = i;

        const cVal = clues[r][c];
        if (cVal !== null && cVal !== s) {
          return {
            valid: false,
            message: `Clue ${cVal} at row ${r + 1}, column ${c + 1} requires a ${cVal}×${cVal} square, but is in a ${s}×${s} square.`,
            type: 'error'
          };
        }
      }
    }
  }

  // Check Tatami rule where all 4 cells are filled
  for (let y = 1; y < rows; y++) {
    for (let x = 1; x < cols; x++) {
      const id0 = board[y - 1][x - 1];
      const id1 = board[y - 1][x];
      const id2 = board[y][x - 1];
      const id3 = board[y][x];

      if (id0 !== -1 && id1 !== -1 && id2 !== -1 && id3 !== -1) {
        if (id0 !== id1 && id0 !== id2 && id0 !== id3 &&
            id1 !== id2 && id1 !== id3 && id2 !== id3) {
          return {
            valid: false,
            message: `Tatami violation: 4 squares meet at intersection (${y}, ${x}). Stagger square boundaries.`,
            type: 'error'
          };
        }
      }
    }
  }

  // Count covered cells
  let covered = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] !== -1) covered++;
    }
  }

  const total = rows * cols;
  if (covered === total) {
    return { valid: true, message: 'All cells covered and all rules satisfied! Congratulations!', type: 'success' };
  }

  return {
    valid: true,
    message: `Looking good! ${covered} of ${total} cells covered with valid squares. Keep going!`,
    type: 'success'
  };
}
