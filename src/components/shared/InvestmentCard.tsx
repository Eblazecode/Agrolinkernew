import { useMemo } from 'react';
import { MapPin, TrendingUp, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import type { FarmProject } from '@/lib/mockData';

interface InvestmentCardProps {
  project: FarmProject;
  onInvest?: (project: FarmProject) => void;
  onViewDetails?: (project: FarmProject) => void;
  className?: string;
}

const STATUS_STYLES: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-700',
  live: 'bg-green-100 text-green-700',
  funded: 'bg-blue-100 text-blue-700',
  in_production: 'bg-yellow-100 text-yellow-700',
  harvest: 'bg-purple-100 text-purple-700',
};

const clamp = (v: number, min = 0, max = 100) => Math.min(max, Math.max(min, v));

const formatNaira = (value?: number) =>
    typeof value === 'number' ? `₦${value.toLocaleString()}` : '₦0';

const InvestmentCard: React.FC<InvestmentCardProps> = ({
                                                         project,
                                                         onInvest,
                                                         onViewDetails,
                                                         className = '',
                                                       }) => {
  const progress = useMemo(() => {
    const raised = project.raisedAmount ?? 0;
    const target = project.targetAmount ?? 0;
    if (target <= 0) return 0;
    return clamp((raised / target) * 100);
  }, [project.raisedAmount, project.targetAmount]);

  const isFunded = useMemo(() => {
    const s = project.status ?? '';
    return ['funded', 'in_production', 'harvest'].includes(s);
  }, [project.status]);

  const imageSrc = project.image || '/images/placeholder-farm.jpg';
  const name = project.name || 'Unnamed Project';
  const description = project.description || 'No description provided.';
  const duration = project.duration || 'N/A';
  const farmer = project.farmerName || 'Unknown Farmer';
  const roi = typeof project.roi === 'number' ? `${project.roi}%` : '—';

  return (
      <article
          className={`bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 ${className}`}
          aria-labelledby={`project-${project.id}-title`}
          role="group"
      >
        {/* Image / hero */}
        <div className="relative aspect-video overflow-hidden bg-gray-50">
          <img
              src={imageSrc}
              alt={project.name ?? 'Project image'}
              className="w-full h-full object-cover object-center"
              loading="lazy"
          />

          {/* Status badge */}
          <div className="absolute top-3 left-3">
            <Badge
                className={`${STATUS_STYLES[project.status ?? ''] ?? 'bg-gray-100 text-gray-700'} px-3 py-1`}
                aria-hidden
            >
              {(project.status ?? 'draft').replace('_', ' ').toUpperCase()}
            </Badge>
          </div>

          {/* ROI chip */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg">
            <div className="flex items-center gap-2 text-green-600">
              <TrendingUp className="h-4 w-4" aria-hidden />
              <span className="font-semibold text-sm">{roi} ROI</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          <h3 id={`project-${project.id}-title`} className="font-semibold text-gray-900 text-lg leading-tight">
            {name}
          </h3>

          <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
            <MapPin className="h-4 w-4" aria-hidden />
            <span>{project.location ?? 'Unknown location'}</span>
          </div>

          <p className="text-sm text-gray-600 mt-3 line-clamp-2">{description}</p>

          {/* Mini sparkline + progress */}
          <div className="mt-4 flex items-center gap-4">
            {/* small sparkline (placeholder SVG) */}
            <svg className="w-20 h-8" viewBox="0 0 80 24" aria-hidden>
              <polyline
                  fill="none"
                  stroke="#D1FAE5"
                  strokeWidth="2"
                  points="0,18 12,12 24,8 36,10 48,6 60,4 72,8 80,6"
              />
              <polyline
                  fill="none"
                  stroke="#16A34A"
                  strokeWidth="2"
                  points="0,18 12,12 24,8 36,10 48,6 60,4 72,8 80,6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
              />
            </svg>

            <div className="flex-1">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Raised</span>
                <span className="font-medium text-gray-700">
                {formatNaira(project.raisedAmount)} / {formatNaira(project.targetAmount)}
              </span>
              </div>

              <div className="mt-2">
                <Progress value={progress} className="h-2 rounded-full" />
                <div className="text-xs text-gray-400 mt-1">{progress.toFixed(0)}% funded</div>
              </div>
            </div>
          </div>

          {/* meta */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" aria-hidden />
              <span>{duration}</span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" aria-hidden />
              <span>{farmer}</span>
            </div>
          </div>

          {/* actions */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button
                variant="outline"
                className="w-full"
                onClick={() => onViewDetails?.(project)}
                aria-label={`View details for ${name}`}
            >
              View Details
            </Button>

            <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => onInvest?.(project)}
                disabled={isFunded}
                aria-disabled={isFunded}
                aria-label={isFunded ? `${name} is fully funded` : `Invest in ${name}`}
            >
              {isFunded ? 'Fully Funded' : 'Invest Now'}
            </Button>
          </div>
        </div>
      </article>
  );
};

export default InvestmentCard;
