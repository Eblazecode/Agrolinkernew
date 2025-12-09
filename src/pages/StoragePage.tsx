import React, { useState } from 'react';
import { Warehouse, MapPin, Thermometer, Droplets, Shield, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/shared/CartDrawer';
import { storageFacilities, StorageFacility } from '@/lib/mockData';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';

// Mock monitoring data
const monitoringData = [
  { time: '00:00', temperature: 4.2, humidity: 85 },
  { time: '04:00', temperature: 4.0, humidity: 86 },
  { time: '08:00', temperature: 4.5, humidity: 84 },
  { time: '12:00', temperature: 5.0, humidity: 82 },
  { time: '16:00', temperature: 4.8, humidity: 83 },
  { time: '20:00', temperature: 4.3, humidity: 85 },
  { time: '24:00', temperature: 4.1, humidity: 86 },
];

const StoragePage: React.FC = () => {
  const { isAuthenticated, addNotification } = useStore();
  const [selectedFacility, setSelectedFacility] = useState<StorageFacility | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [monitoringModalOpen, setMonitoringModalOpen] = useState(false);
  const [volume, setVolume] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const handleBooking = (facility: StorageFacility) => {
    setSelectedFacility(facility);
    setVolume('');
    setStartDate(undefined);
    setEndDate(undefined);
    setBookingModalOpen(true);
  };

  const handleViewMonitoring = (facility: StorageFacility) => {
    setSelectedFacility(facility);
    setMonitoringModalOpen(true);
  };

  const calculateTotalCost = () => {
    if (!startDate || !endDate || !selectedFacility || !volume) return 0;
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return days * selectedFacility.pricePerTonPerDay * parseFloat(volume);
  };

  const confirmBooking = () => {
    if (!isAuthenticated) {
      toast.error('Please login to book storage');
      return;
    }

    if (!startDate || !endDate || !volume) {
      toast.error('Please fill in all booking details');
      return;
    }

    toast.success(`Successfully booked storage at ${selectedFacility?.name}!`);
    addNotification(`Your storage booking at ${selectedFacility?.name} has been confirmed`);
    setBookingModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CartDrawer />

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Warehouse className="h-8 w-8 text-blue-200" />
            <h1 className="text-3xl font-bold text-white">Storage-as-a-Service</h1>
          </div>
          <p className="text-blue-100 mt-2">
            Store your produce in AI-monitored facilities with temperature and humidity control.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Thermometer, label: 'Temperature Control', value: '0-25°C' },
            { icon: Droplets, label: 'Humidity Control', value: '60-90%' },
            { icon: Shield, label: '24/7 Security', value: 'CCTV Monitored' },
            { icon: Warehouse, label: 'Total Capacity', value: '2,500 Tons' },
          ].map((feature, idx) => (
            <Card key={idx}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <feature.icon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{feature.label}</p>
                  <p className="font-semibold">{feature.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Storage Facilities */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">Available Facilities</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {storageFacilities.map((facility) => {
            const usagePercent = (facility.usedCapacity / facility.capacity) * 100;
            const availableCapacity = facility.capacity - facility.usedCapacity;

            return (
              <Card key={facility.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/5">
                    <img
                      src={facility.image}
                      alt={facility.name}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{facility.name}</h3>
                        <Badge className="mt-1" variant="outline">
                          {facility.type.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mt-2 text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{facility.location}</span>
                    </div>

                    {/* Capacity */}
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Capacity Usage</span>
                        <span className="font-medium">{usagePercent.toFixed(0)}%</span>
                      </div>
                      <Progress value={usagePercent} className="h-2" />
                      <p className="text-xs text-gray-400 mt-1">
                        {availableCapacity.toLocaleString()} tons available
                      </p>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {facility.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    {/* Price and Actions */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div>
                        <span className="text-xl font-bold text-green-600">
                          ₦{facility.pricePerTonPerDay.toLocaleString()}
                        </span>
                        <span className="text-gray-500 text-sm">/ton/day</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewMonitoring(facility)}
                        >
                          View Monitor
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleBooking(facility)}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <Footer />

      {/* Booking Modal */}
      <Dialog open={bookingModalOpen} onOpenChange={setBookingModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Book Storage at {selectedFacility?.name}</DialogTitle>
            <DialogDescription>
              Enter your storage requirements to complete the booking
            </DialogDescription>
          </DialogHeader>

          {selectedFacility && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Volume (Tons)</Label>
                <Input
                  type="number"
                  placeholder="Enter volume in tons"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  max={selectedFacility.capacity - selectedFacility.usedCapacity}
                />
                <p className="text-xs text-gray-400">
                  Max available: {(selectedFacility.capacity - selectedFacility.usedCapacity).toLocaleString()} tons
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <Calendar className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, 'PP') : 'Select'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <Calendar className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, 'PP') : 'Select'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        disabled={(date) => date < (startDate || new Date())}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Rate</span>
                  <span className="font-medium">₦{selectedFacility.pricePerTonPerDay.toLocaleString()}/ton/day</span>
                </div>
                {startDate && endDate && volume && (
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-semibold">Total Cost</span>
                    <span className="font-bold text-green-600">
                      ₦{calculateTotalCost().toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setBookingModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={confirmBooking}
              disabled={!startDate || !endDate || !volume}
            >
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Monitoring Modal */}
      <Dialog open={monitoringModalOpen} onOpenChange={setMonitoringModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>AI Monitoring - {selectedFacility?.name}</DialogTitle>
            <DialogDescription>
              Real-time temperature and humidity monitoring
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {/* Current Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Thermometer className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Current Temperature</p>
                    <p className="text-2xl font-bold text-blue-600">4.2°C</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                    <Droplets className="h-6 w-6 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Current Humidity</p>
                    <p className="text-2xl font-bold text-cyan-600">85%</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chart */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monitoringData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" stroke="#888" fontSize={12} />
                  <YAxis yAxisId="temp" stroke="#3b82f6" fontSize={12} />
                  <YAxis yAxisId="humidity" orientation="right" stroke="#06b6d4" fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="temp"
                    type="monotone"
                    dataKey="temperature"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Temperature (°C)"
                  />
                  <Line
                    yAxisId="humidity"
                    type="monotone"
                    dataKey="humidity"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    name="Humidity (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <p className="text-xs text-gray-400 mt-4 text-center">
              Data updated every 4 hours. All readings within optimal range.
            </p>
          </div>

          <DialogFooter>
            <Button onClick={() => setMonitoringModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StoragePage;
