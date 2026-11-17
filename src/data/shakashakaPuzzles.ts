/**
 * Shakashaka Puzzles Dataset for PuzzleFeels.com
 * Every puzzle and solution in this dataset has been verified using the Shakashaka geometric validation engine.
 */

export const TRIANGLE = {
  NONE: 0,
  TL: 1, // ◤ (black triangle at top-left)
  TR: 2, // ◥ (black triangle at top-right)
  BR: 3, // ◢ (black triangle at bottom-right)
  BL: 4, // ◣ (black triangle at bottom-left)
} as const;

export type TriangleType = typeof TRIANGLE[keyof typeof TRIANGLE];

export interface ShakashakaPuzzle {
  id: string;
  name: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  width: number;
  height: number;
  rows: number;
  cols: number;
  clues: (number | null)[][]; // null = white cell, -1 = unnumbered black, 0..4 = numbered clue
  initialGrid: number[][]; // white = 0, unnumbered black = -1, clue k = -k - 2
  solution: TriangleType[][];
  hintSteps: string[];
}

const RAW_SHAKASHAKA_PUZZLES = [
  {
    "id": "easy-1",
    "name": "Diamond Starter",
    "difficulty": "easy",
    "width": 5,
    "height": 5,
    "clues": [
      [
        null,
        1,
        1,
        0,
        null
      ],
      [
        1,
        null,
        null,
        1,
        null
      ],
      [
        1,
        null,
        null,
        1,
        null
      ],
      [
        0,
        1,
        1,
        0,
        null
      ],
      [
        null,
        null,
        null,
        0,
        null
      ]
    ],
    "solution": [
      [
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        1,
        2,
        0,
        0
      ],
      [
        0,
        4,
        3,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0
      ]
    ],
    "hintSteps": [
      "Observe the clue 0 cells: no adjacent triangle can touch their flat edges.",
      "The clue 1 cells in the center surround the 2x2 area, pointing inward.",
      "Place the 4 triangles in the central 2x2 grid (TL, TR, BL, BR) to form a complete 45-degree diamond.",
      "All remaining white areas at the edges form clean 1x1, 1x3, and 2x1 rectangles."
    ]
  },
  {
    "id": "easy-2",
    "name": "Corner Gems",
    "difficulty": "easy",
    "width": 5,
    "height": 5,
    "clues": [
      [
        null,
        null,
        1,
        null,
        null
      ],
      [
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
        1
      ],
      [
        null,
        null,
        1,
        null,
        null
      ],
      [
        null,
        null,
        1,
        null,
        null
      ]
    ],
    "solution": [
      [
        1,
        2,
        0,
        0,
        0
      ],
      [
        4,
        3,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        2
      ],
      [
        0,
        0,
        0,
        4,
        3
      ]
    ],
    "hintSteps": [
      "The top-left 2x2 grid forms a diamond using TL, TR, BL, BR triangles.",
      "The bottom-right 2x2 grid also forms a diamond using TL, TR, BL, BR triangles.",
      "Center cell (2,2) is a single 1x1 white square surrounded by black clue cells.",
      "Top-right and bottom-left areas form 2x2 and 2x2 rectangles."
    ]
  },
  {
    "id": "easy-3",
    "name": "Twin Blocks",
    "difficulty": "easy",
    "width": 6,
    "height": 6,
    "clues": [
      [
        null,
        null,
        null,
        0,
        null,
        null
      ],
      [
        1,
        null,
        null,
        1,
        null,
        null
      ],
      [
        1,
        null,
        null,
        2,
        null,
        null
      ],
      [
        null,
        null,
        2,
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
        1
      ],
      [
        null,
        null,
        0,
        null,
        null,
        null
      ]
    ],
    "solution": [
      [
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        1,
        2,
        0,
        0,
        0
      ],
      [
        0,
        4,
        3,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        2,
        0
      ],
      [
        0,
        0,
        0,
        4,
        3,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0
      ]
    ],
    "hintSteps": [
      "Clues with 0 tell you that surrounding orthogonal cells must leave those edges empty.",
      "Two separate 2x2 diamonds are located diagonally across the board.",
      "The surrounding white spaces form neat rectangular borders along the perimeter."
    ]
  },
  {
    "id": "easy-4",
    "name": "Crossroads",
    "difficulty": "easy",
    "width": 6,
    "height": 6,
    "clues": [
      [
        null,
        null,
        0,
        0,
        null,
        null
      ],
      [
        null,
        null,
        1,
        1,
        null,
        null
      ],
      [
        0,
        1,
        null,
        null,
        1,
        0
      ],
      [
        0,
        1,
        null,
        null,
        1,
        0
      ],
      [
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
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        1,
        2,
        0,
        0
      ],
      [
        0,
        0,
        4,
        3,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0
      ]
    ],
    "hintSteps": [
      "Check the center 2x2 diamond: triangles face inward to satisfy the central clue cells.",
      "Each of the four corners hosts a clean 2x2 white square.",
      "Black cells along the crosshairs provide clear orthogonal constraints."
    ]
  },
  {
    "id": "easy-5",
    "name": "First Quilt",
    "difficulty": "easy",
    "width": 6,
    "height": 6,
    "clues": [
      [
        0,
        1,
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
        null
      ],
      [
        1,
        null,
        null,
        2,
        1,
        0
      ],
      [
        0,
        1,
        2,
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
        1
      ],
      [
        null,
        null,
        null,
        1,
        1,
        0
      ]
    ],
    "solution": [
      [
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        1,
        2,
        0,
        0,
        0
      ],
      [
        0,
        4,
        3,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        2,
        0
      ],
      [
        0,
        0,
        0,
        4,
        3,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0
      ]
    ],
    "hintSteps": [
      "Start by locating the two offset 2x2 diamonds.",
      "Verify the clue counts for each numbered black cell.",
      "The top-right and bottom-left rectangles form 2x3 white zones."
    ]
  },
  {
    "id": "medium-1",
    "name": "Mosaic Lattice",
    "difficulty": "medium",
    "width": 7,
    "height": 7,
    "clues": [
      [
        null,
        null,
        1,
        null,
        0,
        null,
        null
      ],
      [
        0,
        2,
        null,
        null,
        2,
        0,
        0
      ],
      [
        1,
        null,
        null,
        null,
        null,
        1,
        0
      ],
      [
        1,
        null,
        null,
        null,
        null,
        1,
        0
      ],
      [
        0,
        2,
        null,
        null,
        2,
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
        0
      ],
      [
        null,
        null,
        0,
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
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        1,
        2,
        0,
        0,
        0
      ],
      [
        0,
        1,
        0,
        0,
        2,
        0,
        0
      ],
      [
        0,
        4,
        0,
        0,
        3,
        0,
        0
      ],
      [
        0,
        0,
        4,
        3,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ]
    ],
    "hintSteps": [
      "This puzzle features a grand 4x4 diamond tilted at 45 degrees in the center.",
      "Notice the 8 triangles along its perimeter: 2 on each side forming the tilted boundary.",
      "The 2x2 center of the diamond is completely empty white space.",
      "The corners form clean symmetrical 1x2 rectangles."
    ]
  },
  {
    "id": "medium-2",
    "name": "Four Corners",
    "difficulty": "medium",
    "width": 7,
    "height": 7,
    "clues": [
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
        1,
        null,
        null,
        2,
        null,
        null,
        1
      ],
      [
        1,
        null,
        null,
        2,
        null,
        null,
        1
      ],
      [
        0,
        2,
        2,
        null,
        2,
        2,
        0
      ],
      [
        1,
        null,
        null,
        2,
        null,
        null,
        1
      ],
      [
        1,
        null,
        null,
        2,
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
        null
      ]
    ],
    "solution": [
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        1,
        2,
        0,
        1,
        2,
        0
      ],
      [
        0,
        4,
        3,
        0,
        4,
        3,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        1,
        2,
        0,
        1,
        2,
        0
      ],
      [
        0,
        4,
        3,
        0,
        4,
        3,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ]
    ],
    "hintSteps": [
      "Four distinct 2x2 diamonds occupy the four quadrants.",
      "The exact center cell (3,3) is a 1x1 white square.",
      "Top and bottom rows form elongated 1x7 horizontal white rectangles."
    ]
  },
  {
    "id": "medium-3",
    "name": "Windmill Pinwheel",
    "difficulty": "medium",
    "width": 8,
    "height": 8,
    "clues": [
      [
        0,
        1,
        null,
        null,
        null,
        null,
        1,
        0
      ],
      [
        1,
        null,
        null,
        1,
        1,
        null,
        null,
        1
      ],
      [
        null,
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
        1,
        1,
        null,
        null,
        1,
        1,
        null
      ],
      [
        null,
        1,
        1,
        null,
        null,
        1,
        1,
        null
      ],
      [
        null,
        null,
        null,
        1,
        1,
        null,
        null,
        null
      ],
      [
        1,
        null,
        null,
        1,
        1,
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
        null,
        1,
        0
      ]
    ],
    "solution": [
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        1,
        2,
        0,
        0,
        1,
        2,
        0
      ],
      [
        0,
        4,
        3,
        0,
        0,
        4,
        3,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        1,
        2,
        0,
        0,
        1,
        2,
        0
      ],
      [
        0,
        4,
        3,
        0,
        0,
        4,
        3,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ]
    ],
    "hintSteps": [
      "Four 2x2 diamonds are positioned like the blades of a windmill.",
      "The center features a 2x2 white square surrounded by black clue blocks.",
      "Each outer edge hosts a 1x4 white rectangle."
    ]
  },
  {
    "id": "medium-4",
    "name": "Grand Diamond",
    "difficulty": "medium",
    "width": 8,
    "height": 8,
    "clues": [
      [
        null,
        null,
        1,
        0,
        null,
        null,
        null,
        null
      ],
      [
        null,
        null,
        1,
        1,
        null,
        null,
        null,
        null
      ],
      [
        1,
        1,
        2,
        null,
        null,
        2,
        0,
        0
      ],
      [
        0,
        1,
        null,
        null,
        null,
        null,
        1,
        0
      ],
      [
        0,
        1,
        null,
        null,
        null,
        null,
        1,
        0
      ],
      [
        0,
        0,
        2,
        null,
        null,
        2,
        1,
        1
      ],
      [
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
        0,
        1,
        null,
        null
      ]
    ],
    "solution": [
      [
        1,
        2,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        4,
        3,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        2,
        0,
        0,
        0
      ],
      [
        0,
        0,
        1,
        0,
        0,
        2,
        0,
        0
      ],
      [
        0,
        0,
        4,
        0,
        0,
        3,
        0,
        0
      ],
      [
        0,
        0,
        0,
        4,
        3,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        2
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        4,
        3
      ]
    ],
    "hintSteps": [
      "Look for the large 4x4 tilted diamond in the middle of the board.",
      "Two smaller 2x2 diamonds anchor the top-left and bottom-right corners.",
      "The remaining spaces form generous 2x4 white rectangular fields."
    ]
  },
  {
    "id": "medium-5",
    "name": "Chevron Promenade",
    "difficulty": "medium",
    "width": 8,
    "height": 8,
    "clues": [
      [
        null,
        0,
        1,
        1,
        0,
        null,
        null,
        null
      ],
      [
        null,
        1,
        null,
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
        null,
        2,
        null,
        null,
        null
      ],
      [
        0,
        0,
        1,
        2,
        null,
        null,
        1,
        0
      ],
      [
        0,
        0,
        1,
        2,
        null,
        null,
        1,
        0
      ],
      [
        null,
        null,
        null,
        null,
        2,
        1,
        0,
        null
      ],
      [
        null,
        null,
        null,
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
        1,
        0,
        0,
        0,
        null
      ]
    ],
    "solution": [
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        1,
        2,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        4,
        3,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        1,
        2,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        4,
        3,
        0,
        0
      ],
      [
        0,
        0,
        1,
        2,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        4,
        3,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ]
    ],
    "hintSteps": [
      "Notice the three 2x2 diamonds arranged in a zigzag staircase pattern.",
      "Clues on the black cells guide which sides are bounded by triangles.",
      "The corner rectangles form stable anchors for your deductions."
    ]
  },
  {
    "id": "hard-1",
    "name": "The Starlight Quilt",
    "difficulty": "hard",
    "width": 9,
    "height": 9,
    "clues": [
      [
        null,
        null,
        1,
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
        1,
        1,
        1,
        0,
        1,
        null,
        null
      ],
      [
        1,
        1,
        2,
        null,
        null,
        2,
        0,
        1,
        1
      ],
      [
        null,
        1,
        null,
        null,
        null,
        null,
        1,
        0,
        null
      ],
      [
        null,
        1,
        null,
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
        2,
        null,
        null,
        2,
        0,
        0,
        null
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
        1
      ],
      [
        null,
        null,
        1,
        0,
        0,
        0,
        1,
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
        1,
        null,
        null
      ]
    ],
    "solution": [
      [
        1,
        2,
        0,
        0,
        0,
        0,
        0,
        1,
        2
      ],
      [
        4,
        3,
        0,
        0,
        0,
        0,
        0,
        4,
        3
      ],
      [
        0,
        0,
        0,
        1,
        2,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        1,
        0,
        0,
        2,
        0,
        0,
        0
      ],
      [
        0,
        0,
        4,
        0,
        0,
        3,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        4,
        3,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        1,
        2,
        0,
        0,
        0,
        0,
        0,
        1,
        2
      ],
      [
        4,
        3,
        0,
        0,
        0,
        0,
        0,
        4,
        3
      ]
    ],
    "hintSteps": [
      "A grand 4x4 central diamond is surrounded by four 2x2 corner diamonds.",
      "The clue 2 and 3 cells require careful multi-angle tracking.",
      "All 4 outer perimeter midpoints form 1x3 white rectangles."
    ]
  },
  {
    "id": "hard-2",
    "name": "Prism Matrix",
    "difficulty": "hard",
    "width": 9,
    "height": 9,
    "clues": [
      [
        0,
        1,
        1,
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
        1,
        null,
        null,
        1
      ],
      [
        1,
        null,
        null,
        2,
        1,
        1,
        null,
        null,
        1
      ],
      [
        null,
        null,
        2,
        null,
        null,
        1,
        1,
        1,
        0
      ],
      [
        null,
        null,
        1,
        null,
        null,
        1,
        0,
        null,
        null
      ],
      [
        0,
        1,
        1,
        1,
        1,
        0,
        1,
        null,
        null
      ],
      [
        1,
        null,
        null,
        1,
        0,
        1,
        null,
        null,
        1
      ],
      [
        1,
        null,
        null,
        1,
        null,
        null,
        null,
        null,
        1
      ],
      [
        0,
        1,
        1,
        0,
        null,
        null,
        1,
        1,
        0
      ]
    ],
    "solution": [
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        1,
        2,
        0,
        0,
        0,
        1,
        2,
        0
      ],
      [
        0,
        4,
        3,
        0,
        0,
        0,
        4,
        3,
        0
      ],
      [
        0,
        0,
        0,
        1,
        2,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        4,
        3,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        1,
        2,
        0,
        0,
        0,
        1,
        2,
        0
      ],
      [
        0,
        4,
        3,
        0,
        0,
        0,
        4,
        3,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ]
    ],
    "hintSteps": [
      "Five 2x2 diamonds form a five-point constellation across the 9x9 grid.",
      "Trace the beam reflections from the center diamond to ensure correct orientations.",
      "Verify all clue numbers carefully to ensure no extra triangles touch numbered cells."
    ]
  },
  {
    "id": "hard-3",
    "name": "Royal Tapestry",
    "difficulty": "hard",
    "width": 10,
    "height": 10,
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
        0,
        2,
        null,
        null,
        2,
        0,
        1,
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
        1,
        1,
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
        1,
        0,
        1,
        1,
        0
      ],
      [
        0,
        2,
        null,
        null,
        2,
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
        2,
        null,
        null,
        2,
        0
      ],
      [
        0,
        1,
        1,
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
        null,
        null,
        1,
        1,
        null,
        null,
        null,
        null,
        1
      ],
      [
        1,
        null,
        null,
        1,
        0,
        2,
        null,
        null,
        2,
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
        null,
        null
      ]
    ],
    "solution": [
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        1,
        2,
        0,
        0,
        0,
        1,
        2,
        0
      ],
      [
        0,
        1,
        0,
        0,
        2,
        0,
        0,
        4,
        3,
        0
      ],
      [
        0,
        4,
        0,
        0,
        3,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        4,
        3,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        2,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        2,
        0
      ],
      [
        0,
        1,
        2,
        0,
        0,
        4,
        0,
        0,
        3,
        0
      ],
      [
        0,
        4,
        3,
        0,
        0,
        0,
        4,
        3,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ]
    ],
    "hintSteps": [
      "Two massive 4x4 diamonds dominate the upper-left and lower-right quadrants.",
      "Two 2x2 diamonds balance the remaining corners.",
      "Full-width 1x10 horizontal rectangles line the top and bottom edges."
    ]
  },
  {
    "id": "hard-4",
    "name": "Diamond Constellation",
    "difficulty": "hard",
    "width": 10,
    "height": 10,
    "clues": [
      [
        null,
        null,
        1,
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
        1,
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
        null,
        null,
        0,
        2,
        null,
        null,
        2,
        0,
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
        1,
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
        1,
        null,
        null
      ],
      [
        null,
        null,
        0,
        2,
        null,
        null,
        2,
        0,
        null,
        null
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
        1
      ],
      [
        null,
        null,
        1,
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
        1,
        null,
        null,
        null,
        null,
        1,
        null,
        null
      ]
    ],
    "solution": [
      [
        1,
        2,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        2
      ],
      [
        4,
        3,
        0,
        0,
        0,
        0,
        0,
        0,
        4,
        3
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        1,
        2,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        0,
        0,
        2,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        4,
        0,
        0,
        3,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        4,
        3,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        1,
        2,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        2
      ],
      [
        4,
        3,
        0,
        0,
        0,
        0,
        0,
        0,
        4,
        3
      ]
    ],
    "hintSteps": [
      "A centered 4x4 diamond with 4 outer 2x2 diamonds creates a harmonious star pattern.",
      "Check the clue 0 cells first to eliminate impossible triangle orientations.",
      "The cardinal outer borders host four 2x4 white rectangular halls."
    ]
  },
  {
    "id": "hard-5",
    "name": "Master Proof of Quilt",
    "difficulty": "hard",
    "width": 10,
    "height": 10,
    "clues": [
      [
        null,
        0,
        1,
        1,
        null,
        null,
        1,
        1,
        0,
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
        1,
        null
      ],
      [
        null,
        1,
        null,
        null,
        2,
        2,
        null,
        null,
        1,
        null
      ],
      [
        0,
        0,
        1,
        3,
        null,
        null,
        3,
        1,
        0,
        0
      ],
      [
        0,
        0,
        1,
        null,
        null,
        null,
        null,
        1,
        0,
        0
      ],
      [
        0,
        0,
        1,
        null,
        null,
        null,
        null,
        1,
        0,
        0
      ],
      [
        0,
        0,
        1,
        3,
        null,
        null,
        3,
        1,
        0,
        0
      ],
      [
        null,
        1,
        null,
        null,
        2,
        2,
        null,
        null,
        1,
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
        1,
        null
      ],
      [
        null,
        0,
        1,
        1,
        null,
        null,
        1,
        1,
        0,
        null
      ]
    ],
    "solution": [
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        1,
        2,
        0,
        0,
        1,
        2,
        0,
        0
      ],
      [
        0,
        0,
        4,
        3,
        0,
        0,
        4,
        3,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        1,
        2,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        1,
        0,
        0,
        2,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        4,
        0,
        0,
        3,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        4,
        3,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        1,
        2,
        0,
        0,
        1,
        2,
        0,
        0
      ],
      [
        0,
        0,
        4,
        3,
        0,
        0,
        4,
        3,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ]
    ],
    "hintSteps": [
      "The ultimate Shakashaka challenge: 5 distinct tilted diamond structures!",
      "A central 4x4 diamond is flanked by 4 satellite 2x2 diamonds.",
      "Every corner and edge contains carefully proportioned white rectangular zones.",
      "Deduce each triangle orientation systematically using clue constraints and right-angle rules."
    ]
  }
];

