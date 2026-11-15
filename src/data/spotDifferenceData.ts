/**
 * Spot the Difference Game - Verified Puzzle Data
 * PuzzleFeels.com
 */

export interface DifferenceItem {
  id: number;
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  radius: number; // click tolerance radius as percentage
  label: string;
  hint: string;
}

export interface SpotPuzzle {
  id: string;
  level: number;
  difficulty: 'easy' | 'medium' | 'hard';
  title: string;
  category: string;
  description: string;
  imageA: string;
  imageB: string;
  imageWidth: number;
  imageHeight: number;
  differences: DifferenceItem[];
}

export const SPOT_DIFFERENCE_PUZZLES: SpotPuzzle[] = [
  {
    "id": "alpine-mountain-camp",
    "level": 1,
    "difficulty": "easy",
    "title": "Alpine Mountain Camp",
    "category": "Nature & Landscapes",
    "description": "A serene alpine mountain retreat with a cozy log cabin, glowing campfire, and tranquil lake.",
    "imageA": "/images/spot-the-difference/alpine-mountain-camp-a.svg",
    "imageB": "/images/spot-the-difference/alpine-mountain-camp-b.svg",
    "imageWidth": 800,
    "imageHeight": 520,
    "differences": [
      {
        "id": 1,
        "x": 58,
        "y": 28.1,
        "radius": 5.5,
        "label": "Cabin Chimney Smoke",
        "hint": "Look above the cabin roof to see what is rising from the chimney."
      },
      {
        "id": 2,
        "x": 23,
        "y": 21.9,
        "radius": 5.5,
        "label": "Left Mountain Snowcap",
        "hint": "Check the snowy peak of the far left mountain ridge."
      },
      {
        "id": 3,
        "x": 74.5,
        "y": 77.9,
        "radius": 5.5,
        "label": "Canoe Paddle",
        "hint": "Examine the wooden canoe resting on the pebbled lake shore."
      },
      {
        "id": 4,
        "x": 42,
        "y": 81,
        "radius": 5.5,
        "label": "Campfire Flame Color",
        "hint": "Inspect the glowing flames inside the campfire stone ring."
      },
      {
        "id": 5,
        "x": 35,
        "y": 15,
        "radius": 5.5,
        "label": "Fluffy Sky Cloud",
        "hint": "Observe the drifting clouds high above the mountain range."
      }
    ]
  },
  {
    "id": "artisan-bakery-cafe",
    "level": 2,
    "difficulty": "easy",
    "title": "Artisan Bakery & Cafe",
    "category": "Food & Kitchen",
    "description": "A cozy corner boulangerie filled with fresh croissants, steaming coffee, and sweet pastries.",
    "imageA": "/images/spot-the-difference/artisan-bakery-cafe-a.svg",
    "imageB": "/images/spot-the-difference/artisan-bakery-cafe-b.svg",
    "imageWidth": 800,
    "imageHeight": 520,
    "differences": [
      {
        "id": 1,
        "x": 78,
        "y": 24,
        "radius": 5.5,
        "label": "Wall Clock Hands Time",
        "hint": "Check the face of the round wooden clock hanging high on the right wall."
      },
      {
        "id": 2,
        "x": 38,
        "y": 64,
        "radius": 5.5,
        "label": "Coffee Mug Color",
        "hint": "Examine the ceramic coffee mug resting on the wooden pastry counter."
      },
      {
        "id": 3,
        "x": 50,
        "y": 14,
        "radius": 5.5,
        "label": "Striped Canopy Awning",
        "hint": "Look at the colored fabric stripes of the decorative cafe awning."
      },
      {
        "id": 4,
        "x": 62,
        "y": 55,
        "radius": 5.5,
        "label": "Croissant on Upper Glass Shelf",
        "hint": "Inspect the golden baked pastries displayed on the top glass shelf."
      },
      {
        "id": 5,
        "x": 18,
        "y": 35,
        "radius": 5.5,
        "label": "Chalkboard Menu Illustration",
        "hint": "Read the specials drawn on the framed blackboard menu on the left wall."
      }
    ]
  },
  {
    "id": "sunny-coral-reef",
    "level": 3,
    "difficulty": "easy",
    "title": "Sunny Coral Reef",
    "category": "Animals & Sea Life",
    "description": "An enchanting underwater coral reef with a gentle sea turtle, clownfish, starfish, and ocean treasures.",
    "imageA": "/images/spot-the-difference/sunny-coral-reef-a.svg",
    "imageB": "/images/spot-the-difference/sunny-coral-reef-b.svg",
    "imageWidth": 800,
    "imageHeight": 520,
    "differences": [
      {
        "id": 1,
        "x": 32,
        "y": 35,
        "radius": 5.5,
        "label": "Sea Turtle Shell Pattern",
        "hint": "Observe the decorative markings across the swimming sea turtle shell."
      },
      {
        "id": 2,
        "x": 72,
        "y": 84,
        "radius": 5.5,
        "label": "Starfish Color on Sand",
        "hint": "Look down at the starfish resting peacefully on the seabed sand."
      },
      {
        "id": 3,
        "x": 55,
        "y": 22,
        "radius": 5.5,
        "label": "Ascending Bubble Cluster",
        "hint": "Watch the trail of round bubbles floating up toward the ocean surface."
      },
      {
        "id": 4,
        "x": 82,
        "y": 62,
        "radius": 5.5,
        "label": "Sea Anemone Color",
        "hint": "Examine the flowing soft tentacles of the sea anemone on the right reef."
      },
      {
        "id": 5,
        "x": 20,
        "y": 66,
        "radius": 5.5,
        "label": "Clownfish White Stripes",
        "hint": "Count the bright white stripes on the orange clownfish swimming near the seabed."
      }
    ]
  },
  {
    "id": "autumn-park-promenade",
    "level": 4,
    "difficulty": "medium",
    "title": "Autumn Park Promenade",
    "category": "City Scenes",
    "description": "A charming city park during peak autumn foliage with golden trees, a street lamp, park bench, and playful squirrel.",
    "imageA": "/images/spot-the-difference/autumn-park-promenade-a.svg",
    "imageB": "/images/spot-the-difference/autumn-park-promenade-b.svg",
    "imageWidth": 800,
    "imageHeight": 520,
    "differences": [
      {
        "id": 1,
        "x": 22,
        "y": 40,
        "radius": 5,
        "label": "Street Lamp Glass Glow",
        "hint": "Check the glowing lantern glass of the vintage cast-iron streetlamp."
      },
      {
        "id": 2,
        "x": 81,
        "y": 68,
        "radius": 5,
        "label": "Bicycle Basket Flower",
        "hint": "Examine what is resting inside the wicker basket on the bicycle handlebars."
      },
      {
        "id": 3,
        "x": 38,
        "y": 77,
        "radius": 5,
        "label": "Squirrel's Acorn",
        "hint": "Inspect the tiny acorn held in the paws of the squirrel on the lawn."
      },
      {
        "id": 4,
        "x": 54,
        "y": 67,
        "radius": 5,
        "label": "Park Bench Item",
        "hint": "Notice what object is resting on the wooden slats of the park bench."
      },
      {
        "id": 5,
        "x": 64,
        "y": 33,
        "radius": 5,
        "label": "Bridge Arch Hanging Pennant",
        "hint": "Look closely at the decorative pennant banner strung across the distant stone bridge."
      },
      {
        "id": 6,
        "x": 44,
        "y": 21,
        "radius": 5,
        "label": "Songbird in Golden Canopy",
        "hint": "Search high in the golden branches of the central maple tree."
      },
      {
        "id": 7,
        "x": 15,
        "y": 85,
        "radius": 5,
        "label": "Cobblestone Leaf Cluster",
        "hint": "Count the fallen red maple leaves lying on the lower left cobblestones."
      }
    ]
  },
  {
    "id": "artists-loft-studio",
    "level": 5,
    "difficulty": "medium",
    "title": "Artist's Loft Studio",
    "category": "Home & Living",
    "description": "A light-filled penthouse studio with a wooden easel, sleeping tabby cat, art supplies, and loft skylight.",
    "imageA": "/images/spot-the-difference/artists-loft-studio-a.svg",
    "imageB": "/images/spot-the-difference/artists-loft-studio-b.svg",
    "imageWidth": 800,
    "imageHeight": 520,
    "differences": [
      {
        "id": 1,
        "x": 48,
        "y": 42,
        "radius": 5,
        "label": "Canvas Painting Celestial Motif",
        "hint": "Examine the landscape painted on the easel canvas (sun vs moon)."
      },
      {
        "id": 2,
        "x": 31,
        "y": 82,
        "radius": 5,
        "label": "Sleeping Cat Collar Color",
        "hint": "Check the tiny collar around the neck of the curled cat on the round rug."
      },
      {
        "id": 3,
        "x": 88,
        "y": 65,
        "radius": 5,
        "label": "Acoustic Guitar Emblem",
        "hint": "Look closely at the lower soundboard body of the acoustic guitar."
      },
      {
        "id": 4,
        "x": 16,
        "y": 28,
        "radius": 5,
        "label": "Macrame Plant Flower Blossom",
        "hint": "Inspect the foliage inside the hanging macrame woven plant holder."
      },
      {
        "id": 5,
        "x": 68,
        "y": 16,
        "radius": 5,
        "label": "Bird on Skylight Window Frame",
        "hint": "Look up at the angled glass panes of the ceiling skylight."
      },
      {
        "id": 6,
        "x": 61,
        "y": 69,
        "radius": 5,
        "label": "Tall Paintbrush Handle Color",
        "hint": "Check the brush handles standing in the ceramic jar on the stool."
      },
      {
        "id": 7,
        "x": 85,
        "y": 28,
        "radius": 5,
        "label": "Bookshelf Top Shelf Sculpture",
        "hint": "See what ornamental sculpture is resting on the top wooden bookshelf."
      }
    ]
  },
  {
    "id": "tropical-island-haven",
    "level": 6,
    "difficulty": "medium",
    "title": "Tropical Island Haven",
    "category": "Beach & Vacation",
    "description": "A sun-drenched tropical oasis with white sand, coconut palm, striped umbrella, lounge chair, and turquoise waves.",
    "imageA": "/images/spot-the-difference/tropical-island-haven-a.svg",
    "imageB": "/images/spot-the-difference/tropical-island-haven-b.svg",
    "imageWidth": 800,
    "imageHeight": 520,
    "differences": [
      {
        "id": 1,
        "x": 26,
        "y": 25,
        "radius": 5,
        "label": "Palm Tree Coconut Cluster",
        "hint": "Count the round brown coconuts clustered under the palm fronds."
      },
      {
        "id": 2,
        "x": 58,
        "y": 38,
        "radius": 5,
        "label": "Beach Umbrella Stripe Color",
        "hint": "Observe the alternating colored wedges of the striped beach umbrella."
      },
      {
        "id": 3,
        "x": 43,
        "y": 72,
        "radius": 5,
        "label": "Fruit Drink Garnish & Straw",
        "hint": "Inspect the garnish and straw in the tropical smoothie on the side table."
      },
      {
        "id": 4,
        "x": 84,
        "y": 39,
        "radius": 5,
        "label": "Horizon Sailboat Sail Color",
        "hint": "Look far out across the ocean horizon at the passing sailboat."
      },
      {
        "id": 5,
        "x": 66,
        "y": 17,
        "radius": 5,
        "label": "Soaring Seagull in Sky",
        "hint": "Count the white seagulls gliding high above the ocean water."
      },
      {
        "id": 6,
        "x": 73,
        "y": 81,
        "radius": 5,
        "label": "Beach Towel Pattern",
        "hint": "Examine the decorative pattern printed on the beach towel."
      },
      {
        "id": 7,
        "x": 14,
        "y": 82,
        "radius": 5,
        "label": "Seashell Shape on Tideline",
        "hint": "Notice the shape of the large seashell resting at the wet water line."
      }
    ]
  },
  {
    "id": "stargazers-observatory",
    "level": 7,
    "difficulty": "hard",
    "title": "Stargazer's Observatory",
    "category": "Travel & Space",
    "description": "A hilltop astronomical dome beneath a cosmic nebula with brass telescope, star charts, and computer console.",
    "imageA": "/images/spot-the-difference/stargazers-observatory-a.svg",
    "imageB": "/images/spot-the-difference/stargazers-observatory-b.svg",
    "imageWidth": 800,
    "imageHeight": 520,
    "differences": [
      {
        "id": 1,
        "x": 18,
        "y": 18,
        "radius": 4.5,
        "label": "Crescent Moon Surface Crater",
        "hint": "Inspect the glowing crescent moon in the deep starry sky."
      },
      {
        "id": 2,
        "x": 38,
        "y": 12,
        "radius": 4.5,
        "label": "Constellation Star Count",
        "hint": "Count the bright connected stars making up the constellation."
      },
      {
        "id": 3,
        "x": 52,
        "y": 32,
        "radius": 4.5,
        "label": "Telescope Brass Trim Ring",
        "hint": "Examine the decorative brass bands around the great telescope barrel."
      },
      {
        "id": 4,
        "x": 74,
        "y": 64,
        "radius": 4.5,
        "label": "Computer Monitor Display",
        "hint": "Check the graph shown on the glowing monitor screen."
      },
      {
        "id": 5,
        "x": 62,
        "y": 78,
        "radius": 4.5,
        "label": "Brass Astrolabe Pointer Angle",
        "hint": "Notice the angle of the pointer needle on the brass astrolabe."
      },
      {
        "id": 6,
        "x": 86,
        "y": 34,
        "radius": 4.5,
        "label": "Star Chart Pushpin Color",
        "hint": "Check the small pushpin tack holding the star map to the board."
      },
      {
        "id": 7,
        "x": 45,
        "y": 20,
        "radius": 4.5,
        "label": "Dome Shutter Rivet Count",
        "hint": "Count the round silver rivets along the dome shutter seam."
      },
      {
        "id": 8,
        "x": 12,
        "y": 68,
        "radius": 4.5,
        "label": "Observatory Cat Eye Gaze",
        "hint": "Look closely at the cat sitting by the stone sill."
      },
      {
        "id": 9,
        "x": 81,
        "y": 82,
        "radius": 4.5,
        "label": "Coffee Mug Emblem",
        "hint": "Examine the emblem graphic printed on the astronomer coffee mug."
      },
      {
        "id": 10,
        "x": 27,
        "y": 56,
        "radius": 4.5,
        "label": "Window Shutter Brass Latch",
        "hint": "Look for a small brass metal latch on the window frame."
      }
    ]
  },
  {
    "id": "old-town-market-plaza",
    "level": 8,
    "difficulty": "hard",
    "title": "Old Town Market Plaza",
    "category": "City Scenes",
    "description": "A vibrant European merchant square featuring half-timbered houses, stone fountain, fruit vendor, and clock tower.",
    "imageA": "/images/spot-the-difference/old-town-market-plaza-a.svg",
    "imageB": "/images/spot-the-difference/old-town-market-plaza-b.svg",
    "imageWidth": 800,
    "imageHeight": 520,
    "differences": [
      {
        "id": 1,
        "x": 48,
        "y": 10,
        "radius": 4.5,
        "label": "Clock Tower Weather Vane",
        "hint": "Inspect the top spire tip of the distant clock tower."
      },
      {
        "id": 2,
        "x": 32,
        "y": 55,
        "radius": 4.5,
        "label": "Fountain Water Spout Flow",
        "hint": "Check the water streaming from the carved fountain head."
      },
      {
        "id": 3,
        "x": 72,
        "y": 46,
        "radius": 4.5,
        "label": "Fruit Cart Awning Fringe",
        "hint": "Examine the fabric edge of the market cart awning."
      },
      {
        "id": 4,
        "x": 78,
        "y": 68,
        "radius": 4.5,
        "label": "Market Crate Fruit Color",
        "hint": "Check the color of the apples stored in the wooden crate."
      },
      {
        "id": 5,
        "x": 61,
        "y": 26,
        "radius": 4.5,
        "label": "Dormer Window Shutter",
        "hint": "Look at the upper dormer window shutter on the right timber house."
      },
      {
        "id": 6,
        "x": 21,
        "y": 38,
        "radius": 4.5,
        "label": "Hanging Flower Basket Petals",
        "hint": "Observe the floral color of the hanging flower planter."
      },
      {
        "id": 7,
        "x": 44,
        "y": 76,
        "radius": 4.5,
        "label": "Cafe Table Cloth Napkin",
        "hint": "Notice what is placed on top of the outdoor bistro table."
      },
      {
        "id": 8,
        "x": 56,
        "y": 87,
        "radius": 4.5,
        "label": "Street Drain Grate Shape",
        "hint": "Look down at the iron drainage grate on the cobblestones."
      },
      {
        "id": 9,
        "x": 17,
        "y": 15,
        "radius": 4.5,
        "label": "Rooftop Chimney Cap",
        "hint": "Inspect the top chimney pot on the left brick roofline."
      },
      {
        "id": 10,
        "x": 91,
        "y": 58,
        "radius": 4.5,
        "label": "Wrought Iron Gate Finial",
        "hint": "Check the decorative tip ornament on the iron gate pillar."
      }
    ]
  },
  {
    "id": "enchanted-forest-grove",
    "level": 9,
    "difficulty": "hard",
    "title": "Enchanted Forest Grove",
    "category": "Fantasy & Nature",
    "description": "A magical woodland glade with a hollow ancient oak, fairy stone bridge, glowing fireflies, and gentle fawn.",
    "imageA": "/images/spot-the-difference/enchanted-forest-grove-a.svg",
    "imageB": "/images/spot-the-difference/enchanted-forest-grove-b.svg",
    "imageWidth": 800,
    "imageHeight": 520,
    "differences": [
      {
        "id": 1,
        "x": 35,
        "y": 34,
        "radius": 4.5,
        "label": "Glowing Lantern Crystal Color",
        "hint": "Examine the glowing crystal lantern hanging from the high branch."
      },
      {
        "id": 2,
        "x": 58,
        "y": 26,
        "radius": 4.5,
        "label": "Perched Barn Owl Winking Eye",
        "hint": "Look closely at the face of the barn owl perched on the bough."
      },
      {
        "id": 3,
        "x": 24,
        "y": 78,
        "radius": 4.5,
        "label": "Mushroom Fairy Ring Cap Spots",
        "hint": "Inspect the spots on the red mushroom cap in the mossy grass."
      },
      {
        "id": 4,
        "x": 65,
        "y": 62,
        "radius": 4.5,
        "label": "Fairy Stone Bridge Carved Rune",
        "hint": "Look for a carved spiral rune etched on the stone bridge arch."
      },
      {
        "id": 5,
        "x": 46,
        "y": 74,
        "radius": 4.5,
        "label": "Sleeping Fawn Deer Spots",
        "hint": "Count the white dappled spots on the sleeping fawn deer."
      },
      {
        "id": 6,
        "x": 76,
        "y": 80,
        "radius": 4.5,
        "label": "Creek Water Lily Blossom Color",
        "hint": "Check the flower petals of the floating water lily in the stream."
      },
      {
        "id": 7,
        "x": 22,
        "y": 32,
        "radius": 4.5,
        "label": "Ancient Oak Twig Leaf Color",
        "hint": "Examine the leaf color on the small twig branching from the hollow oak."
      },
      {
        "id": 8,
        "x": 42,
        "y": 48,
        "radius": 4.5,
        "label": "Floating Firefly Orb Count",
        "hint": "Count the glowing magic fireflies hovering near the hollow tree trunk."
      },
      {
        "id": 9,
        "x": 30,
        "y": 56,
        "radius": 4.5,
        "label": "Tree Bark Grain Knot",
        "hint": "Look at the swirling bark grain texture on the lower tree trunk."
      },
      {
        "id": 10,
        "x": 88,
        "y": 70,
        "radius": 4.5,
        "label": "Bluebell Flower Floret Count",
        "hint": "Count the delicate bell blossoms hanging on the wild bluebell stem."
      }
    ]
  }
];
