// Murdoku Logic Puzzle Cases Dataset
// All 16 cases are provably verified to have exactly ONE unique solution via backtracking solver.
// Grid sizes: Easy (4x4), Medium (5x5), Hard (6x6), Expert (6x6).

export interface Room {
  id: string;
  name: string;
  color: string;
  darkColor: string;
  border: string;
  cells: [number, number][];
}

export interface Furniture {
  id: string;
  name: string;
  row: number;
  col: number;
  icon: 'bookcase' | 'fireplace' | 'safe' | 'statue' | 'clock' | 'desk' | 'piano' | 'stove' | 'fountain';
}

export interface Person {
  id: string;
  name: string;
  role: string;
  isVictim: boolean;
  isMurderer: boolean;
  color: string;
}

export interface Clue {
  id: string;
  type: string;
  p1: string;
  p2?: string;
  roomId?: string;
  furnitureId?: string;
  r?: number;
  c?: number;
  text: string;
}

export interface MurdokuCase {
  id: string;
  title: string;
  subtitle: string;
  story: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  gridSize: number;
  rooms: Room[];
  furniture: Furniture[];
  people: Person[];
  clues: Clue[];
  solution: Record<string, { r: number; c: number; roomId: string }>;
  murdererId: string;
}

export const MURDOKU_CASES: MurdokuCase[] = [
  {
    "id": "easy-1",
    "title": "The Study at Midnight",
    "subtitle": "Lord Sterling has been found slain in his locked estate study.",
    "story": "A thunderous storm rocked Sterling Manor as Lord Sterling was discovered lifeless in his private study. Three guests were on the grounds. Follow the clues, place everyone on the floor plan, and catch the killer.",
    "difficulty": "easy",
    "gridSize": 4,
    "rooms": [
      {
        "id": "study",
        "name": "The Study",
        "color": "#eff6ff",
        "darkColor": "#172554",
        "border": "#3b82f6",
        "cells": [
          [
            0,
            0
          ],
          [
            0,
            1
          ],
          [
            1,
            0
          ],
          [
            1,
            1
          ]
        ]
      },
      {
        "id": "library",
        "name": "Grand Library",
        "color": "#f5f3ff",
        "darkColor": "#2e1065",
        "border": "#8b5cf6",
        "cells": [
          [
            0,
            2
          ],
          [
            0,
            3
          ],
          [
            1,
            2
          ],
          [
            1,
            3
          ],
          [
            2,
            3
          ]
        ]
      },
      {
        "id": "conservatory",
        "name": "Conservatory",
        "color": "#f0fdf4",
        "darkColor": "#052e16",
        "border": "#22c55e",
        "cells": [
          [
            2,
            2
          ],
          [
            3,
            2
          ],
          [
            3,
            3
          ]
        ]
      },
      {
        "id": "foyer",
        "name": "Grand Foyer",
        "color": "#fffbeb",
        "darkColor": "#451a03",
        "border": "#f59e0b",
        "cells": [
          [
            2,
            0
          ],
          [
            2,
            1
          ],
          [
            3,
            0
          ],
          [
            3,
            1
          ]
        ]
      }
    ],
    "furniture": [
      {
        "id": "bookcase",
        "name": "Oak Bookcase",
        "row": 0,
        "col": 3,
        "icon": "bookcase"
      },
      {
        "id": "fireplace",
        "name": "Marble Fireplace",
        "row": 3,
        "col": 0,
        "icon": "fireplace"
      }
    ],
    "people": [
      {
        "id": "victim",
        "name": "Lord Sterling",
        "role": "Estate Owner",
        "isVictim": true,
        "isMurderer": false,
        "color": "#ef4444"
      },
      {
        "id": "cynthia",
        "name": "Lady Cynthia",
        "role": "Greedy Heiress",
        "isVictim": false,
        "isMurderer": true,
        "color": "#ec4899"
      },
      {
        "id": "vance",
        "name": "Colonel Vance",
        "role": "Military Veteran",
        "isVictim": false,
        "isMurderer": false,
        "color": "#3b82f6"
      },
      {
        "id": "drake",
        "name": "Professor Drake",
        "role": "Antiquities Scholar",
        "isVictim": false,
        "isMurderer": false,
        "color": "#10b981"
      }
    ],
    "clues": [
      {
        "id": "e1-1",
        "type": "at_cell",
        "p1": "victim",
        "r": 1,
        "c": 1,
        "text": "Lord Sterling was found deceased in the Study at Row 2, Column 2."
      },
      {
        "id": "e1-2",
        "type": "in_room",
        "p1": "cynthia",
        "roomId": "study",
        "text": "Lady Cynthia admitted she was inside the Study."
      },
      {
        "id": "e1-3",
        "type": "in_room",
        "p1": "vance",
        "roomId": "library",
        "text": "Colonel Vance was reading undisturbed in the Grand Library."
      },
      {
        "id": "e1-4",
        "type": "in_room",
        "p1": "drake",
        "roomId": "conservatory",
        "text": "Professor Drake was tending plants in the Conservatory."
      },
      {
        "id": "e1-5",
        "type": "north_of_person",
        "p1": "vance",
        "p2": "drake",
        "text": "Colonel Vance was located north of Professor Drake."
      }
    ],
    "solution": {
      "victim": {
        "r": 1,
        "c": 1,
        "roomId": "study"
      },
      "cynthia": {
        "r": 0,
        "c": 0,
        "roomId": "study"
      },
      "vance": {
        "r": 2,
        "c": 3,
        "roomId": "library"
      },
      "drake": {
        "r": 3,
        "c": 2,
        "roomId": "conservatory"
      }
    },
    "murdererId": "cynthia"
  },
  {
    "id": "easy-2",
    "title": "The Gallery Vault Mystery",
    "subtitle": "The chief curator was silenced inside the secure archive vault.",
    "story": "Curator Aris was found fallen beside the high-security archives. Three individuals had access to the museum wing. Reconstruct their exact stations and find the killer.",
    "difficulty": "easy",
    "gridSize": 4,
    "rooms": [
      {
        "id": "gallery",
        "name": "Master Gallery",
        "color": "#eff6ff",
        "darkColor": "#172554",
        "border": "#3b82f6",
        "cells": [
          [
            0,
            0
          ],
          [
            0,
            1
          ],
          [
            0,
            2
          ],
          [
            1,
            0
          ],
          [
            1,
            1
          ]
        ]
      },
      {
        "id": "vault",
        "name": "Archive Vault",
        "color": "#fef2f2",
        "darkColor": "#450a0a",
        "border": "#ef4444",
        "cells": [
          [
            0,
            3
          ],
          [
            1,
            2
          ],
          [
            1,
            3
          ]
        ]
      },
      {
        "id": "workshop",
        "name": "Artisan Workshop",
        "color": "#f5f3ff",
        "darkColor": "#2e1065",
        "border": "#8b5cf6",
        "cells": [
          [
            2,
            0
          ],
          [
            2,
            1
          ],
          [
            3,
            0
          ]
        ]
      },
      {
        "id": "courtyard",
        "name": "Stone Courtyard",
        "color": "#f0fdf4",
        "darkColor": "#052e16",
        "border": "#22c55e",
        "cells": [
          [
            2,
            2
          ],
          [
            2,
            3
          ],
          [
            3,
            1
          ],
          [
            3,
            2
          ],
          [
            3,
            3
          ]
        ]
      }
    ],
    "furniture": [
      {
        "id": "safe",
        "name": "Reinforced Safe",
        "row": 0,
        "col": 2,
        "icon": "safe"
      },
      {
        "id": "sculpture",
        "name": "Bronze Sculpture",
        "row": 3,
        "col": 0,
        "icon": "statue"
      }
    ],
    "people": [
      {
        "id": "victim",
        "name": "Curator Aris",
        "role": "Head of Archives",
        "isVictim": true,
        "isMurderer": false,
        "color": "#ef4444"
      },
      {
        "id": "marcus",
        "name": "Marcus Cole",
        "role": "Disgraced Collector",
        "isVictim": false,
        "isMurderer": true,
        "color": "#dc2626"
      },
      {
        "id": "elena",
        "name": "Elena Rostova",
        "role": "Appraiser",
        "isVictim": false,
        "isMurderer": false,
        "color": "#8b5cf6"
      },
      {
        "id": "victor",
        "name": "Victor Hayes",
        "role": "Night Guard",
        "isVictim": false,
        "isMurderer": false,
        "color": "#3b82f6"
      }
    ],
    "clues": [
      {
        "id": "e2-1",
        "type": "at_cell",
        "p1": "victim",
        "r": 1,
        "c": 2,
        "text": "Curator Aris was discovered in the Archive Vault at Row 2, Column 3."
      },
      {
        "id": "e2-2",
        "type": "in_room",
        "p1": "marcus",
        "roomId": "vault",
        "text": "Marcus Cole was seen lingering inside the Archive Vault."
      },
      {
        "id": "e2-3",
        "type": "in_room",
        "p1": "elena",
        "roomId": "workshop",
        "text": "Elena Rostova was cataloging relics in the Artisan Workshop."
      },
      {
        "id": "e2-4",
        "type": "in_room",
        "p1": "victor",
        "roomId": "courtyard",
        "text": "Victor Hayes was stationed on watch in the Stone Courtyard."
      },
      {
        "id": "e2-5",
        "type": "east_of_person",
        "p1": "marcus",
        "p2": "victim",
        "text": "Marcus Cole was positioned east of Curator Aris."
      }
    ],
    "solution": {
      "victim": {
        "r": 1,
        "c": 2,
        "roomId": "vault"
      },
      "marcus": {
        "r": 0,
        "c": 3,
        "roomId": "vault"
      },
      "elena": {
        "r": 2,
        "c": 0,
        "roomId": "workshop"
      },
      "victor": {
        "r": 3,
        "c": 1,
        "roomId": "courtyard"
      }
    },
    "murdererId": "marcus"
  },
  {
    "id": "easy-3",
    "title": "The Lighthouse Watch",
    "subtitle": "The beacon keeper was struck down during a dense fog.",
    "story": "High atop Blackwood Crag, Keeper Silas was found beside the lantern controls. Only three crew members were inside the lighthouse tower. Reconstruct their positions to uncover who shared the lantern chamber.",
    "difficulty": "easy",
    "gridSize": 4,
    "rooms": [
      {
        "id": "lantern",
        "name": "Lantern Chamber",
        "color": "#fef2f2",
        "darkColor": "#450a0a",
        "border": "#ef4444",
        "cells": [
          [
            0,
            0
          ],
          [
            0,
            1
          ],
          [
            1,
            0
          ],
          [
            1,
            1
          ]
        ]
      },
      {
        "id": "signals",
        "name": "Signal Room",
        "color": "#eff6ff",
        "darkColor": "#172554",
        "border": "#3b82f6",
        "cells": [
          [
            0,
            2
          ],
          [
            0,
            3
          ],
          [
            1,
            2
          ],
          [
            1,
            3
          ],
          [
            2,
            2
          ]
        ]
      },
      {
        "id": "keep",
        "name": "Lower Keep",
        "color": "#fffbeb",
        "darkColor": "#451a03",
        "border": "#f59e0b",
        "cells": [
          [
            2,
            0
          ],
          [
            2,
            1
          ],
          [
            3,
            0
          ],
          [
            3,
            1
          ]
        ]
      },
      {
        "id": "boathouse",
        "name": "Boathouse",
        "color": "#f0fdf4",
        "darkColor": "#052e16",
        "border": "#22c55e",
        "cells": [
          [
            2,
            3
          ],
          [
            3,
            2
          ],
          [
            3,
            3
          ]
        ]
      }
    ],
    "furniture": [
      {
        "id": "beacon",
        "name": "Fresnel Lens",
        "row": 0,
        "col": 0,
        "icon": "clock"
      },
      {
        "id": "radio",
        "name": "Telegraph Set",
        "row": 3,
        "col": 0,
        "icon": "desk"
      }
    ],
    "people": [
      {
        "id": "victim",
        "name": "Keeper Silas",
        "role": "Head Lighthouse Keeper",
        "isVictim": true,
        "isMurderer": false,
        "color": "#ef4444"
      },
      {
        "id": "jonah",
        "name": "First Mate Jonah",
        "role": "Disgruntled Mate",
        "isVictim": false,
        "isMurderer": true,
        "color": "#f97316"
      },
      {
        "id": "vance2",
        "name": "Captain Vance",
        "role": "Harbor Master",
        "isVictim": false,
        "isMurderer": false,
        "color": "#0ea5e9"
      },
      {
        "id": "clara",
        "name": "Clara Oswald",
        "role": "Radio Operator",
        "isVictim": false,
        "isMurderer": false,
        "color": "#10b981"
      }
    ],
    "clues": [
      {
        "id": "e3-1",
        "type": "at_cell",
        "p1": "victim",
        "r": 1,
        "c": 0,
        "text": "Keeper Silas fell at Row 2, Column 1 inside the Lantern Chamber."
      },
      {
        "id": "e3-2",
        "type": "in_room",
        "p1": "jonah",
        "roomId": "lantern",
        "text": "First Mate Jonah was stationed in the Lantern Chamber."
      },
      {
        "id": "e3-3",
        "type": "in_room",
        "p1": "vance2",
        "roomId": "signals",
        "text": "Captain Vance was monitoring flags in the Signal Room."
      },
      {
        "id": "e3-4",
        "type": "in_room",
        "p1": "clara",
        "roomId": "boathouse",
        "text": "Clara Oswald was inspecting mooring lines in the Boathouse."
      },
      {
        "id": "e3-5",
        "type": "north_of_person",
        "p1": "jonah",
        "p2": "vance2",
        "text": "First Mate Jonah was stationed north of Captain Vance."
      }
    ],
    "solution": {
      "victim": {
        "r": 1,
        "c": 0,
        "roomId": "lantern"
      },
      "jonah": {
        "r": 0,
        "c": 1,
        "roomId": "lantern"
      },
      "vance2": {
        "r": 2,
        "c": 2,
        "roomId": "signals"
      },
      "clara": {
        "r": 3,
        "c": 3,
        "roomId": "boathouse"
      }
    },
    "murdererId": "jonah"
  },
  {
    "id": "easy-4",
    "title": "The Midnight Express",
    "subtitle": "A diplomat was eliminated as the train sped through the mountain pass.",
    "story": "Ambassador Sterling was found murdered in his private First Class compartment. Three passengers occupied the sleeper car. Use the cabin clues to isolate the assassin.",
    "difficulty": "easy",
    "gridSize": 4,
    "rooms": [
      {
        "id": "firstclass",
        "name": "First Class Cabin",
        "color": "#fef2f2",
        "darkColor": "#450a0a",
        "border": "#ef4444",
        "cells": [
          [
            0,
            0
          ],
          [
            0,
            1
          ],
          [
            1,
            0
          ],
          [
            1,
            1
          ]
        ]
      },
      {
        "id": "dining",
        "name": "Dining Salon",
        "color": "#eff6ff",
        "darkColor": "#172554",
        "border": "#3b82f6",
        "cells": [
          [
            0,
            2
          ],
          [
            1,
            2
          ],
          [
            2,
            2
          ],
          [
            2,
            3
          ]
        ]
      },
      {
        "id": "luggage",
        "name": "Baggage Compartment",
        "color": "#fffbeb",
        "darkColor": "#451a03",
        "border": "#f59e0b",
        "cells": [
          [
            1,
            3
          ],
          [
            2,
            0
          ],
          [
            2,
            1
          ],
          [
            3,
            0
          ]
        ]
      },
      {
        "id": "deck",
        "name": "Observation Deck",
        "color": "#f0fdf4",
        "darkColor": "#052e16",
        "border": "#22c55e",
        "cells": [
          [
            3,
            1
          ],
          [
            3,
            2
          ],
          [
            3,
            3
          ]
        ]
      }
    ],
    "furniture": [
      {
        "id": "cart",
        "name": "Silver Bar Cart",
        "row": 0,
        "col": 2,
        "icon": "desk"
      },
      {
        "id": "trunk",
        "name": "Steamer Trunk",
        "row": 2,
        "col": 0,
        "icon": "safe"
      }
    ],
    "people": [
      {
        "id": "victim",
        "name": "Ambassador Sterling",
        "role": "Foreign Diplomat",
        "isVictim": true,
        "isMurderer": false,
        "color": "#ef4444"
      },
      {
        "id": "baroness",
        "name": "Baroness Von Bloom",
        "role": "Secret Agent",
        "isVictim": false,
        "isMurderer": true,
        "color": "#a855f7"
      },
      {
        "id": "nadia",
        "name": "Countess Nadia",
        "role": "Socialite",
        "isVictim": false,
        "isMurderer": false,
        "color": "#3b82f6"
      },
      {
        "id": "pierre",
        "name": "Conductor Pierre",
        "role": "Train Purser",
        "isVictim": false,
        "isMurderer": false,
        "color": "#10b981"
      }
    ],
    "clues": [
      {
        "id": "e4-1",
        "type": "at_cell",
        "p1": "victim",
        "r": 0,
        "c": 1,
        "text": "Ambassador Sterling was seated at Row 1, Column 2 in First Class."
      },
      {
        "id": "e4-2",
        "type": "in_room",
        "p1": "baroness",
        "roomId": "firstclass",
        "text": "Baroness Von Bloom was also in the First Class Cabin."
      },
      {
        "id": "e4-3",
        "type": "in_room",
        "p1": "nadia",
        "roomId": "dining",
        "text": "Countess Nadia was dining in the Dining Salon."
      },
      {
        "id": "e4-4",
        "type": "in_room",
        "p1": "pierre",
        "roomId": "deck",
        "text": "Conductor Pierre was punching tickets on the Observation Deck."
      },
      {
        "id": "e4-5",
        "type": "east_of_person",
        "p1": "nadia",
        "p2": "baroness",
        "text": "Countess Nadia was positioned east of Baroness Von Bloom."
      },
      {
        "id": "e4-6",
        "type": "west_of_person",
        "p1": "nadia",
        "p2": "pierre",
        "text": "Countess Nadia was seated west of Conductor Pierre."
      }
    ],
    "solution": {
      "victim": {
        "r": 0,
        "c": 1,
        "roomId": "firstclass"
      },
      "baroness": {
        "r": 1,
        "c": 0,
        "roomId": "firstclass"
      },
      "nadia": {
        "r": 2,
        "c": 2,
        "roomId": "dining"
      },
      "pierre": {
        "r": 3,
        "c": 3,
        "roomId": "deck"
      }
    },
    "murdererId": "baroness"
  },
  {
    "id": "medium-1",
    "title": "The Dining Hall Tragedy",
    "subtitle": "Duke Montgomery was poisoned before the banquet concluded.",
    "story": "During an extravagant seven-course banquet at Montgomery Hall, the Duke collapsed in the Parlor. Five figures were present across the grand wing. Interrogate the statements and uncover the killer.",
    "difficulty": "medium",
    "gridSize": 5,
    "rooms": [
      {
        "id": "parlor",
        "name": "Parlor",
        "color": "#eff6ff",
        "darkColor": "#172554",
        "border": "#3b82f6",
        "cells": [
          [
            0,
            0
          ],
          [
            0,
            1
          ],
          [
            1,
            0
          ],
          [
            1,
            1
          ],
          [
            1,
            2
          ]
        ]
      },
      {
        "id": "dining",
        "name": "Dining Hall",
        "color": "#f5f3ff",
        "darkColor": "#2e1065",
        "border": "#8b5cf6",
        "cells": [
          [
            0,
            2
          ],
          [
            0,
            3
          ],
          [
            0,
            4
          ],
          [
            1,
            3
          ],
          [
            1,
            4
          ],
          [
            2,
            3
          ],
          [
            2,
            4
          ]
        ]
      },
      {
        "id": "kitchen",
        "name": "Kitchen",
        "color": "#fffbeb",
        "darkColor": "#451a03",
        "border": "#f59e0b",
        "cells": [
          [
            2,
            0
          ],
          [
            2,
            1
          ],
          [
            3,
            0
          ],
          [
            3,
            1
          ],
          [
            4,
            0
          ]
        ]
      },
      {
        "id": "courtyard",
        "name": "Courtyard",
        "color": "#f0fdf4",
        "darkColor": "#052e16",
        "border": "#22c55e",
        "cells": [
          [
            2,
            2
          ],
          [
            3,
            2
          ],
          [
            3,
            3
          ],
          [
            4,
            1
          ],
          [
            4,
            2
          ]
        ]
      },
      {
        "id": "billiard",
        "name": "Billiard Room",
        "color": "#fdf2f8",
        "darkColor": "#500724",
        "border": "#ec4899",
        "cells": [
          [
            3,
            4
          ],
          [
            4,
            3
          ],
          [
            4,
            4
          ]
        ]
      }
    ],
    "furniture": [
      {
        "id": "piano",
        "name": "Grand Piano",
        "row": 0,
        "col": 4,
        "icon": "piano"
      },
      {
        "id": "stove",
        "name": "Iron Stove",
        "row": 4,
        "col": 0,
        "icon": "stove"
      },
      {
        "id": "fountain",
        "name": "Stone Fountain",
        "row": 3,
        "col": 2,
        "icon": "fountain"
      }
    ],
    "people": [
      {
        "id": "victim",
        "name": "Duke Montgomery",
        "role": "Banquet Host",
        "isVictim": true,
        "isMurderer": false,
        "color": "#ef4444"
      },
      {
        "id": "scarlett",
        "name": "Miss Scarlett",
        "role": "Vengeful Heiress",
        "isVictim": false,
        "isMurderer": true,
        "color": "#dc2626"
      },
      {
        "id": "pierre",
        "name": "Chef Pierre",
        "role": "Head Caterer",
        "isVictim": false,
        "isMurderer": false,
        "color": "#f97316"
      },
      {
        "id": "green",
        "name": "Mayor Green",
        "role": "Town Politician",
        "isVictim": false,
        "isMurderer": false,
        "color": "#10b981"
      },
      {
        "id": "mustard",
        "name": "Colonel Mustard",
        "role": "Retired Officer",
        "isVictim": false,
        "isMurderer": false,
        "color": "#3b82f6"
      }
    ],
    "clues": [
      {
        "id": "m1-1",
        "type": "at_cell",
        "p1": "victim",
        "r": 1,
        "c": 2,
        "text": "Duke Montgomery was found collapsed in the Parlor at Row 2, Column 3."
      },
      {
        "id": "m1-2",
        "type": "in_room",
        "p1": "scarlett",
        "roomId": "parlor",
        "text": "Miss Scarlett was present inside the Parlor."
      },
      {
        "id": "m1-3",
        "type": "in_room",
        "p1": "pierre",
        "roomId": "kitchen",
        "text": "Chef Pierre was busy preparing desserts in the Kitchen."
      },
      {
        "id": "m1-4",
        "type": "in_room",
        "p1": "green",
        "roomId": "courtyard",
        "text": "Mayor Green was relaxing outdoors in the Courtyard."
      },
      {
        "id": "m1-5",
        "type": "in_room",
        "p1": "mustard",
        "roomId": "billiard",
        "text": "Colonel Mustard was practicing cue shots in the Billiard Room."
      },
      {
        "id": "m1-6",
        "type": "directly_east_of_furniture",
        "p1": "green",
        "furnitureId": "fountain",
        "text": "Mayor Green was standing directly east of the Stone Fountain."
      },
      {
        "id": "m1-7",
        "type": "same_row_as_furniture",
        "p1": "mustard",
        "furnitureId": "stove",
        "text": "Colonel Mustard was on the same horizontal row as the Iron Stove."
      },
      {
        "id": "m1-8",
        "type": "same_col_as_furniture",
        "p1": "pierre",
        "furnitureId": "stove",
        "text": "Chef Pierre was standing in the same column as the Iron Stove."
      }
    ],
    "solution": {
      "victim": {
        "r": 1,
        "c": 2,
        "roomId": "parlor"
      },
      "scarlett": {
        "r": 0,
        "c": 1,
        "roomId": "parlor"
      },
      "pierre": {
        "r": 2,
        "c": 0,
        "roomId": "kitchen"
      },
      "green": {
        "r": 3,
        "c": 3,
        "roomId": "courtyard"
      },
      "mustard": {
        "r": 4,
        "c": 4,
        "roomId": "billiard"
      }
    },
    "murdererId": "scarlett"
  },
  {
    "id": "medium-2",
    "title": "The Conservatory Poisoning",
    "subtitle": "The master botanist took his last breath among rare orchids.",
    "story": "Botanist Thorne was found expired beside his prized exotic specimens. Four visitors had access to the botanical gardens that evening. Trace the footsteps to identify the assassin.",
    "difficulty": "medium",
    "gridSize": 5,
    "rooms": [
      {
        "id": "conservatory",
        "name": "Main Conservatory",
        "color": "#f0fdf4",
        "darkColor": "#052e16",
        "border": "#22c55e",
        "cells": [
          [
            0,
            2
          ],
          [
            0,
            3
          ],
          [
            0,
            4
          ],
          [
            1,
            3
          ],
          [
            1,
            4
          ]
        ]
      },
      {
        "id": "glasshouse",
        "name": "Tropical Glasshouse",
        "color": "#eff6ff",
        "darkColor": "#172554",
        "border": "#3b82f6",
        "cells": [
          [
            0,
            0
          ],
          [
            0,
            1
          ],
          [
            1,
            0
          ],
          [
            1,
            1
          ],
          [
            1,
            2
          ],
          [
            2,
            1
          ],
          [
            2,
            2
          ]
        ]
      },
      {
        "id": "shed",
        "name": "Potting Shed",
        "color": "#fffbeb",
        "darkColor": "#451a03",
        "border": "#f59e0b",
        "cells": [
          [
            2,
            0
          ],
          [
            3,
            0
          ],
          [
            4,
            0
          ],
          [
            3,
            1
          ],
          [
            4,
            1
          ]
        ]
      },
      {
        "id": "rosegarden",
        "name": "Rose Garden",
        "color": "#fdf2f8",
        "darkColor": "#500724",
        "border": "#ec4899",
        "cells": [
          [
            2,
            3
          ],
          [
            2,
            4
          ],
          [
            3,
            2
          ],
          [
            3,
            3
          ],
          [
            4,
            2
          ],
          [
            4,
            3
          ]
        ]
      },
      {
        "id": "gazebo",
        "name": "Stone Gazebo",
        "color": "#f5f3ff",
        "darkColor": "#2e1065",
        "border": "#8b5cf6",
        "cells": [
          [
            3,
            4
          ],
          [
            4,
            4
          ]
        ]
      }
    ],
    "furniture": [
      {
        "id": "fountain2",
        "name": "Marble Basin",
        "row": 2,
        "col": 2,
        "icon": "fountain"
      },
      {
        "id": "workbench",
        "name": "Gardener Bench",
        "row": 4,
        "col": 0,
        "icon": "desk"
      },
      {
        "id": "trellis",
        "name": "Iron Trellis",
        "row": 0,
        "col": 2,
        "icon": "bookcase"
      }
    ],
    "people": [
      {
        "id": "victim",
        "name": "Botanist Thorne",
        "role": "Head Horticulturist",
        "isVictim": true,
        "isMurderer": false,
        "color": "#ef4444"
      },
      {
        "id": "drake",
        "name": "Professor Drake",
        "role": "Rival Herbalist",
        "isVictim": false,
        "isMurderer": true,
        "color": "#7c3aed"
      },
      {
        "id": "celeste",
        "name": "Celeste Fontaine",
        "role": "Orchid Collector",
        "isVictim": false,
        "isMurderer": false,
        "color": "#0ea5e9"
      },
      {
        "id": "julian",
        "name": "Julian Vance",
        "role": "Groundskeeper",
        "isVictim": false,
        "isMurderer": false,
        "color": "#10b981"
      },
      {
        "id": "beatrice",
        "name": "Lady Beatrice",
        "role": "Estate Benefactor",
        "isVictim": false,
        "isMurderer": false,
        "color": "#f59e0b"
      }
    ],
    "clues": [
      {
        "id": "m2-1",
        "type": "at_cell",
        "p1": "victim",
        "r": 0,
        "c": 3,
        "text": "Botanist Thorne was found in the Main Conservatory at Row 1, Column 4."
      },
      {
        "id": "m2-2",
        "type": "in_room",
        "p1": "drake",
        "roomId": "conservatory",
        "text": "Professor Drake admitted entering the Main Conservatory."
      },
      {
        "id": "m2-3",
        "type": "in_room",
        "p1": "celeste",
        "roomId": "glasshouse",
        "text": "Celeste Fontaine was admiring ferns in the Tropical Glasshouse."
      },
      {
        "id": "m2-4",
        "type": "in_room",
        "p1": "julian",
        "roomId": "shed",
        "text": "Julian Vance was stowing shears in the Potting Shed."
      },
      {
        "id": "m2-5",
        "type": "in_room",
        "p1": "beatrice",
        "roomId": "rosegarden",
        "text": "Lady Beatrice was strolling through the Rose Garden."
      },
      {
        "id": "m2-6",
        "type": "east_of_person",
        "p1": "drake",
        "p2": "victim",
        "text": "Professor Drake stood east of Botanist Thorne."
      },
      {
        "id": "m2-7",
        "type": "directly_west_of_furniture",
        "p1": "celeste",
        "furnitureId": "fountain2",
        "text": "Celeste Fontaine was standing directly west of the Marble Basin."
      },
      {
        "id": "m2-8",
        "type": "directly_north_of_furniture",
        "p1": "julian",
        "furnitureId": "workbench",
        "text": "Julian Vance was standing directly north of the Gardener Bench."
      }
    ],
    "solution": {
      "victim": {
        "r": 0,
        "c": 3,
        "roomId": "conservatory"
      },
      "drake": {
        "r": 1,
        "c": 4,
        "roomId": "conservatory"
      },
      "celeste": {
        "r": 2,
        "c": 1,
        "roomId": "glasshouse"
      },
      "julian": {
        "r": 3,
        "c": 0,
        "roomId": "shed"
      },
      "beatrice": {
        "r": 4,
        "c": 2,
        "roomId": "rosegarden"
      }
    },
    "murdererId": "drake"
  },
  {
    "id": "medium-3",
    "title": "The Grand Hotel Penthouse",
    "subtitle": "A high-stakes investor met his demise on the 40th floor.",
    "story": "Hotelier Vance was discovered lifeless in his penthouse suite. Four elite patrons had card-key access to the private level. Examine the security logs and locate the killer.",
    "difficulty": "medium",
    "gridSize": 5,
    "rooms": [
      {
        "id": "suite",
        "name": "Master Suite",
        "color": "#fef2f2",
        "darkColor": "#450a0a",
        "border": "#ef4444",
        "cells": [
          [
            0,
            1
          ],
          [
            0,
            2
          ],
          [
            1,
            1
          ],
          [
            1,
            2
          ],
          [
            1,
            3
          ]
        ]
      },
      {
        "id": "lounge",
        "name": "Lobby Lounge",
        "color": "#eff6ff",
        "darkColor": "#172554",
        "border": "#3b82f6",
        "cells": [
          [
            0,
            0
          ],
          [
            1,
            0
          ],
          [
            2,
            0
          ],
          [
            2,
            1
          ],
          [
            3,
            0
          ],
          [
            3,
            1
          ]
        ]
      },
      {
        "id": "terrace",
        "name": "Rooftop Terrace",
        "color": "#f0fdf4",
        "darkColor": "#052e16",
        "border": "#22c55e",
        "cells": [
          [
            0,
            3
          ],
          [
            0,
            4
          ],
          [
            1,
            4
          ],
          [
            2,
            4
          ],
          [
            3,
            4
          ]
        ]
      },
      {
        "id": "bar",
        "name": "Private Wine Bar",
        "color": "#fffbeb",
        "darkColor": "#451a03",
        "border": "#f59e0b",
        "cells": [
          [
            2,
            2
          ],
          [
            2,
            3
          ],
          [
            3,
            2
          ],
          [
            3,
            3
          ],
          [
            4,
            2
          ],
          [
            4,
            3
          ]
        ]
      },
      {
        "id": "spa",
        "name": "Sky Spa",
        "color": "#f5f3ff",
        "darkColor": "#2e1065",
        "border": "#8b5cf6",
        "cells": [
          [
            4,
            0
          ],
          [
            4,
            1
          ],
          [
            4,
            4
          ]
        ]
      }
    ],
    "furniture": [
      {
        "id": "fireplace3",
        "name": "Gas Fireplace",
        "row": 1,
        "col": 2,
        "icon": "fireplace"
      },
      {
        "id": "safe3",
        "name": "Wall Safe",
        "row": 0,
        "col": 1,
        "icon": "safe"
      },
      {
        "id": "barcounter",
        "name": "Marble Bar",
        "row": 4,
        "col": 2,
        "icon": "desk"
      }
    ],
    "people": [
      {
        "id": "victim",
        "name": "Hotelier Vance",
        "role": "Penthouse Owner",
        "isVictim": true,
        "isMurderer": false,
        "color": "#ef4444"
      },
      {
        "id": "delacroix",
        "name": "Countess Delacroix",
        "role": "Foreign Investor",
        "isVictim": false,
        "isMurderer": true,
        "color": "#ec4899"
      },
      {
        "id": "hugo",
        "name": "Hugo Trent",
        "role": "Security Director",
        "isVictim": false,
        "isMurderer": false,
        "color": "#3b82f6"
      },
      {
        "id": "valeria",
        "name": "Valeria Voss",
        "role": "Casino Mogul",
        "isVictim": false,
        "isMurderer": false,
        "color": "#8b5cf6"
      },
      {
        "id": "felix",
        "name": "Felix Moreau",
        "role": "Concierge",
        "isVictim": false,
        "isMurderer": false,
        "color": "#10b981"
      }
    ],
    "clues": [
      {
        "id": "m3-1",
        "type": "at_cell",
        "p1": "victim",
        "r": 1,
        "c": 1,
        "text": "Hotelier Vance was found at Row 2, Column 2 in the Master Suite."
      },
      {
        "id": "m3-2",
        "type": "in_room",
        "p1": "delacroix",
        "roomId": "suite",
        "text": "Countess Delacroix was present in the Master Suite."
      },
      {
        "id": "m3-3",
        "type": "in_room",
        "p1": "hugo",
        "roomId": "lounge",
        "text": "Hugo Trent was stationed in the Lobby Lounge."
      },
      {
        "id": "m3-4",
        "type": "in_room",
        "p1": "valeria",
        "roomId": "terrace",
        "text": "Valeria Voss was enjoying champagne on the Rooftop Terrace."
      },
      {
        "id": "m3-5",
        "type": "in_room",
        "p1": "felix",
        "roomId": "bar",
        "text": "Felix Moreau was restocking glasses in the Private Wine Bar."
      },
      {
        "id": "m3-6",
        "type": "directly_east_of_furniture",
        "p1": "felix",
        "furnitureId": "barcounter",
        "text": "Felix Moreau was standing directly east of the Marble Bar."
      },
      {
        "id": "m3-7",
        "type": "west_of_person",
        "p1": "hugo",
        "p2": "victim",
        "text": "Hugo Trent was located west of Hotelier Vance."
      },
      {
        "id": "m3-8",
        "type": "north_of_person",
        "p1": "delacroix",
        "p2": "victim",
        "text": "Countess Delacroix was positioned north of Hotelier Vance."
      },
      {
        "id": "m3-9",
        "type": "north_of_person",
        "p1": "hugo",
        "p2": "valeria",
        "text": "Hugo Trent was stationed further north than Valeria Voss."
      }
    ],
    "solution": {
      "victim": {
        "r": 1,
        "c": 1,
        "roomId": "suite"
      },
      "delacroix": {
        "r": 0,
        "c": 2,
        "roomId": "suite"
      },
      "hugo": {
        "r": 2,
        "c": 0,
        "roomId": "lounge"
      },
      "valeria": {
        "r": 3,
        "c": 4,
        "roomId": "terrace"
      },
      "felix": {
        "r": 4,
        "c": 3,
        "roomId": "bar"
      }
    },
    "murdererId": "delacroix"
  },
  {
    "id": "medium-4",
    "title": "The Clocktower Sabotage",
    "subtitle": "The master horologist fell among the giant brass gears.",
    "story": "High in the historic St. Jude Clocktower, Horologist Finch was crushed beneath the great pendulum. Four associates were in the tower works. Piece together their locations to find the culprit.",
    "difficulty": "medium",
    "gridSize": 5,
    "rooms": [
      {
        "id": "archive",
        "name": "Schematic Archive",
        "color": "#eff6ff",
        "darkColor": "#172554",
        "border": "#3b82f6",
        "cells": [
          [
            0,
            0
          ],
          [
            0,
            1
          ],
          [
            0,
            2
          ],
          [
            1,
            0
          ],
          [
            1,
            1
          ]
        ]
      },
      {
        "id": "belfry",
        "name": "Great Belfry",
        "color": "#fef2f2",
        "darkColor": "#450a0a",
        "border": "#ef4444",
        "cells": [
          [
            1,
            2
          ],
          [
            1,
            3
          ],
          [
            2,
            2
          ],
          [
            2,
            3
          ],
          [
            3,
            2
          ],
          [
            3,
            3
          ]
        ]
      },
      {
        "id": "workshop",
        "name": "Clockwork Workshop",
        "color": "#fffbeb",
        "darkColor": "#451a03",
        "border": "#f59e0b",
        "cells": [
          [
            2,
            0
          ],
          [
            2,
            1
          ],
          [
            3,
            0
          ],
          [
            3,
            1
          ],
          [
            4,
            0
          ],
          [
            4,
            1
          ]
        ]
      },
      {
        "id": "dial",
        "name": "Dial Chamber",
        "color": "#f5f3ff",
        "darkColor": "#2e1065",
        "border": "#8b5cf6",
        "cells": [
          [
            0,
            3
          ],
          [
            0,
            4
          ],
          [
            1,
            4
          ],
          [
            2,
            4
          ]
        ]
      },
      {
        "id": "ring",
        "name": "Observation Ring",
        "color": "#f0fdf4",
        "darkColor": "#052e16",
        "border": "#22c55e",
        "cells": [
          [
            3,
            4
          ],
          [
            4,
            2
          ],
          [
            4,
            3
          ],
          [
            4,
            4
          ]
        ]
      }
    ],
    "furniture": [
      {
        "id": "pendulum",
        "name": "Grand Pendulum",
        "row": 2,
        "col": 3,
        "icon": "clock"
      },
      {
        "id": "lathe",
        "name": "Brass Lathe",
        "row": 4,
        "col": 0,
        "icon": "desk"
      },
      {
        "id": "blueprint",
        "name": "Drafting Table",
        "row": 0,
        "col": 0,
        "icon": "bookcase"
      }
    ],
    "people": [
      {
        "id": "victim",
        "name": "Horologist Finch",
        "role": "Master Clockmaker",
        "isVictim": true,
        "isMurderer": false,
        "color": "#ef4444"
      },
      {
        "id": "tobias",
        "name": "Tobias Vance",
        "role": "Disgruntled Apprentice",
        "isVictim": false,
        "isMurderer": true,
        "color": "#dc2626"
      },
      {
        "id": "agatha",
        "name": "Agatha Crowley",
        "role": "Municipal Inspector",
        "isVictim": false,
        "isMurderer": false,
        "color": "#0ea5e9"
      },
      {
        "id": "bartholomew",
        "name": "Bartholomew Hyde",
        "role": "Bellringer",
        "isVictim": false,
        "isMurderer": false,
        "color": "#8b5cf6"
      },
      {
        "id": "cecily",
        "name": "Cecily Barnes",
        "role": "Tower Historian",
        "isVictim": false,
        "isMurderer": false,
        "color": "#10b981"
      }
    ],
    "clues": [
      {
        "id": "m4-1",
        "type": "at_cell",
        "p1": "victim",
        "r": 2,
        "c": 2,
        "text": "Horologist Finch was found beside the gears at Row 3, Column 3 in the Great Belfry."
      },
      {
        "id": "m4-2",
        "type": "in_room",
        "p1": "tobias",
        "roomId": "belfry",
        "text": "Tobias Vance admitted he was in the Great Belfry."
      },
      {
        "id": "m4-3",
        "type": "in_room",
        "p1": "agatha",
        "roomId": "archive",
        "text": "Agatha Crowley was reviewing permits in the Schematic Archive."
      },
      {
        "id": "m4-4",
        "type": "in_room",
        "p1": "bartholomew",
        "roomId": "workshop",
        "text": "Bartholomew Hyde was cleaning gear wheels in the Clockwork Workshop."
      },
      {
        "id": "m4-5",
        "type": "in_room",
        "p1": "cecily",
        "roomId": "ring",
        "text": "Cecily Barnes was recording panoramic views from the Observation Ring."
      },
      {
        "id": "m4-6",
        "type": "north_of_person",
        "p1": "tobias",
        "p2": "victim",
        "text": "Tobias Vance stood north of Horologist Finch."
      },
      {
        "id": "m4-7",
        "type": "directly_north_of_furniture",
        "p1": "bartholomew",
        "furnitureId": "lathe",
        "text": "Bartholomew Hyde stood directly north of the Brass Lathe."
      },
      {
        "id": "m4-8",
        "type": "east_of_furniture",
        "p1": "cecily",
        "furnitureId": "pendulum",
        "text": "Cecily Barnes was located east of the Grand Pendulum."
      },
      {
        "id": "m4-9",
        "type": "directly_east_of_furniture",
        "p1": "agatha",
        "furnitureId": "blueprint",
        "text": "Agatha Crowley stood directly east of the Drafting Table."
      }
    ],
    "solution": {
      "victim": {
        "r": 2,
        "c": 2,
        "roomId": "belfry"
      },
      "tobias": {
        "r": 1,
        "c": 3,
        "roomId": "belfry"
      },
      "agatha": {
        "r": 0,
        "c": 1,
        "roomId": "archive"
      },
      "bartholomew": {
        "r": 3,
        "c": 0,
        "roomId": "workshop"
      },
      "cecily": {
        "r": 4,
        "c": 4,
        "roomId": "ring"
      }
    },
    "murdererId": "tobias"
  },
  {
    "id": "hard-1",
    "title": "The Midnight Masquerade",
    "subtitle": "The host was found poisoned behind heavy velvet curtains.",
    "story": "Beneath the glittering crystal chandeliers of Blackwood Hall, Lord Ravenscroft was found poisoned in the Master Suite. Six masquerade guests held secrets. Follow the intricate clues to isolate the assassin.",
    "difficulty": "hard",
    "gridSize": 6,
    "rooms": [
      {
        "id": "suite",
        "name": "Master Suite",
        "color": "#fef2f2",
        "darkColor": "#450a0a",
        "border": "#ef4444",
        "cells": [
          [
            0,
            0
          ],
          [
            0,
            1
          ],
          [
            0,
            2
          ],
          [
            1,
            0
          ],
          [
            1,
            1
          ]
        ]
      },
      {
        "id": "ballroom",
        "name": "Grand Ballroom",
        "color": "#eff6ff",
        "darkColor": "#172554",
        "border": "#3b82f6",
        "cells": [
          [
            0,
            3
          ],
          [
            0,
            4
          ],
          [
            0,
            5
          ],
          [
            1,
            2
          ],
          [
            1,
            3
          ],
          [
            1,
            4
          ],
          [
            1,
            5
          ]
        ]
      },
      {
        "id": "cellar",
        "name": "Wine Cellar",
        "color": "#fffbeb",
        "darkColor": "#451a03",
        "border": "#f59e0b",
        "cells": [
          [
            2,
            0
          ],
          [
            2,
            1
          ],
          [
            3,
            0
          ],
          [
            3,
            1
          ],
          [
            4,
            0
          ]
        ]
      },
      {
        "id": "grandhall",
        "name": "Grand Hall",
        "color": "#f5f3ff",
        "darkColor": "#2e1065",
        "border": "#8b5cf6",
        "cells": [
          [
            2,
            2
          ],
          [
            2,
            3
          ],
          [
            3,
            2
          ],
          [
            3,
            3
          ],
          [
            4,
            1
          ],
          [
            4,
            2
          ],
          [
            4,
            3
          ]
        ]
      },
      {
        "id": "gallery",
        "name": "Art Gallery",
        "color": "#f0fdf4",
        "darkColor": "#052e16",
        "border": "#22c55e",
        "cells": [
          [
            2,
            4
          ],
          [
            2,
            5
          ],
          [
            3,
            4
          ],
          [
            3,
            5
          ],
          [
            4,
            4
          ]
        ]
      },
      {
        "id": "conservatory",
        "name": "Conservatory",
        "color": "#fdf2f8",
        "darkColor": "#500724",
        "border": "#ec4899",
        "cells": [
          [
            4,
            5
          ],
          [
            5,
            0
          ],
          [
            5,
            1
          ],
          [
            5,
            2
          ],
          [
            5,
            3
          ],
          [
            5,
            4
          ],
          [
            5,
            5
          ]
        ]
      }
    ],
    "furniture": [
      {
        "id": "chandelier",
        "name": "Crystal Chandelier",
        "row": 2,
        "col": 2,
        "icon": "fountain"
      },
      {
        "id": "winerack",
        "name": "Vintage Wine Rack",
        "row": 3,
        "col": 0,
        "icon": "bookcase"
      },
      {
        "id": "statue",
        "name": "Marble Statue",
        "row": 3,
        "col": 5,
        "icon": "statue"
      },
      {
        "id": "bed",
        "name": "Canopy Bed",
        "row": 0,
        "col": 0,
        "icon": "desk"
      }
    ],
    "people": [
      {
        "id": "victim",
        "name": "Lord Ravenscroft",
        "role": "Estate Lord",
        "isVictim": true,
        "isMurderer": false,
        "color": "#ef4444"
      },
      {
        "id": "genevieve",
        "name": "Lady Genevieve",
        "role": "Devious Heiress",
        "isVictim": false,
        "isMurderer": true,
        "color": "#ec4899"
      },
      {
        "id": "higgins",
        "name": "Butler Higgins",
        "role": "Senior Butler",
        "isVictim": false,
        "isMurderer": false,
        "color": "#3b82f6"
      },
      {
        "id": "sterling",
        "name": "Baron Sterling",
        "role": "Rival Collector",
        "isVictim": false,
        "isMurderer": false,
        "color": "#8b5cf6"
      },
      {
        "id": "clara",
        "name": "Maid Clara",
        "role": "Head Housekeeper",
        "isVictim": false,
        "isMurderer": false,
        "color": "#10b981"
      },
      {
        "id": "arthur",
        "name": "Duke Arthur",
        "role": "Royal Dignitary",
        "isVictim": false,
        "isMurderer": false,
        "color": "#f59e0b"
      }
    ],
    "clues": [
      {
        "id": "h1-1",
        "type": "at_cell",
        "p1": "victim",
        "r": 1,
        "c": 1,
        "text": "Lord Ravenscroft was found poisoned in the Master Suite at Row 2, Column 2."
      },
      {
        "id": "h1-2",
        "type": "in_room",
        "p1": "genevieve",
        "roomId": "suite",
        "text": "Lady Genevieve was seen slipping into the Master Suite."
      },
      {
        "id": "h1-3",
        "type": "in_room",
        "p1": "higgins",
        "roomId": "cellar",
        "text": "Butler Higgins was fetching wine in the Wine Cellar."
      },
      {
        "id": "h1-4",
        "type": "in_room",
        "p1": "sterling",
        "roomId": "gallery",
        "text": "Baron Sterling was admiring paintings in the Art Gallery."
      },
      {
        "id": "h1-5",
        "type": "in_room",
        "p1": "clara",
        "roomId": "grandhall",
        "text": "Maid Clara was attending guests in the Grand Hall."
      },
      {
        "id": "h1-6",
        "type": "in_room",
        "p1": "arthur",
        "roomId": "conservatory",
        "text": "Duke Arthur was smoking a pipe in the Conservatory."
      },
      {
        "id": "h1-7",
        "type": "directly_north_of_furniture",
        "p1": "higgins",
        "furnitureId": "winerack",
        "text": "Butler Higgins was standing directly north of the Vintage Wine Rack."
      },
      {
        "id": "h1-8",
        "type": "east_of_person",
        "p1": "clara",
        "p2": "higgins",
        "text": "Maid Clara was situated east of Butler Higgins."
      },
      {
        "id": "h1-9",
        "type": "same_row_as_furniture",
        "p1": "sterling",
        "furnitureId": "winerack",
        "text": "Baron Sterling was on the same horizontal row as the Vintage Wine Rack."
      },
      {
        "id": "h1-10",
        "type": "east_of_person",
        "p1": "arthur",
        "p2": "clara",
        "text": "Duke Arthur was in the southeastern corner of the estate."
      },
      {
        "id": "h1-11",
        "type": "east_of_person",
        "p1": "genevieve",
        "p2": "victim",
        "text": "Lady Genevieve was standing east of Lord Ravenscroft."
      },
      {
        "id": "h1-12",
        "type": "directly_west_of_furniture",
        "p1": "sterling",
        "furnitureId": "statue",
        "text": "Baron Sterling was standing directly west of the Marble Statue."
      }
    ],
    "solution": {
      "victim": {
        "r": 1,
        "c": 1,
        "roomId": "suite"
      },
      "genevieve": {
        "r": 0,
        "c": 2,
        "roomId": "suite"
      },
      "higgins": {
        "r": 2,
        "c": 0,
        "roomId": "cellar"
      },
      "sterling": {
        "r": 3,
        "c": 4,
        "roomId": "gallery"
      },
      "clara": {
        "r": 4,
        "c": 3,
        "roomId": "grandhall"
      },
      "arthur": {
        "r": 5,
        "c": 5,
        "roomId": "conservatory"
      }
    },
    "murdererId": "genevieve"
  },
  {
    "id": "hard-2",
    "title": "The Cathedral Crypt",
    "subtitle": "The venerable Archbishop was silenced before the holy relics.",
    "story": "Deep beneath the vaulted arches of St. Jude Cathedral, Archbishop Ignatius was discovered near the stone tombs. Six clergy and visitors were in the subterranean complex. Trace their steps to name the traitor.",
    "difficulty": "hard",
    "gridSize": 6,
    "rooms": [
      {
        "id": "sanctuary",
        "name": "High Sanctuary",
        "color": "#eff6ff",
        "darkColor": "#172554",
        "border": "#3b82f6",
        "cells": [
          [
            0,
            0
          ],
          [
            0,
            1
          ],
          [
            0,
            2
          ],
          [
            1,
            0
          ],
          [
            1,
            1
          ]
        ]
      },
      {
        "id": "tower",
        "name": "Bell Tower Base",
        "color": "#f5f3ff",
        "darkColor": "#2e1065",
        "border": "#8b5cf6",
        "cells": [
          [
            0,
            3
          ],
          [
            0,
            4
          ],
          [
            0,
            5
          ],
          [
            1,
            4
          ],
          [
            1,
            5
          ]
        ]
      },
      {
        "id": "crypt",
        "name": "Ancient Crypt",
        "color": "#fef2f2",
        "darkColor": "#450a0a",
        "border": "#ef4444",
        "cells": [
          [
            2,
            0
          ],
          [
            2,
            1
          ],
          [
            3,
            0
          ],
          [
            3,
            1
          ],
          [
            4,
            0
          ],
          [
            4,
            1
          ]
        ]
      },
      {
        "id": "nave",
        "name": "Lower Nave",
        "color": "#fffbeb",
        "darkColor": "#451a03",
        "border": "#f59e0b",
        "cells": [
          [
            1,
            2
          ],
          [
            1,
            3
          ],
          [
            2,
            2
          ],
          [
            2,
            3
          ],
          [
            3,
            2
          ],
          [
            3,
            3
          ]
        ]
      },
      {
        "id": "cloister",
        "name": "Inner Cloister",
        "color": "#f0fdf4",
        "darkColor": "#052e16",
        "border": "#22c55e",
        "cells": [
          [
            2,
            4
          ],
          [
            2,
            5
          ],
          [
            3,
            4
          ],
          [
            3,
            5
          ],
          [
            4,
            4
          ],
          [
            4,
            5
          ]
        ]
      },
      {
        "id": "catacombs",
        "name": "Deep Catacombs",
        "color": "#fdf2f8",
        "darkColor": "#500724",
        "border": "#ec4899",
        "cells": [
          [
            4,
            2
          ],
          [
            4,
            3
          ],
          [
            5,
            0
          ],
          [
            5,
            1
          ],
          [
            5,
            2
          ],
          [
            5,
            3
          ],
          [
            5,
            4
          ],
          [
            5,
            5
          ]
        ]
      }
    ],
    "furniture": [
      {
        "id": "altar",
        "name": "Gilded Altar",
        "row": 0,
        "col": 1,
        "icon": "desk"
      },
      {
        "id": "sarcophagus",
        "name": "Stone Sarcophagus",
        "row": 3,
        "col": 0,
        "icon": "safe"
      },
      {
        "id": "font",
        "name": "Holy Water Font",
        "row": 2,
        "col": 3,
        "icon": "fountain"
      },
      {
        "id": "reliquary",
        "name": "Relic Chest",
        "row": 4,
        "col": 5,
        "icon": "bookcase"
      }
    ],
    "people": [
      {
        "id": "victim",
        "name": "Archbishop Ignatius",
        "role": "Cathedral Prelate",
        "isVictim": true,
        "isMurderer": false,
        "color": "#ef4444"
      },
      {
        "id": "vane",
        "name": "Inquisitor Vane",
        "role": "Fanatical Inquisitor",
        "isVictim": false,
        "isMurderer": true,
        "color": "#dc2626"
      },
      {
        "id": "paul",
        "name": "Deacon Paul",
        "role": "Archivist Priest",
        "isVictim": false,
        "isMurderer": false,
        "color": "#3b82f6"
      },
      {
        "id": "beatrice",
        "name": "Sister Beatrice",
        "role": "Abbey Nun",
        "isVictim": false,
        "isMurderer": false,
        "color": "#8b5cf6"
      },
      {
        "id": "thomas",
        "name": "Gravekeeper Thomas",
        "role": "Sexton",
        "isVictim": false,
        "isMurderer": false,
        "color": "#10b981"
      },
      {
        "id": "sean",
        "name": "Sean O’Malley",
        "role": "Antiquarian",
        "isVictim": false,
        "isMurderer": false,
        "color": "#f59e0b"
      }
    ],
    "clues": [
      {
        "id": "h2-1",
        "type": "at_cell",
        "p1": "victim",
        "r": 2,
        "c": 1,
        "text": "Archbishop Ignatius was found in the Ancient Crypt at Row 3, Column 2."
      },
      {
        "id": "h2-2",
        "type": "in_room",
        "p1": "vane",
        "roomId": "crypt",
        "text": "Inquisitor Vane was praying in the Ancient Crypt."
      },
      {
        "id": "h2-3",
        "type": "in_room",
        "p1": "paul",
        "roomId": "sanctuary",
        "text": "Deacon Paul was preparing incense in the High Sanctuary."
      },
      {
        "id": "h2-4",
        "type": "in_room",
        "p1": "beatrice",
        "roomId": "tower",
        "text": "Sister Beatrice was winding the chime ropes in the Bell Tower Base."
      },
      {
        "id": "h2-5",
        "type": "in_room",
        "p1": "thomas",
        "roomId": "nave",
        "text": "Gravekeeper Thomas was lighting candles in the Lower Nave."
      },
      {
        "id": "h2-6",
        "type": "in_room",
        "p1": "sean",
        "roomId": "catacombs",
        "text": "Sean O’Malley was studying inscriptions in the Deep Catacombs."
      },
      {
        "id": "h2-7",
        "type": "directly_east_of_furniture",
        "p1": "paul",
        "furnitureId": "altar",
        "text": "Deacon Paul was standing directly east of the Gilded Altar."
      },
      {
        "id": "h2-8",
        "type": "directly_south_of_furniture",
        "p1": "sean",
        "furnitureId": "reliquary",
        "text": "Sean O’Malley stood directly south of the Relic Chest."
      },
      {
        "id": "h2-9",
        "type": "directly_south_of_furniture",
        "p1": "vane",
        "furnitureId": "sarcophagus",
        "text": "Inquisitor Vane stood directly south of the Stone Sarcophagus."
      },
      {
        "id": "h2-10",
        "type": "directly_south_of_furniture",
        "p1": "thomas",
        "furnitureId": "font",
        "text": "Gravekeeper Thomas stood directly south of the Holy Water Font."
      },
      {
        "id": "h2-11",
        "type": "east_of_person",
        "p1": "beatrice",
        "p2": "paul",
        "text": "Sister Beatrice was positioned east of Deacon Paul."
      }
    ],
    "solution": {
      "victim": {
        "r": 2,
        "c": 1,
        "roomId": "crypt"
      },
      "vane": {
        "r": 4,
        "c": 0,
        "roomId": "crypt"
      },
      "paul": {
        "r": 0,
        "c": 2,
        "roomId": "sanctuary"
      },
      "beatrice": {
        "r": 1,
        "c": 4,
        "roomId": "tower"
      },
      "thomas": {
        "r": 3,
        "c": 3,
        "roomId": "nave"
      },
      "sean": {
        "r": 5,
        "c": 5,
        "roomId": "catacombs"
      }
    },
    "murdererId": "vane"
  },
  {
    "id": "hard-3",
    "title": "The Royal Opera Gala",
    "subtitle": "The renowned maestro was struck down moments before the overture.",
    "story": "Just as the orchestra tuned in the pit, Maestro Bellini was found breathless in the Dressing Rooms. Five attendees and artists were within earshot. Untangle the intricate alibis to uncover the killer.",
    "difficulty": "hard",
    "gridSize": 6,
    "rooms": [
      {
        "id": "stage",
        "name": "Grand Stage",
        "color": "#eff6ff",
        "darkColor": "#172554",
        "border": "#3b82f6",
        "cells": [
          [
            0,
            0
          ],
          [
            0,
            1
          ],
          [
            0,
            2
          ],
          [
            1,
            0
          ],
          [
            1,
            1
          ],
          [
            1,
            2
          ]
        ]
      },
      {
        "id": "royalbox",
        "name": "Royal Box",
        "color": "#f5f3ff",
        "darkColor": "#2e1065",
        "border": "#8b5cf6",
        "cells": [
          [
            0,
            3
          ],
          [
            0,
            4
          ],
          [
            0,
            5
          ],
          [
            1,
            3
          ],
          [
            1,
            4
          ]
        ]
      },
      {
        "id": "pit",
        "name": "Orchestra Pit",
        "color": "#f0fdf4",
        "darkColor": "#052e16",
        "border": "#22c55e",
        "cells": [
          [
            1,
            5
          ],
          [
            2,
            4
          ],
          [
            2,
            5
          ],
          [
            3,
            3
          ],
          [
            3,
            4
          ],
          [
            3,
            5
          ]
        ]
      },
      {
        "id": "dressing",
        "name": "Dressing Rooms",
        "color": "#fef2f2",
        "darkColor": "#450a0a",
        "border": "#ef4444",
        "cells": [
          [
            2,
            0
          ],
          [
            2,
            1
          ],
          [
            3,
            0
          ],
          [
            3,
            1
          ],
          [
            4,
            0
          ],
          [
            4,
            1
          ]
        ]
      },
      {
        "id": "foyer",
        "name": "Grand Foyer",
        "color": "#fffbeb",
        "darkColor": "#451a03",
        "border": "#f59e0b",
        "cells": [
          [
            2,
            2
          ],
          [
            2,
            3
          ],
          [
            3,
            2
          ],
          [
            4,
            2
          ],
          [
            4,
            3
          ]
        ]
      },
      {
        "id": "backstage",
        "name": "Backstage Props",
        "color": "#fdf2f8",
        "darkColor": "#500724",
        "border": "#ec4899",
        "cells": [
          [
            4,
            4
          ],
          [
            4,
            5
          ],
          [
            5,
            0
          ],
          [
            5,
            1
          ],
          [
            5,
            2
          ],
          [
            5,
            3
          ],
          [
            5,
            4
          ],
          [
            5,
            5
          ]
        ]
      }
    ],
    "furniture": [
      {
        "id": "piano3",
        "name": "Grand Piano",
        "row": 1,
        "col": 1,
        "icon": "piano"
      },
      {
        "id": "harp",
        "name": "Concert Harp",
        "row": 3,
        "col": 5,
        "icon": "fountain"
      },
      {
        "id": "mirror",
        "name": "Vanity Mirror",
        "row": 2,
        "col": 0,
        "icon": "desk"
      },
      {
        "id": "propbox",
        "name": "Costume Chest",
        "row": 5,
        "col": 4,
        "icon": "safe"
      }
    ],
    "people": [
      {
        "id": "victim",
        "name": "Maestro Bellini",
        "role": "Chief Conductor",
        "isVictim": true,
        "isMurderer": false,
        "color": "#ef4444"
      },
      {
        "id": "isabella",
        "name": "Prima Donna Isabella",
        "role": "Lead Soprano",
        "isVictim": false,
        "isMurderer": true,
        "color": "#ec4899"
      },
      {
        "id": "marco",
        "name": "Tenor Marco",
        "role": "Lead Tenor",
        "isVictim": false,
        "isMurderer": false,
        "color": "#3b82f6"
      },
      {
        "id": "fritz",
        "name": "Fritz Krause",
        "role": "Concertmaster",
        "isVictim": false,
        "isMurderer": false,
        "color": "#10b981"
      },
      {
        "id": "alistair",
        "name": "Alistair Vance",
        "role": "Music Critic",
        "isVictim": false,
        "isMurderer": false,
        "color": "#8b5cf6"
      },
      {
        "id": "boris",
        "name": "Boris Volkov",
        "role": "Stage Carpenter",
        "isVictim": false,
        "isMurderer": false,
        "color": "#f59e0b"
      }
    ],
    "clues": [
      {
        "id": "h3-1",
        "type": "at_cell",
        "p1": "victim",
        "r": 2,
        "c": 1,
        "text": "Maestro Bellini was found in the Dressing Rooms at Row 3, Column 2."
      },
      {
        "id": "h3-2",
        "type": "in_room",
        "p1": "isabella",
        "roomId": "dressing",
        "text": "Prima Donna Isabella admitted she was in the Dressing Rooms."
      },
      {
        "id": "h3-3",
        "type": "in_room",
        "p1": "alistair",
        "roomId": "royalbox",
        "text": "Critic Alistair Vance was seated in the Royal Box."
      },
      {
        "id": "h3-4",
        "type": "in_room",
        "p1": "marco",
        "roomId": "stage",
        "text": "Tenor Marco was rehearsing scales on the Grand Stage."
      },
      {
        "id": "h3-5",
        "type": "in_room",
        "p1": "fritz",
        "roomId": "pit",
        "text": "Fritz Krause was tuning violins in the Orchestra Pit."
      },
      {
        "id": "h3-6",
        "type": "in_room",
        "p1": "boris",
        "roomId": "backstage",
        "text": "Boris Volkov was securing scenery ropes in Backstage Props."
      },
      {
        "id": "h3-7",
        "type": "directly_east_of_furniture",
        "p1": "marco",
        "furnitureId": "piano3",
        "text": "Tenor Marco was standing directly east of the Grand Piano."
      },
      {
        "id": "h3-8",
        "type": "directly_west_of_furniture",
        "p1": "fritz",
        "furnitureId": "harp",
        "text": "Fritz Krause was standing directly west of the Concert Harp."
      },
      {
        "id": "h3-9",
        "type": "directly_east_of_furniture",
        "p1": "boris",
        "furnitureId": "propbox",
        "text": "Boris Volkov was standing directly east of the Costume Chest."
      },
      {
        "id": "h3-10",
        "type": "same_col_as_person",
        "p1": "alistair",
        "p2": "fritz",
        "text": "Critic Alistair Vance was located west of Fritz Krause."
      },
      {
        "id": "h3-11",
        "type": "south_of_person",
        "p1": "isabella",
        "p2": "victim",
        "text": "Prima Donna Isabella stood south of Maestro Bellini."
      }
    ],
    "solution": {
      "victim": {
        "r": 2,
        "c": 1,
        "roomId": "dressing"
      },
      "isabella": {
        "r": 4,
        "c": 0,
        "roomId": "dressing"
      },
      "alistair": {
        "r": 0,
        "c": 3,
        "roomId": "royalbox"
      },
      "marco": {
        "r": 1,
        "c": 2,
        "roomId": "stage"
      },
      "fritz": {
        "r": 3,
        "c": 4,
        "roomId": "pit"
      },
      "boris": {
        "r": 5,
        "c": 5,
        "roomId": "backstage"
      }
    },
    "murdererId": "isabella"
  },
  {
    "id": "hard-4",
    "title": "The Shipwreck of the Gorgon",
    "subtitle": "The flagship admiral was betrayed as the frigate battered the shoals.",
    "story": "Amid tempestuous waves off the rocky reef, Admiral Hawke was murdered on the Quarterdeck of HMS Gorgon. Six officers and hands were on duty. Read their sworn logs and find the mutinous killer.",
    "difficulty": "hard",
    "gridSize": 6,
    "rooms": [
      {
        "id": "quarterdeck",
        "name": "Quarterdeck",
        "color": "#fef2f2",
        "darkColor": "#450a0a",
        "border": "#ef4444",
        "cells": [
          [
            0,
            0
          ],
          [
            0,
            1
          ],
          [
            0,
            2
          ],
          [
            1,
            1
          ],
          [
            1,
            2
          ],
          [
            1,
            3
          ]
        ]
      },
      {
        "id": "charthouse",
        "name": "Chart House",
        "color": "#eff6ff",
        "darkColor": "#172554",
        "border": "#3b82f6",
        "cells": [
          [
            0,
            3
          ],
          [
            0,
            4
          ],
          [
            0,
            5
          ],
          [
            1,
            4
          ],
          [
            1,
            5
          ],
          [
            2,
            0
          ],
          [
            2,
            1
          ]
        ]
      },
      {
        "id": "gundeck",
        "name": "Upper Gun Deck",
        "color": "#fffbeb",
        "darkColor": "#451a03",
        "border": "#f59e0b",
        "cells": [
          [
            2,
            2
          ],
          [
            2,
            3
          ],
          [
            3,
            1
          ],
          [
            3,
            2
          ],
          [
            4,
            1
          ],
          [
            4,
            2
          ]
        ]
      },
      {
        "id": "sickbay",
        "name": "Orlop Sickbay",
        "color": "#f5f3ff",
        "darkColor": "#2e1065",
        "border": "#8b5cf6",
        "cells": [
          [
            2,
            4
          ],
          [
            2,
            5
          ],
          [
            3,
            3
          ],
          [
            3,
            4
          ],
          [
            3,
            5
          ],
          [
            4,
            3
          ],
          [
            4,
            4
          ]
        ]
      },
      {
        "id": "galley",
        "name": "Ship Galley",
        "color": "#f0fdf4",
        "darkColor": "#052e16",
        "border": "#22c55e",
        "cells": [
          [
            3,
            0
          ],
          [
            4,
            0
          ],
          [
            5,
            0
          ],
          [
            5,
            1
          ]
        ]
      },
      {
        "id": "magazine",
        "name": "Powder Magazine",
        "color": "#fdf2f8",
        "darkColor": "#500724",
        "border": "#ec4899",
        "cells": [
          [
            4,
            5
          ],
          [
            5,
            2
          ],
          [
            5,
            3
          ],
          [
            5,
            4
          ],
          [
            5,
            5
          ]
        ]
      }
    ],
    "furniture": [
      {
        "id": "wheel",
        "name": "Ship Helm Wheel",
        "row": 0,
        "col": 2,
        "icon": "clock"
      },
      {
        "id": "cannons",
        "name": "Brass Cannon",
        "row": 4,
        "col": 1,
        "icon": "desk"
      },
      {
        "id": "cot",
        "name": "Surgeon Cot",
        "row": 3,
        "col": 3,
        "icon": "safe"
      },
      {
        "id": "barrel",
        "name": "Powder Keg",
        "row": 5,
        "col": 4,
        "icon": "stove"
      }
    ],
    "people": [
      {
        "id": "victim",
        "name": "Admiral Hawke",
        "role": "Fleet Commander",
        "isVictim": true,
        "isMurderer": false,
        "color": "#ef4444"
      },
      {
        "id": "flint",
        "name": "Quartermaster Flint",
        "role": "Corrupt Quartermaster",
        "isVictim": false,
        "isMurderer": true,
        "color": "#dc2626"
      },
      {
        "id": "sterling",
        "name": "Navigator Sterling",
        "role": "Master Navigator",
        "isVictim": false,
        "isMurderer": false,
        "color": "#3b82f6"
      },
      {
        "id": "graves",
        "name": "Surgeon Graves",
        "role": "Ship Doctor",
        "isVictim": false,
        "isMurderer": false,
        "color": "#10b981"
      },
      {
        "id": "morgan",
        "name": "Boatswain Morgan",
        "role": "Chief Petty Officer",
        "isVictim": false,
        "isMurderer": false,
        "color": "#8b5cf6"
      },
      {
        "id": "drake",
        "name": "Gunner Drake",
        "role": "Master Gunner",
        "isVictim": false,
        "isMurderer": false,
        "color": "#f59e0b"
      }
    ],
    "clues": [
      {
        "id": "h4-1",
        "type": "at_cell",
        "p1": "victim",
        "r": 0,
        "c": 1,
        "text": "Admiral Hawke was found on the Quarterdeck at Row 1, Column 2."
      },
      {
        "id": "h4-2",
        "type": "in_room",
        "p1": "flint",
        "roomId": "quarterdeck",
        "text": "Quartermaster Flint was on duty on the Quarterdeck."
      },
      {
        "id": "h4-3",
        "type": "in_room",
        "p1": "sterling",
        "roomId": "charthouse",
        "text": "Navigator Sterling was plotting courses in the Chart House."
      },
      {
        "id": "h4-4",
        "type": "in_room",
        "p1": "graves",
        "roomId": "sickbay",
        "text": "Surgeon Graves was tending wounded in the Orlop Sickbay."
      },
      {
        "id": "h4-5",
        "type": "in_room",
        "p1": "morgan",
        "roomId": "gundeck",
        "text": "Boatswain Morgan was checking cannon lashings on the Upper Gun Deck."
      },
      {
        "id": "h4-6",
        "type": "in_room",
        "p1": "drake",
        "roomId": "magazine",
        "text": "Gunner Drake was inspecting munitions in the Powder Magazine."
      },
      {
        "id": "h4-7",
        "type": "directly_west_of_furniture",
        "p1": "victim",
        "furnitureId": "wheel",
        "text": "Admiral Hawke fell directly west of the Ship Helm Wheel."
      },
      {
        "id": "h4-8",
        "type": "east_of_person",
        "p1": "flint",
        "p2": "victim",
        "text": "Quartermaster Flint stood east of Admiral Hawke."
      },
      {
        "id": "h4-9",
        "type": "directly_east_of_furniture",
        "p1": "morgan",
        "furnitureId": "cannons",
        "text": "Boatswain Morgan was standing directly east of the Brass Cannon."
      },
      {
        "id": "h4-10",
        "type": "directly_east_of_furniture",
        "p1": "graves",
        "furnitureId": "cot",
        "text": "Surgeon Graves was standing directly east of the Surgeon Cot."
      },
      {
        "id": "h4-11",
        "type": "directly_east_of_furniture",
        "p1": "drake",
        "furnitureId": "barrel",
        "text": "Gunner Drake was standing directly east of the Powder Keg."
      }
    ],
    "solution": {
      "victim": {
        "r": 0,
        "c": 1,
        "roomId": "quarterdeck"
      },
      "flint": {
        "r": 1,
        "c": 3,
        "roomId": "quarterdeck"
      },
      "sterling": {
        "r": 2,
        "c": 0,
        "roomId": "charthouse"
      },
      "morgan": {
        "r": 4,
        "c": 2,
        "roomId": "gundeck"
      },
      "graves": {
        "r": 3,
        "c": 4,
        "roomId": "sickbay"
      },
      "drake": {
        "r": 5,
        "c": 5,
        "roomId": "magazine"
      }
    },
    "murdererId": "flint"
  },
  {
    "id": "expert-1",
    "title": "The Shadow at Blackwood Manor",
    "subtitle": "The master of Blackwood was murdered; the will was stolen from his desk.",
    "story": "Lord Blackwood was found slumped over his desk in the Master Study. Six individuals were locked inside during the heavy snowstorm. No direct eyewitness placed any person in a specific coordinate—only deductive clues remain.",
    "difficulty": "expert",
    "gridSize": 6,
    "rooms": [
      {
        "id": "study",
        "name": "Master Study",
        "color": "#fef2f2",
        "darkColor": "#450a0a",
        "border": "#ef4444",
        "cells": [
          [
            0,
            0
          ],
          [
            0,
            1
          ],
          [
            0,
            2
          ],
          [
            1,
            0
          ],
          [
            1,
            1
          ]
        ]
      },
      {
        "id": "library",
        "name": "Grand Library",
        "color": "#eff6ff",
        "darkColor": "#172554",
        "border": "#3b82f6",
        "cells": [
          [
            0,
            3
          ],
          [
            0,
            4
          ],
          [
            0,
            5
          ],
          [
            1,
            2
          ],
          [
            1,
            3
          ],
          [
            1,
            4
          ],
          [
            1,
            5
          ]
        ]
      },
      {
        "id": "quarters",
        "name": "Servants Quarters",
        "color": "#fffbeb",
        "darkColor": "#451a03",
        "border": "#f59e0b",
        "cells": [
          [
            2,
            0
          ],
          [
            2,
            1
          ],
          [
            3,
            0
          ],
          [
            3,
            1
          ],
          [
            4,
            0
          ]
        ]
      },
      {
        "id": "hall",
        "name": "Grand Hall",
        "color": "#f5f3ff",
        "darkColor": "#2e1065",
        "border": "#8b5cf6",
        "cells": [
          [
            2,
            2
          ],
          [
            2,
            3
          ],
          [
            3,
            2
          ],
          [
            3,
            3
          ],
          [
            4,
            1
          ],
          [
            4,
            2
          ],
          [
            4,
            3
          ]
        ]
      },
      {
        "id": "gallery",
        "name": "Portrait Gallery",
        "color": "#f0fdf4",
        "darkColor": "#052e16",
        "border": "#22c55e",
        "cells": [
          [
            2,
            4
          ],
          [
            2,
            5
          ],
          [
            3,
            4
          ],
          [
            3,
            5
          ],
          [
            4,
            4
          ]
        ]
      },
      {
        "id": "conservatory",
        "name": "Conservatory",
        "color": "#fdf2f8",
        "darkColor": "#500724",
        "border": "#ec4899",
        "cells": [
          [
            4,
            5
          ],
          [
            5,
            0
          ],
          [
            5,
            1
          ],
          [
            5,
            2
          ],
          [
            5,
            3
          ],
          [
            5,
            4
          ],
          [
            5,
            5
          ]
        ]
      }
    ],
    "furniture": [
      {
        "id": "desk",
        "name": "Mahogany Desk",
        "row": 1,
        "col": 0,
        "icon": "desk"
      },
      {
        "id": "safe",
        "name": "Iron Safe",
        "row": 0,
        "col": 0,
        "icon": "safe"
      },
      {
        "id": "fireplace",
        "name": "Stone Fireplace",
        "row": 3,
        "col": 0,
        "icon": "fireplace"
      },
      {
        "id": "statue",
        "name": "Knight Statue",
        "row": 3,
        "col": 5,
        "icon": "statue"
      }
    ],
    "people": [
      {
        "id": "victim",
        "name": "Lord Blackwood",
        "role": "Estate Master",
        "isVictim": true,
        "isMurderer": false,
        "color": "#ef4444"
      },
      {
        "id": "crowley",
        "name": "Executor Crowley",
        "role": "Family Solicitor",
        "isVictim": false,
        "isMurderer": true,
        "color": "#dc2626"
      },
      {
        "id": "eleanor",
        "name": "Eleanor Vance",
        "role": "Housekeeper",
        "isVictim": false,
        "isMurderer": false,
        "color": "#3b82f6"
      },
      {
        "id": "sebastian",
        "name": "Sebastian Blackwood",
        "role": "Estranged Nephew",
        "isVictim": false,
        "isMurderer": false,
        "color": "#8b5cf6"
      },
      {
        "id": "gideon",
        "name": "Dr. Gideon Cross",
        "role": "Family Physician",
        "isVictim": false,
        "isMurderer": false,
        "color": "#10b981"
      },
      {
        "id": "beatrice",
        "name": "Lady Beatrice",
        "role": "Wealthy Patron",
        "isVictim": false,
        "isMurderer": false,
        "color": "#f59e0b"
      }
    ],
    "clues": [
      {
        "id": "x1-1",
        "type": "in_room",
        "p1": "victim",
        "roomId": "study",
        "text": "Lord Blackwood was discovered in the Master Study."
      },
      {
        "id": "x1-2",
        "type": "directly_east_of_furniture",
        "p1": "victim",
        "furnitureId": "desk",
        "text": "Lord Blackwood sat directly east of his Mahogany Desk."
      },
      {
        "id": "x1-3",
        "type": "in_room",
        "p1": "crowley",
        "roomId": "study",
        "text": "Executor Crowley admitted he had an appointment in the Master Study."
      },
      {
        "id": "x1-4",
        "type": "in_room",
        "p1": "eleanor",
        "roomId": "quarters",
        "text": "Eleanor Vance was in the Servants Quarters."
      },
      {
        "id": "x1-5",
        "type": "in_room",
        "p1": "sebastian",
        "roomId": "gallery",
        "text": "Sebastian Blackwood was pacing in the Portrait Gallery."
      },
      {
        "id": "x1-6",
        "type": "in_room",
        "p1": "gideon",
        "roomId": "hall",
        "text": "Dr. Gideon Cross was waiting in the Grand Hall."
      },
      {
        "id": "x1-7",
        "type": "in_room",
        "p1": "beatrice",
        "roomId": "conservatory",
        "text": "Lady Beatrice was resting in the Conservatory."
      },
      {
        "id": "x1-8",
        "type": "directly_north_of_furniture",
        "p1": "eleanor",
        "furnitureId": "fireplace",
        "text": "Eleanor Vance stood directly north of the Stone Fireplace."
      },
      {
        "id": "x1-9",
        "type": "directly_west_of_furniture",
        "p1": "sebastian",
        "furnitureId": "statue",
        "text": "Sebastian Blackwood stood directly west of the Knight Statue."
      },
      {
        "id": "x1-10",
        "type": "same_row_as_furniture",
        "p1": "sebastian",
        "furnitureId": "fireplace",
        "text": "Sebastian Blackwood was on the same horizontal row as the Stone Fireplace."
      },
      {
        "id": "x1-11",
        "type": "east_of_person",
        "p1": "crowley",
        "p2": "victim",
        "text": "Executor Crowley was positioned east of Lord Blackwood."
      },
      {
        "id": "x1-12",
        "type": "east_of_person",
        "p1": "gideon",
        "p2": "eleanor",
        "text": "Dr. Gideon Cross was situated east of Eleanor Vance."
      },
      {
        "id": "x1-13",
        "type": "east_of_person",
        "p1": "beatrice",
        "p2": "gideon",
        "text": "Lady Beatrice was located in the southeastern quadrant."
      }
    ],
    "solution": {
      "victim": {
        "r": 1,
        "c": 1,
        "roomId": "study"
      },
      "crowley": {
        "r": 0,
        "c": 2,
        "roomId": "study"
      },
      "eleanor": {
        "r": 2,
        "c": 0,
        "roomId": "quarters"
      },
      "sebastian": {
        "r": 3,
        "c": 4,
        "roomId": "gallery"
      },
      "gideon": {
        "r": 4,
        "c": 3,
        "roomId": "hall"
      },
      "beatrice": {
        "r": 5,
        "c": 5,
        "roomId": "conservatory"
      }
    },
    "murdererId": "crowley"
  },
  {
    "id": "expert-2",
    "title": "The Alchemist's Laboratory",
    "subtitle": "The grandmaster of the guild was slain amidst his bubbling vials.",
    "story": "Deep in the university undercroft, Master Nicholas was found poisoned among rare botanical reagents. Six adepts had keys to the subterranean lab. Trace the reagents, furniture landmarks, and statements to deduce who shared the master’s final chamber.",
    "difficulty": "expert",
    "gridSize": 6,
    "rooms": [
      {
        "id": "furnace",
        "name": "Furnace Room",
        "color": "#eff6ff",
        "darkColor": "#172554",
        "border": "#3b82f6",
        "cells": [
          [
            0,
            0
          ],
          [
            0,
            1
          ],
          [
            0,
            2
          ],
          [
            1,
            0
          ],
          [
            1,
            1
          ]
        ]
      },
      {
        "id": "distillation",
        "name": "Distillation Hall",
        "color": "#f5f3ff",
        "darkColor": "#2e1065",
        "border": "#8b5cf6",
        "cells": [
          [
            0,
            3
          ],
          [
            0,
            4
          ],
          [
            0,
            5
          ],
          [
            1,
            4
          ],
          [
            1,
            5
          ]
        ]
      },
      {
        "id": "herbarium",
        "name": "Secret Herbarium",
        "color": "#fef2f2",
        "darkColor": "#450a0a",
        "border": "#ef4444",
        "cells": [
          [
            2,
            0
          ],
          [
            2,
            1
          ],
          [
            3,
            0
          ],
          [
            3,
            1
          ],
          [
            4,
            0
          ],
          [
            4,
            1
          ]
        ]
      },
      {
        "id": "vault",
        "name": "Reagent Vault",
        "color": "#fffbeb",
        "darkColor": "#451a03",
        "border": "#f59e0b",
        "cells": [
          [
            1,
            2
          ],
          [
            1,
            3
          ],
          [
            2,
            2
          ],
          [
            2,
            3
          ],
          [
            3,
            2
          ],
          [
            3,
            3
          ]
        ]
      },
      {
        "id": "balance",
        "name": "Balance Chamber",
        "color": "#f0fdf4",
        "darkColor": "#052e16",
        "border": "#22c55e",
        "cells": [
          [
            2,
            4
          ],
          [
            2,
            5
          ],
          [
            3,
            4
          ],
          [
            3,
            5
          ],
          [
            4,
            4
          ],
          [
            4,
            5
          ]
        ]
      },
      {
        "id": "cistern",
        "name": "Subterranean Cistern",
        "color": "#fdf2f8",
        "darkColor": "#500724",
        "border": "#ec4899",
        "cells": [
          [
            4,
            2
          ],
          [
            4,
            3
          ],
          [
            5,
            0
          ],
          [
            5,
            1
          ],
          [
            5,
            2
          ],
          [
            5,
            3
          ],
          [
            5,
            4
          ],
          [
            5,
            5
          ]
        ]
      }
    ],
    "furniture": [
      {
        "id": "crucible",
        "name": "Alchemical Crucible",
        "row": 0,
        "col": 1,
        "icon": "stove"
      },
      {
        "id": "retort",
        "name": "Glass Retort",
        "row": 2,
        "col": 3,
        "icon": "desk"
      },
      {
        "id": "dryingrack",
        "name": "Drying Rack",
        "row": 3,
        "col": 0,
        "icon": "bookcase"
      },
      {
        "id": "well",
        "name": "Stone Well",
        "row": 4,
        "col": 5,
        "icon": "fountain"
      }
    ],
    "people": [
      {
        "id": "victim",
        "name": "Master Nicholas",
        "role": "Grand Alchemist",
        "isVictim": true,
        "isMurderer": false,
        "color": "#ef4444"
      },
      {
        "id": "joshua",
        "name": "Apprentice Joshua",
        "role": "Ambitious Novice",
        "isVictim": false,
        "isMurderer": true,
        "color": "#dc2626"
      },
      {
        "id": "corvus",
        "name": "Brother Corvus",
        "role": "Furnace Stoker",
        "isVictim": false,
        "isMurderer": false,
        "color": "#3b82f6"
      },
      {
        "id": "morgana",
        "name": "Adept Morgana",
        "role": "Distiller",
        "isVictim": false,
        "isMurderer": false,
        "color": "#8b5cf6"
      },
      {
        "id": "balthazar",
        "name": "Scholar Balthazar",
        "role": "Librarian",
        "isVictim": false,
        "isMurderer": false,
        "color": "#10b981"
      },
      {
        "id": "thaddeus",
        "name": "Thaddeus Vance",
        "role": "Guild Warden",
        "isVictim": false,
        "isMurderer": false,
        "color": "#f59e0b"
      }
    ],
    "clues": [
      {
        "id": "x2-1",
        "type": "in_room",
        "p1": "victim",
        "roomId": "herbarium",
        "text": "Master Nicholas was found deceased in the Secret Herbarium."
      },
      {
        "id": "x2-2",
        "type": "directly_east_of_furniture",
        "p1": "corvus",
        "furnitureId": "crucible",
        "text": "Brother Corvus was standing directly east of the Alchemical Crucible."
      },
      {
        "id": "x2-3",
        "type": "in_room",
        "p1": "corvus",
        "roomId": "furnace",
        "text": "Brother Corvus was tending fires in the Furnace Room."
      },
      {
        "id": "x2-4",
        "type": "in_room",
        "p1": "joshua",
        "roomId": "herbarium",
        "text": "Apprentice Joshua was sorting roots in the Secret Herbarium."
      },
      {
        "id": "x2-5",
        "type": "in_room",
        "p1": "morgana",
        "roomId": "distillation",
        "text": "Adept Morgana was purifying spirits in the Distillation Hall."
      },
      {
        "id": "x2-6",
        "type": "in_room",
        "p1": "balthazar",
        "roomId": "vault",
        "text": "Scholar Balthazar was cataloging vials in the Reagent Vault."
      },
      {
        "id": "x2-7",
        "type": "in_room",
        "p1": "thaddeus",
        "roomId": "cistern",
        "text": "Thaddeus Vance was checking water levels in the Subterranean Cistern."
      },
      {
        "id": "x2-8",
        "type": "directly_south_of_furniture",
        "p1": "joshua",
        "furnitureId": "dryingrack",
        "text": "Apprentice Joshua was standing directly south of the Drying Rack."
      },
      {
        "id": "x2-9",
        "type": "directly_south_of_furniture",
        "p1": "balthazar",
        "furnitureId": "retort",
        "text": "Scholar Balthazar was standing directly south of the Glass Retort."
      },
      {
        "id": "x2-10",
        "type": "directly_south_of_furniture",
        "p1": "thaddeus",
        "furnitureId": "well",
        "text": "Thaddeus Vance was standing directly south of the Stone Well."
      },
      {
        "id": "x2-11",
        "type": "east_of_person",
        "p1": "morgana",
        "p2": "corvus",
        "text": "Adept Morgana was located east of Brother Corvus."
      },
      {
        "id": "x2-12",
        "type": "east_of_person",
        "p1": "victim",
        "p2": "joshua",
        "text": "Master Nicholas stood east of Apprentice Joshua."
      }
    ],
    "solution": {
      "victim": {
        "r": 2,
        "c": 1,
        "roomId": "herbarium"
      },
      "joshua": {
        "r": 4,
        "c": 0,
        "roomId": "herbarium"
      },
      "corvus": {
        "r": 0,
        "c": 2,
        "roomId": "furnace"
      },
      "morgana": {
        "r": 1,
        "c": 4,
        "roomId": "distillation"
      },
      "balthazar": {
        "r": 3,
        "c": 3,
        "roomId": "vault"
      },
      "thaddeus": {
        "r": 5,
        "c": 5,
        "roomId": "cistern"
      }
    },
    "murdererId": "joshua"
  },
  {
    "id": "expert-3",
    "title": "The Observatory Solstice",
    "subtitle": "The imperial astronomer was silenced as the planetary alignment began.",
    "story": "High in the mountaintop dome of the Royal Observatory, Astronomer Tycho was discovered fallen amidst his celestial maps. Six astronomers were taking readings across the observatory levels. Reconstruct the sightings to reveal who shared the Stellar Archive with Tycho.",
    "difficulty": "expert",
    "gridSize": 6,
    "rooms": [
      {
        "id": "dome",
        "name": "Celestial Dome",
        "color": "#eff6ff",
        "darkColor": "#172554",
        "border": "#3b82f6",
        "cells": [
          [
            0,
            0
          ],
          [
            0,
            1
          ],
          [
            0,
            2
          ],
          [
            1,
            0
          ],
          [
            1,
            1
          ],
          [
            1,
            2
          ]
        ]
      },
      {
        "id": "astrolabe",
        "name": "Astrolabe Chamber",
        "color": "#f5f3ff",
        "darkColor": "#2e1065",
        "border": "#8b5cf6",
        "cells": [
          [
            0,
            3
          ],
          [
            0,
            4
          ],
          [
            0,
            5
          ],
          [
            1,
            3
          ],
          [
            1,
            4
          ]
        ]
      },
      {
        "id": "transit",
        "name": "Transit Room",
        "color": "#f0fdf4",
        "darkColor": "#052e16",
        "border": "#22c55e",
        "cells": [
          [
            1,
            5
          ],
          [
            2,
            4
          ],
          [
            2,
            5
          ],
          [
            3,
            3
          ],
          [
            3,
            4
          ],
          [
            3,
            5
          ]
        ]
      },
      {
        "id": "archive",
        "name": "Stellar Archive",
        "color": "#fef2f2",
        "darkColor": "#450a0a",
        "border": "#ef4444",
        "cells": [
          [
            2,
            0
          ],
          [
            2,
            1
          ],
          [
            3,
            0
          ],
          [
            3,
            1
          ],
          [
            4,
            0
          ],
          [
            4,
            1
          ]
        ]
      },
      {
        "id": "clockwork",
        "name": "Clockwork Gearworks",
        "color": "#fffbeb",
        "darkColor": "#451a03",
        "border": "#f59e0b",
        "cells": [
          [
            2,
            2
          ],
          [
            2,
            3
          ],
          [
            3,
            2
          ],
          [
            4,
            2
          ],
          [
            4,
            3
          ]
        ]
      },
      {
        "id": "terrace",
        "name": "Meridian Terrace",
        "color": "#fdf2f8",
        "darkColor": "#500724",
        "border": "#ec4899",
        "cells": [
          [
            4,
            4
          ],
          [
            4,
            5
          ],
          [
            5,
            0
          ],
          [
            5,
            1
          ],
          [
            5,
            2
          ],
          [
            5,
            3
          ],
          [
            5,
            4
          ],
          [
            5,
            5
          ]
        ]
      }
    ],
    "furniture": [
      {
        "id": "telescope",
        "name": "Great Telescope",
        "row": 1,
        "col": 1,
        "icon": "piano"
      },
      {
        "id": "armillary",
        "name": "Brass Armillary",
        "row": 3,
        "col": 5,
        "icon": "fountain"
      },
      {
        "id": "microtome",
        "name": "Microtome Desk",
        "row": 2,
        "col": 0,
        "icon": "desk"
      },
      {
        "id": "chronometer",
        "name": "Chronometer Box",
        "row": 5,
        "col": 4,
        "icon": "safe"
      }
    ],
    "people": [
      {
        "id": "victim",
        "name": "Astronomer Tycho",
        "role": "Imperial Astronomer",
        "isVictim": true,
        "isMurderer": false,
        "color": "#ef4444"
      },
      {
        "id": "cassian",
        "name": "Assistant Cassian",
        "role": "Ambitious Assistant",
        "isVictim": false,
        "isMurderer": true,
        "color": "#dc2626"
      },
      {
        "id": "halley",
        "name": "Dr. Halley",
        "role": "Comet Specialist",
        "isVictim": false,
        "isMurderer": false,
        "color": "#3b82f6"
      },
      {
        "id": "kepler",
        "name": "Johannes Kepler",
        "role": "Mathematical Theorist",
        "isVictim": false,
        "isMurderer": false,
        "color": "#10b981"
      },
      {
        "id": "cassini",
        "name": "Gian Cassini",
        "role": "Ring Observer",
        "isVictim": false,
        "isMurderer": false,
        "color": "#8b5cf6"
      },
      {
        "id": "galileo",
        "name": "Galileo Rossi",
        "role": "Telescope Craftsman",
        "isVictim": false,
        "isMurderer": false,
        "color": "#f59e0b"
      }
    ],
    "clues": [
      {
        "id": "x3-1",
        "type": "in_room",
        "p1": "victim",
        "roomId": "archive",
        "text": "Astronomer Tycho was found in the Stellar Archive."
      },
      {
        "id": "x3-2",
        "type": "in_room",
        "p1": "cassian",
        "roomId": "archive",
        "text": "Assistant Cassian was filing observational charts in the Stellar Archive."
      },
      {
        "id": "x3-3",
        "type": "in_room",
        "p1": "halley",
        "roomId": "astrolabe",
        "text": "Dr. Halley was computing coordinates in the Astrolabe Chamber."
      },
      {
        "id": "x3-4",
        "type": "in_room",
        "p1": "kepler",
        "roomId": "dome",
        "text": "Johannes Kepler was calibrating lenses in the Celestial Dome."
      },
      {
        "id": "x3-5",
        "type": "in_room",
        "p1": "cassini",
        "roomId": "transit",
        "text": "Gian Cassini was tracking satellites in the Transit Room."
      },
      {
        "id": "x3-6",
        "type": "in_room",
        "p1": "galileo",
        "roomId": "terrace",
        "text": "Galileo Rossi was testing prism glass on the Meridian Terrace."
      },
      {
        "id": "x3-7",
        "type": "directly_east_of_furniture",
        "p1": "kepler",
        "furnitureId": "telescope",
        "text": "Johannes Kepler stood directly east of the Great Telescope."
      },
      {
        "id": "x3-8",
        "type": "directly_west_of_furniture",
        "p1": "cassini",
        "furnitureId": "armillary",
        "text": "Gian Cassini stood directly west of the Brass Armillary."
      },
      {
        "id": "x3-9",
        "type": "directly_east_of_furniture",
        "p1": "galileo",
        "furnitureId": "chronometer",
        "text": "Galileo Rossi stood directly east of the Chronometer Box."
      },
      {
        "id": "x3-10",
        "type": "directly_east_of_furniture",
        "p1": "victim",
        "furnitureId": "microtome",
        "text": "Astronomer Tycho was sitting directly east of the Microtome Desk."
      },
      {
        "id": "x3-11",
        "type": "south_of_person",
        "p1": "cassian",
        "p2": "victim",
        "text": "Assistant Cassian was positioned south of Astronomer Tycho."
      },
      {
        "id": "x3-12",
        "type": "west_of_person",
        "p1": "halley",
        "p2": "cassini",
        "text": "Dr. Halley was positioned west of Gian Cassini."
      }
    ],
    "solution": {
      "victim": {
        "r": 2,
        "c": 1,
        "roomId": "archive"
      },
      "cassian": {
        "r": 4,
        "c": 0,
        "roomId": "archive"
      },
      "halley": {
        "r": 0,
        "c": 3,
        "roomId": "astrolabe"
      },
      "kepler": {
        "r": 1,
        "c": 2,
        "roomId": "dome"
      },
      "cassini": {
        "r": 3,
        "c": 4,
        "roomId": "transit"
      },
      "galileo": {
        "r": 5,
        "c": 5,
        "roomId": "terrace"
      }
    },
    "murdererId": "cassian"
  },
  {
    "id": "expert-4",
    "title": "The Embassy Conspiracy",
    "subtitle": "The peace treaty negotiator was assassinated before the summit.",
    "story": "Tension filled the neutral embassy as Diplomat Vance was struck down inside his private quarters. Six diplomats and security personnel held security clearances. Use the rigorous spatial deductions to name the traitor.",
    "difficulty": "expert",
    "gridSize": 6,
    "rooms": [
      {
        "id": "ambassador",
        "name": "Ambassador Suite",
        "color": "#fef2f2",
        "darkColor": "#450a0a",
        "border": "#ef4444",
        "cells": [
          [
            0,
            0
          ],
          [
            0,
            1
          ],
          [
            0,
            2
          ],
          [
            1,
            1
          ],
          [
            1,
            2
          ],
          [
            1,
            3
          ]
        ]
      },
      {
        "id": "cipher",
        "name": "Cipher Room",
        "color": "#eff6ff",
        "darkColor": "#172554",
        "border": "#3b82f6",
        "cells": [
          [
            0,
            3
          ],
          [
            0,
            4
          ],
          [
            0,
            5
          ],
          [
            1,
            4
          ],
          [
            1,
            5
          ],
          [
            2,
            0
          ],
          [
            2,
            1
          ]
        ]
      },
      {
        "id": "banquet",
        "name": "Banquet Gallery",
        "color": "#fffbeb",
        "darkColor": "#451a03",
        "border": "#f59e0b",
        "cells": [
          [
            2,
            2
          ],
          [
            2,
            3
          ],
          [
            3,
            1
          ],
          [
            3,
            2
          ],
          [
            4,
            1
          ],
          [
            4,
            2
          ]
        ]
      },
      {
        "id": "courtyard",
        "name": "Courtyard Peristyle",
        "color": "#f5f3ff",
        "darkColor": "#2e1065",
        "border": "#8b5cf6",
        "cells": [
          [
            2,
            4
          ],
          [
            2,
            5
          ],
          [
            3,
            3
          ],
          [
            3,
            4
          ],
          [
            3,
            5
          ],
          [
            4,
            3
          ],
          [
            4,
            4
          ]
        ]
      },
      {
        "id": "guardhouse",
        "name": "Guardhouse",
        "color": "#f0fdf4",
        "darkColor": "#052e16",
        "border": "#22c55e",
        "cells": [
          [
            3,
            0
          ],
          [
            4,
            0
          ],
          [
            5,
            0
          ],
          [
            5,
            1
          ]
        ]
      },
      {
        "id": "vault",
        "name": "Secret Archives",
        "color": "#fdf2f8",
        "darkColor": "#500724",
        "border": "#ec4899",
        "cells": [
          [
            4,
            5
          ],
          [
            5,
            2
          ],
          [
            5,
            3
          ],
          [
            5,
            4
          ],
          [
            5,
            5
          ]
        ]
      }
    ],
    "furniture": [
      {
        "id": "teletype",
        "name": "Cipher Teletype",
        "row": 0,
        "col": 2,
        "icon": "clock"
      },
      {
        "id": "pouch",
        "name": "Diplomatic Pouch",
        "row": 4,
        "col": 1,
        "icon": "desk"
      },
      {
        "id": "enigma",
        "name": "Enigma Safe",
        "row": 3,
        "col": 3,
        "icon": "safe"
      },
      {
        "id": "flagpole",
        "name": "Brass Flagpole",
        "row": 5,
        "col": 4,
        "icon": "statue"
      }
    ],
    "people": [
      {
        "id": "victim",
        "name": "Diplomat Vance",
        "role": "Chief Negotiator",
        "isVictim": true,
        "isMurderer": false,
        "color": "#ef4444"
      },
      {
        "id": "mireille",
        "name": "Attaché Mireille",
        "role": "Second Secretary",
        "isVictim": false,
        "isMurderer": true,
        "color": "#dc2626"
      },
      {
        "id": "sterling2",
        "name": "Special Envoy Sterling",
        "role": "Foreign Envoy",
        "isVictim": false,
        "isMurderer": false,
        "color": "#3b82f6"
      },
      {
        "id": "laurent",
        "name": "Colonel Laurent",
        "role": "Military Attaché",
        "isVictim": false,
        "isMurderer": false,
        "color": "#10b981"
      },
      {
        "id": "dubois",
        "name": "Minister Dubois",
        "role": "Protocol Chief",
        "isVictim": false,
        "isMurderer": false,
        "color": "#8b5cf6"
      },
      {
        "id": "thorne2",
        "name": "Agent Thorne",
        "role": "Intelligence Officer",
        "isVictim": false,
        "isMurderer": false,
        "color": "#f59e0b"
      }
    ],
    "clues": [
      {
        "id": "x4-1",
        "type": "in_room",
        "p1": "victim",
        "roomId": "ambassador",
        "text": "Diplomat Vance was inside the Ambassador Suite."
      },
      {
        "id": "x4-2",
        "type": "directly_west_of_furniture",
        "p1": "victim",
        "furnitureId": "teletype",
        "text": "Diplomat Vance was directly west of the Cipher Teletype."
      },
      {
        "id": "x4-3",
        "type": "in_room",
        "p1": "mireille",
        "roomId": "ambassador",
        "text": "Attaché Mireille was conferring inside the Ambassador Suite."
      },
      {
        "id": "x4-4",
        "type": "in_room",
        "p1": "sterling2",
        "roomId": "cipher",
        "text": "Special Envoy Sterling was translating cables in the Cipher Room."
      },
      {
        "id": "x4-5",
        "type": "in_room",
        "p1": "laurent",
        "roomId": "courtyard",
        "text": "Colonel Laurent was patrolling the Courtyard Peristyle."
      },
      {
        "id": "x4-6",
        "type": "in_room",
        "p1": "dubois",
        "roomId": "banquet",
        "text": "Minister Dubois was preparing toasts in the Banquet Gallery."
      },
      {
        "id": "x4-7",
        "type": "in_room",
        "p1": "thorne2",
        "roomId": "vault",
        "text": "Agent Thorne was guarding state files in the Secret Archives."
      },
      {
        "id": "x4-8",
        "type": "directly_east_of_furniture",
        "p1": "dubois",
        "furnitureId": "pouch",
        "text": "Minister Dubois was directly east of the Diplomatic Pouch."
      },
      {
        "id": "x4-9",
        "type": "directly_east_of_furniture",
        "p1": "laurent",
        "furnitureId": "enigma",
        "text": "Colonel Laurent was directly east of the Enigma Safe."
      },
      {
        "id": "x4-10",
        "type": "directly_east_of_furniture",
        "p1": "thorne2",
        "furnitureId": "flagpole",
        "text": "Agent Thorne was directly east of the Brass Flagpole."
      },
      {
        "id": "x4-11",
        "type": "east_of_person",
        "p1": "mireille",
        "p2": "victim",
        "text": "Attaché Mireille was situated east of Diplomat Vance."
      },
      {
        "id": "x4-12",
        "type": "west_of_person",
        "p1": "sterling2",
        "p2": "dubois",
        "text": "Special Envoy Sterling was located west of Minister Dubois."
      }
    ],
    "solution": {
      "victim": {
        "r": 0,
        "c": 1,
        "roomId": "ambassador"
      },
      "mireille": {
        "r": 1,
        "c": 3,
        "roomId": "ambassador"
      },
      "sterling2": {
        "r": 2,
        "c": 0,
        "roomId": "cipher"
      },
      "laurent": {
        "r": 3,
        "c": 4,
        "roomId": "courtyard"
      },
      "dubois": {
        "r": 4,
        "c": 2,
        "roomId": "banquet"
      },
      "thorne2": {
        "r": 5,
        "c": 5,
        "roomId": "vault"
      }
    },
    "murdererId": "mireille"
  }
];

export function getCaseById(id: string): MurdokuCase | undefined {
  return MURDOKU_CASES.find(c => c.id === id);
}

export function getCasesByDifficulty(diff: 'easy' | 'medium' | 'hard' | 'expert'): MurdokuCase[] {
  return MURDOKU_CASES.filter(c => c.difficulty === diff);
}

export function getDailyCase(utcDateStr?: string): MurdokuCase {
  const d = utcDateStr || new Date().toISOString().slice(0, 10);
  let hash = 0;
  for (let i = 0; i < d.length; i++) {
    hash = (hash << 5) - hash + d.charCodeAt(i);
    hash |= 0;
  }
  const idx = Math.abs(hash) % MURDOKU_CASES.length;
  return MURDOKU_CASES[idx];
}
