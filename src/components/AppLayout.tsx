import React, { useState } from 'react';
import { 
  Sprout, TreePine, Users, Tractor, Warehouse, Truck, ShoppingCart, ArrowRight, ArrowLeft,
  CheckCircle, TrendingUp, Globe, Shield, Menu, Wallet, LogOut, Star, MapPin, Plus, Minus, X, 
  Facebook, Twitter, Instagram, Linkedin, Mail, Phone, Eye, EyeOff, Calendar, Info, Camera
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
// add to the top import list
import LandingPage from "@/pages/LandingPage";
// add near the top of `src/components/AppLayout.tsx`
import logoUrl from '@/assets/agrolinkerlogo.png';
import AgrolinkrAISection  from "@/components/shared/AgroLinkrAISection";

// replace the badge block in the Navbar JSX with t

// Realistic Images matching product names
const IMAGES = {
  hero: 'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765212457437_6dd381ad.png',
  farms: {
    cassava: 'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765212344947_1f1cab3d.png',
    rice: 'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765212366148_18401afb.jpg',
    maize: 'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765212417139_e1e00692.png',
  },
  produce: {
    tomatoes: 'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765212162474_c4cd67bf.png',
    rice: 'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765212206590_3af450bf.png',
    peppers: 'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765212225880_d4c691c3.png',
    cassavaFlour: 'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765212264917_96922994.png',
    yams: 'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765212291999_80f46bc9.jpg',
    maize: 'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765212314141_7c13b21e.png',
  },
  trees: {
    cashew: 'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765212053169_123e8a4b.jpg',
    mango: 'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765212078769_ce6c2df4.jpg',
    cocoa: 'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765212099671_57ece4e7.jpg',
    oilPalm: 'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765212129943_0b19fb48.png',
  },
  farmers: {
    adamu: 'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765212486659_b02c7a49.png',
    chioma: 'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765212506825_cacce965.jpg',
    musa: 'https://d64gsuwffb70l.cloudfront.net/6936eb03398e883b75992b24_1765212541938_d7c3a964.png',
  },
};

// Mock Data with realistic images
const farmProjects = [
  { id: '1', name: 'Cassava Farm - Ogun', location: 'Ogun State', cropType: 'Cassava', targetAmount: 5000000, raisedAmount: 4250000, roi: 25, duration: '12 months', status: 'funded', image: IMAGES.farms.cassava, farmerName: 'Chioma Okonkwo' },
  { id: '2', name: 'Rice Paddy - Kebbi', location: 'Kebbi State', cropType: 'Rice', targetAmount: 8000000, raisedAmount: 3200000, roi: 30, duration: '8 months', status: 'live', image: IMAGES.farms.rice, farmerName: 'Adamu Ibrahim' },
  { id: '3', name: 'Maize Farm - Kaduna', location: 'Kaduna State', cropType: 'Maize', targetAmount: 3500000, raisedAmount: 3500000, roi: 22, duration: '6 months', status: 'in_production', image: IMAGES.farms.maize, farmerName: 'Musa Bello' },
];

const marketplaceProducts = [
  { id: '1', name: 'Fresh Tomatoes', category: 'Vegetables', pricePerKg: 800, farmer: 'Adamu Farm', location: 'Jos, Plateau', available: true, quantity: 500, image: IMAGES.produce.tomatoes, rating: 4.5 },
  { id: '2', name: 'Organic Rice', category: 'Grains', pricePerKg: 1200, farmer: 'Kebbi Rice Mills', location: 'Kebbi State', available: true, quantity: 2000, image: IMAGES.produce.rice, rating: 4.8 },
  { id: '3', name: 'Fresh Peppers', category: 'Vegetables', pricePerKg: 1500, farmer: 'Green Valley', location: 'Kaduna', available: true, quantity: 300, image: IMAGES.produce.peppers, rating: 4.3 },
  { id: '4', name: 'Cassava Flour', category: 'Processed', pricePerKg: 600, farmer: 'Ogun Agro', location: 'Ogun State', available: true, quantity: 1500, image: IMAGES.produce.cassavaFlour, rating: 4.6 },
  { id: '5', name: 'Fresh Yams', category: 'Tubers', pricePerKg: 450, farmer: 'Benue Farms', location: 'Benue State', available: true, quantity: 800, image: IMAGES.produce.yams, rating: 4.7 },
  { id: '6', name: 'Maize (Corn)', category: 'Grains', pricePerKg: 350, farmer: 'Northern Grains', location: 'Kano', available: true, quantity: 3000, image: IMAGES.produce.maize, rating: 4.4 },
];

const treeInvestments = [
  { id: '1', name: 'Cashew Plantation', type: 'cashew', minInvestment: 5000, maxInvestment: 500000, expectedYield: '18-25%', maturityYears: 3, dividendSchedule: 'Annually', available: 500, image: IMAGES.trees.cashew, color: 'from-amber-600 to-amber-700' },
  { id: '2', name: 'Mango Grove', type: 'mango', minInvestment: 10000, maxInvestment: 1000000, expectedYield: '20-30%', maturityYears: 4, dividendSchedule: 'Annually', available: 350, image: IMAGES.trees.mango, color: 'from-orange-500 to-orange-600' },
  { id: '3', name: 'Cocoa Farm', type: 'cocoa', minInvestment: 15000, maxInvestment: 750000, expectedYield: '22-35%', maturityYears: 5, dividendSchedule: 'Bi-annually', available: 200, image: IMAGES.trees.cocoa, color: 'from-amber-800 to-amber-900' },
  { id: '4', name: 'Oil Palm Estate', type: 'oil_palm', minInvestment: 20000, maxInvestment: 2000000, expectedYield: '25-40%', maturityYears: 4, dividendSchedule: 'Quarterly', available: 150, image: IMAGES.trees.oilPalm, color: 'from-green-600 to-green-700' },
];

const vettedFarmers = [
  { id: '1', name: 'Adamu Ibrahim', location: 'Kaduna', rating: 4.8, farms: 12, experience: '8 years', image: IMAGES.farmers.adamu, specialties: ['Maize', 'Rice', 'Sorghum'] },
  { id: '2', name: 'Chioma Eze', location: 'Ogun', rating: 4.9, farms: 18, experience: '10 years', image: IMAGES.farmers.chioma, specialties: ['Cassava', 'Yam', 'Vegetables'] },
  { id: '3', name: 'Musa Bello', location: 'Kano', rating: 4.7, farms: 15, experience: '12 years', image: IMAGES.farmers.musa, specialties: ['Rice', 'Wheat', 'Tomatoes'] },
];

const progressTimeline = [
  { date: '2024-01-15', title: 'Land Preparation', description: 'Clearing and tilling completed', image: IMAGES.farms.cassava, completed: true },
  { date: '2024-02-01', title: 'Planting', description: 'Seeds planted across 5 hectares', image: IMAGES.farms.rice, completed: true },
  { date: '2024-03-15', title: 'First Weeding', description: 'Weeding and fertilizer application', image: IMAGES.farms.maize, completed: true },
  { date: '2024-05-01', title: 'Growth Phase', description: 'Crops growing well, pest control applied', image: IMAGES.farms.cassava, completed: false },
  { date: '2024-07-01', title: 'Harvest', description: 'Expected harvest date', image: IMAGES.farms.rice, completed: false },
];

const features = [
  { id: '1', title: 'Farm Invest', description: 'Invest in verified farm projects and earn competitive returns', icon: Sprout, view: 'dashboard', color: 'bg-green-100 text-green-600 group-hover:bg-green-600' },
  { id: '2', title: 'Tree Naira', description: 'Own fractional shares in economic trees for long-term wealth', icon: TreePine, view: 'tree-naira', color: 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600' },
  { id: '3', title: 'Farm for Me', description: 'Outsource your farming to vetted professionals', icon: Users, view: 'farm-for-me', color: 'bg-amber-100 text-amber-600 group-hover:bg-amber-600' },
  { id: '4', title: 'Equipment Renting', description: 'Access modern farming equipment on demand', icon: Tractor, view: 'home', color: 'bg-orange-100 text-orange-600 group-hover:bg-orange-600' },
  { id: '5', title: 'Storage-as-a-Service', description: 'Store your produce in monitored facilities', icon: Warehouse, view: 'home', color: 'bg-stone-100 text-stone-600 group-hover:bg-stone-600' },
  { id: '6', title: 'Logistics-as-a-Service', description: 'Reliable transportation for your farm produce', icon: Truck, view: 'home', color: 'bg-blue-100 text-blue-600 group-hover:bg-blue-600' },
  { id: '7', title: 'Marketplace', description: 'Buy and sell fresh produce directly', icon: ShoppingCart, view: 'marketplace', color: 'bg-lime-100 text-lime-600 group-hover:bg-lime-600' },
];

const impactStats = { totalInvested: 2400000000, farmsSupported: 1247, investorsCount: 45000, farmersEmpowered: 3200 };



type ViewType = 'home' | 'marketplace' | 'dashboard' | 'tree-naira' | 'farm-for-me' | 'farm-tracking';

const AppLayout: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; walletBalance: number; role: string } | null>(null);
  const [cart, setCart] = useState<{ product: typeof marketplaceProducts[0]; quantity: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [investModalOpen, setInvestModalOpen] = useState(false);
  const [treeModalOpen, setTreeModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof farmProjects[0] | null>(null);
  const [selectedTree, setSelectedTree] = useState<typeof treeInvestments[0] | null>(null);
  const [investAmount, setInvestAmount] = useState('');
  const [treeInvestAmount, setTreeInvestAmount] = useState([50000]);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Auth form state
  const [showPassword, setShowPassword] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerRole, setRegisterRole] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Farm for Me wizard state
  const [wizardStep, setWizardStep] = useState(1);
  const [showFarmerResults, setShowFarmerResults] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState<typeof vettedFarmers[0] | null>(null);
  const [farmFormData, setFarmFormData] = useState({
    farmSize: '',
    crop: '',
    location: '',
    managementLevel: '',
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.product.pricePerKg * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Auth handlers
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (loginEmail && loginPassword) {
      setUser({ name: loginEmail.split('@')[0], email: loginEmail, walletBalance: 500000, role: 'investor' });
      setIsAuthenticated(true);
      setAuthModalOpen(false);
      toast.success('Welcome back to Agrolinker!');
      resetAuthForms();
    } else {
      toast.error('Please enter valid credentials');
    }
    setAuthLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (!registerName || !registerEmail || !registerPassword || !registerRole) {
      toast.error('Please fill in all required fields');
      setAuthLoading(false);
      return;
    }

    if (registerPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      setAuthLoading(false);
      return;
    }

    setUser({ 
      name: registerName, 
      email: registerEmail, 
      walletBalance: 100000,
      role: registerRole 
    });
    setIsAuthenticated(true);
    setAuthModalOpen(false);
    toast.success('Account created successfully! Welcome to Agrolinker!');
    resetAuthForms();
    setAuthLoading(false);
  };

  const handleDemoLogin = (email: string, role: string) => {
    setUser({ name: email.split('@')[0], email, walletBalance: 500000, role });
    setIsAuthenticated(true);
    setAuthModalOpen(false);
    toast.success('Welcome to Agrolinker!');
  };

  const resetAuthForms = () => {
    setLoginEmail('');
    setLoginPassword('');
    setRegisterName('');
    setRegisterEmail('');
    setRegisterPassword('');
    setRegisterPhone('');
    setRegisterRole('');
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentView('home');
    toast.success('Logged out successfully');
  };

  // Cart handlers
  const addToCart = (product: typeof marketplaceProducts[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
    toast.success(`${product.name} added to cart`);
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  // Investment handlers
  const handleInvest = (project: typeof farmProjects[0]) => {
    if (!isAuthenticated) {
      setAuthModalOpen(true);
      return;
    }
    setSelectedProject(project);
    setInvestAmount('');
    setInvestModalOpen(true);
  };

  const confirmInvestment = () => {
    const amount = parseInt(investAmount);
    if (!amount || amount < 10000) {
      toast.error('Minimum investment is ₦10,000');
      return;
    }
    if (user && amount > user.walletBalance) {
      toast.error('Insufficient wallet balance');
      return;
    }
    if (user) {
      setUser({ ...user, walletBalance: user.walletBalance - amount });
    }
    toast.success(`Successfully invested ₦${amount.toLocaleString()} in ${selectedProject?.name}`);
    setInvestModalOpen(false);
  };

  // Tree Naira handlers
  const handleTreeInvest = (tree: typeof treeInvestments[0]) => {
    if (!isAuthenticated) {
      setAuthModalOpen(true);
      return;
    }
    setSelectedTree(tree);
    setTreeInvestAmount([tree.minInvestment]);
    setTreeModalOpen(true);
  };

  const confirmTreeInvestment = () => {
    if (!user || treeInvestAmount[0] > user.walletBalance) {
      toast.error('Insufficient wallet balance');
      return;
    }
    setUser({ ...user, walletBalance: user.walletBalance - treeInvestAmount[0] });
    toast.success(`Successfully invested ₦${treeInvestAmount[0].toLocaleString()} in ${selectedTree?.name}`);
    setTreeModalOpen(false);
  };

  const calculateReturns = (amount: number) => {
    const annualReturn = amount * 0.22;
    return {
      year3: amount + (annualReturn * 3),
      year5: amount + (annualReturn * 5),
      year10: amount + (annualReturn * 10),
    };
  };

  // Farm for Me wizard handlers
  const handleWizardNext = () => {
    if (wizardStep < 4) {
      setWizardStep(wizardStep + 1);
    } else {
      setShowFarmerResults(true);
    }
  };

  const handleWizardBack = () => {
    if (wizardStep > 1) {
      setWizardStep(wizardStep - 1);
    }
  };

  const canProceedWizard = () => {
    switch (wizardStep) {
      case 1: return !!farmFormData.farmSize;
      case 2: return !!farmFormData.crop;
      case 3: return !!farmFormData.location;
      case 4: return !!farmFormData.managementLevel;
      default: return false;
    }
  };

  const handleConfirmContract = () => {
    if (!isAuthenticated) {
      setAuthModalOpen(true);
      return;
    }
    toast.success(`Contract created with ${selectedFarmer?.name}!`);
    setCurrentView('farm-tracking');
  };

  const resetFarmWizard = () => {
    setWizardStep(1);
    setShowFarmerResults(false);
    setSelectedFarmer(null);
    setFarmFormData({ farmSize: '', crop: '', location: '', managementLevel: '' });
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000000) return `₦${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  // Navbar Component
  const Navbar = () => (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => { setCurrentView('home'); resetFarmWizard(); }}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') { setCurrentView('home'); resetFarmWizard(); } }}
          >
            <img
              src={logoUrl}
              alt="Agrolinker"
              className="w-100 h-10 rounded-lg object-cover  p-1"
            />

          </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => setCurrentView('marketplace')} className={`font-medium ${currentView === 'marketplace' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'}`}>Marketplace</button>
            <button onClick={() => setCurrentView('tree-naira')} className={`font-medium ${currentView === 'tree-naira' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'}`}>Tree Naira</button>
            <button onClick={() => { setCurrentView('farm-for-me'); resetFarmWizard(); }} className={`font-medium ${currentView === 'farm-for-me' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'}`}>Farm for Me</button>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="icon" className="relative" onClick={() => setCartOpen(true)}>
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-green-600">{cartItemCount}</Badge>
              )}
            </Button>

            {isAuthenticated && user ? (
              <>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg">
                  <Wallet className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">₦{user.walletBalance.toLocaleString()}</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 px-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-green-600 text-white text-sm">{user.name[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setCurrentView('dashboard')}>Dashboard</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setCurrentView('tree-naira')}>Tree Naira</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => { setCurrentView('farm-for-me'); resetFarmWizard(); }}>Farm for Me</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600"><LogOut className="mr-2 h-4 w-4" />Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button onClick={() => setAuthModalOpen(true)} className="bg-green-600 hover:bg-green-700">Get Started</Button>
            )}

            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );

  // Footer Component
  const Footer = () => (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>

           <div
             className="flex items-center gap-2 cursor-pointer"
             onClick={() => { setCurrentView('home'); resetFarmWizard(); }}
             role="button"
             tabIndex={0}
             onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') { setCurrentView('home'); resetFarmWizard(); } }}
           >
             <img
               src={logoUrl}
               alt="Agrolinker"
               className="w-100 h-10 rounded-lg object-cover  p-1"
             />

           </div>
            <p className="text-gray-400 text-sm">Connecting investors, farmers, and agricultural services for a sustainable future.</p>
            <div className="flex gap-4 mt-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-green-500 cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-green-500 cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-green-500 cursor-pointer" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-green-500 cursor-pointer" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-green-500 cursor-pointer" onClick={() => setCurrentView('marketplace')}>Marketplace</li>
              <li className="hover:text-green-500 cursor-pointer" onClick={() => setCurrentView('tree-naira')}>Tree Naira</li>
              <li className="hover:text-green-500 cursor-pointer" onClick={() => { setCurrentView('farm-for-me'); resetFarmWizard(); }}>Farm for Me</li>
              <li className="hover:text-green-500 cursor-pointer">Equipment Renting</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-green-500 cursor-pointer">Help Center</li>
              <li className="hover:text-green-500 cursor-pointer">FAQs</li>
              <li className="hover:text-green-500 cursor-pointer">Contact Us</li>
              <li className="hover:text-green-500 cursor-pointer">Terms of Service</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-400 text-sm">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4" /><span>support@agrolinkr.com</span></div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4" /><span>+234 8108735258</span></div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          © 2025 Agrolinker. All rights reserved.
        </div>
      </div>
    </footer>
  );

  // Home View
  const HomeView = () => (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.hero} alt="African Farmland" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Invest, Grow, Harvest — <span className="text-green-400">The Future of Agriculture in Africa</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-200">
              Connect with verified farmers, invest in sustainable agriculture, and be part of Africa's agricultural revolution.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8" onClick={() => isAuthenticated ? setCurrentView('dashboard') : setAuthModalOpen(true)}>
                Invest Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

            </div>
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-white/80"><Shield className="h-5 w-5 text-green-400" /><span className="text-sm">Secured and Regulated</span></div>
              <div className="flex items-center gap-2 text-white/80"><CheckCircle className="h-5 w-5 text-green-400" /><span className="text-sm">Verified Farmers</span></div>
              <div className="flex items-center gap-2 text-white/80"><Globe className="h-5 w-5 text-green-400" /><span className="text-sm">45,000+ Investors</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats
      <section className="bg-green-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center"><p className="text-3xl md:text-4xl font-bold text-white">{formatNumber(impactStats.totalInvested)}</p><p className="text-green-100 mt-1">Total Invested</p></div>
            <div className="text-center"><p className="text-3xl md:text-4xl font-bold text-white">{impactStats.farmsSupported.toLocaleString()}</p><p className="text-green-100 mt-1">Farms Supported</p></div>
            <div className="text-center"><p className="text-3xl md:text-4xl font-bold text-white">{formatNumber(impactStats.investorsCount)}</p><p className="text-green-100 mt-1">Active Investors</p></div>
            <div className="text-center"><p className="text-3xl md:text-4xl font-bold text-white">{formatNumber(impactStats.farmersEmpowered)}</p><p className="text-green-100 mt-1">Farmers Empowered</p></div>
          </div>
        </div>
      </section>*/}

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Everything You Need for Agricultural Success</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">From investment to logistics, we provide end-to-end solutions.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.id} className="group hover:shadow-lg transition-shadow cursor-pointer border-gray-200" onClick={() => setCurrentView(feature.view as ViewType)}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                    <feature.icon className="h-6 w-6 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg">{feature.title}</h3>
                  <p className="text-gray-600 mt-2 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Investments */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Investment Opportunities</h2>
              <p className="mt-4 text-lg text-gray-600">Invest in verified farm projects with competitive returns</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {farmProjects.map((project) => {
              const progress = (project.raisedAmount / project.targetAmount) * 100;
              return (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative aspect-video">
                    <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                    <Badge className="absolute top-3 left-3 bg-green-100 text-green-700">{project.status.replace('_', ' ').toUpperCase()}</Badge>
                    <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-lg">
                      <div className="flex items-center gap-1 text-green-600"><TrendingUp className="h-4 w-4" /><span className="font-bold">{project.roi}% ROI</span></div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 text-lg">{project.name}</h3>
                    <div className="flex items-center gap-1 mt-1 text-gray-500"><MapPin className="h-4 w-4" /><span className="text-sm">{project.location}</span></div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Raised</span>
                        <span className="font-medium">₦{project.raisedAmount.toLocaleString()} / ₦{project.targetAmount.toLocaleString()}</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" className="flex-1">View Details</Button>
                      <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => handleInvest(project)} disabled={project.status !== 'live'}>
                        {project.status === 'live' ? 'Invest Now' : 'Fully Funded'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <AgrolinkrAISection/>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Start Your Agricultural Investment Journey?</h2>
          <p className="mt-4 text-lg text-green-100">Join thousands of investors already growing their wealth through sustainable agriculture.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8" onClick={() => setAuthModalOpen(true)}>
              Create Account <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-black hover:bg-white/10 text-lg px-8" onClick={() => setCurrentView('marketplace')}>
              Browse Marketplace
            </Button>
          </div>
        </div>
      </section>
    </>
  );

  // Marketplace View
  const MarketplaceView = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketplace</h1>
      <p className="text-gray-500 mb-8">Fresh produce directly from verified farmers across Nigeria</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {marketplaceProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative aspect-square">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <Badge className="absolute top-3 left-3 bg-green-600">{product.category}</Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900">{product.name}</h3>
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-500">{product.farmer}</span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-gray-500">
                <MapPin className="h-3 w-3" />
                <span className="text-xs">{product.location}</span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div>
                  <span className="text-lg font-bold text-green-600">₦{product.pricePerKg.toLocaleString()}</span>
                  <span className="text-sm text-gray-500">/kg</span>
                </div>
                <Button size="sm" onClick={() => addToCart(product)} className="bg-green-600 hover:bg-green-700">
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Dashboard View
  const DashboardView = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Investor Dashboard</h1>
      <p className="text-gray-500 mb-8">Track your investments and discover new opportunities</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card><CardContent className="p-6"><p className="text-sm text-gray-500">Wallet Balance</p><p className="text-2xl font-bold text-gray-900">₦{user?.walletBalance.toLocaleString()}</p></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-sm text-gray-500">Total Invested</p><p className="text-2xl font-bold text-gray-900">₦0</p></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-sm text-gray-500">ROI Earned</p><p className="text-2xl font-bold text-green-600">₦0</p></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-sm text-gray-500">Active Farms</p><p className="text-2xl font-bold text-gray-900">0</p></CardContent></Card>
      </div>
      <h2 className="text-xl font-semibold mb-4">Available Investments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {farmProjects.filter(p => p.status === 'live').map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <img src={project.image} alt={project.name} className="w-full h-40 object-cover" />
            <CardContent className="p-4">
              <h3 className="font-semibold">{project.name}</h3>
              <p className="text-sm text-gray-500">{project.location}</p>
              <div className="flex justify-between mt-2">
                <span className="text-green-600 font-bold">{project.roi}% ROI</span>
                <span className="text-gray-500">{project.duration}</span>
              </div>
              <Button className="w-full mt-4 bg-green-600 hover:bg-green-700" onClick={() => handleInvest(project)}>Invest Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Tree Naira View
  const TreeNairaView = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <TreePine className="h-10 w-10 text-green-200" />
            <h1 className="text-4xl font-bold text-white">Tree Naira</h1>
          </div>
          <p className="text-xl text-green-100 max-w-2xl">
            Invest in economic trees and build generational wealth. Own fractional shares in cashew, mango, cocoa, and oil palm plantations.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
              <p className="text-green-200 text-sm">Minimum Investment</p>
              <p className="text-white text-xl font-bold">₦5,000</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
              <p className="text-green-200 text-sm">Expected Returns</p>
              <p className="text-white text-xl font-bold">18-40% Annually</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
              <p className="text-green-200 text-sm">Maturity Period</p>
              <p className="text-white text-xl font-bold">3-5 Years</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How Tree Naira Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: 1, title: 'Choose Your Tree', desc: 'Select from cashew, mango, cocoa, or oil palm investments' },
            { step: 2, title: 'Invest Any Amount', desc: 'Start with as little as ₦5,000 for fractional ownership' },
            { step: 3, title: 'Trees Are Planted', desc: 'Our partner farmers plant and maintain your trees' },
            { step: 4, title: 'Earn Dividends', desc: 'Receive annual dividends from harvest proceeds' },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                {item.step}
              </div>
              <h3 className="font-semibold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tree Investment Options */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Available Tree Investments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {treeInvestments.map((tree) => (
            <Card key={tree.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <img src={tree.image} alt={tree.name} className="w-full h-48 md:h-full object-cover" />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{tree.name}</h3>
                      <Badge className="mt-1 bg-green-100 text-green-700">{tree.type.replace('_', ' ').toUpperCase()}</Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Available Units</p>
                      <p className="text-lg font-bold text-green-600">{tree.available}</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Min Investment</span>
                      <span className="font-medium">₦{tree.minInvestment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Expected Yield</span>
                      <span className="font-medium text-green-600">{tree.expectedYield}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Maturity</span>
                      <span className="font-medium">{tree.maturityYears} years</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Dividends</span>
                      <span className="font-medium">{tree.dividendSchedule}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-green-600 hover:bg-green-700" onClick={() => handleTreeInvest(tree)}>
                    Invest Now <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-amber-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Why Invest in Tree Naira?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Passive Income</h3>
              <p className="text-amber-100 mt-2">Earn annual dividends without active management. Our farmers handle everything.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Long-term Growth</h3>
              <p className="text-amber-100 mt-2">Trees appreciate in value over time, providing both income and capital gains.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TreePine className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Environmental Impact</h3>
              <p className="text-amber-100 mt-2">Your investment helps combat climate change while generating returns.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Farm for Me View
  const FarmForMeView = () => {
    if (currentView === 'farm-tracking') {
      return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button variant="ghost" onClick={() => { setCurrentView('farm-for-me'); resetFarmWizard(); }} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" /> Farm Progress Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedFarmer && (
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-6">
                  <img src={selectedFarmer.image} alt={selectedFarmer.name} className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <h3 className="font-semibold">{selectedFarmer.name}</h3>
                    <p className="text-sm text-gray-500">{selectedFarmer.location}</p>
                  </div>
                  <Badge className="ml-auto bg-green-100 text-green-700">Active Contract</Badge>
                </div>
              )}
              <div className="mb-8">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Overall Progress</span>
                  <span className="font-medium">60%</span>
                </div>
                <Progress value={60} className="h-3" />
              </div>
              <div className="space-y-6">
                {progressTimeline.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full ${item.completed ? 'bg-green-600' : 'bg-gray-300'}`} />
                      {idx < progressTimeline.length - 1 && (
                        <div className={`w-0.5 flex-1 ${item.completed ? 'bg-green-600' : 'bg-gray-200'}`} />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-gray-500">{item.date}</p>
                          <h4 className={`font-semibold ${item.completed ? 'text-gray-900' : 'text-gray-400'}`}>{item.title}</h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        {item.completed && <CheckCircle className="h-5 w-5 text-green-600" />}
                      </div>
                      {item.completed && (
                        <img src={item.image} alt={item.title} className="mt-3 w-full max-w-sm h-40 object-cover rounded-lg" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (showFarmerResults) {
      return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button variant="ghost" onClick={() => setShowFarmerResults(false)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Wizard
          </Button>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Matched Farmers</h2>
          <p className="text-gray-500 mb-6">Based on your requirements, we found {vettedFarmers.length} vetted farmers</p>
          <div className="space-y-4">
            {vettedFarmers.map((farmer) => (
              <Card
                key={farmer.id}
                className={`cursor-pointer transition-all ${selectedFarmer?.id === farmer.id ? 'ring-2 ring-green-600' : ''}`}
                onClick={() => setSelectedFarmer(farmer)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <img src={farmer.image} alt={farmer.name} className="w-20 h-20 rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{farmer.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <MapPin className="h-4 w-4" /> {farmer.location}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{farmer.rating}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {farmer.specialties.map((specialty, idx) => (
                          <Badge key={idx} variant="secondary">{specialty}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                        <span>{farmer.farms} farms managed</span>
                        <span>{farmer.experience} experience</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {selectedFarmer && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold mb-2">Contract Preview</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p className="text-gray-500">Farm Size</p><p className="font-medium">{farmFormData.farmSize}</p></div>
                <div><p className="text-gray-500">Crop</p><p className="font-medium">{farmFormData.crop}</p></div>
                <div><p className="text-gray-500">Location</p><p className="font-medium">{farmFormData.location}</p></div>
                <div><p className="text-gray-500">Management</p><p className="font-medium">{farmFormData.managementLevel}</p></div>
              </div>
              <Button className="w-full mt-4 bg-green-600 hover:bg-green-700" onClick={handleConfirmContract}>
                Confirm Contract with {selectedFarmer.name}
              </Button>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-700 to-green-600 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-8 w-8 text-green-200" />
              <h1 className="text-3xl font-bold text-white">Farm for Me</h1>
            </div>
            <p className="text-green-100 mt-2">
              Outsource your farming to vetted professionals. We handle everything from planting to harvest.
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${s <= wizardStep ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {s}
                </div>
                {s < 4 && <div className={`w-16 md:w-24 h-1 ${s < wizardStep ? 'bg-green-600' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>

          {/* Wizard Steps */}
          <Card>
            <CardContent className="p-6">
              {wizardStep === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Select Farm Size</h2>
                  <p className="text-gray-500">How much land do you want to farm?</p>
                  <RadioGroup value={farmFormData.farmSize} onValueChange={(value) => setFarmFormData({ ...farmFormData, farmSize: value })} className="space-y-3">
                    {['1 Hectare', '2 Hectares', '5 Hectares', '10 Hectares', '20+ Hectares'].map((size) => (
                      <div key={size} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value={size} id={size} />
                        <Label htmlFor={size} className="flex-1 cursor-pointer">{size}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {wizardStep === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Select Crop</h2>
                  <p className="text-gray-500">What would you like to grow?</p>
                  <RadioGroup value={farmFormData.crop} onValueChange={(value) => setFarmFormData({ ...farmFormData, crop: value })} className="space-y-3">
                    {['Cassava', 'Rice', 'Maize', 'Tomatoes', 'Yam', 'Soybeans'].map((crop) => (
                      <div key={crop} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value={crop} id={crop} />
                        <Label htmlFor={crop} className="flex-1 cursor-pointer">{crop}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {wizardStep === 3 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Select Location</h2>
                  <p className="text-gray-500">Where should the farm be located?</p>
                  <Select value={farmFormData.location} onValueChange={(value) => setFarmFormData({ ...farmFormData, location: value })}>
                    <SelectTrigger><SelectValue placeholder="Select a state" /></SelectTrigger>
                    <SelectContent>
                      {['Kaduna', 'Kano', 'Ogun', 'Oyo', 'Benue', 'Plateau', 'Kebbi', 'Niger'].map((loc) => (
                        <SelectItem key={loc} value={loc}>{loc} State</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {wizardStep === 4 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Management Level</h2>
                  <p className="text-gray-500">How involved do you want to be?</p>
                  <RadioGroup value={farmFormData.managementLevel} onValueChange={(value) => setFarmFormData({ ...farmFormData, managementLevel: value })} className="space-y-3">
                    {[
                      { value: 'Full Management', desc: 'We handle everything, you just receive profits' },
                      { value: 'Partial Management', desc: 'Regular updates and input on major decisions' },
                      { value: 'Supervised', desc: 'Active involvement with farmer guidance' },
                    ].map((option) => (
                      <div key={option.value} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                        <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                          <span className="font-medium">{option.value}</span>
                          <p className="text-sm text-gray-500">{option.desc}</p>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={handleWizardBack} disabled={wizardStep === 1}>
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </Button>
                <Button onClick={handleWizardNext} disabled={!canProceedWizard()} className="bg-green-600 hover:bg-green-700">
                  {wizardStep === 4 ? 'Find Farmers' : 'Next'} <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Cart Drawer */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader><SheetTitle>Shopping Cart ({cart.length} items)</SheetTitle></SheetHeader>
          <div className="flex flex-col h-full mt-4">
            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium">Your cart is empty</h3>
                <Button onClick={() => { setCartOpen(false); setCurrentView('marketplace'); }} className="mt-4 bg-green-600 hover:bg-green-700">Browse Marketplace</Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto space-y-4">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                      <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.product.name}</h4>
                        <p className="text-green-600 font-semibold">₦{item.product.pricePerKg.toLocaleString()}/kg</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateCartQuantity(item.product.id, -1)}><Minus className="h-3 w-3" /></Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateCartQuantity(item.product.id, 1)}><Plus className="h-3 w-3" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 ml-auto" onClick={() => removeFromCart(item.product.id)}><X className="h-4 w-4" /></Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-semibold mb-4">
                    <span>Total</span>
                    <span className="text-green-600">₦{cartTotal.toLocaleString()}</span>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => { toast.success('Order placed successfully!'); setCart([]); setCartOpen(false); }}>Checkout</Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Auth Modal */}
      <Dialog open={authModalOpen} onOpenChange={setAuthModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Welcome to Agrolinker</DialogTitle>
            <DialogDescription>Sign in to your account or create a new one</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Create Account</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input id="login-email" type="email" placeholder="Enter your email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Input id="login-password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                    <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={authLoading}>
                  {authLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
              <div className="mt-6 border-t pt-6">
                <p className="text-sm text-gray-500 text-center mb-4">Try a demo account:</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleDemoLogin('investor@agrolinker.com', 'investor')}>Investor</Button>
                  <Button variant="outline" size="sm" onClick={() => handleDemoLogin('farmer@agrolinker.com', 'farmer')}>Farmer</Button>
                </div>
              </div>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Full Name *</Label>
                  <Input id="register-name" type="text" placeholder="Enter your full name" value={registerName} onChange={(e) => setRegisterName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email *</Label>
                  <Input id="register-email" type="email" placeholder="Enter your email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-phone">Phone Number</Label>
                  <Input id="register-phone" type="tel" placeholder="+234 800 000 0000" value={registerPhone} onChange={(e) => setRegisterPhone(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password *</Label>
                  <div className="relative">
                    <Input id="register-password" type={showPassword ? 'text' : 'password'} placeholder="Create a password (min 8 characters)" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} required minLength={8} />
                    <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-role">I want to *</Label>
                  <Select value={registerRole} onValueChange={setRegisterRole}>
                    <SelectTrigger><SelectValue placeholder="Select your role" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="investor">Invest in farms</SelectItem>
                      <SelectItem value="farmer">List my farm for funding</SelectItem>
                      <SelectItem value="equipment_owner">Rent out equipment</SelectItem>
                      <SelectItem value="logistics_provider">Provide logistics services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" className="rounded border-gray-300 mt-1" required />
                  <span className="text-sm text-gray-600">
                    I agree to the <span className="text-green-600 hover:underline cursor-pointer">Terms of Service</span> and <span className="text-green-600 hover:underline cursor-pointer">Privacy Policy</span>
                  </span>
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={authLoading || !registerRole}>
                  {authLoading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Investment Modal */}
      <Dialog open={investModalOpen} onOpenChange={setInvestModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invest in {selectedProject?.name}</DialogTitle>
            <DialogDescription>Enter the amount you want to invest. Minimum ₦10,000.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input type="number" placeholder="Enter amount" value={investAmount} onChange={(e) => setInvestAmount(e.target.value)} min={10000} />
            <p className="text-sm text-gray-500">Wallet Balance: ₦{user?.walletBalance.toLocaleString()}</p>
            {selectedProject && investAmount && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between"><span className="text-gray-500">Expected ROI</span><span className="text-green-600 font-bold">{selectedProject.roi}%</span></div>
                <div className="flex justify-between mt-2"><span className="text-gray-500">Expected Returns</span><span className="font-bold">₦{(parseInt(investAmount) * (1 + selectedProject.roi / 100)).toLocaleString()}</span></div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInvestModalOpen(false)}>Cancel</Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={confirmInvestment}>Confirm Investment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tree Investment Modal */}
      <Dialog open={treeModalOpen} onOpenChange={setTreeModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedTree?.name}</DialogTitle>
            <DialogDescription>Invest in {selectedTree?.type.replace('_', ' ')} trees and earn passive income</DialogDescription>
          </DialogHeader>
          {selectedTree && (
            <Tabs defaultValue="invest" className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="invest">Invest</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
              <TabsContent value="invest" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Investment Amount</span>
                    <span className="font-bold text-green-600">₦{treeInvestAmount[0].toLocaleString()}</span>
                  </div>
                  <Slider value={treeInvestAmount} onValueChange={setTreeInvestAmount} min={selectedTree.minInvestment} max={selectedTree.maxInvestment} step={5000} />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>₦{selectedTree.minInvestment.toLocaleString()}</span>
                    <span>₦{selectedTree.maxInvestment.toLocaleString()}</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" /> Projected Returns
                  </h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div><p className="text-xs text-gray-500">Year 3</p><p className="font-bold text-green-600">₦{calculateReturns(treeInvestAmount[0]).year3.toLocaleString()}</p></div>
                    <div><p className="text-xs text-gray-500">Year 5</p><p className="font-bold text-green-600">₦{calculateReturns(treeInvestAmount[0]).year5.toLocaleString()}</p></div>
                    <div><p className="text-xs text-gray-500">Year 10</p><p className="font-bold text-green-600">₦{calculateReturns(treeInvestAmount[0]).year10.toLocaleString()}</p></div>
                  </div>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <Info className="h-3 w-3" /> Projections based on historical performance. Actual returns may vary.
                  </p>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Wallet Balance</span>
                  <span className="font-medium">₦{user?.walletBalance.toLocaleString() || '0'}</span>
                </div>
              </TabsContent>
              <TabsContent value="details" className="space-y-4 mt-4">
                <img src={selectedTree.image} alt={selectedTree.name} className="w-full h-48 object-cover rounded-lg" />
                <div className="space-y-3">
                  <div className="flex justify-between"><span className="text-gray-500">Tree Type</span><span className="font-medium capitalize">{selectedTree.type.replace('_', ' ')}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Expected Yield</span><span className="font-medium text-green-600">{selectedTree.expectedYield}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Maturity Period</span><span className="font-medium">{selectedTree.maturityYears} years</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Dividend Schedule</span><span className="font-medium">{selectedTree.dividendSchedule}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Available Units</span><span className="font-medium">{selectedTree.available}</span></div>
                </div>
              </TabsContent>
            </Tabs>
          )}
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setTreeModalOpen(false)}>Cancel</Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={confirmTreeInvestment}>Confirm Investment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mobile Menu */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="right" className="w-80">
          <SheetHeader><SheetTitle>Menu</SheetTitle></SheetHeader>
          <div className="flex flex-col gap-4 mt-6">
            <button onClick={() => { setCurrentView('marketplace'); setMobileMenuOpen(false); }} className="text-left py-2 text-gray-600 hover:text-green-600">Marketplace</button>
            <button onClick={() => { setCurrentView('tree-naira'); setMobileMenuOpen(false); }} className="text-left py-2 text-gray-600 hover:text-green-600">Tree Naira</button>
            <button onClick={() => { setCurrentView('farm-for-me'); resetFarmWizard(); setMobileMenuOpen(false); }} className="text-left py-2 text-gray-600 hover:text-green-600">Farm for Me</button>
            {isAuthenticated && (
              <button onClick={() => { setCurrentView('dashboard'); setMobileMenuOpen(false); }} className="text-left py-2 text-gray-600 hover:text-green-600">Dashboard</button>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      {currentView === 'home' && <HomeView />}
      {currentView === 'marketplace' && <MarketplaceView />}
      {currentView === 'dashboard' && <DashboardView />}
      {currentView === 'tree-naira' && <TreeNairaView />}
      {(currentView === 'farm-for-me' || currentView === 'farm-tracking') && <FarmForMeView />}

      <Footer />
    </div>
  );
};

export default AppLayout;