export const SHAKASHAKA_PUZZLES: ShakashakaPuzzle[] = RAW_SHAKASHAKA_PUZZLES.map(p => ({
  ...p,
  title: p.name,
  rows: p.height,
  cols: p.width,
  difficulty: p.difficulty as 'easy' | 'medium' | 'hard',
  solution: p.solution as TriangleType[][],
  initialGrid: p.clues.map(row => row.map(cell => cell === null ? 0 : (cell === -1 ? -1 : -cell - 2)))
}));

export function getShakashakaPuzzleById(id: string): ShakashakaPuzzle | undefined {
  return SHAKASHAKA_PUZZLES.find(p => p.id === id);
}

export function getPuzzlesByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): ShakashakaPuzzle[] {
  return SHAKASHAKA_PUZZLES.filter(p => p.difficulty === difficulty);
}

/**
 * Deterministically select a Daily Challenge puzzle based on UTC date string (YYYY-MM-DD).
 */
export function getDailyShakashakaPuzzle(utcDateStr?: string): { puzzle: ShakashakaPuzzle; dateStr: string } {
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
  const index = Math.abs(hash) % SHAKASHAKA_PUZZLES.length;
  return {
    puzzle: SHAKASHAKA_PUZZLES[index],
    dateStr: dateKey,
  };
}

