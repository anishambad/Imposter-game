
// PRATIKSHA - Imposter Game word database
// Pairs are generated only inside tightly related word groups.
// Example: Rasgulla / Gulab Jamun, Jalebi / Imarti, Samosa / Kachori.
// This keeps the words similar enough to make the imposter game tricky.

export const categories = {
  indian_sweets: { label: "Indian Sweets", emoji: "🍬" },
  indian_snacks: { label: "Indian Snacks", emoji: "🥙" },
  street_food: { label: "Street Food", emoji: "🌮" },
  desserts: { label: "Desserts", emoji: "🍰" },
  fruits: { label: "Fruits", emoji: "🍓" },
  vegetables: { label: "Vegetables", emoji: "🥕" },
  drinks: { label: "Drinks", emoji: "🥤" },
  animals: { label: "Animals", emoji: "🐾" },
  birds: { label: "Birds", emoji: "🐦" },
  sea_life: { label: "Sea Life", emoji: "🐙" },
  pets: { label: "Pets", emoji: "🐶" },
  vehicles: { label: "Vehicles", emoji: "🚗" },
  sports: { label: "Sports", emoji: "⚽" },
  clothing: { label: "Clothing", emoji: "👕" },
  footwear: { label: "Footwear", emoji: "👟" },
  accessories: { label: "Accessories", emoji: "👜" },
  school: { label: "School Items", emoji: "✏️" },
  technology: { label: "Technology", emoji: "📱" },
  apps: { label: "Apps & Platforms", emoji: "📲" },
  household: { label: "Household", emoji: "🏠" },
  kitchen: { label: "Kitchen Items", emoji: "🍳" },
  furniture: { label: "Furniture", emoji: "🛋️" },
  professions: { label: "Professions", emoji: "🧑‍🍳" },
  places: { label: "Places", emoji: "🏙️" },
  nature: { label: "Nature", emoji: "🌿" },
  weather: { label: "Weather", emoji: "🌦️" },
  entertainment: { label: "Entertainment", emoji: "🎬" },
  games: { label: "Games", emoji: "🎮" },
  instruments: { label: "Musical Instruments", emoji: "🎸" },
  festivals: { label: "Festivals", emoji: "🎉" },
  emotions: { label: "Feelings", emoji: "😊" },
  body: { label: "Body Parts", emoji: "🖐️" },
  colors: { label: "Colors", emoji: "🎨" },
  space: { label: "Space", emoji: "🪐" },
  fantasy: { label: "Fantasy Characters", emoji: "🧙" },
};

