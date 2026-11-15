/**
 * Master Levels Data for Free Hidden Object Online Game
 * PuzzleFeels.com
 */

export interface HiddenObjectItem {
  id: string;
  name: string;
  cx: number;
  cy: number;
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  radius: number; // click tolerance radius as percentage
  iconSvg: string;
}

export interface HiddenObjectLevel {
  id: string;
  level: number;
  title: string;
  theme: string;
  description: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  objects: HiddenObjectItem[];
}

export const HIDDEN_OBJECT_LEVELS: HiddenObjectLevel[] = [
  {
    "id": "level-1-cozy-living-room",
    "level": 1,
    "title": "Cozy Living Room",
    "theme": "Warm Interior",
    "description": "A welcoming fireplace lounge with bookshelves, an armchair, and a tea table.",
    "image": "/images/hidden-object/level-1-cozy-living-room.svg",
    "imageWidth": 900,
    "imageHeight": 600,
    "objects": [
      {
        "id": "brass-key",
        "name": "Brass Key",
        "cx": 470,
        "cy": 195,
        "x": 52.2,
        "y": 32.5,
        "radius": 4.8,
        "iconSvg": "<path d=\"M7 11V7a5 5 0 0 1 10 0v4M12 11v6m0 0v3m0-3h3m-3 3h2\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>"
      },
      {
        "id": "tea-cup",
        "name": "Tea Cup",
        "cx": 375,
        "cy": 430,
        "x": 41.7,
        "y": 71.7,
        "radius": 5.2,
        "iconSvg": "<path d=\"M17 8h1a3 3 0 0 1 0 6h-1M4 8h13v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8ZM6 2v3m4-3v3m4-3v3\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\"/>"
      },
      {
        "id": "yarn-ball",
        "name": "Yarn Ball",
        "cx": 780,
        "cy": 490,
        "x": 86.7,
        "y": 81.7,
        "radius": 5.2,
        "iconSvg": "<circle cx=\"12\" cy=\"12\" r=\"8\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><path d=\"m6 8 12 8M8 6l8 12M6 14l12-8\" stroke=\"currentColor\" stroke-width=\"1.8\"/>"
      },
      {
        "id": "magnifying-glass",
        "name": "Magnifying Glass",
        "cx": 140,
        "cy": 260,
        "x": 15.6,
        "y": 43.3,
        "radius": 5,
        "iconSvg": "<circle cx=\"11\" cy=\"11\" r=\"7\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><line x1=\"21\" y1=\"21\" x2=\"16\" y2=\"16\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"/>"
      },
      {
        "id": "pocket-watch",
        "name": "Pocket Watch",
        "cx": 650,
        "cy": 370,
        "x": 72.2,
        "y": 61.7,
        "radius": 4.8,
        "iconSvg": "<circle cx=\"12\" cy=\"13\" r=\"7\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><path d=\"M12 10v3l2 2M12 6V4m-2 0h4\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/>"
      },
      {
        "id": "spectacles",
        "name": "Spectacles",
        "cx": 450,
        "cy": 460,
        "x": 50,
        "y": 76.7,
        "radius": 5,
        "iconSvg": "<circle cx=\"6\" cy=\"14\" r=\"4\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><circle cx=\"18\" cy=\"14\" r=\"4\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><path d=\"M10 14h4M6 10l2-4m10 4-2-4\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/>"
      },
      {
        "id": "green-apple",
        "name": "Green Apple",
        "cx": 830,
        "cy": 310,
        "x": 92.2,
        "y": 51.7,
        "radius": 5,
        "iconSvg": "<circle cx=\"12\" cy=\"13\" r=\"7\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><path d=\"M12 6c0-2 2-3 2-3m-2 3c-1.5 0-3-.5-4-2\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/>"
      },
      {
        "id": "feather-quill",
        "name": "Feather Quill",
        "cx": 210,
        "cy": 380,
        "x": 23.3,
        "y": 63.3,
        "radius": 5,
        "iconSvg": "<path d=\"m4 20 5-2L20 7a3 3 0 0 0-4-4L5 14l-2 5 1 1Zm7-10 4 4\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\"/>"
      }
    ]
  },
  {
    "id": "level-2-beautiful-garden",
    "level": 2,
    "title": "Beautiful Garden",
    "theme": "Sunny Outdoor",
    "description": "A lush blooming cottage garden with flowerbeds, a birdbath, and a wooden bench.",
    "image": "/images/hidden-object/level-2-beautiful-garden.svg",
    "imageWidth": 900,
    "imageHeight": 600,
    "objects": [
      {
        "id": "watering-can",
        "name": "Watering Can",
        "cx": 180,
        "cy": 460,
        "x": 20,
        "y": 76.7,
        "radius": 5.2,
        "iconSvg": "<rect x=\"6\" y=\"9\" width=\"10\" height=\"11\" rx=\"2\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><path d=\"M6 12H3m13-3 4-4m-1 8h2m-8-7c0-2 2-4 5-4s5 2 5 4\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/>"
      },
      {
        "id": "garden-trowel",
        "name": "Garden Trowel",
        "cx": 340,
        "cy": 430,
        "x": 37.8,
        "y": 71.7,
        "radius": 4.8,
        "iconSvg": "<path d=\"m14 4 6 6-8 8H6v-6l8-8ZM4 20l3-3\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\"/>"
      },
      {
        "id": "yellow-butterfly",
        "name": "Butterfly",
        "cx": 490,
        "cy": 150,
        "x": 54.4,
        "y": 25,
        "radius": 4.8,
        "iconSvg": "<path d=\"M12 4v16m-4-8a4 4 0 1 0 4-4m0 8a4 4 0 1 1-4 4m8-8a4 4 0 1 1-4-4m0 8a4 4 0 1 0 4 4\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/>"
      },
      {
        "id": "sun-hat",
        "name": "Sun Hat",
        "cx": 710,
        "cy": 340,
        "x": 78.9,
        "y": 56.7,
        "radius": 5.2,
        "iconSvg": "<ellipse cx=\"12\" cy=\"15\" rx=\"10\" ry=\"4\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><path d=\"M7 14c0-4 2-7 5-7s5 3 5 7\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/>"
      },
      {
        "id": "birdhouse",
        "name": "Birdhouse",
        "cx": 820,
        "cy": 130,
        "x": 91.1,
        "y": 21.7,
        "radius": 5,
        "iconSvg": "<path d=\"m12 3 8 6v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9l8-6Z\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><circle cx=\"12\" cy=\"14\" r=\"2.5\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/>"
      },
      {
        "id": "pruning-shears",
        "name": "Pruning Shears",
        "cx": 520,
        "cy": 510,
        "x": 57.8,
        "y": 85,
        "radius": 4.8,
        "iconSvg": "<circle cx=\"6\" cy=\"18\" r=\"3\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><circle cx=\"18\" cy=\"18\" r=\"3\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><path d=\"m8.5 15.5 7-11m-3 0 3 0m-7 11-7-11m3 0-3 0\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/>"
      },
      {
        "id": "garden-snail",
        "name": "Garden Snail",
        "cx": 360,
        "cy": 290,
        "x": 40,
        "y": 48.3,
        "radius": 4.8,
        "iconSvg": "<circle cx=\"10\" cy=\"13\" r=\"6\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><path d=\"M10 13a2 2 0 1 0 2-2M16 16h5a2 2 0 0 0 2-2c0-3-2-5-4-5m-1 0 1-2m-3 2 1-2\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/>"
      },
      {
        "id": "seed-packet",
        "name": "Seed Packet",
        "cx": 120,
        "cy": 390,
        "x": 13.3,
        "y": 65,
        "radius": 4.8,
        "iconSvg": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"16\" rx=\"2\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><circle cx=\"12\" cy=\"12\" r=\"3\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><path d=\"M12 7v1\" stroke=\"currentColor\" stroke-width=\"2\"/>"
      }
    ]
  },
  {
    "id": "level-3-busy-kitchen",
    "level": 3,
    "title": "Busy Kitchen",
    "theme": "Culinary Workshop",
    "description": "A bustling rustic kitchen filled with spices, hanging pans, and fresh ingredients.",
    "image": "/images/hidden-object/level-3-busy-kitchen.svg",
    "imageWidth": 900,
    "imageHeight": 600,
    "objects": [
      {
        "id": "wooden-spoon",
        "name": "Wooden Spoon",
        "cx": 280,
        "cy": 310,
        "x": 31.1,
        "y": 51.7,
        "radius": 4.8,
        "iconSvg": "<circle cx=\"8\" cy=\"8\" r=\"5\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><path d=\"m12 12 8 8\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"/>"
      },
      {
        "id": "rolling-pin",
        "name": "Rolling Pin",
        "cx": 510,
        "cy": 440,
        "x": 56.7,
        "y": 73.3,
        "radius": 5,
        "iconSvg": "<rect x=\"6\" y=\"9\" width=\"12\" height=\"6\" rx=\"1\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><path d=\"M2 12h4m12 0h4\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"/>"
      },
      {
        "id": "chef-hat",
        "name": "Chef Hat",
        "cx": 110,
        "cy": 190,
        "x": 12.2,
        "y": 31.7,
        "radius": 5.2,
        "iconSvg": "<path d=\"M6 18h12v3H6v-3ZM6 18c-2-1-3-4-2-6 1-3 4-3 5-1 1-3 5-4 7-2 2 1 2 4 1 6l-1 3\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>"
      },
      {
        "id": "salt-shaker",
        "name": "Salt Shaker",
        "cx": 750,
        "cy": 230,
        "x": 83.3,
        "y": 38.3,
        "radius": 4.8,
        "iconSvg": "<path d=\"M9 7h6v2l-1 11H10L9 9V7ZM9 7c0-2 1.5-3 3-3s3 1 3 3\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>"
      },
      {
        "id": "wire-whisk",
        "name": "Wire Whisk",
        "cx": 420,
        "cy": 140,
        "x": 46.7,
        "y": 23.3,
        "radius": 4.8,
        "iconSvg": "<path d=\"M12 2v8m-4 5c0-4 4-6 4-6s4 2 4 6a4 4 0 0 1-8 0Zm4-6v7\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>"
      },
      {
        "id": "fresh-lemon",
        "name": "Fresh Lemon",
        "cx": 620,
        "cy": 410,
        "x": 68.9,
        "y": 68.3,
        "radius": 4.8,
        "iconSvg": "<path d=\"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c2 0 4-.5 5-2l4-4c1.5-1 2-3 2-5 0-5.5-4.5-10-10-10Z\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/>"
      },
      {
        "id": "oven-mitt",
        "name": "Oven Mitt",
        "cx": 380,
        "cy": 480,
        "x": 42.2,
        "y": 80,
        "radius": 5,
        "iconSvg": "<path d=\"M6 11V7a4 4 0 0 1 8 0v2h2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-4\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\"/>"
      },
      {
        "id": "copper-teapot",
        "name": "Copper Teapot",
        "cx": 830,
        "cy": 140,
        "x": 92.2,
        "y": 23.3,
        "radius": 5.2,
        "iconSvg": "<path d=\"M5 12h14v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-6ZM5 12l-3-3m17 3 3-2M8 12c0-4 2-7 4-7s4 3 4 7\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>"
      }
    ]
  },
  {
    "id": "level-4-pirate-island",
    "level": 4,
    "title": "Pirate Treasure Island",
    "theme": "Tropical Adventure",
    "description": "A secluded Caribbean cove with swaying palm trees, a shipwreck, and hidden plunder.",
    "image": "/images/hidden-object/level-4-pirate-island.svg",
    "imageWidth": 900,
    "imageHeight": 600,
    "objects": [
      {
        "id": "brass-spyglass",
        "name": "Brass Spyglass",
        "cx": 310,
        "cy": 430,
        "x": 34.4,
        "y": 71.7,
        "radius": 5,
        "iconSvg": "<path d=\"m4 16 12-12 4 4-12 12H4v-4Zm8-8 4 4\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\"/>"
      },
      {
        "id": "skull-flag",
        "name": "Skull Flag",
        "cx": 180,
        "cy": 180,
        "x": 20,
        "y": 30,
        "radius": 5.2,
        "iconSvg": "<path d=\"M4 2v20m0-18h14l-2 5 2 5H4\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\"/>"
      },
      {
        "id": "golden-chalice",
        "name": "Golden Chalice",
        "cx": 580,
        "cy": 470,
        "x": 64.4,
        "y": 78.3,
        "radius": 5,
        "iconSvg": "<path d=\"M7 4h10v6a5 5 0 0 1-10 0V4ZM12 15v5m-4 0h8\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>"
      },
      {
        "id": "pocket-compass",
        "name": "Compass",
        "cx": 730,
        "cy": 490,
        "x": 81.1,
        "y": 81.7,
        "radius": 4.8,
        "iconSvg": "<circle cx=\"12\" cy=\"12\" r=\"9\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><polygon points=\"12 6 15 12 12 18 9 12\" stroke=\"currentColor\" stroke-width=\"1.8\" fill=\"none\"/>"
      },
      {
        "id": "red-parrot",
        "name": "Parrot",
        "cx": 780,
        "cy": 160,
        "x": 86.7,
        "y": 26.7,
        "radius": 5,
        "iconSvg": "<path d=\"M16 4c-3 0-5 2-5 5v5l-4 4m9-14a4 4 0 0 1 4 4c0 3-2 6-4 8v4\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>"
      },
      {
        "id": "message-bottle",
        "name": "Message Bottle",
        "cx": 450,
        "cy": 530,
        "x": 50,
        "y": 88.3,
        "radius": 5,
        "iconSvg": "<rect x=\"8\" y=\"8\" width=\"8\" height=\"13\" rx=\"3\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><path d=\"M10 8V4h4v4\" stroke=\"currentColor\" stroke-width=\"2\"/>"
      },
      {
        "id": "pirate-cutlass",
        "name": "Cutlass Sword",
        "cx": 660,
        "cy": 350,
        "x": 73.3,
        "y": 58.3,
        "radius": 5,
        "iconSvg": "<path d=\"m5 19 3-3m-3 3c-1 1-1 3 1 3s3-1 2-3l12-14c-4 0-10 4-15 14Z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>"
      },
      {
        "id": "iron-anchor",
        "name": "Iron Anchor",
        "cx": 120,
        "cy": 360,
        "x": 13.3,
        "y": 60,
        "radius": 5.2,
        "iconSvg": "<circle cx=\"12\" cy=\"5\" r=\"2.5\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><path d=\"M12 7.5V20m-7-5c0 4 3 6 7 6s7-2 7-6M8 11h8\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/>"
      }
    ]
  },
  {
    "id": "level-5-magical-library",
    "level": 5,
    "title": "Magical Library",
    "theme": "Arcane Sanctum",
    "description": "An ancient grand library stacked high with glowing scrolls, spellbooks, and mystic relics.",
    "image": "/images/hidden-object/level-5-magical-library.svg",
    "imageWidth": 900,
    "imageHeight": 600,
    "objects": [
      {
        "id": "potion-vial",
        "name": "Potion Vial",
        "cx": 240,
        "cy": 330,
        "x": 26.7,
        "y": 55,
        "radius": 4.8,
        "iconSvg": "<path d=\"M10 3h4m-3 0v4l-4 8a3 3 0 0 0 3 4h4a3 3 0 0 0 3-4l-4-8V3\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\"/>"
      },
      {
        "id": "magic-wand",
        "name": "Magic Wand",
        "cx": 690,
        "cy": 220,
        "x": 76.7,
        "y": 36.7,
        "radius": 4.8,
        "iconSvg": "<path d=\"m4 20 12-12m1-3 1 1m-5 1 1 1m6 1 1 1m-3-5 1 1\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/>"
      },
      {
        "id": "wise-owl",
        "name": "Wise Owl",
        "cx": 130,
        "cy": 150,
        "x": 14.4,
        "y": 25,
        "radius": 5,
        "iconSvg": "<circle cx=\"12\" cy=\"13\" r=\"7\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><path d=\"M9 11a1.5 1.5 0 1 0 0 .1m6-.1a1.5 1.5 0 1 0 0 .1M8 6l2 2m6-2-2 2M12 14l-1 2h2l-1-2\" stroke=\"currentColor\" stroke-width=\"1.8\"/>"
      },
      {
        "id": "antique-hourglass",
        "name": "Hourglass",
        "cx": 520,
        "cy": 430,
        "x": 57.8,
        "y": 71.7,
        "radius": 4.8,
        "iconSvg": "<path d=\"M6 3h12M6 21h12M7 3l5 6-5 6v6m10-18-5 6 5 6v6\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>"
      },
      {
        "id": "magic-crystal",
        "name": "Magic Crystal",
        "cx": 370,
        "cy": 260,
        "x": 41.1,
        "y": 43.3,
        "radius": 4.8,
        "iconSvg": "<polygon points=\"12 2 19 8 16 21 8 21 5 8\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"21\" stroke=\"currentColor\" stroke-width=\"1.8\"/>"
      },
      {
        "id": "ribbon-bookmark",
        "name": "Ribbon Bookmark",
        "cx": 590,
        "cy": 460,
        "x": 65.6,
        "y": 76.7,
        "radius": 4.8,
        "iconSvg": "<path d=\"M6 3h12v18l-6-4-6 4V3Z\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/>"
      },
      {
        "id": "brass-lamp",
        "name": "Brass Lamp",
        "cx": 810,
        "cy": 280,
        "x": 90,
        "y": 46.7,
        "radius": 5,
        "iconSvg": "<path d=\"M5 15h14l-3 4H8l-3-4ZM7 15l2-6h6l2 6M12 4v5\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>"
      },
      {
        "id": "wax-sealed-scroll",
        "name": "Ancient Scroll",
        "cx": 430,
        "cy": 470,
        "x": 47.8,
        "y": 78.3,
        "radius": 4.8,
        "iconSvg": "<rect x=\"6\" y=\"5\" width=\"12\" height=\"14\" rx=\"2\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><circle cx=\"12\" cy=\"12\" r=\"2\" fill=\"currentColor\"/>"
      }
    ]
  },
  {
    "id": "level-6-camping-adventure",
    "level": 6,
    "title": "Camping Adventure",
    "theme": "Wilderness Retreat",
    "description": "A quiet mountain campsite under twilight with a tent, fire pit, and starry sky.",
    "image": "/images/hidden-object/level-6-camping-adventure.svg",
    "imageWidth": 900,
    "imageHeight": 600,
    "objects": [
      {
        "id": "torch-flashlight",
        "name": "Flashlight",
        "cx": 660,
        "cy": 470,
        "x": 73.3,
        "y": 78.3,
        "radius": 5,
        "iconSvg": "<rect x=\"4\" y=\"9\" width=\"11\" height=\"6\" rx=\"1\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><path d=\"m15 9 5-3v12l-5-3M7 9v6\" stroke=\"currentColor\" stroke-width=\"2\"/>"
      },
      {
        "id": "water-canteen",
        "name": "Water Flask",
        "cx": 320,
        "cy": 290,
        "x": 35.6,
        "y": 48.3,
        "radius": 4.8,
        "iconSvg": "<circle cx=\"12\" cy=\"14\" r=\"7\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><rect x=\"10\" y=\"3\" width=\"4\" height=\"4\" stroke=\"currentColor\" stroke-width=\"2\"/>"
      },
      {
        "id": "marshmallow-stick",
        "name": "Toasting Stick",
        "cx": 530,
        "cy": 440,
        "x": 58.9,
        "y": 73.3,
        "radius": 4.8,
        "iconSvg": "<line x1=\"4\" y1=\"20\" x2=\"18\" y2=\"6\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/><rect x=\"16\" y=\"4\" width=\"5\" height=\"5\" rx=\"1\" fill=\"currentColor\"/>"
      },
      {
        "id": "pocket-compass",
        "name": "Trail Compass",
        "cx": 810,
        "cy": 430,
        "x": 90,
        "y": 71.7,
        "radius": 4.8,
        "iconSvg": "<circle cx=\"12\" cy=\"12\" r=\"9\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><line x1=\"12\" y1=\"7\" x2=\"12\" y2=\"17\" stroke=\"currentColor\" stroke-width=\"2\"/><line x1=\"7\" y1=\"12\" x2=\"17\" y2=\"12\" stroke=\"currentColor\" stroke-width=\"2\"/>"
      },
      {
        "id": "pine-cone",
        "name": "Pinecone",
        "cx": 210,
        "cy": 480,
        "x": 23.3,
        "y": 80,
        "radius": 4.8,
        "iconSvg": "<ellipse cx=\"12\" cy=\"13\" rx=\"6\" ry=\"8\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><path d=\"M8 9h8M7 13h10M8 17h8\" stroke=\"currentColor\" stroke-width=\"1.8\"/>"
      },
      {
        "id": "acoustic-guitar",
        "name": "Camp Guitar",
        "cx": 160,
        "cy": 340,
        "x": 17.8,
        "y": 56.7,
        "radius": 5.2,
        "iconSvg": "<circle cx=\"10\" cy=\"15\" r=\"5\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><path d=\"m14 11 6-6m-2-2 4 4\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/>"
      },
      {
        "id": "camp-lantern",
        "name": "Camp Lantern",
        "cx": 450,
        "cy": 180,
        "x": 50,
        "y": 30,
        "radius": 5,
        "iconSvg": "<rect x=\"7\" y=\"8\" width=\"10\" height=\"12\" rx=\"2\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><path d=\"M9 8V5a3 3 0 0 1 6 0v3M12 11v6\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/>"
      },
      {
        "id": "hiking-boots",
        "name": "Hiking Boots",
        "cx": 370,
        "cy": 470,
        "x": 41.1,
        "y": 78.3,
        "radius": 5,
        "iconSvg": "<path d=\"M5 19h14v-4l-3-2-2-6H9v8l-4 4Z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\"/>"
      }
    ]
  },
  {
    "id": "level-7-old-town-market",
    "level": 7,
    "title": "Old Town Market",
    "theme": "Historic Bazaar",
    "description": "A bustling medieval marketplace packed with vendor stalls, barrels, and fabric awnings.",
    "image": "/images/hidden-object/level-7-old-town-market.svg",
    "imageWidth": 900,
    "imageHeight": 600,
    "objects": [
      {
        "id": "market-basket",
        "name": "Woven Basket",
        "cx": 150,
        "cy": 470,
        "x": 16.7,
        "y": 78.3,
        "radius": 5,
        "iconSvg": "<path d=\"M4 11h16l-2 9H6l-2-9ZM8 11c0-3 2-6 4-6s4 3 4 6\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>"
      },
      {
        "id": "crusty-baguette",
        "name": "Baguette",
        "cx": 310,
        "cy": 370,
        "x": 34.4,
        "y": 61.7,
        "radius": 4.8,
        "iconSvg": "<path d=\"M4 18 18 4a3 3 0 0 1 4 4L8 22l-4-4Zm5-7 2 2m2-6 2 2\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/>"
      },
      {
        "id": "balance-scale",
        "name": "Merchant Scale",
        "cx": 480,
        "cy": 330,
        "x": 53.3,
        "y": 55,
        "radius": 4.8,
        "iconSvg": "<path d=\"M12 3v18M5 8h14M3 13l2-5 2 5Zm14 0 2-5 2 5Z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\"/>"
      },
      {
        "id": "brass-bell",
        "name": "Brass Handbell",
        "cx": 820,
        "cy": 240,
        "x": 91.1,
        "y": 40,
        "radius": 4.8,
        "iconSvg": "<path d=\"M6 16c0-4 2-8 6-8s6 4 6 8H6ZM12 8V4m-2 15a2 2 0 0 0 4 0\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>"
      },
      {
        "id": "pocket-watch",
        "name": "Pocket Watch",
        "cx": 670,
        "cy": 290,
        "x": 74.4,
        "y": 48.3,
        "radius": 4.8,
        "iconSvg": "<circle cx=\"12\" cy=\"13\" r=\"7\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><path d=\"M12 10v3l2 1M12 6V4\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/>"
      },
      {
        "id": "cheese-wheel",
        "name": "Cheese Wheel",
        "cx": 560,
        "cy": 390,
        "x": 62.2,
        "y": 65,
        "radius": 4.8,
        "iconSvg": "<ellipse cx=\"12\" cy=\"10\" rx=\"9\" ry=\"5\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><path d=\"M3 10v6c0 2.8 4 5 9 5s9-2.2 9-5v-6\" stroke=\"currentColor\" stroke-width=\"2\"/>"
      },
      {
        "id": "purple-grapes",
        "name": "Grape Cluster",
        "cx": 390,
        "cy": 460,
        "x": 43.3,
        "y": 76.7,
        "radius": 4.8,
        "iconSvg": "<circle cx=\"10\" cy=\"10\" r=\"2.5\" fill=\"currentColor\"/><circle cx=\"14\" cy=\"10\" r=\"2.5\" fill=\"currentColor\"/><circle cx=\"12\" cy=\"14\" r=\"2.5\" fill=\"currentColor\"/><circle cx=\"12\" cy=\"18\" r=\"2\" fill=\"currentColor\"/><path d=\"M12 7V4c1 0 2-1 2-1\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/>"
      },
      {
        "id": "folding-fan",
        "name": "Silk Fan",
        "cx": 730,
        "cy": 420,
        "x": 81.1,
        "y": 70,
        "radius": 4.8,
        "iconSvg": "<path d=\"M12 20c-5-5-8-10-8-14 3-1 7-1 8 0 1-1 5-1 8 0 0 4-3 9-8 14Z\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/>"
      }
    ]
  },
  {
    "id": "level-8-underwater-world",
    "level": 8,
    "title": "Underwater World",
    "theme": "Coral Deep",
    "description": "A vibrant coral reef with shimmering schools of tropical fish and sunken relics.",
    "image": "/images/hidden-object/level-8-underwater-world.svg",
    "imageWidth": 900,
    "imageHeight": 600,
    "objects": [
      {
        "id": "pearl-oyster",
        "name": "Pearl Oyster",
        "cx": 380,
        "cy": 520,
        "x": 42.2,
        "y": 86.7,
        "radius": 4.8,
        "iconSvg": "<path d=\"M4 14c0 4 4 7 8 7s8-3 8-7c0-4-4-7-8-7s-8 3-8 7Z\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><circle cx=\"12\" cy=\"14\" r=\"2.5\" fill=\"currentColor\"/>"
      },
      {
        "id": "orange-starfish",
        "name": "Starfish",
        "cx": 730,
        "cy": 410,
        "x": 81.1,
        "y": 68.3,
        "radius": 4.8,
        "iconSvg": "<polygon points=\"12 2 15 8 22 9 17 14 18 21 12 17 6 21 7 14 2 9 9 8\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/>"
      },
      {
        "id": "yellow-seahorse",
        "name": "Seahorse",
        "cx": 170,
        "cy": 320,
        "x": 18.9,
        "y": 53.3,
        "radius": 4.8,
        "iconSvg": "<path d=\"M10 6c0-2 2-3 4-2 2 1 2 4 1 6-1 2-2 4-2 6 0 3 2 4 1 5s-3 0-3-2c0-3 2-4 2-6\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>"
      },
      {
        "id": "sunken-amphora",
        "name": "Sunken Amphora",
        "cx": 270,
        "cy": 430,
        "x": 30,
        "y": 71.7,
        "radius": 5,
        "iconSvg": "<path d=\"M9 5h6v3c2 2 3 5 2 9-1 3-3 5-5 5s-4-2-5-5c-1-4 0-7 2-9V5Z\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/>"
      },
      {
        "id": "sea-turtle",
        "name": "Sea Turtle",
        "cx": 510,
        "cy": 170,
        "x": 56.7,
        "y": 28.3,
        "radius": 5,
        "iconSvg": "<ellipse cx=\"12\" cy=\"13\" rx=\"6\" ry=\"7\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><circle cx=\"12\" cy=\"4\" r=\"2\" fill=\"currentColor\"/><path d=\"m6 8-3-2m15 2 3-2M6 18l-3 2m15-2 3 2\" stroke=\"currentColor\" stroke-width=\"2\"/>"
      },
      {
        "id": "diving-helmet",
        "name": "Diving Helmet",
        "cx": 820,
        "cy": 480,
        "x": 91.1,
        "y": 80,
        "radius": 5,
        "iconSvg": "<circle cx=\"12\" cy=\"11\" r=\"7\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><circle cx=\"12\" cy=\"11\" r=\"3\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M6 18h12v3H6v-3Z\" stroke=\"currentColor\" stroke-width=\"2\"/>"
      },
      {
        "id": "pink-shell",
        "name": "Scallop Shell",
        "cx": 610,
        "cy": 530,
        "x": 67.8,
        "y": 88.3,
        "radius": 4.8,
        "iconSvg": "<path d=\"M12 21c-5-2-8-6-8-10 2-3 5-4 8-4s6 1 8 4c0 4-3 8-8 10Z\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/>"
      },
      {
        "id": "gold-coin",
        "name": "Sunken Coin",
        "cx": 460,
        "cy": 490,
        "x": 51.1,
        "y": 81.7,
        "radius": 4.6,
        "iconSvg": "<circle cx=\"12\" cy=\"12\" r=\"8\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><path d=\"M12 8v8m-2-6h3.5a1.5 1.5 0 0 1 0 3H10.5a1.5 1.5 0 0 0 0 3H14\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/>"
      }
    ]
  },
  {
    "id": "level-9-enchanted-forest",
    "level": 9,
    "title": "Enchanted Forest",
    "theme": "Fairy Realm",
    "description": "A twilight woodland filled with glowing flora, ancient mossy roots, and hidden fairy secrets.",
    "image": "/images/hidden-object/level-9-enchanted-forest.svg",
    "imageWidth": 900,
    "imageHeight": 600,
    "objects": [
      {
        "id": "glowing-mushroom",
        "name": "Magic Mushroom",
        "cx": 280,
        "cy": 250,
        "x": 31.1,
        "y": 41.7,
        "radius": 4.8,
        "iconSvg": "<path d=\"M4 13c0-5 3.5-9 8-9s8 4 8 9H4ZM10 13v6a2 2 0 0 0 4 0v-6\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/>"
      },
      {
        "id": "golden-acorn",
        "name": "Golden Acorn",
        "cx": 720,
        "cy": 460,
        "x": 80,
        "y": 76.7,
        "radius": 4.8,
        "iconSvg": "<ellipse cx=\"12\" cy=\"14\" rx=\"6\" ry=\"7\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><path d=\"M6 10h12v-2a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v2ZM12 5V2\" stroke=\"currentColor\" stroke-width=\"2\"/>"
      },
      {
        "id": "fairy-wings",
        "name": "Fairy Wings",
        "cx": 180,
        "cy": 190,
        "x": 20,
        "y": 31.7,
        "radius": 4.8,
        "iconSvg": "<path d=\"M12 12c-4-4-7-8-6-10s6 1 6 5c0-4 5-7 6-5s-2 6-6 10Zm0 0c-3 3-5 7-4 8s5-1 4-4c0 3 3 5 4 4s-1-5-4-8Z\" stroke=\"currentColor\" stroke-width=\"1.8\" fill=\"none\"/>"
      },
      {
        "id": "wooden-flute",
        "name": "Wooden Flute",
        "cx": 410,
        "cy": 480,
        "x": 45.6,
        "y": 80,
        "radius": 4.8,
        "iconSvg": "<line x1=\"4\" y1=\"20\" x2=\"20\" y2=\"4\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"10\" cy=\"14\" r=\"1\" fill=\"currentColor\"/><circle cx=\"13\" cy=\"11\" r=\"1\" fill=\"currentColor\"/><circle cx=\"16\" cy=\"8\" r=\"1\" fill=\"currentColor\"/>"
      },
      {
        "id": "blue-feather",
        "name": "Blue Feather",
        "cx": 530,
        "cy": 520,
        "x": 58.9,
        "y": 86.7,
        "radius": 4.8,
        "iconSvg": "<path d=\"M20 4c-6 2-12 8-14 14l2 2c6-2 12-8 14-14l-2-2Zm-7 7 4 4\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>"
      },
      {
        "id": "emerald-dragonfly",
        "name": "Dragonfly",
        "cx": 630,
        "cy": 370,
        "x": 70,
        "y": 61.7,
        "radius": 4.8,
        "iconSvg": "<line x1=\"12\" y1=\"4\" x2=\"12\" y2=\"20\" stroke=\"currentColor\" stroke-width=\"2\"/><ellipse cx=\"7\" cy=\"8\" rx=\"4\" ry=\"1.5\" stroke=\"currentColor\" stroke-width=\"1.5\"/><ellipse cx=\"17\" cy=\"8\" rx=\"4\" ry=\"1.5\" stroke=\"currentColor\" stroke-width=\"1.5\"/>"
      },
      {
        "id": "ivy-key",
        "name": "Enchanted Key",
        "cx": 810,
        "cy": 280,
        "x": 90,
        "y": 46.7,
        "radius": 4.8,
        "iconSvg": "<circle cx=\"8\" cy=\"8\" r=\"4\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><path d=\"m11 11 9 9m-2-4 2 2m-4-1 2 2\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/>"
      },
      {
        "id": "magic-potion",
        "name": "Forest Elixir",
        "cx": 340,
        "cy": 390,
        "x": 37.8,
        "y": 65,
        "radius": 4.8,
        "iconSvg": "<circle cx=\"12\" cy=\"15\" r=\"6\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><rect x=\"10\" y=\"3\" width=\"4\" height=\"6\" stroke=\"currentColor\" stroke-width=\"2\"/>"
      }
    ]
  },
  {
    "id": "level-10-mysterious-castle",
    "level": 10,
    "title": "Mysterious Castle",
    "theme": "Gothic Citadel",
    "description": "A grand royal fortress hall with armor suits, heraldic banners, and majestic fireplaces.",
    "image": "/images/hidden-object/level-10-mysterious-castle.svg",
    "imageWidth": 900,
    "imageHeight": 600,
    "objects": [
      {
        "id": "knight-helmet",
        "name": "Knight Visor",
        "cx": 210,
        "cy": 280,
        "x": 23.3,
        "y": 46.7,
        "radius": 4.8,
        "iconSvg": "<path d=\"M6 13c0-4 3-8 6-8s6 4 6 8v4H6v-4ZM8 13h8M7 17h10\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" fill=\"none\"/>"
      },
      {
        "id": "jeweled-crown",
        "name": "Royal Crown",
        "cx": 490,
        "cy": 360,
        "x": 54.4,
        "y": 60,
        "radius": 4.8,
        "iconSvg": "<polygon points=\"4 18 20 18 19 8 15 12 12 6 9 12 5 8\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linejoin=\"round\" fill=\"none\"/>"
      },
      {
        "id": "knight-shield",
        "name": "Heraldic Shield",
        "cx": 140,
        "cy": 210,
        "x": 15.6,
        "y": 35,
        "radius": 5,
        "iconSvg": "<path d=\"M12 3 5 6v6c0 5 3.5 9 7 10 3.5-1 7-5 7-10V6l-7-3Z\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/>"
      },
      {
        "id": "iron-castle-key",
        "name": "Dungeon Key",
        "cx": 770,
        "cy": 220,
        "x": 85.6,
        "y": 36.7,
        "radius": 4.8,
        "iconSvg": "<circle cx=\"7\" cy=\"12\" r=\"4\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/><line x1=\"11\" y1=\"12\" x2=\"21\" y2=\"12\" stroke=\"currentColor\" stroke-width=\"2.5\"/><line x1=\"17\" y1=\"12\" x2=\"17\" y2=\"16\" stroke=\"currentColor\" stroke-width=\"2.5\"/><line x1=\"20\" y1=\"12\" x2=\"20\" y2=\"15\" stroke=\"currentColor\" stroke-width=\"2.5\"/>"
      },
      {
        "id": "silver-candelabra",
        "name": "Candelabra",
        "cx": 330,
        "cy": 380,
        "x": 36.7,
        "y": 63.3,
        "radius": 4.8,
        "iconSvg": "<path d=\"M12 4v16m-6-8c0 4 3 6 6 6s6-2 6-6V8m-12 0v4m0-4c0-1.5.5-2 1-2s1 .5 1 2m10 0c0-1.5.5-2 1-2s1 .5 1 2m-6-6c0-1.5.5-2 1-2s1 .5 1 2\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/>"
      },
      {
        "id": "hunting-crossbow",
        "name": "Crossbow",
        "cx": 820,
        "cy": 420,
        "x": 91.1,
        "y": 70,
        "radius": 5,
        "iconSvg": "<line x1=\"12\" y1=\"4\" x2=\"12\" y2=\"20\" stroke=\"currentColor\" stroke-width=\"2.5\"/><path d=\"M4 10c4-4 12-4 16 0\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" fill=\"none\"/>"
      },
      {
        "id": "heraldic-banner",
        "name": "Royal Banner",
        "cx": 520,
        "cy": 170,
        "x": 57.8,
        "y": 28.3,
        "radius": 5,
        "iconSvg": "<path d=\"M5 4h14v16l-7-4-7 4V4Z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linejoin=\"round\" fill=\"none\"/>"
      },
      {
        "id": "royal-scepter",
        "name": "King Scepter",
        "cx": 630,
        "cy": 390,
        "x": 70,
        "y": 65,
        "radius": 4.8,
        "iconSvg": "<line x1=\"6\" y1=\"20\" x2=\"16\" y2=\"8\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><circle cx=\"18\" cy=\"6\" r=\"3\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/>"
      }
    ]
  }
];