// Reusable Shakashaka Geometric Validation Engine
function edgeKey(p1: string, p2: string): string {
  return p1 < p2 ? `${p1}--${p2}` : `${p2}--${p1}`;
}

export function getWhitePolygonsForCell(c: number, r: number, state: number) {
  if (state === TRIANGLE.NONE) {
    return [{
      type: 'quad',
      area: 1.0,
      vertices: [[c, r], [c + 1, r], [c + 1, r + 1], [c, r + 1]],
      edges: [
        { from: `${c},${r}`, to: `${c+1},${r}` },
        { from: `${c+1},${r}`, to: `${c+1},${r+1}` },
        { from: `${c+1},${r+1}`, to: `${c},${r+1}` },
        { from: `${c},${r+1}`, to: `${c},${r}` }
      ]
    }];
  } else if (state === TRIANGLE.TL) {
    return [{
      type: 'tri',
      area: 0.5,
      vertices: [[c + 1, r], [c + 1, r + 1], [c, r + 1]],
      edges: [
        { from: `${c+1},${r}`, to: `${c+1},${r+1}` },
        { from: `${c+1},${r+1}`, to: `${c},${r+1}` },
        { from: `${c},${r+1}`, to: `${c+1},${r}` }
      ]
    }];
  } else if (state === TRIANGLE.TR) {
    return [{
      type: 'tri',
      area: 0.5,
      vertices: [[c, r], [c + 1, r + 1], [c, r + 1]],
      edges: [
        { from: `${c},${r}`, to: `${c+1},${r+1}` },
        { from: `${c+1},${r+1}`, to: `${c},${r+1}` },
        { from: `${c},${r+1}`, to: `${c},${r}` }
      ]
    }];
  } else if (state === TRIANGLE.BR) {
    return [{
      type: 'tri',
      area: 0.5,
      vertices: [[c, r], [c + 1, r], [c, r + 1]],
      edges: [
        { from: `${c},${r}`, to: `${c+1},${r}` },
        { from: `${c+1},${r}`, to: `${c},${r+1}` },
        { from: `${c},${r+1}`, to: `${c},${r}` }
      ]
    }];
  } else if (state === TRIANGLE.BL) {
    return [{
      type: 'tri',
      area: 0.5,
      vertices: [[c, r], [c + 1, r], [c + 1, r + 1]],
      edges: [
        { from: `${c},${r}`, to: `${c+1},${r}` },
        { from: `${c+1},${r}`, to: `${c+1},${r+1}` },
        { from: `${c+1},${r+1}`, to: `${c},${r}` }
      ]
    }];
  }
  return [];
}

