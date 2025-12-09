import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sprout,
  Wallet,
  TrendingUp,
  Package,
  Plus,
  Upload,
  X,
  Eye,
  Edit,
  MoreHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatsCard from '@/components/shared/StatsCard';
import { useStore } from '@/store/useStore';
import { farmProjects, IMAGES } from '@/lib/mockData';
import { toast } from 'sonner';

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-700',
  live: 'bg-green-100 text-green-700',
  funded: 'bg-blue-100 text-blue-700',
  in_production: 'bg-yellow-100 text-yellow-700',
  harvest: 'bg-purple-100 text-purple-700',
};

const FarmerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { walletBalance, addNotification } = useStore();
  const [fundingModalOpen, setFundingModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    farmName: '',
    cropType: '',
    location: '',
    targetAmount: '',
    duration: '',
    roi: '',
    description: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const myFarms = farmProjects; // In real app, filter by farmer ID

  const totalFunded = myFarms
    .filter(f => f.status !== 'draft' && f.status !== 'live')
    .reduce((sum, f) => sum + f.raisedAmount, 0);

  const activeFarms = myFarms.filter(f => f.status === 'in_production' || f.status === 'funded').length;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.farmName.trim()) errors.farmName = 'Farm name is required';
    if (!formData.cropType) errors.cropType = 'Crop type is required';
    if (!formData.location.trim()) errors.location = 'Location is required';
    if (!formData.targetAmount || parseInt(formData.targetAmount) < 100000) {
      errors.targetAmount = 'Minimum target amount is ₦100,000';
    }
    if (!formData.duration) errors.duration = 'Duration is required';
    if (!formData.roi || parseInt(formData.roi) < 10 || parseInt(formData.roi) > 50) {
      errors.roi = 'ROI must be between 10% and 50%';
    }
    if (!formData.description.trim() || formData.description.length < 50) {
      errors.description = 'Description must be at least 50 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitFunding = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }

    // Mock submission
    toast.success('Funding request submitted successfully! It will be reviewed within 48 hours.');
    addNotification('Your funding request has been submitted for review');
    setFundingModalOpen(false);
    setFormData({
      farmName: '',
      cropType: '',
      location: '',
      targetAmount: '',
      duration: '',
      roi: '',
      description: '',
    });
    setImagePreview(null);
  };

  return (
    <DashboardLayout userRole="farmer">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Farmer Dashboard</h1>
            <p className="text-gray-500">Manage your farms and funding requests</p>
          </div>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={() => setFundingModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Request Funding
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Funded"
            value={`₦${totalFunded.toLocaleString()}`}
            icon={<Wallet className="h-6 w-6 text-green-600" />}
            change={{ value: 15.3, type: 'increase' }}
            iconBgColor="bg-green-100"
          />
          <StatsCard
            title="Active Farms"
            value={activeFarms}
            icon={<Sprout className="h-6 w-6 text-blue-600" />}
            iconBgColor="bg-blue-100"
          />
          <StatsCard
            title="Total Farms"
            value={myFarms.length}
            icon={<TrendingUp className="h-6 w-6 text-amber-600" />}
            iconBgColor="bg-amber-100"
          />
          <StatsCard
            title="Marketplace Listings"
            value="8"
            icon={<Package className="h-6 w-6 text-purple-600" />}
            iconBgColor="bg-purple-100"
          />
        </div>

        {/* My Farms Grid */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">My Farms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myFarms.map((farm) => (
              <Card key={farm.id} className="overflow-hidden">
                <div className="relative aspect-video">
                  <img
                    src={farm.image}
                    alt={farm.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className={`absolute top-3 left-3 ${statusColors[farm.status]}`}>
                    {farm.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900">{farm.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{farm.location}</p>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Target</span>
                      <span className="font-medium">₦{farm.targetAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Raised</span>
                      <span className="font-medium text-green-600">
                        ₦{farm.raisedAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${(farm.raisedAmount / farm.targetAmount) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Progress
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/storage')}
          >
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Storage Services</h3>
                <p className="text-sm text-gray-500">Book storage for your produce</p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/logistics')}
          >
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold">Logistics</h3>
                <p className="text-sm text-gray-500">Request pickup and delivery</p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/marketplace')}
          >
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Sprout className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Marketplace</h3>
                <p className="text-sm text-gray-500">List your produce for sale</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Funding Request Modal */}
      <Dialog open={fundingModalOpen} onOpenChange={setFundingModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Request Funding for Your Farm</DialogTitle>
            <DialogDescription>
              Fill in the details below to submit your farm for investor funding.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitFunding} className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="farmName">Farm Name *</Label>
                <Input
                  id="farmName"
                  placeholder="e.g., Green Valley Cassava Farm"
                  value={formData.farmName}
                  onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                />
                {formErrors.farmName && (
                  <p className="text-sm text-red-500">{formErrors.farmName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cropType">Crop Type *</Label>
                <Select
                  value={formData.cropType}
                  onValueChange={(value) => setFormData({ ...formData, cropType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cassava">Cassava</SelectItem>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="maize">Maize</SelectItem>
                    <SelectItem value="tomato">Tomato</SelectItem>
                    <SelectItem value="yam">Yam</SelectItem>
                    <SelectItem value="pepper">Pepper</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {formErrors.cropType && (
                  <p className="text-sm text-red-500">{formErrors.cropType}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g., Ogun State"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
                {formErrors.location && (
                  <p className="text-sm text-red-500">{formErrors.location}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetAmount">Target Amount (₦) *</Label>
                <Input
                  id="targetAmount"
                  type="number"
                  placeholder="e.g., 5000000"
                  value={formData.targetAmount}
                  onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                />
                {formErrors.targetAmount && (
                  <p className="text-sm text-red-500">{formErrors.targetAmount}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration *</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) => setFormData({ ...formData, duration: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3 months">3 months</SelectItem>
                    <SelectItem value="6 months">6 months</SelectItem>
                    <SelectItem value="9 months">9 months</SelectItem>
                    <SelectItem value="12 months">12 months</SelectItem>
                  </SelectContent>
                </Select>
                {formErrors.duration && (
                  <p className="text-sm text-red-500">{formErrors.duration}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="roi">Expected ROI (%) *</Label>
                <Input
                  id="roi"
                  type="number"
                  placeholder="e.g., 25"
                  value={formData.roi}
                  onChange={(e) => setFormData({ ...formData, roi: e.target.value })}
                  min={10}
                  max={50}
                />
                {formErrors.roi && (
                  <p className="text-sm text-red-500">{formErrors.roi}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your farm, farming methods, expected yield, and why investors should fund this project..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
              {formErrors.description && (
                <p className="text-sm text-red-500">{formErrors.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Farm Images</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {imagePreview ? (
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-40 rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6"
                      onClick={() => setImagePreview(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  style={{ position: 'relative' }}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setFundingModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Submit Request
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default FarmerDashboard;
