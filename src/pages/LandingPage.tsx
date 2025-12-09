// src/pages/LandingPage.tsx
import React, { useCallback, useEffect, useState } from 'react';
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
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  IMAGES,
  features,
  howItWorks,
  impactStats,
  farmProjects,
} from '@/lib/mockData';
import InvestmentCard from '@/components/shared/InvestmentCard';
import ModernFeaturesAndHowItWorks from '@/components/shared/ModernFeaturesAndHowItWorks';
import AgrolinkrAISection from '@/components/shared/AgroLinkrAISection';

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const iconMap: Record<string, IconComponent> = {
  Sprout,
  TreePine,
  Users,
  Tractor,
  Warehouse,
  Truck,
  ShoppingCart,
};

const formatCurrencyShort = (value: number): string => {
  if (value >= 1_000_000_000) {
    return `₦${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (value >= 1_000_000) {
    return `₦${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `₦${(value / 1_000).toFixed(1)}K`;
  }
  return `₦${value.toString()}`;
};

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const goTo = useCallback(
      (path: string) => {
        navigate(path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      [navigate]
  );

  // Typing effect state and logic (for hero)
  const typingPhrases = [
    'The Future of Agriculture in Africa',
    'Sustainable Farming, Real Returns',
    'Grow Wealth, Empower Farmers',
    'Invest in Trees, Invest in Tomorrow',
  ];
  const [typed, setTyped] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const TYPING_SPEED = 60;
  const DELETING_SPEED = 35;
  const PAUSE_AFTER_FULL = 1400;

  useEffect(() => {
    if (!typingPhrases || typingPhrases.length === 0) return;

    const current = typingPhrases[phraseIndex % typingPhrases.length];
    let timeoutId: number;

    if (!isDeleting) {
      if (typed.length < current.length) {
        timeoutId = window.setTimeout(
            () => setTyped(current.slice(0, typed.length + 1)),
            TYPING_SPEED
        );
      } else {
        timeoutId = window.setTimeout(() => setIsDeleting(true), PAUSE_AFTER_FULL);
      }
    } else {
      if (typed.length > 0) {
        timeoutId = window.setTimeout(
            () => setTyped(current.slice(0, typed.length - 1)),
            DELETING_SPEED
        );
      } else {
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % typingPhrases.length);
      }
    }

    return () => window.clearTimeout(timeoutId);
  }, [typed, isDeleting, phraseIndex]);

  return (
      <div className="min-h-screen bg-white">
        <Navbar />

        {/* Hero Section */}
        <section className="relative overflow-hidden" aria-labelledby="hero-heading">
          <div className="absolute inset-0">
            <img
                src={IMAGES.hero}
                alt="African farmland with farmers and crops"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
            <div className="max-w-2xl">
              <h1
                  id="hero-heading"
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              >
                Invest, Grow, Harvest —{' '}
                <span className="text-green-400 inline-flex items-center">
                <span>{typed}</span>
                <span className="ml-2 text-green-300 typing-caret" aria-hidden>
                  |
                </span>
              </span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-gray-200">
                Connect with verified farmers, invest in sustainable agriculture, and be
                part of Africa's agricultural revolution. Earn competitive returns while
                making a real impact.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-lg px-8"
                    onClick={() => goTo('/login')}
                    aria-label="Invest Now"
                >
                  Invest Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 text-lg px-8"
                    onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                    aria-label="Learn More"
                >
                  Learn More
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="mt-12 flex flex-wrap items-center gap-6" role="list">
                <div className="flex items-center gap-2 text-white/80" role="listitem">
                  <Shield className="h-5 w-5 text-green-400" aria-hidden />
                  <span className="text-sm">Secured & Regulated</span>
                </div>

                <div className="flex items-center gap-2 text-white/80" role="listitem">
                  <CheckCircle className="h-5 w-5 text-green-400" aria-hidden />
                  <span className="text-sm">Verified Farmers</span>
                </div>

                <div className="flex items-center gap-2 text-white/80" role="listitem">
                  <Globe className="h-5 w-5 text-green-400" aria-hidden />
                  <span className="text-sm">45,000+ Investors</span>
                </div>
              </div>
            </div>
          </div>

          {/* Inline caret CSS */}
          <style>{`
          @keyframes blink {
            0%,49% { opacity: 1; }
            50%,100% { opacity: 0; }
          }
          .typing-caret {
            animation: blink 1s step-start infinite;
            font-weight: 700;
            line-height: 0.9;
          }
        `}</style>
        </section>

        {/* Impact Stats */}
        <section className="bg-green-600 py-12" aria-labelledby="impact-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="impact-heading" className="sr-only">
              Impact statistics
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">
                  {formatCurrencyShort(impactStats.totalInvested)}
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
                  {formatCurrencyShort(impactStats.investorsCount)}
                </p>
                <p className="text-green-100 mt-1">Active Investors</p>
              </div>

              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">
                  {formatCurrencyShort(impactStats.farmersEmpowered)}
                </p>
                <p className="text-green-100 mt-1">Farmers Empowered</p>
              </div>

              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">
                  {formatCurrencyShort(impactStats.jobsCreated)}
                </p>
                <p className="text-green-100 mt-1">Jobs Created</p>
              </div>

              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">
                  {formatCurrencyShort(impactStats.tonsProduced)}
                </p>
                <p className="text-green-100 mt-1">Tons Produced</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features & How It Works */}
        <ModernFeaturesAndHowItWorks
            features={features}
            howItWorks={howItWorks}
            onNavigate={(path) => goTo(path)}
        />

        {/* Agrolinkr AI Section */}
        <AgrolinkrAISection onLearnMore={() => goTo('/ai')} onTryDemo={() => goTo('/demo')} />

        {/* Featured Investments */}
        <section className="py-20 bg-gray-50" aria-labelledby="featured-investments-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
              <div>
                <h2 id="featured-investments-heading" className="text-3xl md:text-4xl font-bold text-gray-900">
                  Featured Investment Opportunities
                </h2>
                <p className="mt-4 text-lg text-gray-600">Invest in verified farm projects with competitive returns</p>
              </div>

              <Button variant="outline" className="mt-4 md:mt-0" onClick={() => goTo('/investor')}>
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {farmProjects.slice(0, 3).map((project) => (
                  <InvestmentCard
                      key={project.id}
                      project={project}
                      onInvest={() => goTo('/login')}
                      onViewDetails={() => goTo('/login')}
                  />
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-amber-900 text-white" aria-labelledby="why-choose-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 id="why-choose-heading" className="text-3xl md:text-4xl font-bold">
                  Why Choose Agrolinker?
                </h2>
                <p className="mt-4 text-amber-100 text-lg">
                  We're building the future of agricultural investment in Africa with transparency, security, and impact at our core.
                </p>

                <div className="mt-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="h-5 w-5 text-white" aria-hidden />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Secure & Regulated</h3>
                      <p className="text-amber-100 mt-1">All investments are secured and regulated by relevant authorities</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-white" aria-hidden />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Verified Farmers</h3>
                      <p className="text-amber-100 mt-1">Every farmer goes through rigorous verification and due diligence</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-5 w-5 text-white" aria-hidden />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Competitive Returns</h3>
                      <p className="text-amber-100 mt-1">Earn 15-35% annual returns on your agricultural investments</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Globe className="h-5 w-5 text-white" aria-hidden />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Real Impact</h3>
                      <p className="text-amber-100 mt-1">Your investment directly supports farmers and creates jobs</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img src={IMAGES.farms[0]} alt="Farmers working on a field" className="rounded-2xl shadow-2xl" />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-green-600" aria-hidden />
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
        <section className="py-20 bg-green-600" aria-labelledby="cta-heading">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-white">
              Ready to Start Your Agricultural Investment Journey?
            </h2>
            <p className="mt-4 text-lg text-green-100">
              Join thousands of investors already growing their wealth through sustainable agriculture.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                  size="lg"
                  className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8"
                  onClick={() => goTo('/login')}
              >
                Create Account
              </Button>

              <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 text-lg px-8"
                  onClick={() => goTo('/marketplace')}
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