export function validateShakashaka(
  width: number,
  height: number,
  clues: (number | null)[][],
  board: number[][]
): { valid: boolean; reason?: string } {
  // 1. Validate Clues
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const clue = clues[r][c];
      if (clue !== null && clue >= 0) {
        let count = 0;
        if (r > 0 && clues[r - 1][c] === null) {
          const t = board[r - 1][c];
          if (t === TRIANGLE.BL || t === TRIANGLE.BR) count++;
        }
        if (r + 1 < height && clues[r + 1][c] === null) {
          const t = board[r + 1][c];
          if (t === TRIANGLE.TL || t === TRIANGLE.TR) count++;
        }
        if (c > 0 && clues[r][c - 1] === null) {
          const t = board[r][c - 1];
          if (t === TRIANGLE.TR || t === TRIANGLE.BR) count++;
        }
        if (c + 1 < width && clues[r][c + 1] === null) {
          const t = board[r][c + 1];
          if (t === TRIANGLE.TL || t === TRIANGLE.BL) count++;
        }
        if (count !== clue) {
          return { valid: false, reason: `Clue at (${r},${c}) requires ${clue} triangles touching, found ${count}.` };
        }
      }
    }
  }

  // 2. Collect white pieces
  const pieces: Array<{ id: number; area: number; vertices: number[][]; edges: Array<{ from: string; to: string }> }> = [];
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      if (clues[r][c] === null) {
        const polyList = getWhitePolygonsForCell(c, r, board[r][c]);
        for (const p of polyList) {
          pieces.push({ id: pieces.length, ...p });
        }
      }
    }
  }

  if (pieces.length === 0) return { valid: true };

  const edgeToPieces = new Map<string, number[]>();
  for (const piece of pieces) {
    for (const edge of piece.edges) {
      const k = edgeKey(edge.from, edge.to);
      if (!edgeToPieces.has(k)) edgeToPieces.set(k, []);
      edgeToPieces.get(k)!.push(piece.id);
    }
  }

  const adj: number[][] = Array.from({ length: pieces.length }, () => []);
  for (const [k, pieceIds] of edgeToPieces.entries()) {
    if (pieceIds.length === 2) {
      adj[pieceIds[0]].push(pieceIds[1]);
      adj[pieceIds[1]].push(pieceIds[0]);
    } else if (pieceIds.length > 2) {
      return { valid: false, reason: `More than two pieces share edge ${k}` };
    }
  }

  const visited = new Array(pieces.length).fill(false);
  const components: number[][] = [];
  for (let i = 0; i < pieces.length; i++) {
    if (!visited[i]) {
      const comp: number[] = [];
      const queue = [i];
      visited[i] = true;
      while (queue.length > 0) {
        const curr = queue.shift()!;
        comp.push(curr);
        for (const neighbor of adj[curr]) {
          if (!visited[neighbor]) {
            visited[neighbor] = true;
            queue.push(neighbor);
          }
        }
      }
      components.push(comp);
    }
  }

  for (const compPieceIds of components) {
    const compPieceSet = new Set(compPieceIds);
    const boundaryDirectedEdges: Array<{ from: string; to: string }> = [];
    let totalArea = 0;

    for (const pid of compPieceIds) {
      const piece = pieces[pid];
      totalArea += piece.area;
      for (const edge of piece.edges) {
        const k = edgeKey(edge.from, edge.to);
        const sharing = edgeToPieces.get(k)!;
        const internal = sharing.some(otherId => otherId !== pid && compPieceSet.has(otherId));
        if (!internal) {
          boundaryDirectedEdges.push(edge);
        }
      }
    }

    const nextMap = new Map<string, string>();
    for (const edge of boundaryDirectedEdges) {
      if (nextMap.has(edge.from)) {
        return { valid: false, reason: `Vertex ${edge.from} has multiple outgoing boundary edges` };
      }
      nextMap.set(edge.from, edge.to);
    }

    const visitedVertices = new Set<string>();
    const startVertex = boundaryDirectedEdges[0].from;
    const cycle = [startVertex];
    visitedVertices.add(startVertex);
    let curr: string | undefined = nextMap.get(startVertex);

    while (curr && curr !== startVertex) {
      if (visitedVertices.has(curr)) {
        return { valid: false, reason: `Self-intersecting boundary cycle at vertex ${curr}` };
      }
      visitedVertices.add(curr);
      cycle.push(curr);
      curr = nextMap.get(curr);
    }

    if (!curr || visitedVertices.size !== boundaryDirectedEdges.length) {
      return { valid: false, reason: `Boundary does not form a clean simple loop` };
    }

    const coords = cycle.map(s => {
      const [x, y] = s.split(',').map(Number);
      return { x, y };
    });

    const simplified: Array<{ x: number; y: number }> = [];
    const n = coords.length;
    for (let i = 0; i < n; i++) {
      const prev = coords[(i - 1 + n) % n];
      const cur = coords[i];
      const next = coords[(i + 1) % n];
      const dx1 = cur.x - prev.x;
      const dy1 = cur.y - prev.y;
      const dx2 = next.x - cur.x;
      const dy2 = next.y - cur.y;
      const cross = dx1 * dy2 - dy1 * dx2;
      const dot = dx1 * dx2 + dy1 * dy2;
      if (cross === 0 && dot > 0) continue;
      simplified.push(cur);
    }

    if (simplified.length !== 4) {
      return { valid: false, reason: `White region has ${simplified.length} vertices instead of 4` };
    }

    for (let i = 0; i < 4; i++) {
      const pPrev = simplified[(i + 3) % 4];
      const pCur = simplified[i];
      const pNext = simplified[(i + 1) % 4];
      const v1x = pCur.x - pPrev.x;
      const v1y = pCur.y - pPrev.y;
      const v2x = pNext.x - pCur.x;
      const v2y = pNext.y - pCur.y;
      const dot = v1x * v2x + v1y * v2y;
      const cross = v1x * v2y - v1y * v2x;
      if (dot !== 0 || cross <= 0) {
        return { valid: false, reason: `Corner at (${pCur.x},${pCur.y}) is not a 90-degree right turn.` };
      }
    }

    const d01 = (simplified[1].x - simplified[0].x)**2 + (simplified[1].y - simplified[0].y)**2;
    const d12 = (simplified[2].x - simplified[1].x)**2 + (simplified[2].y - simplified[1].y)**2;
    const d23 = (simplified[3].x - simplified[2].x)**2 + (simplified[3].y - simplified[2].y)**2;
    const d30 = (simplified[0].x - simplified[3].x)**2 + (simplified[0].y - simplified[3].y)**2;

    if (d01 !== d23 || d12 !== d30) {
      return { valid: false, reason: `Opposite sides not equal` };
    }

    const polyArea = Math.sqrt(d01) * Math.sqrt(d12);
    if (Math.abs(polyArea - totalArea) > 0.001) {
      return { valid: false, reason: `Area mismatch: ${polyArea} vs ${totalArea}` };
    }
  }

  return { valid: true };
}
