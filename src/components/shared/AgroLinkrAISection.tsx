// components/AgrolinkrAISection.tsx
import React from 'react';
import {
    Cpu,
    BarChart2,
    MapPin,
    Users,
    Tractor,
    Leaf,
    Camera,
    Shield,
    Loader2,
    Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
    onLearnMore?: () => void;
    onTryDemo?: () => void;
};

const FeaturePill: React.FC<{ icon: React.ComponentType<any>; title: string; desc: string }> = ({ icon: Icon, title, desc }) => (
    <div className="flex gap-4 items-start">
    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-50 to-white grid place-items-center ring-1 ring-emerald-100">
    <Icon className="h-6 w-6 text-emerald-600" aria-hidden />
</div>
<div>
<h4 className="text-sm font-semibold text-gray-900">{title}</h4>
    <p className="mt-1 text-sm text-gray-600">{desc}</p>
    </div>
    </div>
);

const AgrolinkrAISection: React.FC<Props> = ({ onLearnMore, onTryDemo }) => {
    return (
        <section className="py-20 bg-white" aria-labelledby="agrolinkr-ai-heading">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
    {/* Left: Intro + CTAs */}
    <div>
    <h2 id="agrolinkr-ai-heading" className="text-3xl md:text-4xl font-extrabold text-gray-900">
        Agrolinkr AI — Smarter Farming, Better Returns
    </h2>

    <p className="mt-4 text-lg text-gray-600 max-w-2xl">
        Agrolinkr AI combines satellite imagery, local weather, farm telemetry, and market data to deliver actionable insights — so farmers grow more, investors make smarter choices, and everyone in the value chain wins.
    </p>

    <div className="mt-6 flex flex-col sm:flex-row gap-3">
    <Button className="bg-emerald-600 text-white hover:bg-emerald-700" onClick={onTryDemo}>
        Try the AI demo
    </Button>
    <Button variant="outline" className="border-emerald-200" onClick={onLearnMore}>
        Learn more
    </Button>
    </div>

    {/* quick bullets */}
    <ul className="mt-6 space-y-3">
    <li className="flex items-start gap-3 text-sm text-gray-700">
    <Loader2 className="h-4 w-4 text-emerald-500 mt-1" aria-hidden />
    Real-time farm health monitoring & alerts.
    </li>
    <li className="flex items-start gap-3 text-sm text-gray-700">
    <BarChart2 className="h-4 w-4 text-emerald-500 mt-1" aria-hidden />
    Predictive yields & ROI estimation for smarter investments.
    </li>
    <li className="flex items-start gap-3 text-sm text-gray-700">
    <MapPin className="h-4 w-4 text-emerald-500 mt-1" aria-hidden />
    Data-driven logistics and storage suggestions to reduce spoilage.
    </li>
    </ul>
    </div>

    {/* Right: Cards for Farmers, Investors, Anyone */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Farmer card */}
        <article className="p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
    <div className="flex items-center justify-between">
    <h3 className="text-lg font-semibold text-gray-900">For Farmers</h3>
    <BadgeMini text="Field-level" />
        </div>

        <p className="mt-3 text-sm text-gray-600">
        Practical insights and step-by-step guidance to improve yield, reduce input waste, and get better market access.
    </p>

    <div className="mt-4 space-y-3">
    <FeaturePill
        icon={Tractor}
    title="Smart Operations"
    desc="Automated task schedules (planting, fertiliser, spray) based on weather and pest risk."
    />
    <FeaturePill
        icon={Leaf}
    title="Crop Health Alerts"
    desc="Early detection of stress or disease using satellite + field photos."
    />
    <FeaturePill
        icon={Camera}
    title="Photo Diagnostics"
    desc="Upload farm photos and get AI-backed quality and defect detection."
        />
        </div>
        </article>

    {/* Investor card */}
    <article className="p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
    <div className="flex items-center justify-between">
    <h3 className="text-lg font-semibold text-gray-900">For Investors</h3>
    <BadgeMini text="Portfolio" />
        </div>

        <p className="mt-3 text-sm text-gray-600">
        Data-driven project scoring and risk signals so you invest with confidence and choose the right farms or tree portfolios.
    </p>

    <div className="mt-4 space-y-3">
    <FeaturePill
        icon={BarChart2}
    title="Yield Forecasts"
    desc="Projected yields and cashflow timelines per project and per season."
    />
    <FeaturePill
        icon={Shield}
    title="Risk Analytics"
    desc="Climate & market risk scoring and insurance recommendation engines."
    />
    <FeaturePill
        icon={Users}
    title="Farmer Credibility Score"
    desc="Combine historical performance, verification, and on-field signals into a single trust score."
        />
        </div>
        </article>

    {/* Anyone card */}
    <article className="p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition sm:col-span-2">
    <div className="flex items-center justify-between">
    <h3 className="text-lg font-semibold text-gray-900">How Agrolinkr AI helps everyone</h3>
    <BadgeMini text="Ecosystem" />
        </div>

        <p className="mt-3 text-sm text-gray-600">
        From consumers to logistics teams, Agrolinkr AI suggests practical actions to reduce waste, lower costs, and improve food quality.
    </p>

    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
    <FeaturePill
        icon={MapPin}
    title="Optimised Routes"
    desc="Batch pickups and dynamic routing to lower transport costs and delivery times."
    />
    <FeaturePill
        icon={Cpu}
    title="Dynamic Pricing"
    desc="Price suggestions based on supply, demand, and spoilage risk to maximise revenue."
    />
    <FeaturePill
        icon={Mail}
    title="Smart Notifications"
    desc="Targeted alerts for harvest windows, storage warnings, and buyer demands."
    />
    <FeaturePill
        icon={Shield}
    title="Compliance & Traceability"
    desc="Immutable logs for audits, certification, and export paperwork."
        />
        </div>

        <div className="mt-6 flex gap-3">
    <Button variant="ghost" className="border border-gray-200" onClick={onLearnMore}>
        AI Ethics & Data Privacy
    </Button>
    <Button className="bg-emerald-600 text-white hover:bg-emerald-700" onClick={onTryDemo}>
        See AI in action
    </Button>
    </div>
    </article>
    </div>
    </div>

    {/* optional small print */}
    <p className="mt-8 text-xs text-gray-400 max-w-2xl">
        Agrolinkr AI: combines public satellite imagery, anonymised farm telemetry, and marketplace signals. Models are tested for local relevance — users always decide the final action. Learn about our privacy & consent practices.
    </p>
    </div>
    </section>
);
};

export default AgrolinkrAISection;

/* small badge helper below */
const BadgeMini: React.FC<{ text: string }> = ({ text }) => (
    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
        {text}
        </span>
);
