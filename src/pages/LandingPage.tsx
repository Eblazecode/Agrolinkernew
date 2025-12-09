// src/pages/LandingPage.tsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { IMAGES, features, howItWorks, impactStats, farmProjects } from '@/lib/mockData';
import InvestmentCard from '@/components/shared/InvestmentCard';

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
  if (value >= 1_000_000_000) return `₦${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `₦${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `₦${(value / 1_000).toFixed(1)}K`;
  return `₦${value.toString()}`;
};

const CARD_GAP = 16;

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const goTo = useCallback(
      (p: string) => {
        navigate(p);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      [navigate]
  );

  /* ----------------------------
     HERO: typing effect
     ---------------------------- */
  const typingPhrases = useMemo(
      () => [
        'The Future of Agriculture in Africa',
        'Sustainable Farming, Real Returns',
        'Grow Wealth, Empower Farmers',
        'Invest in Trees, Invest in Tomorrow',
      ],
      []
  );

  const [typed, setTyped] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const TYPING_SPEED = 60;
  const DELETING_SPEED = 35;
  const PAUSE_AFTER_FULL = 1400;

  useEffect(() => {
    if (!typingPhrases.length) return;
    const current = typingPhrases[phraseIndex % typingPhrases.length];
    let t = 0 as unknown as number;

    if (!isDeleting) {
      if (typed.length < current.length) {
        t = window.setTimeout(() => setTyped(current.slice(0, typed.length + 1)), TYPING_SPEED);
      } else {
        t = window.setTimeout(() => setIsDeleting(true), PAUSE_AFTER_FULL);
      }
    } else {
      if (typed.length > 0) {
        t = window.setTimeout(() => setTyped(current.slice(0, typed.length - 1)), DELETING_SPEED);
      } else {
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % typingPhrases.length);
      }
    }

    return () => window.clearTimeout(t);
  }, [typed, isDeleting, phraseIndex, typingPhrases]);

  /* ----------------------------
     FEATURE GRID reveal hook
     ---------------------------- */
  const useReveal = (threshold = 0.12) => {
    const ref = useRef<HTMLElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const obs = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisible(true);
                obs.unobserve(el);
              }
            });
          },
          { threshold }
      );
      obs.observe(el);
      return () => obs.disconnect();
    }, [ref, threshold]);

    return { ref, visible };
  };

  /* ----------------------------
     Featured Investments horizontal scroller
     ---------------------------- */
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () => {
      setCanLeft(el.scrollLeft > 0);
      setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };
    update();
    el.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const scrollBy = (dir: 'left' | 'right') => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    const cardWidth = card ? card.clientWidth : Math.floor(el.clientWidth * 0.8);
    const offset = (cardWidth + CARD_GAP) * (dir === 'left' ? -1 : 1);
    el.scrollBy({ left: offset, behavior: 'smooth' });
  };


  return (

      <div className="min-h-screen bg-white">
        <Navbar />

        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={IMAGES.hero} alt="African farmland" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
            <div className="max-w-2xl">
              <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                Invest, Grow, Harvest —{' '}
                <span className="text-green-400 inline-flex items-center">
                <span>{typed}</span>
                <span className="ml-2 text-green-300 typing-caret" aria-hidden>
                  |
                </span>
              </span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-gray-200">
                Connect with verified farmers, invest in sustainable agriculture, and be part of Africa's agricultural revolution. Earn competitive returns while making a real impact.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8" onClick={() => goTo('/login')}>
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

              <div className="mt-12 flex flex-wrap items-center gap-6" role="list">
                <div className="flex items-center gap-2 text-white/80" role="listitem">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span className="text-sm">Secured & Regulated</span>
                </div>

                <div className="flex items-center gap-2 text-white/80" role="listitem">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm">Verified Farmers</span>
                </div>

                <div className="flex items-center gap-2 text-white/80" role="listitem">
                  <Globe className="h-5 w-5 text-green-400" />
                  <span className="text-sm">45,000+ Investors</span>
                </div>
              </div>
            </div>
          </div>

          <style>{`
          @keyframes blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
          .typing-caret { animation: blink 1s step-start infinite; font-weight:700; line-height:0.9; }
        `}</style>
        </section>

        {/* IMPACT STATS */}
        <section className="bg-green-600 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">{formatCurrencyShort(impactStats.totalInvested)}</p>
                <p className="text-green-100 mt-1">Total Invested</p>
              </div>

              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">{impactStats.farmsSupported.toLocaleString()}</p>
                <p className="text-green-100 mt-1">Farms Supported</p>
              </div>

              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">{formatCurrencyShort(impactStats.investorsCount)}</p>
                <p className="text-green-100 mt-1">Active Investors</p>
              </div>

              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">{formatCurrencyShort(impactStats.farmersEmpowered)}</p>
                <p className="text-green-100 mt-1">Farmers Empowered</p>
              </div>

              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">{formatCurrencyShort(impactStats.jobsCreated)}</p>
                <p className="text-green-100 mt-1">Jobs Created</p>
              </div>

              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">{formatCurrencyShort(impactStats.tonsProduced)}</p>
                <p className="text-green-100 mt-1">Tons Produced</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES (modernized grid) */}
        <section id="features" className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Everything You Need for Agricultural Success</h2>
                <p className="mt-3 text-lg text-gray-600">From investment to logistics — end-to-end solutions that help farmers, investors, and buyers win.</p>
              </div>

              <div className="flex gap-3">
                <Button variant="ghost" className="hidden sm:inline-flex border border-gray-200" onClick={() => goTo('/about')}>Our Mission</Button>
                <Button className="bg-green-600 text-white hover:bg-green-700" onClick={() => goTo('/investor')}>Start Investing</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {features.map((feature) => {
                const Icon = iconMap[feature.icon] ?? Sprout;
                return (
                    <article key={feature.id} className="group bg-white p-5 rounded-2xl border border-gray-100 hover:shadow-xl transition transform hover:-translate-y-1">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-lg grid place-items-center bg-gradient-to-br from-green-50 to-white ring-1 ring-green-100 group-hover:from-green-600 group-hover:to-emerald-600 transition-colors">
                          <div className="p-2 rounded-md bg-white/60 group-hover:bg-transparent">
                            <Icon className="h-6 w-6 text-green-600 group-hover:text-white" />
                          </div>
                        </div>

                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                          <p className="mt-2 text-sm text-gray-600 line-clamp-3">{feature.description}</p>

                          <div className="mt-4 flex items-center gap-3">
                            <Button size="sm" variant="ghost" className="text-green-600 hover:bg-green-50" onClick={() => goTo({
                              'Farm Invest': '/investor',
                              'Tree Naira': '/tree-naira',
                              'Farm for Me': '/farm-for-me',
                              'Equipment Renting': '/equipment',
                              'Storage-as-a-Service': '/storage',
                              'Logistics-as-a-Service': '/logistics',
                              'Marketplace': '/marketplace',
                            }[feature.title] ?? '/')}>
                              Learn more <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>

                            <Button size="sm" className="bg-green-600 text-white hover:bg-green-700" onClick={() => goTo('/investor')}>Explore</Button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                        <span>{feature.category ?? 'Service'}</span>
                        <span>{feature.eta ?? 'Est. time: 3–6 months'}</span>
                      </div>
                    </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* AGROLINKR AI (kept concise) */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Agrolinkr AI — Smarter Farming, Better Returns</h2>
              <p className="mt-4 text-lg text-gray-600">Satellite, weather, and market data combined to give farmers and investors actionable insights — yield forecasts, pest alerts, logistics routing, and pricing signals.</p>

              <div className="mt-6 flex gap-3">
                <Button className="bg-emerald-600 text-white hover:bg-emerald-700" onClick={() => goTo('/demo')}>See AI demo</Button>
                <Button variant="outline" className="border-emerald-200" onClick={() => goTo('/ai')}>Learn more</Button>
              </div>

              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                <li className="flex items-start gap-2"><TrendingUp className="h-4 w-4 text-emerald-600 mt-1" /> Predictive yields & ROI</li>
                <li className="flex items-start gap-2"><Tractor className="h-4 w-4 text-emerald-600 mt-1" /> Smart operations schedules</li>
                <li className="flex items-start gap-2"><Warehouse className="h-4 w-4 text-emerald-600 mt-1" /> Storage & spoilage recommendations</li>
                <li className="flex items-start gap-2"><Users className="h-4 w-4 text-emerald-600 mt-1" /> Farmer credibility scoring</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <article className="rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-semibold text-lg">For Farmers</h3>
                <p className="text-sm text-gray-600 mt-2">Crop health alerts, photo diagnostics, and task scheduling to boost yields.</p>
              </article>

              <article className="rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-semibold text-lg">For Investors</h3>
                <p className="text-sm text-gray-600 mt-2">Data-driven scoring, risk analytics and yield forecasts for smarter portfolios.</p>
              </article>
            </div>
          </div>
        </section>

        {/* FEATURED INVESTMENTS — horizontal carousel */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Featured Investment Opportunities</h2>
                <p className="mt-2 text-lg text-gray-600">Hand-picked, verified farm projects with competitive returns.</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2">
                  <button onClick={() => scrollBy('left')} aria-label="scroll left" className="p-2 rounded-md bg-white border shadow-sm">
                    <ChevronLeft className="h-5 w-5 text-gray-700" />
                  </button>
                  <button onClick={() => scrollBy('right')} aria-label="scroll right" className="p-2 rounded-md bg-white border shadow-sm">
                    <ChevronRight className="h-5 w-5 text-gray-700" />
                  </button>
                </div>

                <Button variant="outline" onClick={() => goTo('/investor')}>View All Projects <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
            </div>

            <div
                ref={scrollerRef}
                className="relative -mx-4 px-4 overflow-x-auto scroll-smooth snap-x snap-mandatory flex gap-4 touch-pan-x"
                role="list"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowRight') scrollBy('right');
                  if (e.key === 'ArrowLeft') scrollBy('left');
                }}
            >
              {farmProjects.slice(0, 6).map((p) => (
                  <article key={p.id} data-card className="snap-start flex-shrink-0 w-[320px] sm:w-[360px] md:w-[420px] bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition">
                    <div className="relative h-44 w-full overflow-hidden rounded-t-2xl">
                      <img src={p.image} alt={p.title ?? p.name} className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-sm font-medium">{p.fundingProgress ?? 0}% funded</div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{p.title ?? p.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">{p.location}</p>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-gray-500">Est. ROI</p>
                          <p className="text-lg font-bold text-green-600">{p.estimatedROI ?? p.roi ?? '—'}%</p>
                        </div>
                      </div>

                      <p className="mt-3 text-sm text-gray-600 line-clamp-3">{p.summary ?? p.description}</p>

                      <div className="mt-4">
                        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                          <div className="h-3 bg-green-600" style={{ width: `${p.fundingProgress ?? 0}%` }} />
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                          <span>{p.amountRaisedFormatted ?? `₦${(p.raisedAmount ?? 0).toLocaleString()}`}</span>
                          <span>{p.daysLeft ?? '—'} days left</span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2">
                        <button onClick={() => goTo('/login')} className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700">Invest</button>
                        <button onClick={() => goTo('/login')} className="py-2 px-3 rounded-lg border border-gray-200 text-sm">Details</button>
                      </div>
                    </div>
                  </article>
              ))}
            </div>

            <p className="mt-4 text-sm text-center text-gray-500">Swipe horizontally to see more opportunities</p>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-20 bg-amber-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold">Why Choose Agrolinker?</h2>
                <p className="mt-4 text-amber-100 text-lg">We're building the future of agricultural investment in Africa with transparency, security, and impact at our core.</p>

                <div className="mt-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-600 rounded-lg grid place-items-center">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Secure & Regulated</h3>
                      <p className="text-amber-100 mt-1">All investments are secured and regulated by relevant authorities</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-600 rounded-lg grid place-items-center">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Verified Farmers</h3>
                      <p className="text-amber-100 mt-1">Every farmer goes through rigorous verification and due diligence</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-600 rounded-lg grid place-items-center">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Competitive Returns</h3>
                      <p className="text-amber-100 mt-1">Earn 15-35% annual returns on your agricultural investments</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-600 rounded-lg grid place-items-center">
                      <Globe className="h-5 w-5 text-white" />
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
                    <div className="w-12 h-12 bg-green-100 rounded-full grid place-items-center">
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

        {/* CTA */}
        <section className="py-20 bg-green-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Start Your Agricultural Investment Journey?</h2>
            <p className="mt-4 text-lg text-green-100">Join thousands of investors already growing their wealth through sustainable agriculture.</p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8" onClick={() => goTo('/login')}>Create Account</Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8" onClick={() => goTo('/marketplace')}>Browse Marketplace</Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
  );
};

export default LandingPage;
