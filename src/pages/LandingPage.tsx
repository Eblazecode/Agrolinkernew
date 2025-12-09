import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sprout,
  TreePine,
  Users,
  Tractor,
  Warehouse,
  Truck,
  ShoppingCart,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Globe,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { IMAGES, features, howItWorks, impactStats, farmProjects } from '@/lib/mockData';
import InvestmentCard from '@/components/shared/InvestmentCard';

const iconMap: Record<string, React.ElementType> = {
  Sprout,
  TreePine,
  Users,
  Tractor,
  Warehouse,
  Truck,
  ShoppingCart,
};

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const formatNumber = (num: number): string => {
    if (num >= 1000000000) {
      return `₦${(num / 1000000000).toFixed(1)}B`;
    }
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMAGES.hero}
            alt="African Farmland"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Invest, Grow, Harvest —{' '}
              <span className="text-green-400">The Future of Agriculture in Africa</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-200">
              Connect with verified farmers, invest in sustainable agriculture, and be part of Africa's agricultural revolution. Earn competitive returns while making a real impact.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-lg px-8"
                onClick={() => navigate('/login')}
              >
                Invest Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-lg px-8"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-white/80">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="text-sm">SEC Regulated</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm">Verified Farmers</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Globe className="h-5 w-5 text-green-400" />
                <span className="text-sm">45,000+ Investors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-green-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">
                {formatNumber(impactStats.totalInvested)}
              </p>
              <p className="text-green-100 mt-1">Total Invested</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">
                {impactStats.farmsSupported.toLocaleString()}
              </p>
              <p className="text-green-100 mt-1">Farms Supported</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">
                {formatNumber(impactStats.investorsCount)}
              </p>
              <p className="text-green-100 mt-1">Active Investors</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">
                {formatNumber(impactStats.farmersEmpowered)}
              </p>
              <p className="text-green-100 mt-1">Farmers Empowered</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">
                {formatNumber(impactStats.jobsCreated)}
              </p>
              <p className="text-green-100 mt-1">Jobs Created</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">
                {formatNumber(impactStats.tonsProduced)}
              </p>
              <p className="text-green-100 mt-1">Tons Produced</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Everything You Need for Agricultural Success
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              From investment to logistics, we provide end-to-end solutions for the agricultural value chain.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = iconMap[feature.icon] || Sprout;
              return (
                <Card
                  key={feature.id}
                  className="group hover:shadow-lg transition-shadow cursor-pointer border-gray-200"
                  onClick={() => {
                    const routes: Record<string, string> = {
                      'Farm Invest': '/investor',
                      'Tree Naira': '/tree-naira',
                      'Farm for Me': '/farm-for-me',
                      'Equipment Renting': '/equipment',
                      'Storage-as-a-Service': '/storage',
                      'Logistics-as-a-Service': '/logistics',
                      'Marketplace': '/marketplace',
                    };
                    navigate(routes[feature.title] || '/');
                  }}
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                      <Icon className="h-6 w-6 text-green-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-lg">{feature.title}</h3>
                    <p className="text-gray-600 mt-2 text-sm">{feature.description}</p>
                    <div className="mt-4 flex items-center text-green-600 font-medium text-sm group-hover:text-green-700">
                      Learn more
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={step.step} className="relative">
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-green-200" />
                )}
                <div className="relative bg-white p-6 rounded-xl border border-gray-200 text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{step.step}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-xl">{step.title}</h3>
                  <p className="text-gray-600 mt-2">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Investments */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Featured Investment Opportunities
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Invest in verified farm projects with competitive returns
              </p>
            </div>
            <Button
              variant="outline"
              className="mt-4 md:mt-0"
              onClick={() => navigate('/investor')}
            >
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {farmProjects.slice(0, 3).map((project) => (
              <InvestmentCard
                key={project.id}
                project={project}
                onInvest={() => navigate('/login')}
                onViewDetails={() => navigate('/login')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Why Choose Agrolinker?
              </h2>
              <p className="mt-4 text-amber-100 text-lg">
                We're building the future of agricultural investment in Africa with transparency, security, and impact at our core.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Secure & Regulated</h3>
                    <p className="text-amber-100 mt-1">
                      All investments are secured and regulated by relevant authorities
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Verified Farmers</h3>
                    <p className="text-amber-100 mt-1">
                      Every farmer goes through rigorous verification and due diligence
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Competitive Returns</h3>
                    <p className="text-amber-100 mt-1">
                      Earn 15-35% annual returns on your agricultural investments
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Real Impact</h3>
                    <p className="text-amber-100 mt-1">
                      Your investment directly supports farmers and creates jobs
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src={IMAGES.farms[0]}
                alt="Farming"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Average ROI</p>
                    <p className="text-2xl font-bold text-green-600">25%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to Start Your Agricultural Investment Journey?
          </h2>
          <p className="mt-4 text-lg text-green-100">
            Join thousands of investors already growing their wealth through sustainable agriculture.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8"
              onClick={() => navigate('/login')}
            >
              Create Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg px-8"
              onClick={() => navigate('/marketplace')}
            >
              Browse Marketplace
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
