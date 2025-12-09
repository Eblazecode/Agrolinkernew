// ModernFeaturesAndHowItWorks.tsx
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Feature, Step } from '@/lib/mockData'; // adjust types to your project
import { iconMap } from '@/lib/iconMap'; // if you centralized iconMap; otherwise import icons directly

type Props = {
    features: Feature[];
    howItWorks: Step[];
    onNavigate: (path: string) => void;
};

const useReveal = (options?: IntersectionObserverInit) => {
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
            { threshold: 0.12, ...options }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [ref, options]);

    return { ref, visible };
};

const FeatureCard: React.FC<{ feature: Feature; onOpen: (title: string) => void }> = ({ feature, onOpen }) => {
    const Icon = (iconMap as Record<string, React.ComponentType<any>>)[feature.icon] ?? iconMap.Sprout;
    const { ref, visible } = useReveal();

    return (
        <article
            ref={ref as any}
            className={`group transform transition duration-500 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
      `}
            aria-labelledby={`feature-${feature.id}`}
        >
            <Card className="h-full border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-transform">
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        <div
                            className="flex-shrink-0 rounded-lg w-14 h-14 grid place-items-center
              bg-gradient-to-br from-green-50 to-white ring-1 ring-green-100
              group-hover:from-green-600 group-hover:to-emerald-600 transition-colors"
                        >
                            <div className="p-2 rounded-md bg-white/60 group-hover:bg-transparent">
                                <Icon className="h-6 w-6 text-green-600 group-hover:text-white transition-colors" aria-hidden />
                            </div>
                        </div>

                        <div className="flex-1">
                            <h3 id={`feature-${feature.id}`} className="text-lg font-semibold text-gray-900">
                                {feature.title}
                            </h3>
                            <p className="mt-2 text-sm text-gray-600 line-clamp-3">{feature.description}</p>

                            <div className="mt-4 flex items-center gap-3">
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-green-600 hover:bg-green-50"
                                    onClick={() => onOpen(feature.title)}
                                    aria-label={`Open ${feature.title}`}
                                >
                                    Learn more
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>

                                <Button
                                    size="sm"
                                    className="bg-green-600 text-white hover:bg-green-700"
                                    onClick={() => onOpen(feature.title)}
                                    aria-label={`Explore ${feature.title}`}
                                >
                                    Explore
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* subtle footer metadata */}
                    <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                        <span>{feature.category ?? 'Service'}</span>
                        <span>{feature.eta ?? 'Est. time: 3–6 months'}</span>
                    </div>
                </CardContent>
            </Card>
        </article>
    );
};

const StepCard: React.FC<{ step: Step; index: number; isLast: boolean }> = ({ step, index, isLast }) => {
    const { ref, visible } = useReveal();
    return (
        <div
            ref={ref as any}
            className={`relative transform transition duration-500 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
            <div className="relative bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                <div className="mx-auto w-18 h-18 rounded-full bg-gradient-to-br from-emerald-600 to-green-400 grid place-items-center text-white text-xl font-bold mb-4">
                    {index + 1}
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{step.title}</h4>
                <p className="mt-3 text-sm text-gray-600">{step.description}</p>

                {!isLast && (
                    <div className="hidden md:block absolute right-[-50%] top-1/2 transform -translate-y-1/2 w-[120%] h-px bg-gradient-to-r from-green-200 to-transparent" aria-hidden />
                )}
            </div>
        </div>
    );
};

const ModernFeaturesAndHowItWorks: React.FC<Props> = ({ features, howItWorks, onNavigate }) => {
    const openFeature = (title: string) => {
        const routes: Record<string, string> = {
            'Farm Invest': '/investor',
            'Tree Naira': '/tree-naira',
            'Farm for Me': '/farm-for-me',
            'Equipment Renting': '/equipment',
            'Storage-as-a-Service': '/storage',
            'Logistics-as-a-Service': '/logistics',
            'Marketplace': '/marketplace',
        };
        const path = routes[title] ?? '/';
        onNavigate(path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {/* Features Grid */}
            <section id="features" className="py-20 bg-gradient-to-b from-white to-gray-50" aria-labelledby="features-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">
                        <div className="max-w-2xl">
                            <h2 id="features-heading" className="text-3xl md:text-4xl font-extrabold text-gray-900">
                                Everything You Need for Agricultural Success
                            </h2>
                            <p className="mt-3 text-lg text-gray-600">
                                From investment to logistics — end-to-end solutions that help farmers, investors, and buyers win.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <Button variant="ghost" className="hidden sm:inline-flex border border-gray-200" onClick={() => onNavigate('/about')}>
                                Learn about our mission
                            </Button>

                            <Button className="bg-green-600 text-white hover:bg-green-700" onClick={() => onNavigate('/investor')}>
                                Start Investing
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {features.map((f) => (
                            <FeatureCard key={f.id} feature={f} onOpen={openFeature} />
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-white" aria-labelledby="howitworks-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 id="howitworks-heading" className="text-3xl md:text-4xl font-extrabold text-gray-900">
                            How It Works
                        </h2>
                        <p className="mt-3 text-lg text-gray-600">Get started in three simple steps — transparent, secure, and impactful.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {howItWorks.map((step, i) => (
                            <StepCard key={step.step} step={step} index={i} isLast={i === howItWorks.length - 1} />
                        ))}
                    </div>

                    <div className="mt-10 text-center">
                        <Button className="bg-green-600 text-white hover:bg-green-700" onClick={() => onNavigate('/get-started')}>
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ModernFeaturesAndHowItWorks;
