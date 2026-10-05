/**
 * HARISH MART - Product Catalog & Static Data
 */

const INITIAL_CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'fa-layer-group', badge: '100+ Items' },
  { id: 'groceries', name: 'Daily Groceries', icon: 'fa-basket-shopping', badge: 'Fresh & Daily' },
  { id: 'electronics', name: 'Electronics & Gadgets', icon: 'fa-laptop', badge: 'Up to 40% Off' },
  { id: 'fashion', name: 'Fashion & Apparel', icon: 'fa-shirt', badge: 'Trending' },
  { id: 'home', name: 'Home & Kitchen', icon: 'fa-kitchen-set', badge: 'Best Quality' },
  { id: 'beauty', name: 'Beauty & Wellness', icon: 'fa-spa', badge: '100% Organic' }
];

const INITIAL_PRODUCTS = [
  // GROCERIES
  {
    id: 'gro-1',
    name: 'Aashirvaad Shudh Chakki Whole Wheat Atta',
    category: 'groceries',
    price: 345,
    originalPrice: 420,
    rating: 4.8,
    reviewsCount: 3240,
    unit: '10 kg',
    variants: ['5 kg', '10 kg'],
    inStock: true,
    stockCount: 45,
    badge: 'BESTSELLER',
    badgeType: 'badge-hot',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
    description: 'Made from the grains which are heavy on the palm, golden amber in colour and hard in bite. 100% pure whole wheat flour processed with traditional stone-ground chakki technology.',
    specs: {
      'Brand': 'Aashirvaad',
      'Dietary Preference': 'Vegetarian, High Fiber',
      'Country of Origin': 'India',
      'Shelf Life': '6 Months'
    }
  },
  {
    id: 'gro-2',
    name: 'Fortune Sunlite Refined Sunflower Oil',
    category: 'groceries',
    price: 685,
    originalPrice: 850,
    rating: 4.7,
    reviewsCount: 1980,
    unit: '5 L Jar',
    variants: ['1 L Pouch', '5 L Jar'],
    inStock: true,
    stockCount: 28,
    badge: 'VALUE PACK',
    badgeType: 'badge-sale',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
    description: 'Enriched with Vitamin A and Vitamin D. Fortune Sunlite Refined Sunflower oil is light and healthy, keeping your heart healthy and food crisp and non-greasy.',
    specs: {
      'Brand': 'Fortune',
      'Fat Content': 'Zero Cholesterol, High PUFA',
      'Packaging': 'Ergonomic Jar',
      'Shelf Life': '9 Months'
    }
  },
  {
    id: 'gro-3',
    name: 'India Gate Feast Rozzana Basmati Rice',
    category: 'groceries',
    price: 499,
    originalPrice: 650,
    rating: 4.6,
    reviewsCount: 1420,
    unit: '5 kg',
    variants: ['1 kg', '5 kg'],
    inStock: true,
    stockCount: 50,
    badge: 'POPULAR',
    badgeType: 'badge-new',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    description: 'Aromatic, long grain aged Basmati rice ideal for everyday biryanis, pulavs and steamed rice dishes. Fluffy grains that do not stick after cooking.',
    specs: {
      'Brand': 'India Gate',
      'Grain Length': 'Extra Long Aged Grain',
      'Aroma': 'Natural Basmati Fragrance',
      'Origin': 'Punjab, India'
    }
  },
  {
    id: 'gro-4',
    name: 'Organic Royal California Almonds (Badam)',
    category: 'groceries',
    price: 449,
    originalPrice: 599,
    rating: 4.9,
    reviewsCount: 890,
    unit: '500 g',
    variants: ['250 g', '500 g', '1 kg'],
    inStock: true,
    stockCount: 35,
    badge: '100% ORGANIC',
    badgeType: 'badge-organic',
    image: 'https://images.unsplash.com/photo-1508061252445-5350f3ab0a55?auto=format&fit=crop&w=600&q=80',
    description: 'Hand-picked premium California almonds, vacuum packed for unmatched crunch, freshness and nutrient retention. Rich in Vitamin E and antioxidants.',
    specs: {
      'Origin': 'California, USA',
      'Packaging': 'Resealable Zip Pouch',
      'Quality Grade': 'Jumbo Nonpareil',
      'Storage': 'Store in a cool dry place'
    }
  },
  {
    id: 'gro-5',
    name: 'Tata Tea Gold Premium Black Tea',
    category: 'groceries',
    price: 299,
    originalPrice: 380,
    rating: 4.7,
    reviewsCount: 2450,
    unit: '1 kg',
    variants: ['500 g', '1 kg'],
    inStock: true,
    stockCount: 60,
    badge: 'FAVORITE',
    badgeType: 'badge-sale',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    description: 'An exquisite blend of gently rolled aromatic long leaves and fine Assam tea grains for rich taste and irresistible aroma in every morning cup.',
    specs: {
      'Brand': 'Tata Consumer Products',
      'Form': 'Loose Tea Leaves',
      'Caffeine Content': 'Caffeinated',
      'Shelf Life': '12 Months'
    }
  },

  // ELECTRONICS
  {
    id: 'ele-1',
    name: 'Apple iPhone 16 Pro Max 256GB - Desert Titanium',
    category: 'electronics',
    price: 134900,
    originalPrice: 144900,
    rating: 4.9,
    reviewsCount: 4210,
    unit: '256 GB',
    variants: ['256 GB', '512 GB', '1 TB'],
    inStock: true,
    stockCount: 12,
    badge: 'FLAGSHIP',
    badgeType: 'badge-hot',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80',
    description: 'Featuring grade 5 titanium design with the new Camera Control button, 4K 120 fps Dolby Vision, and the revolutionary A18 Pro chip built for Apple Intelligence.',
    specs: {
      'Display': '6.9-inch Super Retina XDR OLED 120Hz',
      'Processor': 'A18 Pro Bionic with 6-core GPU',
      'Camera': '48MP Fusion + 48MP Ultra-wide + 12MP 5x Telephoto',
      'Battery': 'Up to 33 hours video playback'
    }
  },
  {
    id: 'ele-2',
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    category: 'electronics',
    price: 26990,
    originalPrice: 34990,
    rating: 4.8,
    reviewsCount: 3120,
    unit: 'Silver / Black',
    variants: ['Midnight Black', 'Platinum Silver'],
    inStock: true,
    stockCount: 18,
    badge: 'TOP RATED',
    badgeType: 'badge-hot',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80',
    description: 'Industry-leading Active Noise Cancellation with two processors and 8 microphones. Magnificent sound quality engineered with 30mm precision drivers and 30-hour battery life.',
    specs: {
      'Noise Cancellation': 'Auto NC Optimizer & V1 Processor',
      'Battery Life': '30 Hours with Quick Charge (3 min = 3 hrs)',
      'Connectivity': 'Bluetooth 5.2, Multipoint Pair',
      'Weight': '250 grams ultralight design'
    }
  },
  {
    id: 'ele-3',
    name: 'Samsung Galaxy Watch Ultra 47mm LTE Titanium',
    category: 'electronics',
    price: 54999,
    originalPrice: 69999,
    rating: 4.7,
    reviewsCount: 950,
    unit: '47 mm',
    variants: ['Titanium Gray', 'Titanium White', 'Titanium Silver'],
    inStock: true,
    stockCount: 9,
    badge: 'NEW ARRIVAL',
    badgeType: 'badge-new',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    description: 'Cushion design with Aerospace-grade titanium body, 10ATM water resistance, dual-frequency GPS, and up to 100 hours power saving mode for extreme sports.',
    specs: {
      'Water Resistance': '10ATM / IP68 + MIL-STD-810H',
      'Battery': '590mAh with AI energy optimization',
      'Sensors': 'BioActive Sensor (HR, ECG, BIA), Skin Temp',
      'Connectivity': '4G LTE eSIM + Bluetooth + NFC'
    }
  },
  {
    id: 'ele-4',
    name: 'Apple MacBook Air 13.6" M3 Chip (16GB, 512GB SSD)',
    category: 'electronics',
    price: 119900,
    originalPrice: 134900,
    rating: 4.9,
    reviewsCount: 1650,
    unit: 'Midnight',
    variants: ['Midnight', 'Starlight', 'Space Gray', 'Silver'],
    inStock: true,
    stockCount: 8,
    badge: 'BEST FOR WORK',
    badgeType: 'badge-sale',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    description: 'Impossibly thin and wicked fast with the M3 chip. Delivers up to 18 hours of all-day battery life, Liquid Retina display, and MagSafe 3 charging.',
    specs: {
      'Processor': 'Apple M3 8-core CPU, 10-core GPU',
      'RAM': '16GB Unified Memory',
      'Storage': '512GB Ultra-fast NVMe SSD',
      'Display': '13.6-inch Liquid Retina with True Tone'
    }
  },
  {
    id: 'ele-5',
    name: 'Anker Prime 100W GaN Fast Wall Charger (3-Port)',
    category: 'electronics',
    price: 3999,
    originalPrice: 5999,
    rating: 4.8,
    reviewsCount: 1820,
    unit: '100W',
    variants: ['100W Black', '67W Compact'],
    inStock: true,
    stockCount: 40,
    badge: 'FAST CHARGE',
    badgeType: 'badge-new',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
    description: 'Powered by GaNPrime technology. Fast charges a MacBook Pro, iPhone, and iPad simultaneously with smart dynamic power distribution and ActiveShield 2.0 temperature monitoring.',
    specs: {
      'Total Output': '100W Max',
      'Ports': '2 x USB-C + 1 x USB-A',
      'Safety': 'MultiProtect + ActiveShield 2.0',
      'Compatibility': 'Universal USB-PD 3.0 / PPS'
    }
  },

  // FASHION
  {
    id: 'fas-1',
    name: "Men's Premium Supima Cotton Oversized T-Shirt",
    category: 'fashion',
    price: 799,
    originalPrice: 1499,
    rating: 4.6,
    reviewsCount: 2150,
    unit: 'Size: L',
    variants: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 30,
    badge: 'TRENDING',
    badgeType: 'badge-hot',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    description: 'Crafted from 100% American Supima Cotton, offering 2x softer feel and vibrant color retention. Modern relaxed oversized fit with ribbed collar.',
    specs: {
      'Fabric': '100% Supima Cotton 240 GSM',
      'Fit': 'Oversized Boxy Silhouette',
      'Pattern': 'Solid Pre-shrunk Bio-washed',
      'Wash Care': 'Machine wash cold, tumble dry low'
    }
  },
  {
    id: 'fas-2',
    name: "Levi's 511 Slim Fit Stretch Denim Jeans",
    category: 'fashion',
    price: 2499,
    originalPrice: 4199,
    rating: 4.7,
    reviewsCount: 1780,
    unit: 'Waist: 32',
    variants: ['30', '32', '34', '36'],
    inStock: true,
    stockCount: 22,
    badge: 'ICONIC',
    badgeType: 'badge-sale',
    image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=600&q=80',
    description: 'A modern slim with room to move. The 511 Slim Fit Stretch Jeans are a classic since right now. Cut close without being too tight for all-day comfort.',
    specs: {
      'Material': '99% Cotton, 1% Elastane',
      'Rise': 'Mid Rise sits below waist',
      'Leg Opening': 'Slim leg 14.5 inch',
      'Closure': 'Zip fly with button closure'
    }
  },
  {
    id: 'fas-3',
    name: 'Nike Air Max Pulse Men Running & Lifestyle Sneakers',
    category: 'fashion',
    price: 9995,
    originalPrice: 13995,
    rating: 4.8,
    reviewsCount: 840,
    unit: 'UK 8',
    variants: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    inStock: true,
    stockCount: 15,
    badge: 'HOT SELLER',
    badgeType: 'badge-hot',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    description: 'Drawing inspiration from the London music scene, the Air Max Pulse brings an underground vibe. Point-loaded Air cushioning provides unmatched bounce and style.',
    specs: {
      'Upper Material': 'Textile mesh with leather overlays',
      'Cushioning': 'Point-loaded Air unit',
      'Sole': 'Waffle-inspired rubber outsole',
      'Closure': 'Lace-Up'
    }
  },
  {
    id: 'fas-4',
    name: 'Ray-Ban Classic Polarized Aviator Sunglasses (Gold)',
    category: 'fashion',
    price: 8490,
    originalPrice: 10990,
    rating: 4.9,
    reviewsCount: 1240,
    unit: 'Standard 58mm',
    variants: ['55mm Small', '58mm Standard', '62mm Large'],
    inStock: true,
    stockCount: 14,
    badge: 'CLASSIC',
    badgeType: 'badge-sale',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
    description: 'Currently one of the most iconic sunglass models in the world. Polished Gold frame with crystal green G-15 polarized lenses providing 100% UV protection.',
    specs: {
      'Frame Material': 'High grade Monel Metal',
      'Lens Technology': 'Polarized G-15 Crystal',
      'UV Protection': 'UV400 Category 3',
      'Included': 'Leather case and microfiber cloth'
    }
  },
  {
    id: 'fas-5',
    name: 'Fossil Neutra Minimalist Chronograph Leather Watch',
    category: 'fashion',
    price: 8995,
    originalPrice: 13495,
    rating: 4.6,
    reviewsCount: 910,
    unit: '44mm Case',
    variants: ['Brown Leather', 'Black Leather', 'Stainless Steel Mesh'],
    inStock: true,
    stockCount: 10,
    badge: '33% OFF',
    badgeType: 'badge-sale',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80',
    description: 'Mid-century modern design elements. Features a satin amber dial with Roman numeral indexes, chronograph movement and interchangeable genuine brown leather strap.',
    specs: {
      'Case Size': '44mm Stainless Steel',
      'Movement': 'Quartz Chronograph with stopwatch sub-eyes',
      'Water Resistance': '5 ATM / 50 meters',
      'Strap Width': '22mm Genuine Leather'
    }
  },

  // HOME & KITCHEN
  {
    id: 'hom-1',
    name: 'Philips Digital Air Fryer HD9252 with Rapid Air Tech',
    category: 'home',
    price: 6999,
    originalPrice: 11995,
    rating: 4.8,
    reviewsCount: 3890,
    unit: '4.1 Litre',
    variants: ['4.1 L (Compact)', '6.2 L (XL Family)'],
    inStock: true,
    stockCount: 20,
    badge: 'BESTSELLER',
    badgeType: 'badge-hot',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
    description: 'Fry with up to 90% less fat. Patented starfish design circulates hot air evenly to create delicious foods that are crispy on the outside and tender on the inside.',
    specs: {
      'Capacity': '4.1 L / 0.8 kg food capacity',
      'Wattage': '1400 Watts',
      'Presets': '7 one-touch digital cooking presets',
      'Warranty': '2 Years Global Philips Warranty'
    }
  },
  {
    id: 'hom-2',
    name: 'Prestige Deluxe Tri-Ply Stainless Steel Cookware Set',
    category: 'home',
    price: 3899,
    originalPrice: 6200,
    rating: 4.7,
    reviewsCount: 1420,
    unit: '3-Piece Set',
    variants: ['3-Piece Set', '5-Piece Premium Set'],
    inStock: true,
    stockCount: 25,
    badge: 'DURABLE',
    badgeType: 'badge-sale',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=600&q=80',
    description: 'Engineered with 3 layers: 304 food-grade stainless steel inside, aluminium core in the middle for even heat distribution, and 430 magnetic steel outside for induction compatibility.',
    specs: {
      'Set Includes': 'Kadhai with Glass Lid (24cm), Fry Pan (24cm), Saucepan (16cm)',
      'Compatibility': 'Gas, Induction, Ceramic, Hotplate',
      'Dishwasher Safe': 'Yes',
      'Warranty': '5 Years'
    }
  },
  {
    id: 'hom-3',
    name: 'Dyson V12 Detect Slim Cordless Vacuum Cleaner',
    category: 'home',
    price: 49900,
    originalPrice: 62900,
    rating: 4.9,
    reviewsCount: 780,
    unit: 'Fluffy Optic',
    variants: ['Standard V12', 'V12 Total Clean'],
    inStock: true,
    stockCount: 6,
    badge: 'PREMIUM',
    badgeType: 'badge-hot',
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=600&q=80',
    description: "Dyson's most powerful, lightweight cordless vacuum. Laser reveals invisible microscopic dust on hard floors. Piezo sensor counts and measures the size of dust particles.",
    specs: {
      'Suction Power': '150 Air Watts',
      'Run Time': 'Up to 60 minutes fade-free power',
      'Weight': 'Only 2.2 kg ultra lightweight',
      'Filtration': 'Whole-machine HEPA filtration 99.99%'
    }
  },
  {
    id: 'hom-4',
    name: 'Nespresso Vertuo Pop Automatic Coffee & Espresso Machine',
    category: 'home',
    price: 14999,
    originalPrice: 19999,
    rating: 4.8,
    reviewsCount: 1120,
    unit: 'Yellow / Black',
    variants: ['Mango Yellow', 'Liquorice Black', 'Pacific Blue'],
    inStock: true,
    stockCount: 11,
    badge: 'TRENDING',
    badgeType: 'badge-new',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?auto=format&fit=crop&w=600&q=80',
    description: 'Compact and stylish coffee machine using Centrifusion technology to read each capsule barcode and brew velvety smooth crema coffee in 4 cup sizes.',
    specs: {
      'Cup Sizes': 'Espresso (40ml), Double Espresso (80ml), Gran Lungo (150ml), Mug (230ml)',
      'Heat-up Time': 'Fast 30 seconds',
      'Connectivity': 'Bluetooth and Wi-Fi auto updates',
      'Energy Rating': 'A+ Eco Mode shut-off'
    }
  },

  // BEAUTY & WELLNESS
  {
    id: 'bea-1',
    name: 'Minimalist 10% Niacinamide Face Serum with Zinc',
    category: 'beauty',
    price: 569,
    originalPrice: 699,
    rating: 4.8,
    reviewsCount: 4620,
    unit: '30 ml',
    variants: ['30 ml', '60 ml Mega'],
    inStock: true,
    stockCount: 50,
    badge: 'CULT FAVORITE',
    badgeType: 'badge-organic',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    description: 'Pure 10% Niacinamide serum with 1% Zinc PCA to balance sebum production, minimize enlarged pores, reduce blemishes and strengthen the skin moisture barrier.',
    specs: {
      'Key Ingredients': 'Niacinamide (Vitamin B3), Zinc PCA, Aloe Leaf Juice',
      'Skin Type': 'Oily, Combination & Acne-Prone',
      'Fragrance': '100% Fragrance Free, Non-comedogenic',
      'Cruelty Free': 'Yes, PETA Certified'
    }
  },
  {
    id: 'bea-2',
    name: 'CeraVe Hydrating Facial Cleanser with Ceramides',
    category: 'beauty',
    price: 899,
    originalPrice: 1150,
    rating: 4.9,
    reviewsCount: 5200,
    unit: '473 ml',
    variants: ['236 ml', '473 ml Pump'],
    inStock: true,
    stockCount: 38,
    badge: 'DERM RECOMMENDED',
    badgeType: 'badge-hot',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    description: 'Developed with dermatologists, this unique lotion-like formula cleanses, hydrates and helps restore the protective skin barrier with three essential ceramides & hyaluronic acid.',
    specs: {
      'Skin Type': 'Normal to Dry Skin',
      'Formulation': 'Non-foaming hydrating lotion',
      'Key Actives': 'Ceramides 1, 3, 6-II + MVE Technology',
      'Certification': 'National Eczema Association Approved'
    }
  },
  {
    id: 'bea-3',
    name: 'Forest Essentials Ayurvedic Bhringraj Herb Hair Oil',
    category: 'beauty',
    price: 1550,
    originalPrice: 1850,
    rating: 4.7,
    reviewsCount: 1670,
    unit: '200 ml',
    variants: ['100 ml Travel', '200 ml Glass Bottle'],
    inStock: true,
    stockCount: 20,
    badge: '100% AYURVEDIC',
    badgeType: 'badge-organic',
    image: 'https://images.unsplash.com/photo-1608248597359-548598925565?auto=format&fit=crop&w=600&q=80',
    description: 'Traditional Ayurvedic formulation enriched with Bhringraj, virgin coconut oil, and goat milk to arrest hair fall, stimulate growth, and prevent premature greying.',
    specs: {
      'Ingredients': 'Bhringraj extract, Sesame oil, Mulethi, Brahmi',
      'Hair Type': 'All Hair Types & Thinning Hair',
      'Free From': 'Parabens, Mineral Oils, Sulfates',
      'Aroma': 'Earthy herbal botanical notes'
    }
  },
  {
    id: 'bea-4',
    name: 'Versace Eros Eau De Toilette for Men (100ml)',
    category: 'beauty',
    price: 6850,
    originalPrice: 8500,
    rating: 4.9,
    reviewsCount: 2310,
    unit: '100 ml',
    variants: ['50 ml', '100 ml', '200 ml'],
    inStock: true,
    stockCount: 16,
    badge: 'LUXURY PERFUME',
    badgeType: 'badge-hot',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80',
    description: 'Love, passion, beauty and desire: these are the key concepts of the fragrance. Vibrant fresh opening of Italian lemon and mint, followed by tonka bean and cedarwood.',
    specs: {
      'Fragrance Family': 'Fresh Oriental Woody',
      'Top Notes': 'Mint Leaves, Italian Lemon Zest, Green Apple',
      'Heart Notes': 'Tonka Beans, Amber, Geranium Flower',
      'Base Notes': 'Vanilla, Cedarwood, Vetiver, Oakmoss'
    }
  }
];

