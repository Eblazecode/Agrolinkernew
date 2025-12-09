import React from 'react';
import { MapPin, TrendingUp, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FarmProject } from '@/lib/mockData';

interface InvestmentCardProps {
  project: FarmProject;
  onInvest?: (project: FarmProject) => void;
  onViewDetails?: (project: FarmProject) => void;
}

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-700',
  live: 'bg-green-100 text-green-700',
  funded: 'bg-blue-100 text-blue-700',
  in_production: 'bg-yellow-100 text-yellow-700',
  harvest: 'bg-purple-100 text-purple-700',
};

const InvestmentCard: React.FC<InvestmentCardProps> = ({ project, onInvest, onViewDetails }) => {
  const progress = (project.raisedAmount / project.targetAmount) * 100;
  const isFunded = project.status === 'funded' || project.status === 'in_production' || project.status === 'harvest';

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover"
        />
        <Badge className={`absolute top-3 left-3 ${statusColors[project.status] || 'bg-gray-100 text-gray-700'}`}>
          {project.status.replace('_', ' ').toUpperCase()}
        </Badge>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
          <div className="flex items-center gap-1 text-green-600">
            <TrendingUp className="h-4 w-4" />
            <span className="font-bold">{project.roi}% ROI</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-lg">{project.name}</h3>
        
        <div className="flex items-center gap-1 mt-1 text-gray-500">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{project.location}</span>
        </div>

        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{project.description}</p>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">Raised</span>
            <span className="font-medium">
              ₦{project.raisedAmount.toLocaleString()} / ₦{project.targetAmount.toLocaleString()}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-gray-400 mt-1">{progress.toFixed(0)}% funded</p>
        </div>

        {/* Details */}
        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{project.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{project.farmerName}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onViewDetails?.(project)}
          >
            View Details
          </Button>
          <Button
            className="flex-1 bg-green-600 hover:bg-green-700"
            disabled={isFunded}
            onClick={() => onInvest?.(project)}
          >
            {isFunded ? 'Fully Funded' : 'Invest Now'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCard;
