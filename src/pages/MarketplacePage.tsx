import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, X, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/shared/CartDrawer';
import ProductCard from '@/components/shared/ProductCard';
import { marketplaceProducts, subscriptionBoxes } from '@/lib/mockData';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';

const categories = ['All', 'Vegetables', 'Grains', 'Tubers', 'Processed', 'Fruits'];
const locations = ['All', 'Lagos', 'Kano', 'Kaduna', 'Ogun State', 'Jos, Plateau', 'Kebbi State', 'Benue State'];

const MarketplacePage: React.FC = () => {
  const { addToCart } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState('popular');
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    return marketplaceProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.farmer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesLocation = selectedLocation === 'All' || product.location.includes(selectedLocation);
      const matchesPrice = product.pricePerKg >= priceRange[0] && product.pricePerKg <= priceRange[1];
      const matchesAvailability = !showAvailableOnly || product.available;

      return matchesSearch && matchesCategory && matchesLocation && matchesPrice && matchesAvailability;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.pricePerKg - b.pricePerKg;
        case 'price-high':
          return b.pricePerKg - a.pricePerKg;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [searchQuery, selectedCategory, selectedLocation, priceRange, sortBy, showAvailableOnly]);

  const handleSubscribe = (boxId: string) => {
    const box = subscriptionBoxes.find(b => b.id === boxId);
    if (box) {
      toast.success(`Subscribed to ${box.name}! You'll receive your first delivery soon.`);
    }
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategory === category}
                onCheckedChange={() => setSelectedCategory(category)}
              />
              <label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <h3 className="font-semibold mb-3">Location</h3>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger>
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Price Range (₦/kg)</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={2000}
          step={50}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>₦{priceRange[0]}</span>
          <span>₦{priceRange[1]}</span>
        </div>
      </div>

      {/* Availability */}
      <div className="flex items-center justify-between">
        <Label htmlFor="available-only">Available Only</Label>
        <Switch
          id="available-only"
          checked={showAvailableOnly}
          onCheckedChange={setShowAvailableOnly}
        />
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setSelectedCategory('All');
          setSelectedLocation('All');
          setPriceRange([0, 2000]);
          setShowAvailableOnly(false);
        }}
      >
        Clear Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CartDrawer />

      {/* Header */}
      <div className="bg-green-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Marketplace</h1>
          <p className="text-green-100 mt-2">
            Fresh produce directly from verified farmers across Nigeria
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Sort Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search products or farmers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            {/* Mobile Filter Button */}
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FilterContent />
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Active Filters */}
            {(selectedCategory !== 'All' || selectedLocation !== 'All' || showAvailableOnly) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCategory !== 'All' && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {selectedCategory}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setSelectedCategory('All')}
                    />
                  </Badge>
                )}
                {selectedLocation !== 'All' && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {selectedLocation}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setSelectedLocation('All')}
                    />
                  </Badge>
                )}
                {showAvailableOnly && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Available Only
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setShowAvailableOnly(false)}
                    />
                  </Badge>
                )}
              </div>
            )}

            {/* Results Count */}
            <p className="text-gray-500 mb-4">
              Showing {filteredProducts.length} products
            </p>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                <p className="text-gray-500 mt-1">Try adjusting your filters</p>
              </div>
            )}

            {/* Subscription Boxes */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Subscription Boxes</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {subscriptionBoxes.map((box) => (
                  <Card key={box.id} className="overflow-hidden">
                    <div className="bg-gradient-to-r from-green-600 to-green-500 p-6 text-white">
                      <h3 className="text-xl font-bold">{box.name}</h3>
                      <p className="text-green-100 text-sm mt-1">{box.description}</p>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-baseline gap-1 mb-4">
                        <span className="text-3xl font-bold">₦{box.price.toLocaleString()}</span>
                        <span className="text-gray-500">/{box.frequency}</span>
                      </div>
                      <ul className="space-y-2 mb-6">
                        {box.items.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => handleSubscribe(box.id)}
                      >
                        Subscribe Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MarketplacePage;
