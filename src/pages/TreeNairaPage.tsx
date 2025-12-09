import React, { useState } from 'react';
import { TreePine, TrendingUp, Calendar, Info, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/shared/CartDrawer';
import { treeInvestments, TreeInvestment } from '@/lib/mockData';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';

const TreeNairaPage: React.FC = () => {
  const { walletBalance, isAuthenticated, addNotification } = useStore();
  const [selectedTree, setSelectedTree] = useState<TreeInvestment | null>(null);
  const [investAmount, setInvestAmount] = useState([50000]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewDetails = (tree: TreeInvestment) => {
    setSelectedTree(tree);
    setInvestAmount([tree.minInvestment]);
    setModalOpen(true);
  };

  const handleInvest = () => {
    if (!isAuthenticated) {
      toast.error('Please login to invest');
      return;
    }

    if (investAmount[0] > walletBalance) {
      toast.error('Insufficient wallet balance');
      return;
    }

    toast.success(`Successfully invested ₦${investAmount[0].toLocaleString()} in ${selectedTree?.name}`);
    addNotification(`Your investment in ${selectedTree?.name} has been confirmed`);
    setModalOpen(false);
  };

  const calculateReturns = (amount: number, tree: TreeInvestment) => {
    const annualReturn = amount * 0.20; // 20% average return
    return {
      year3: amount + (annualReturn * 3),
      year5: amount + (annualReturn * 5),
      year10: amount + (annualReturn * 10),
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CartDrawer />

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
              <p className="text-white text-xl font-bold">15-35% Annually</p>
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
                  <img
                    src={tree.image}
                    alt={tree.name}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{tree.name}</h3>
                      <Badge className="mt-1 bg-green-100 text-green-700">
                        {tree.type.replace('_', ' ').toUpperCase()}
                      </Badge>
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

                  <Button
                    className="w-full mt-4 bg-green-600 hover:bg-green-700"
                    onClick={() => handleViewDetails(tree)}
                  >
                    Invest Now
                    <ArrowRight className="h-4 w-4 ml-2" />
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
              <p className="text-amber-100 mt-2">
                Earn annual dividends without active management. Our farmers handle everything.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Long-term Growth</h3>
              <p className="text-amber-100 mt-2">
                Trees appreciate in value over time, providing both income and capital gains.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TreePine className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Environmental Impact</h3>
              <p className="text-amber-100 mt-2">
                Your investment helps combat climate change while generating returns.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Investment Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedTree?.name}</DialogTitle>
            <DialogDescription>
              Invest in {selectedTree?.type.replace('_', ' ')} trees and earn passive income
            </DialogDescription>
          </DialogHeader>

          {selectedTree && (
            <Tabs defaultValue="invest" className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="invest">Invest</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>

              <TabsContent value="invest" className="space-y-4 mt-4">
                {/* Investment Amount Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Investment Amount</span>
                    <span className="font-bold text-green-600">
                      ₦{investAmount[0].toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    value={investAmount}
                    onValueChange={setInvestAmount}
                    min={selectedTree.minInvestment}
                    max={selectedTree.maxInvestment}
                    step={5000}
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>₦{selectedTree.minInvestment.toLocaleString()}</span>
                    <span>₦{selectedTree.maxInvestment.toLocaleString()}</span>
                  </div>
                </div>

                {/* Projected Returns */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    Projected Returns
                  </h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xs text-gray-500">Year 3</p>
                      <p className="font-bold text-green-600">
                        ₦{calculateReturns(investAmount[0], selectedTree).year3.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Year 5</p>
                      <p className="font-bold text-green-600">
                        ₦{calculateReturns(investAmount[0], selectedTree).year5.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Year 10</p>
                      <p className="font-bold text-green-600">
                        ₦{calculateReturns(investAmount[0], selectedTree).year10.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <Info className="h-3 w-3" />
                    Projections based on historical performance. Actual returns may vary.
                  </p>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Wallet Balance</span>
                  <span className="font-medium">₦{walletBalance.toLocaleString()}</span>
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-4 mt-4">
                <img
                  src={selectedTree.image}
                  alt={selectedTree.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tree Type</span>
                    <span className="font-medium capitalize">{selectedTree.type.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Expected Yield</span>
                    <span className="font-medium text-green-600">{selectedTree.expectedYield}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Maturity Period</span>
                    <span className="font-medium">{selectedTree.maturityYears} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Dividend Schedule</span>
                    <span className="font-medium">{selectedTree.dividendSchedule}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Available Units</span>
                    <span className="font-medium">{selectedTree.available}</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleInvest}>
              Confirm Investment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TreeNairaPage;
