import React, { useState } from 'react';
import { Truck, MapPin, Package, Clock, CheckCircle, Phone, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/shared/CartDrawer';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';

// Mock logistics requests
const mockRequests = [
  {
    id: '1',
    origin: 'Lagos',
    destination: 'Abuja',
    loadType: 'Grains',
    weight: 5,
    status: 'in_transit',
    driverName: 'Ibrahim Musa',
    driverPhone: '+234 801 234 5678',
    estimatedDelivery: '2025-12-10',
    trackingSteps: [
      { status: 'Pickup Confirmed', time: '2025-12-08 09:00', completed: true },
      { status: 'In Transit', time: '2025-12-08 14:00', completed: true },
      { status: 'Arrived at Hub', time: '2025-12-09 08:00', completed: false },
      { status: 'Out for Delivery', time: '', completed: false },
      { status: 'Delivered', time: '', completed: false },
    ],
  },
  {
    id: '2',
    origin: 'Kano',
    destination: 'Lagos',
    loadType: 'Vegetables',
    weight: 3,
    status: 'delivered',
    driverName: 'Chidi Okonkwo',
    driverPhone: '+234 802 345 6789',
    estimatedDelivery: '2025-12-05',
    trackingSteps: [
      { status: 'Pickup Confirmed', time: '2025-12-03 10:00', completed: true },
      { status: 'In Transit', time: '2025-12-03 15:00', completed: true },
      { status: 'Arrived at Hub', time: '2025-12-04 09:00', completed: true },
      { status: 'Out for Delivery', time: '2025-12-05 08:00', completed: true },
      { status: 'Delivered', time: '2025-12-05 14:00', completed: true },
    ],
  },
];

const loadTypes = ['Grains', 'Vegetables', 'Tubers', 'Fruits', 'Processed Foods', 'Livestock'];
const locations = ['Lagos', 'Abuja', 'Kano', 'Kaduna', 'Port Harcourt', 'Ibadan', 'Jos', 'Ogun'];

const LogisticsPage: React.FC = () => {
  const { isAuthenticated, addNotification } = useStore();
  const [activeTab, setActiveTab] = useState('request');
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    loadType: '',
    weight: '',
    pickupDate: undefined as Date | undefined,
  });

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('Please login to request pickup');
      return;
    }

    if (!formData.origin || !formData.destination || !formData.loadType || !formData.weight || !formData.pickupDate) {
      toast.error('Please fill in all fields');
      return;
    }

    toast.success('Pickup request submitted successfully! A driver will be assigned shortly.');
    addNotification('Your logistics request has been submitted');
    setFormData({
      origin: '',
      destination: '',
      loadType: '',
      weight: '',
      pickupDate: undefined,
    });
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    assigned: 'bg-blue-100 text-blue-700',
    in_transit: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CartDrawer />

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Truck className="h-8 w-8 text-purple-200" />
            <h1 className="text-3xl font-bold text-white">Logistics-as-a-Service</h1>
          </div>
          <p className="text-purple-100 mt-2">
            Reliable transportation for your farm produce. Partner with GIG, Kobo360, and Bolt.
          </p>

          {/* Partner Logos */}
          <div className="flex items-center gap-6 mt-6">
            <span className="text-purple-200 text-sm">Partners:</span>
            <div className="flex gap-4">
              {['GIG Logistics', 'Kobo360', 'Bolt Business'].map((partner) => (
                <div
                  key={partner}
                  className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-sm font-medium"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="request">Request Pickup</TabsTrigger>
            <TabsTrigger value="track">Track Shipments</TabsTrigger>
          </TabsList>

          {/* Request Pickup Tab */}
          <TabsContent value="request" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Request Pickup</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitRequest} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Origin</Label>
                        <Select
                          value={formData.origin}
                          onValueChange={(value) => setFormData({ ...formData, origin: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select origin" />
                          </SelectTrigger>
                          <SelectContent>
                            {locations.map((loc) => (
                              <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Destination</Label>
                        <Select
                          value={formData.destination}
                          onValueChange={(value) => setFormData({ ...formData, destination: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select destination" />
                          </SelectTrigger>
                          <SelectContent>
                            {locations.map((loc) => (
                              <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Load Type</Label>
                      <Select
                        value={formData.loadType}
                        onValueChange={(value) => setFormData({ ...formData, loadType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select load type" />
                        </SelectTrigger>
                        <SelectContent>
                          {loadTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Weight (Tons)</Label>
                      <Input
                        type="number"
                        placeholder="Enter weight in tons"
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Pickup Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start">
                            <Clock className="mr-2 h-4 w-4" />
                            {formData.pickupDate ? format(formData.pickupDate, 'PPP') : 'Select date'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.pickupDate}
                            onSelect={(date) => setFormData({ ...formData, pickupDate: date })}
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                      Submit Request
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Pricing Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Pricing Guide</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { route: 'Lagos - Abuja', price: '₦150,000/ton' },
                        { route: 'Lagos - Kano', price: '₦200,000/ton' },
                        { route: 'Lagos - Port Harcourt', price: '₦80,000/ton' },
                        { route: 'Kano - Abuja', price: '₦100,000/ton' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center py-2 border-b last:border-0">
                          <span className="text-gray-600">{item.route}</span>
                          <span className="font-semibold text-purple-600">{item.price}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-4">
                      * Prices may vary based on load type and current fuel prices
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Why Choose Us?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        'Real-time GPS tracking',
                        'Insurance coverage for all shipments',
                        'Temperature-controlled vehicles available',
                        'Dedicated customer support',
                        'Multiple payment options',
                      ].map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Track Shipments Tab */}
          <TabsContent value="track" className="mt-6">
            <div className="space-y-6">
              {mockRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      {/* Shipment Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <Badge className={statusColors[request.status]}>
                            {request.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <span className="text-sm text-gray-500">ID: #{request.id}</span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-500">Origin</p>
                            <p className="font-medium flex items-center gap-1">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              {request.origin}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Destination</p>
                            <p className="font-medium flex items-center gap-1">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              {request.destination}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Load Type</p>
                            <p className="font-medium flex items-center gap-1">
                              <Package className="h-4 w-4 text-gray-400" />
                              {request.loadType}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Weight</p>
                            <p className="font-medium">{request.weight} tons</p>
                          </div>
                        </div>

                        {/* Driver Info */}
                        <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
                          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium">{request.driverName}</p>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {request.driverPhone}
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="ml-auto">
                            Call Driver
                          </Button>
                        </div>
                      </div>

                      {/* Tracking Timeline */}
                      <div className="lg:w-72">
                        <h4 className="font-medium mb-4">Tracking Timeline</h4>
                        <div className="space-y-4">
                          {request.trackingSteps.map((step, idx) => (
                            <div key={idx} className="flex gap-3">
                              <div className="flex flex-col items-center">
                                <div
                                  className={`w-3 h-3 rounded-full ${
                                    step.completed ? 'bg-green-600' : 'bg-gray-300'
                                  }`}
                                />
                                {idx < request.trackingSteps.length - 1 && (
                                  <div
                                    className={`w-0.5 h-8 ${
                                      step.completed ? 'bg-green-600' : 'bg-gray-200'
                                    }`}
                                  />
                                )}
                              </div>
                              <div className="flex-1 -mt-0.5">
                                <p className={`text-sm ${step.completed ? 'font-medium' : 'text-gray-400'}`}>
                                  {step.status}
                                </p>
                                {step.time && (
                                  <p className="text-xs text-gray-400">{step.time}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default LogisticsPage;
