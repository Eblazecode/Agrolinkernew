import React, { useState } from 'react';
import { Users, MapPin, Star, CheckCircle, ArrowRight, ArrowLeft, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/shared/CartDrawer';
import { IMAGES } from '@/lib/mockData';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';

// Mock farmers
const vettedFarmers = [
  { id: '1', name: 'Adamu Ibrahim', location: 'Kaduna', rating: 4.8, farms: 12, experience: '8 years', image: IMAGES.farms[0], specialties: ['Maize', 'Rice', 'Sorghum'] },
  { id: '2', name: 'Chioma Eze', location: 'Ogun', rating: 4.9, farms: 18, experience: '10 years', image: IMAGES.farms[1], specialties: ['Cassava', 'Yam', 'Vegetables'] },
  { id: '3', name: 'Musa Bello', location: 'Kano', rating: 4.7, farms: 15, experience: '12 years', image: IMAGES.farms[2], specialties: ['Rice', 'Wheat', 'Tomatoes'] },
];

// Mock progress timeline
const progressTimeline = [
  { date: '2024-01-15', title: 'Land Preparation', description: 'Clearing and tilling completed', image: IMAGES.farms[0], completed: true },
  { date: '2024-02-01', title: 'Planting', description: 'Seeds planted across 5 hectares', image: IMAGES.farms[1], completed: true },
  { date: '2024-03-15', title: 'First Weeding', description: 'Weeding and fertilizer application', image: IMAGES.farms[2], completed: true },
  { date: '2024-05-01', title: 'Growth Phase', description: 'Crops growing well, pest control applied', image: IMAGES.farms[3], completed: false },
  { date: '2024-07-01', title: 'Harvest', description: 'Expected harvest date', image: IMAGES.farms[4], completed: false },
];

const FarmForMePage: React.FC = () => {
  const { isAuthenticated, addNotification } = useStore();
  const [step, setStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState<typeof vettedFarmers[0] | null>(null);

  // Wizard form state
  const [formData, setFormData] = useState({
    farmSize: '',
    crop: '',
    location: '',
    managementLevel: '',
  });

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSelectFarmer = (farmer: typeof vettedFarmers[0]) => {
    setSelectedFarmer(farmer);
  };

  const handleConfirmContract = () => {
    if (!isAuthenticated) {
      toast.error('Please login to continue');
      return;
    }

    toast.success(`Contract created with ${selectedFarmer?.name}!`);
    addNotification(`Your Farm for Me contract has been created`);
    setShowTracking(true);
  };

  const canProceed = () => {
    switch (step) {
      case 1: return !!formData.farmSize;
      case 2: return !!formData.crop;
      case 3: return !!formData.location;
      case 4: return !!formData.managementLevel;
      default: return false;
    }
  };

  // Show tracking view
  if (showTracking) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <CartDrawer />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button variant="ghost" onClick={() => setShowTracking(false)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Farm Progress Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Farmer Info */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-6">
                <img
                  src={selectedFarmer?.image}
                  alt={selectedFarmer?.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{selectedFarmer?.name}</h3>
                  <p className="text-sm text-gray-500">{selectedFarmer?.location}</p>
                </div>
                <Badge className="ml-auto bg-green-100 text-green-700">Active Contract</Badge>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Overall Progress</span>
                  <span className="font-medium">60%</span>
                </div>
                <Progress value={60} className="h-3" />
              </div>

              {/* Timeline */}
              <div className="space-y-6">
                {progressTimeline.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          item.completed ? 'bg-green-600' : 'bg-gray-300'
                        }`}
                      />
                      {idx < progressTimeline.length - 1 && (
                        <div className={`w-0.5 flex-1 ${item.completed ? 'bg-green-600' : 'bg-gray-200'}`} />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-gray-500">{item.date}</p>
                          <h4 className={`font-semibold ${item.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                            {item.title}
                          </h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        {item.completed && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                      {item.completed && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="mt-3 w-full max-w-sm h-40 object-cover rounded-lg"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    );
  }

  // Show results view
  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <CartDrawer />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button variant="ghost" onClick={() => setShowResults(false)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Wizard
          </Button>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Matched Farmers</h2>
          <p className="text-gray-500 mb-6">
            Based on your requirements, we found {vettedFarmers.length} vetted farmers
          </p>

          <div className="space-y-4">
            {vettedFarmers.map((farmer) => (
              <Card
                key={farmer.id}
                className={`cursor-pointer transition-all ${
                  selectedFarmer?.id === farmer.id ? 'ring-2 ring-green-600' : ''
                }`}
                onClick={() => handleSelectFarmer(farmer)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={farmer.image}
                      alt={farmer.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{farmer.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <MapPin className="h-4 w-4" />
                            {farmer.location}
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
                <div>
                  <p className="text-gray-500">Farm Size</p>
                  <p className="font-medium">{formData.farmSize}</p>
                </div>
                <div>
                  <p className="text-gray-500">Crop</p>
                  <p className="font-medium">{formData.crop}</p>
                </div>
                <div>
                  <p className="text-gray-500">Location</p>
                  <p className="font-medium">{formData.location}</p>
                </div>
                <div>
                  <p className="text-gray-500">Management</p>
                  <p className="font-medium">{formData.managementLevel}</p>
                </div>
              </div>
              <Button
                className="w-full mt-4 bg-green-600 hover:bg-green-700"
                onClick={handleConfirmContract}
              >
                Confirm Contract with {selectedFarmer.name}
              </Button>
            </div>
          )}
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CartDrawer />

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
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  s <= step ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {s}
              </div>
              {s < 4 && (
                <div className={`w-16 md:w-24 h-1 ${s < step ? 'bg-green-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Wizard Steps */}
        <Card>
          <CardContent className="p-6">
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Select Farm Size</h2>
                <p className="text-gray-500">How much land do you want to farm?</p>
                <RadioGroup
                  value={formData.farmSize}
                  onValueChange={(value) => setFormData({ ...formData, farmSize: value })}
                  className="space-y-3"
                >
                  {['1 Hectare', '2 Hectares', '5 Hectares', '10 Hectares', '20+ Hectares'].map((size) => (
                    <div key={size} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value={size} id={size} />
                      <Label htmlFor={size} className="flex-1 cursor-pointer">{size}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Select Crop</h2>
                <p className="text-gray-500">What would you like to grow?</p>
                <RadioGroup
                  value={formData.crop}
                  onValueChange={(value) => setFormData({ ...formData, crop: value })}
                  className="space-y-3"
                >
                  {['Cassava', 'Rice', 'Maize', 'Tomatoes', 'Yam', 'Soybeans'].map((crop) => (
                    <div key={crop} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value={crop} id={crop} />
                      <Label htmlFor={crop} className="flex-1 cursor-pointer">{crop}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Select Location</h2>
                <p className="text-gray-500">Where should the farm be located?</p>
                <Select
                  value={formData.location}
                  onValueChange={(value) => setFormData({ ...formData, location: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    {['Kaduna', 'Kano', 'Ogun', 'Oyo', 'Benue', 'Plateau', 'Kebbi', 'Niger'].map((loc) => (
                      <SelectItem key={loc} value={loc}>{loc} State</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Management Level</h2>
                <p className="text-gray-500">How involved do you want to be?</p>
                <RadioGroup
                  value={formData.managementLevel}
                  onValueChange={(value) => setFormData({ ...formData, managementLevel: value })}
                  className="space-y-3"
                >
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
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-green-600 hover:bg-green-700"
              >
                {step === 4 ? 'Find Farmers' : 'Next'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default FarmForMePage;