const PROMO_CODES = {
  'HARISH25': { discountPercent: 25, maxDiscount: 500, minOrder: 999, description: '25% OFF on orders over ₹999 (Max ₹500)' },
  'WELCOME50': { discountFlat: 50, minOrder: 299, description: 'Flat ₹50 OFF on your order' },
  'FREESHIP': { freeShipping: true, minOrder: 0, description: 'Free Express Delivery on any order' },
  'FESTIVE15': { discountPercent: 15, maxDiscount: 1000, minOrder: 1499, description: 'Festive special 15% OFF (Max ₹1000)' }
};

const SAMPLE_REVIEWS = [
  { name: 'Priya Sharma', rating: 5, date: '2 days ago', verified: true, comment: 'Exceptional quality and delivered in just 2 hours by Harish Mart! Packaging was super safe.' },
  { name: 'Rahul Varma', rating: 5, date: '1 week ago', verified: true, comment: 'Authentic product with genuine bill & warranty. Best pricing compared to any other online store.' },
  { name: 'Ananya Reddy', rating: 4, date: '2 weeks ago', verified: true, comment: 'Very fresh groceries and the customer service responded immediately. Definitely shopping here again!' }
];

const PINCODES_DB = {
  '560001': { city: 'Bengaluru', express: true, days: 1, charge: 0 },
  '560100': { city: 'Bengaluru (Electronic City)', express: true, days: 1, charge: 0 },
  '110001': { city: 'New Delhi', express: true, days: 2, charge: 0 },
  '400001': { city: 'Mumbai', express: true, days: 2, charge: 0 },
  '600001': { city: 'Chennai', express: true, days: 2, charge: 0 },
  '500001': { city: 'Hyderabad', express: true, days: 2, charge: 0 },
  '700001': { city: 'Kolkata', express: false, days: 3, charge: 40 },
  'default': { city: 'Your Location', express: true, days: 2, charge: 0 }
};

