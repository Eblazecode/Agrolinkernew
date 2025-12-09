// Mock Data for Agrolinker Application

export const IMAGES = {
  hero: 'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765206885995_deb402db.png',
  farms: [
    'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765206908582_aa5ee769.jpg',
    'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765206911687_bb9c939c.jpg',
    'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765206917050_7b501cc7.png',
    'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765206923791_34ca3ed8.png',
    'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765206916703_97d72ca6.jpg',
  ],
  produce: [
    'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765207504572_66cbfc59.jpg',
    'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765207509341_e9c07897.png',
    'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765207508474_b170577e.jpg',
    'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765207508505_a4dc7e9a.jpg',
    'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765207517991_650114e6.png',
    'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765207508681_2fe15a81.jpg',
  ],
  trees: [
    'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765207610559_4b869b12.jpg',
    'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765207563937_f2616fc8.png',
    'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765207553922_f01a8b4e.jpg',
    'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765207557861_bf8cc6fb.png',
  ],
  equipment: [
    'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765207629734_47459474.jpg',
    'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765207629703_b74aaf2d.jpg',
    'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765207634236_84967581.png',
    'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765207631502_e2739d78.jpg',
  ],
  storage: [
    'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765207649568_8d859f9a.jpg',
    'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765207657131_66183bd5.jpg',
  ],
};

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'investor' | 'farmer' | 'equipment_owner' | 'logistics_provider' | 'admin';
  avatar?: string;
  walletBalance: number;
  verified: boolean;
}

export interface Investment {
  id: string;
  projectId: string;
  projectName: string;
  amount: number;
  roi: number;
  status: 'active' | 'matured' | 'withdrawn';
  startDate: string;
  endDate: string;
  farmImage: string;
}

export interface FarmProject {
  id: string;
  name: string;
  description: string;
  location: string;
  cropType: string;
  targetAmount: number;
  raisedAmount: number;
  roi: number;
  duration: string;
  status: 'draft' | 'live' | 'funded' | 'in_production' | 'harvest';
  image: string;
  farmerId: string;
  farmerName: string;
}

export interface TreeInvestment {
  id: string;
  name: string;
  type: 'cashew' | 'mango' | 'cocoa' | 'oil_palm' | 'teak' | 'mahogany';
  minInvestment: number;
  maxInvestment: number;
  expectedYield: string;
  maturityYears: number;
  dividendSchedule: string;
  image: string;
  available: number;
}

export interface MarketplaceProduct {
  id: string;
  name: string;
  category: string;
  pricePerKg: number;
  farmer: string;
  location: string;
  available: boolean;
  quantity: number;
  unit: string;
  image: string;
  rating: number;
}

export interface Equipment {
  id: string;
  name: string;
  type: string;
  location: string;
  pricePerDay: number;
  available: boolean;
  image: string;
  description: string;
}

export interface StorageFacility {
  id: string;
  name: string;
  type: 'cold_room' | 'silo' | 'warehouse';
  location: string;
  capacity: number;
  usedCapacity: number;
  pricePerTonPerDay: number;
  image: string;
  features: string[];
}

export interface LogisticsRequest {
  id: string;
  origin: string;
  destination: string;
  loadType: string;
  weight: number;
  status: 'pending' | 'assigned' | 'in_transit' | 'delivered';
  driverName?: string;
  driverPhone?: string;
  estimatedDelivery?: string;
}

// Demo Users
export const demoUsers: User[] = [
  { id: '1', name: 'Adebayo Johnson', email: 'investor@agrolinker.com', role: 'investor', walletBalance: 500000, verified: true },
  { id: '2', name: 'Chioma Okonkwo', email: 'farmer@agrolinker.com', role: 'farmer', walletBalance: 150000, verified: true },
  { id: '3', name: 'Emeka Nwachukwu', email: 'equipment@agrolinker.com', role: 'equipment_owner', walletBalance: 250000, verified: true },
  { id: '4', name: 'Fatima Bello', email: 'logistics@agrolinker.com', role: 'logistics_provider', walletBalance: 180000, verified: true },
  { id: '5', name: 'Admin User', email: 'admin@agrolinker.com', role: 'admin', walletBalance: 0, verified: true },
];