// Every inner array is a close-match group.
// Pairs are generated only inside the same group.
const WORD_GROUPS = {
  indian_sweets: [
    ["Rasgulla", "Gulab Jamun", "Rajbhog", "Cham Cham", "Kala Jamun", "Pantua"],
    ["Jalebi", "Imarti", "Amriti", "Balushahi", "Chhena Jalebi"],
    ["Kaju Katli", "Badam Katli", "Pista Katli", "Kaju Roll", "Kaju Pista Roll"],
    ["Besan Ladoo", "Motichoor Ladoo", "Boondi Ladoo", "Rava Ladoo", "Atta Ladoo", "Coconut Ladoo"],
    ["Peda", "Dharwad Peda", "Mathura Peda", "Kesar Peda", "Malai Peda"],
    ["Milk Cake", "Kalakand", "Mawa Barfi", "Plain Barfi", "Coconut Barfi", "Pista Barfi"],
    ["Soan Papdi", "Patisa", "Mysore Pak", "Dharwad Mishri"],
    ["Modak", "Ukadiche Modak", "Fried Modak", "Kozhukattai", "Karanji"],
    ["Gajar Halwa", "Moong Dal Halwa", "Sooji Halwa", "Atta Halwa", "Badam Halwa"],
  ],

  indian_snacks: [
    ["Samosa", "Kachori", "Lilva Kachori", "Pyaaz Kachori", "Matar Kachori"],
    ["Dhokla", "Khaman", "Nylon Khaman", "Rava Dhokla", "Sandwich Dhokla"],
    ["Mathri", "Namak Para", "Shakarpara", "Farsi Puri", "Khakhra"],
    ["Chakli", "Murukku", "Ribbon Pakoda", "Thenkuzhal", "Butter Murukku"],
    ["Poha", "Upma", "Sabudana Khichdi", "Masala Oats", "Vegetable Dalia"],
    ["Idli", "Thatte Idli", "Rava Idli", "Kanchipuram Idli", "Mini Idli"],
    ["Medu Vada", "Masala Vada", "Dal Vada", "Maddur Vada", "Keerai Vada"],
    ["Thepla", "Methi Thepla", "Paratha", "Aloo Paratha", "Gobhi Paratha"],
  ],

  street_food: [
    ["Pani Puri", "Golgappa", "Puchka", "Sev Puri", "Dahi Puri"],
    ["Vada Pav", "Dabeli", "Misal Pav", "Pav Bhaji", "Bun Maska"],
    ["Bhel Puri", "Jhalmuri", "Churmuri", "Masala Puri", "Sukha Bhel"],
    ["Aloo Tikki", "Ragda Pattice", "Chole Tikki", "Dahi Tikki", "Papdi Chaat"],
    ["Veg Momos", "Fried Momos", "Kurkure Momos", "Tandoori Momos", "Paneer Momos"],
    ["Paneer Roll", "Kathi Roll", "Frankie", "Spring Roll", "Shawarma Roll"],
  ],

  desserts: [
    ["Brownie", "Chocolate Fudge", "Chocolate Lava Cake", "Chocolate Cake", "Devil's Food Cake"],
    ["Cheesecake", "Cream Cake", "Mousse Cake", "Tres Leches", "Tiramisu"],
    ["Cupcake", "Muffin", "Mini Cake", "Whoopie Pie", "Petit Four"],
    ["Waffle", "Pancake", "Crepe", "French Toast", "Dutch Baby"],
    ["Vanilla Ice Cream", "Kulfi", "Gelato", "Frozen Yogurt", "Soft Serve"],
    ["Apple Pie", "Cherry Pie", "Blueberry Pie", "Peach Pie", "Pumpkin Pie"],
  ],

  fruits: [
    ["Mandarin", "Clementine", "Tangerine", "Orange", "Blood Orange"],
    ["Lemon", "Lime", "Sweet Lime", "Yuzu", "Kaffir Lime"],
    ["Peach", "Nectarine", "Apricot", "Plum", "Pluot"],
    ["Blackberry", "Raspberry", "Blueberry", "Strawberry", "Mulberry"],
    ["Watermelon", "Muskmelon", "Honeydew", "Canary Melon", "Cantaloupe"],
    ["Green Apple", "Red Apple", "Fuji Apple", "Gala Apple", "Granny Smith Apple"],
    ["Grapefruit", "Pomelo", "Sweetie", "Oroblanco", "Ugli Fruit"],
    ["Date", "Fig", "Prune", "Raisin", "Dried Apricot"],
  ],

  vegetables: [
    ["Spinach", "Amaranth", "Kale", "Swiss Chard", "Mustard Greens"],
    ["Cabbage", "Red Cabbage", "Bok Choy", "Brussels Sprouts", "Savoy Cabbage"],
    ["Sweet Potato", "Yam", "Taro", "Cassava", "Purple Yam"],
    ["Bottle Gourd", "Ridge Gourd", "Sponge Gourd", "Snake Gourd", "Bitter Gourd"],
    ["Green Peas", "Snow Peas", "Sugar Snap Peas", "Black-Eyed Peas", "Pigeon Peas"],
    ["Spring Onion", "Leek", "Shallot", "Red Onion", "White Onion"],
  ],

  drinks: [
    ["Espresso", "Americano", "Cappuccino", "Latte", "Macchiato", "Mocha"],
    ["Masala Chai", "Ginger Tea", "Cardamom Tea", "Kashmiri Kahwa", "Cutting Chai"],
    ["Lassi", "Chaas", "Mattha", "Mango Lassi", "Sweet Lassi"],
    ["Lemonade", "Nimbu Pani", "Shikanji", "Lime Soda", "Aam Panna"],
    ["Cola", "Root Beer", "Ginger Ale", "Lemon Soda", "Orange Soda"],
    ["Milkshake", "Smoothie", "Frappe", "Thick Shake", "Malt Drink"],
  ],

  animals: [
    ["Lion", "Tiger", "Leopard", "Jaguar", "Cheetah", "Puma"],
    ["Wolf", "Fox", "Jackal", "Coyote", "Dhole"],
    ["Elephant", "Rhinoceros", "Hippopotamus", "Giraffe", "Zebra"],
    ["Deer", "Antelope", "Gazelle", "Moose", "Reindeer", "Elk"],
    ["Crocodile", "Alligator", "Gharial", "Caiman"],
    ["Frog", "Toad", "Tree Frog", "Bullfrog", "Salamander"],
    ["Camel", "Llama", "Alpaca", "Dromedary", "Bactrian Camel"],
    ["Bear", "Polar Bear", "Grizzly Bear", "Panda", "Black Bear"],
  ],

  birds: [
    ["Crow", "Raven", "Jackdaw", "Rook", "Magpie"],
    ["Pigeon", "Dove", "Rock Dove", "Wood Pigeon", "Collared Dove"],
    ["Parrot", "Macaw", "Cockatoo", "Parakeet", "Lovebird"],
    ["Eagle", "Hawk", "Falcon", "Kite", "Buzzard"],
    ["Owl", "Barn Owl", "Snowy Owl", "Horned Owl", "Screech Owl"],
    ["Duck", "Goose", "Swan", "Mallard", "Teal"],
    ["Sparrow", "Finch", "Wren", "Warbler", "Robin"],
  ],

  sea_life: [
    ["Dolphin", "Porpoise", "Beluga Whale", "Orca", "Pilot Whale"],
    ["Shark", "Hammerhead Shark", "Tiger Shark", "Whale Shark", "Bull Shark"],
    ["Octopus", "Squid", "Cuttlefish", "Nautilus", "Dumbo Octopus"],
    ["Jellyfish", "Sea Anemone", "Coral", "Hydra", "Portuguese Man o' War"],
    ["Lobster", "Crab", "Crayfish", "Prawn", "Shrimp"],
    ["Seal", "Sea Lion", "Walrus", "Fur Seal", "Elephant Seal"],
    ["Starfish", "Brittle Star", "Sea Urchin", "Sand Dollar", "Sea Cucumber"],
  ],

  pets: [
    ["Labrador", "Golden Retriever", "German Shepherd", "Beagle", "Pug", "Bulldog"],
    ["Persian Cat", "Siamese Cat", "Bengal Cat", "Maine Coon", "Sphynx Cat"],
    ["Budgie", "Cockatiel", "Lovebird", "Finch", "Canary"],
    ["Goldfish", "Guppy", "Molly", "Platy", "Betta"],
    ["Hamster", "Gerbil", "Guinea Pig", "Chinchilla", "Fancy Rat"],
  ],

  vehicles: [
    ["Sedan", "Hatchback", "SUV", "Crossover", "Coupe", "Convertible"],
    ["Scooter", "Moped", "Motorcycle", "Dirt Bike"],
    ["Bus", "Minibus", "Coach", "School Bus", "Double-Decker Bus"],
    ["Train", "Metro", "Tram", "Monorail", "Bullet Train"],
    ["Ship", "Ferry", "Cruise Ship", "Cargo Ship", "Yacht"],
    ["Helicopter", "Airplane", "Glider", "Hot Air Balloon", "Drone"],
    ["Pickup Truck", "Van", "Minivan", "SUV", "Jeep"],
  ],

  sports: [
    ["Football", "Rugby", "American Football", "Futsal", "Soccer"],
    ["Badminton", "Tennis", "Squash", "Table Tennis", "Pickleball"],
    ["Cricket", "Baseball", "Softball", "Rounders", "Kickball"],
    ["Swimming", "Diving", "Water Polo", "Artistic Swimming", "Open Water Swimming"],
    ["Skiing", "Snowboarding", "Ice Skating", "Sledging", "Curling"],
    ["Boxing", "Kickboxing", "Muay Thai", "Wrestling", "MMA"],
    ["Volleyball", "Beach Volleyball", "Handball", "Netball", "Dodgeball"],
  ],

  clothing: [
    ["T-Shirt", "Polo Shirt", "Henley Shirt", "Tank Top", "Crop Top"],
    ["Jeans", "Jeggings", "Chinos", "Trousers", "Cargo Pants"],
    ["Hoodie", "Sweatshirt", "Sweater", "Pullover", "Cardigan"],
    ["Saree", "Lehenga", "Anarkali", "Salwar Suit", "Sharara"],
    ["Kurta", "Kurti", "Sherwani", "Achkan", "Nehru Jacket"],
    ["Blazer", "Suit Jacket", "Coat", "Trench Coat", "Overcoat"],
  ],

  footwear: [
    ["Sneakers", "Running Shoes", "Walking Shoes", "Tennis Shoes", "Training Shoes"],
    ["Flip-Flops", "Slippers", "Slides", "Sandals", "Clogs"],
    ["Ankle Boots", "Chelsea Boots", "Combat Boots", "Hiking Boots", "Rain Boots"],
    ["Heels", "Stilettos", "Wedges", "Kitten Heels", "Block Heels"],
  ],

  accessories: [
    ["Handbag", "Tote Bag", "Shoulder Bag", "Sling Bag", "Satchel"],
    ["Sunglasses", "Reading Glasses", "Safety Glasses", "Blue-Light Glasses", "Goggles"],
    ["Wristwatch", "Smartwatch", "Fitness Band", "Pocket Watch", "Stopwatch"],
    ["Necklace", "Chain", "Pendant", "Choker", "Locket"],
    ["Cap", "Beanie", "Fedora", "Beret", "Bucket Hat"],
  ],

  school: [
    ["Ballpoint Pen", "Gel Pen", "Fountain Pen", "Rollerball Pen", "Marker Pen"],
    ["Notebook", "Register", "Exercise Book", "Workbook", "Rough Book"],
    ["Eraser", "Correction Tape", "Correction Fluid", "Pencil Eraser", "Kneaded Eraser"],
    ["School Bag", "Backpack", "Rucksack", "Satchel", "Messenger Bag"],
    ["Crayon", "Oil Pastel", "Wax Pastel", "Colored Pencil", "Sketch Pen"],
    ["Ruler", "Set Square", "Protractor", "Compass", "Divider"],
  ],

  technology: [
    ["Laptop", "Notebook Computer", "Ultrabook", "Chromebook", "MacBook"],
    ["Tablet", "iPad", "E-Reader", "Drawing Tablet", "Graphics Tablet"],
    ["Keyboard", "Mechanical Keyboard", "Wireless Keyboard", "Ergonomic Keyboard", "Gaming Keyboard"],
    ["Headphones", "Earphones", "Earbuds", "Headset", "Noise-Cancelling Headphones"],
    ["Smartphone", "Android Phone", "iPhone", "Feature Phone", "Foldable Phone"],
    ["Printer", "Laser Printer", "Inkjet Printer", "Photo Printer", "3D Printer"],
  ],

  apps: [
    ["Instagram", "Snapchat", "TikTok", "BeReal", "Pinterest"],
    ["WhatsApp", "Telegram", "Signal", "Messenger", "Viber"],
    ["Netflix", "Prime Video", "Disney+", "Hulu", "JioCinema"],
    ["Spotify", "Apple Music", "YouTube Music", "Amazon Music", "SoundCloud"],
    ["Google Meet", "Zoom", "Microsoft Teams", "Skype", "Webex"],
    ["Google Docs", "Microsoft Word", "Notion", "Pages", "Zoho Writer"],
  ],

  household: [
    ["Broom", "Mop", "Vacuum Cleaner", "Floor Wiper", "Dustpan"],
    ["Soap", "Body Wash", "Shower Gel", "Hand Wash", "Bath Bar"],
    ["Shampoo", "Conditioner", "Hair Mask", "Hair Serum", "Dry Shampoo"],
    ["Bucket", "Tub", "Wash Basin", "Laundry Basket", "Storage Bin"],
    ["Pillow", "Cushion", "Bolster", "Neck Pillow", "Throw Pillow"],
    ["Fan", "Ceiling Fan", "Table Fan", "Pedestal Fan", "Exhaust Fan"],
  ],

  kitchen: [
    ["Frying Pan", "Skillet", "Sauté Pan", "Wok", "Griddle"],
    ["Pressure Cooker", "Rice Cooker", "Slow Cooker", "Instant Pot", "Steamer"],
    ["Spatula", "Turner", "Ladle", "Slotted Spoon", "Serving Spoon"],
    ["Knife", "Chef's Knife", "Paring Knife", "Bread Knife", "Utility Knife"],
    ["Mixer", "Blender", "Food Processor", "Hand Blender", "Grinder"],
    ["Cup", "Mug", "Teacup", "Tumbler", "Glass"],
  ],

  furniture: [
    ["Sofa", "Couch", "Loveseat", "Sectional", "Divan"],
    ["Wardrobe", "Cupboard", "Closet", "Armoire", "Almirah"],
    ["Desk", "Study Table", "Writing Table", "Computer Table", "Workstation"],
    ["Stool", "Ottoman", "Pouffe", "Footstool", "Bench"],
    ["Bookshelf", "Bookcase", "Display Shelf", "Wall Shelf", "Cabinet"],
  ],

  professions: [
    ["Doctor", "Physician", "Surgeon", "General Practitioner", "Specialist"],
    ["Teacher", "Tutor", "Lecturer", "Professor", "Instructor"],
    ["Chef", "Cook", "Baker", "Pastry Chef", "Caterer"],
    ["Pilot", "Co-Pilot", "Flight Engineer", "Air Traffic Controller", "Cabin Crew"],
    ["Actor", "Performer", "Artist", "Entertainer", "Stage Actor"],
    ["Developer", "Programmer", "Software Engineer", "Web Developer", "App Developer"],
  ],

  places: [
    ["Cafe", "Coffee Shop", "Bistro", "Diner", "Tea House"],
    ["Mall", "Shopping Centre", "Shopping Plaza", "Outlet Mall", "Market"],
    ["Library", "Bookstore", "Reading Room", "Archive", "Study Hall"],
    ["Hotel", "Resort", "Motel", "Guest House", "Hostel"],
    ["Stadium", "Arena", "Sports Ground", "Colosseum", "Sports Complex"],
    ["Temple", "Shrine", "Gurudwara", "Church", "Mosque"],
  ],

  nature: [
    ["Hill", "Mountain", "Peak", "Ridge", "Summit"],
    ["Pond", "Lake", "Lagoon", "Reservoir", "Waterhole"],
    ["River", "Stream", "Brook", "Creek", "Rivulet"],
    ["Forest", "Jungle", "Rainforest", "Woodland", "Grove"],
    ["Waterfall", "Cascade", "Cataract", "Rapids", "Falls"],
    ["Desert", "Dune", "Oasis", "Badlands", "Arid Plain"],
  ],

  weather: [
    ["Drizzle", "Light Rain", "Shower", "Downpour", "Cloudburst"],
    ["Hurricane", "Cyclone", "Typhoon", "Tropical Storm", "Tornado"],
    ["Fog", "Mist", "Haze", "Smog", "Cloudy Fog"],
    ["Thunder", "Lightning", "Thunderstorm", "Storm", "Rainstorm"],
    ["Hail", "Sleet", "Snowfall", "Blizzard", "Freezing Rain"],
  ],

  entertainment: [
    ["Movie", "Film", "Feature Film", "Short Film", "Documentary"],
    ["TV Show", "Web Series", "Sitcom", "Soap Opera", "Reality Show"],
    ["Horror", "Thriller", "Mystery", "Suspense", "Psychological Thriller"],
    ["Comedy", "Rom-Com", "Satire", "Parody", "Slapstick"],
    ["Anime", "Manga", "Manhwa", "Webtoon", "Animated Series"],
  ],

  games: [
    ["Ludo", "Snakes and Ladders", "Carrom", "Chess", "Checkers"],
    ["Uno", "Playing Cards", "Rummy", "Poker", "Solitaire"],
    ["Minecraft", "Roblox", "Fortnite", "Terraria", "Among Us"],
    ["Hide and Seek", "Tag", "Catch-Catch", "Musical Chairs", "Freeze Tag"],
    ["Monopoly", "Business", "The Game of Life", "Catan", "Ticket to Ride"],
  ],

  instruments: [
    ["Guitar", "Ukulele", "Mandolin", "Banjo", "Sitar"],
    ["Violin", "Viola", "Cello", "Double Bass", "Sarangi"],
    ["Flute", "Recorder", "Piccolo", "Bansuri", "Clarinet"],
    ["Tabla", "Dholak", "Mridangam", "Pakhawaj", "Dhol"],
    ["Trumpet", "Trombone", "Tuba", "French Horn", "Cornet"],
    ["Piano", "Keyboard", "Synthesizer", "Organ", "Harmonium"],
  ],

  festivals: [
    ["Diwali", "Deepavali", "Kali Puja", "Bandi Chhor Divas", "Tihar"],
    ["Holi", "Rang Panchami", "Lathmar Holi", "Hola Mohalla", "Dol Jatra"],
    ["Eid al-Fitr", "Eid al-Adha", "Milad-un-Nabi", "Shab-e-Barat", "Muharram"],
    ["Christmas", "Easter", "Good Friday", "Epiphany", "Boxing Day"],
    ["Ganesh Chaturthi", "Gauri Puja", "Sankashti Chaturthi", "Ganesh Jayanti", "Anant Chaturdashi"],
    ["Navratri", "Durga Puja", "Dussehra", "Vijayadashami", "Kullu Dussehra"],
  ],

  emotions: [
    ["Happy", "Joyful", "Cheerful", "Delighted", "Elated"],
    ["Sad", "Unhappy", "Downcast", "Gloomy", "Melancholy"],
    ["Angry", "Furious", "Annoyed", "Irritated", "Enraged"],
    ["Scared", "Afraid", "Frightened", "Terrified", "Nervous"],
    ["Surprised", "Amazed", "Astonished", "Shocked", "Stunned"],
    ["Bored", "Uninterested", "Fed Up", "Restless", "Listless"],
  ],

  body: [
    ["Thumb", "Index Finger", "Middle Finger", "Ring Finger", "Little Finger"],
    ["Shoulder", "Elbow", "Wrist", "Knee", "Ankle"],
    ["Stomach", "Belly", "Abdomen", "Tummy", "Waist"],
    ["Eyebrow", "Eyelash", "Eyelid", "Iris", "Pupil"],
    ["Bicep", "Tricep", "Forearm", "Deltoid", "Wrist"],
  ],

  colors: [
    ["Crimson", "Scarlet", "Ruby", "Cherry Red", "Burgundy"],
    ["Navy Blue", "Royal Blue", "Sky Blue", "Baby Blue", "Turquoise"],
    ["Lavender", "Lilac", "Mauve", "Violet", "Purple"],
    ["Beige", "Cream", "Ivory", "Off-White", "Ecru"],
    ["Teal", "Aqua", "Cyan", "Turquoise", "Aquamarine"],
  ],

  space: [
    ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn"],
    ["Comet", "Asteroid", "Meteor", "Meteoroid", "Meteorite"],
    ["Galaxy", "Nebula", "Star Cluster", "Constellation", "Solar System"],
    ["Astronaut", "Cosmonaut", "Taikonaut", "Space Tourist", "Mission Specialist"],
  ],

  fantasy: [
    ["Wizard", "Witch", "Sorcerer", "Mage", "Warlock"],
    ["Dragon", "Wyvern", "Drake", "Wyrm", "Sea Serpent"],
    ["Fairy", "Pixie", "Sprite", "Nymph", "Elf"],
    ["Vampire", "Werewolf", "Zombie", "Ghost", "Mummy"],
    ["Mermaid", "Siren", "Selkie", "Nixie", "Water Nymph"],
  ],
};