// Storage helper functions
function getStoredProducts() {
  const data = localStorage.getItem('harish_mart_products');
  if (data) {
    try {
      return JSON.parse(data);
    } catch(e) {
      console.error(e);
    }
  }
  return INITIAL_PRODUCTS;
}

function saveProducts(products) {
  localStorage.setItem('harish_mart_products', JSON.stringify(products));
}

function getStoredCart() {
  const data = localStorage.getItem('harish_mart_cart');
  return data ? JSON.parse(data) : [];
}

function saveCart(cart) {
  localStorage.setItem('harish_mart_cart', JSON.stringify(cart));
}

function getStoredWishlist() {
  const data = localStorage.getItem('harish_mart_wishlist');
  return data ? JSON.parse(data) : [];
}

function saveWishlist(wishlist) {
  localStorage.setItem('harish_mart_wishlist', JSON.stringify(wishlist));
}

function getStoredOrders() {
  const data = localStorage.getItem('harish_mart_orders');
  return data ? JSON.parse(data) : [
    {
      orderId: 'HM-89241',
      date: '03 Oct 2026',
      itemsCount: 2,
      totalAmount: 1248,
      status: 'Delivered',
      itemsSummary: 'Aashirvaad Whole Wheat Atta, Fortune Sunlite Oil',
      paymentMethod: 'UPI (GPay)'
    }
  ];
}

function saveOrders(orders) {
  localStorage.setItem('harish_mart_orders', JSON.stringify(orders));
}