// Mock Farm Projects
export const farmProjects: FarmProject[] = [
  { id: '1', name: 'Cassava Farm - Ogun', description: 'High-yield cassava farming project in Ogun State', location: 'Ogun State', cropType: 'Cassava', targetAmount: 5000000, raisedAmount: 4250000, roi: 25, duration: '12 months', status: 'funded', image: IMAGES.farms[0], farmerId: '2', farmerName: 'Chioma Okonkwo' },
  { id: '2', name: 'Rice Paddy - Kebbi', description: 'Premium rice cultivation in the heart of Kebbi', location: 'Kebbi State', cropType: 'Rice', targetAmount: 8000000, raisedAmount: 3200000, roi: 30, duration: '8 months', status: 'live', image: IMAGES.farms[1], farmerId: '2', farmerName: 'Chioma Okonkwo' },
  { id: '3', name: 'Maize Farm - Kaduna', description: 'Large-scale maize production with modern techniques', location: 'Kaduna State', cropType: 'Maize', targetAmount: 3500000, raisedAmount: 3500000, roi: 22, duration: '6 months', status: 'in_production', image: IMAGES.farms[2], farmerId: '2', farmerName: 'Chioma Okonkwo' },
  { id: '4', name: 'Tomato Greenhouse - Jos', description: 'Year-round tomato production in controlled environment', location: 'Plateau State', cropType: 'Tomato', targetAmount: 6000000, raisedAmount: 1800000, roi: 35, duration: '4 months', status: 'live', image: IMAGES.farms[3], farmerId: '2', farmerName: 'Chioma Okonkwo' },
  { id: '5', name: 'Yam Farm - Benue', description: 'Traditional yam farming with improved varieties', location: 'Benue State', cropType: 'Yam', targetAmount: 4000000, raisedAmount: 4000000, roi: 28, duration: '10 months', status: 'harvest', image: IMAGES.farms[4], farmerId: '2', farmerName: 'Chioma Okonkwo' },
];

// Mock Investments
export const investments: Investment[] = [
  { id: '1', projectId: '1', projectName: 'Cassava Farm - Ogun', amount: 250000, roi: 25, status: 'active', startDate: '2024-06-01', endDate: '2025-06-01', farmImage: IMAGES.farms[0] },
  { id: '2', projectId: '3', projectName: 'Maize Farm - Kaduna', amount: 150000, roi: 22, status: 'active', startDate: '2024-08-15', endDate: '2025-02-15', farmImage: IMAGES.farms[2] },
  { id: '3', projectId: '5', projectName: 'Yam Farm - Benue', amount: 300000, roi: 28, status: 'matured', startDate: '2024-01-01', endDate: '2024-11-01', farmImage: IMAGES.farms[4] },
];

// Mock Tree Investments
export const treeInvestments: TreeInvestment[] = [
  { id: '1', name: 'Cashew Tree Investment', type: 'cashew', minInvestment: 5000, maxInvestment: 500000, expectedYield: '15-20% annually after maturity', maturityYears: 3, dividendSchedule: 'Annually from year 3', image: IMAGES.trees[0], available: 500 },
  { id: '2', name: 'Mango Tree Investment', type: 'mango', minInvestment: 7500, maxInvestment: 750000, expectedYield: '18-25% annually after maturity', maturityYears: 4, dividendSchedule: 'Annually from year 4', image: IMAGES.trees[1], available: 350 },
  { id: '3', name: 'Cocoa Tree Investment', type: 'cocoa', minInvestment: 10000, maxInvestment: 1000000, expectedYield: '20-30% annually after maturity', maturityYears: 5, dividendSchedule: 'Bi-annually from year 5', image: IMAGES.trees[2], available: 200 },
  { id: '4', name: 'Oil Palm Investment', type: 'oil_palm', minInvestment: 15000, maxInvestment: 1500000, expectedYield: '25-35% annually after maturity', maturityYears: 4, dividendSchedule: 'Quarterly from year 4', image: IMAGES.trees[3], available: 150 },
];

// Mock Marketplace Products
export const marketplaceProducts: MarketplaceProduct[] = [
  { id: '1', name: 'Fresh Tomatoes', category: 'Vegetables', pricePerKg: 800, farmer: 'Adamu Farm', location: 'Jos, Plateau', available: true, quantity: 500, unit: 'kg', image: IMAGES.produce[0], rating: 4.5 },
  { id: '2', name: 'Organic Rice', category: 'Grains', pricePerKg: 1200, farmer: 'Kebbi Rice Mills', location: 'Kebbi State', available: true, quantity: 2000, unit: 'kg', image: IMAGES.produce[1], rating: 4.8 },
  { id: '3', name: 'Fresh Peppers', category: 'Vegetables', pricePerKg: 1500, farmer: 'Green Valley', location: 'Kaduna', available: true, quantity: 300, unit: 'kg', image: IMAGES.produce[2], rating: 4.3 },
  { id: '4', name: 'Cassava Flour', category: 'Processed', pricePerKg: 600, farmer: 'Ogun Agro', location: 'Ogun State', available: true, quantity: 1500, unit: 'kg', image: IMAGES.produce[3], rating: 4.6 },
  { id: '5', name: 'Fresh Yams', category: 'Tubers', pricePerKg: 450, farmer: 'Benue Farms', location: 'Benue State', available: true, quantity: 800, unit: 'kg', image: IMAGES.produce[4], rating: 4.7 },
  { id: '6', name: 'Maize (Corn)', category: 'Grains', pricePerKg: 350, farmer: 'Northern Grains', location: 'Kano', available: true, quantity: 3000, unit: 'kg', image: IMAGES.produce[5], rating: 4.4 },
];

