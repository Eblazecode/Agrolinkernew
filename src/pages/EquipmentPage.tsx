import React, { useState } from 'react';
import { Search, MapPin, Calendar, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/shared/CartDrawer';
import { equipment, Equipment } from '@/lib/mockData';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';

const locations = ['All', 'Lagos', 'Kaduna', 'Kano', 'Ogun'];

const EquipmentPage: React.FC = () => {
  const { isAuthenticated, addNotification } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const filteredEquipment = equipment.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation === 'All' || item.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  const handleBooking = (item: Equipment) => {
    setSelectedEquipment(item);
    setStartDate(undefined);
    setEndDate(undefined);
    setBookingModalOpen(true);
  };

  const calculateTotalCost = () => {
    if (!startDate || !endDate || !selectedEquipment) return 0;
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return days * selectedEquipment.pricePerDay;
  };

  const confirmBooking = () => {
    if (!isAuthenticated) {
      toast.error('Please login to book equipment');
      return;
    }

    if (!startDate || !endDate) {
      toast.error('Please select booking dates');
      return;
    }

    toast.success(`Successfully booked ${selectedEquipment?.name}!`);
    addNotification(`Your booking for ${selectedEquipment?.name} has been confirmed`);
    setBookingModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CartDrawer />

      {/* Header */}
      <div className="bg-gradient-to-r from-amber-800 to-amber-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Equipment Renting (ERaaS)</h1>
          <p className="text-amber-100 mt-2">
            Access modern farming equipment on demand. Book tractors, harvesters, and more.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search equipment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-video">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <Badge
                  className={`absolute top-3 right-3 ${
                    item.available ? 'bg-green-600' : 'bg-red-500'
                  }`}
                >
                  {item.available ? 'Available' : 'Booked'}
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <Badge variant="outline" className="mt-1">{item.type}</Badge>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mt-2">{item.description}</p>

                <div className="flex items-center gap-1 mt-3 text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{item.location}</span>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className="text-2xl font-bold text-green-600">
                      ₦{item.pricePerDay.toLocaleString()}
                    </span>
                    <span className="text-gray-500 text-sm">/day</span>
                  </div>
                  <Button
                    onClick={() => handleBooking(item)}
                    disabled={!item.available}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEquipment.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No equipment found matching your criteria</p>
          </div>
        )}

        {/* How It Works */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How Equipment Renting Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Search, title: 'Browse Equipment', desc: 'Find the equipment you need by location and type' },
              { icon: Calendar, title: 'Select Dates', desc: 'Choose your rental period from the availability calendar' },
              { icon: CheckCircle, title: 'Confirm Booking', desc: 'Complete payment and receive confirmation' },
              { icon: Clock, title: 'Equipment Delivered', desc: 'Equipment is delivered to your farm on schedule' },
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-6 w-6 text-amber-700" />
                </div>
                <h3 className="font-semibold text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />

      {/* Booking Modal */}
      <Dialog open={bookingModalOpen} onOpenChange={setBookingModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Book {selectedEquipment?.name}</DialogTitle>
            <DialogDescription>
              Select your rental dates to complete the booking
            </DialogDescription>
          </DialogHeader>

          {selectedEquipment && (
            <div className="space-y-4 py-4">
              <img
                src={selectedEquipment.image}
                alt={selectedEquipment.name}
                className="w-full h-40 object-cover rounded-lg"
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <Calendar className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, 'PPP') : 'Select date'}
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
                        {endDate ? format(endDate, 'PPP') : 'Select date'}
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
                  <span className="text-gray-500">Daily Rate</span>
                  <span className="font-medium">₦{selectedEquipment.pricePerDay.toLocaleString()}</span>
                </div>
                {startDate && endDate && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Duration</span>
                      <span className="font-medium">
                        {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-semibold">Total Cost</span>
                      <span className="font-bold text-green-600">
                        ₦{calculateTotalCost().toLocaleString()}
                      </span>
                    </div>
                  </>
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
              disabled={!startDate || !endDate}
            >
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EquipmentPage;