const normalize = (word) => word.trim().toLocaleLowerCase();

const pairKey = (a, b) =>
  [normalize(a), normalize(b)].sort().join("::");

// Create every possible pair inside each close-match group.
const seen = new Set();

const RAW = Object.entries(WORD_GROUPS).flatMap(([category, groups]) =>
  groups.flatMap((words) => {
    const pairs = [];

    for (let i = 0; i < words.length; i++) {
      for (let j = i + 1; j < words.length; j++) {
        const a = words[i];
        const b = words[j];
        const key = pairKey(a, b);

        if (a && b && !seen.has(key)) {
          seen.add(key);
          pairs.push([a, b, category]);
        }
      }
    }

    return pairs;
  })
);

export const wordPairs = RAW.map(([a, b, category], id) => ({
  id,
  a,
  b,
  category,
}));

// No pair repeats until every pair in the selected category/pool has appeared.
// Used IDs persist in localStorage, including after refreshing the page.
const USED_STORAGE_KEY = "pratiksha-imposter-used-pairs-v2";

export function getNextWordPair(category = "all") {
  const pool = wordPairs.filter(
    (pair) => category === "all" || pair.category === category
  );

  if (pool.length === 0) return null;

  let usedIds = [];

  try {
    const saved = JSON.parse(
      localStorage.getItem(USED_STORAGE_KEY) || "[]"
    );

    usedIds = Array.isArray(saved) ? saved : [];
  } catch {
    usedIds = [];
  }

  let available = pool.filter(
    (pair) => !usedIds.includes(pair.id)
  );

  // Only reset this selected pool after all its pairs have been used.
  if (available.length === 0) {
    const poolIds = new Set(pool.map((pair) => pair.id));

    usedIds = usedIds.filter((id) => !poolIds.has(id));
    available = pool;
  }

  const chosen =
    available[Math.floor(Math.random() * available.length)];

  usedIds.push(chosen.id);

  try {
    localStorage.setItem(
      USED_STORAGE_KEY,
      JSON.stringify([...new Set(usedIds)])
    );
  } catch {
    // Game still works if browser storage is unavailable.
  }

  return chosen;
}

export function resetUsedWordPairs(category = "all") {
  if (category === "all") {
    try {
      localStorage.removeItem(USED_STORAGE_KEY);
    } catch {
      // Ignore storage errors.
    }

    return;
  }

  try {
    const saved = JSON.parse(
      localStorage.getItem(USED_STORAGE_KEY) || "[]"
    );

    const poolIds = new Set(
      wordPairs
        .filter((pair) => pair.category === category)
        .map((pair) => pair.id)
    );

    const remaining = (Array.isArray(saved) ? saved : []).filter(
      (id) => !poolIds.has(id)
    );

    localStorage.setItem(
      USED_STORAGE_KEY,
      JSON.stringify(remaining)
    );
  } catch {
    // Ignore storage errors.
  }
}

export const totalWordPairs = wordPairs.length;