// Mock Equipment
export const equipment: Equipment[] = [
  { id: '1', name: 'John Deere Tractor 5055E', type: 'Tractor', location: 'Lagos', pricePerDay: 45000, available: true, image: IMAGES.equipment[0], description: '55HP utility tractor perfect for medium-scale farming' },
  { id: '2', name: 'Combine Harvester CH330', type: 'Harvester', location: 'Kaduna', pricePerDay: 85000, available: true, image: IMAGES.equipment[1], description: 'High-capacity combine harvester for grain crops' },
  { id: '3', name: 'Irrigation System Pro', type: 'Irrigation', location: 'Kano', pricePerDay: 25000, available: false, image: IMAGES.equipment[2], description: 'Complete drip irrigation system for 5 hectares' },
  { id: '4', name: 'Seed Planter SP200', type: 'Planter', location: 'Ogun', pricePerDay: 15000, available: true, image: IMAGES.equipment[3], description: 'Precision seed planter for row crops' },
];

// Mock Storage Facilities
export const storageFacilities: StorageFacility[] = [
  { id: '1', name: 'Lagos Cold Storage Hub', type: 'cold_room', location: 'Lagos', capacity: 500, usedCapacity: 320, pricePerTonPerDay: 2500, image: IMAGES.storage[0], features: ['24/7 Monitoring', 'Temperature Control', 'Humidity Control', 'Security'] },
  { id: '2', name: 'Kano Grain Silo', type: 'silo', location: 'Kano', capacity: 2000, usedCapacity: 1200, pricePerTonPerDay: 1500, image: IMAGES.storage[1], features: ['Pest Control', 'Ventilation', 'Weight Monitoring', 'Loading Bay'] },
];

// Mock Logistics Partners
export const logisticsPartners = [
  { id: '1', name: 'GIG Logistics', logo: '/gig-logo.png' },
  { id: '2', name: 'Kobo360', logo: '/kobo360-logo.png' },
  { id: '3', name: 'Bolt Business', logo: '/bolt-logo.png' },
];

// Subscription Boxes
export const subscriptionBoxes = [
  { id: '1', name: 'Family Pack', description: 'Weekly fresh produce for a family of 4', price: 15000, frequency: 'weekly', items: ['5kg Rice', '2kg Tomatoes', '1kg Peppers', '3kg Yams', '2kg Vegetables'] },
  { id: '2', name: 'Student Pack', description: 'Affordable weekly essentials for students', price: 5000, frequency: 'weekly', items: ['2kg Rice', '1kg Beans', '500g Tomatoes', '1kg Garri'] },
  { id: '3', name: 'Premium Pack', description: 'Organic premium produce selection', price: 35000, frequency: 'weekly', items: ['5kg Organic Rice', '3kg Premium Tomatoes', '2kg Fresh Peppers', '5kg Yams', '3kg Mixed Vegetables', '2kg Fruits'] },
];

// Impact Stats
export const impactStats = {
  totalInvested: 2400000000,
  farmsSupported: 1247,
  investorsCount: 45000,
  farmersEmpowered: 3200,
  jobsCreated: 12500,
  tonsProduced: 85000,
};

// Features for landing page
export const features = [
  { id: '1', title: 'Farm Invest', description: 'Invest in verified farm projects and earn competitive returns', icon: 'Sprout' },
  { id: '2', title: 'Tree Naira', description: 'Own fractional shares in economic trees for long-term wealth', icon: 'TreePine' },
  { id: '3', title: 'Farm for Me', description: 'Outsource your farming to vetted professionals', icon: 'Users' },
  { id: '4', title: 'Equipment Renting', description: 'Access modern farming equipment on demand', icon: 'Tractor' },
  { id: '5', title: 'Storage-as-a-Service', description: 'Store your produce in monitored facilities', icon: 'Warehouse' },
  { id: '6', title: 'Logistics-as-a-Service', description: 'Reliable transportation for your farm produce', icon: 'Truck' },
  { id: '7', title: 'Marketplace', description: 'Buy and sell fresh produce directly', icon: 'ShoppingCart' },
];

// How it works steps
export const howItWorks = [
  { step: 1, title: 'Sign Up & Verify', description: 'Create your account and complete KYC verification in minutes' },
  { step: 2, title: 'Choose Your Path', description: 'Invest in farms, buy produce, rent equipment, or list your services' },
  { step: 3, title: 'Grow & Earn', description: 'Track your investments, manage orders, and watch your returns grow' },
];
