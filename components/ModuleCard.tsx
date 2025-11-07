
import React, { useMemo } from 'react';
import { CourseOutline, CheckpointPlan } from '../types';
import CheckpointCard from './CheckpointCard';

interface ModuleCardProps {
  module: CourseOutline['modules'][0];
  moduleNumber: number;
  checkpoints: CheckpointPlan['checkpoints'];
}

const ModuleCardComponent: React.FC<ModuleCardProps> = ({ module, moduleNumber, checkpoints }) => {
  const sortedCheckpoints = useMemo(
    () => [...checkpoints].sort((a, b) => a.at_minute - b.at_minute),
    [checkpoints]
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div className="flex items-center gap-4">
                <span className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-brand-light text-brand-primary font-bold text-xl rounded-full">
                    {moduleNumber}
                </span>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{module.title}</h2>
                    <p className="text-sm font-medium text-gray-500">{module.minutes} minutes</p>
                </div>
            </div>
        </div>
        
        <p className="text-gray-600 mb-6">{module.summary}</p>
        
        <div>
          <h4 className="font-semibold text-gray-700 mb-3">Key Points:</h4>
          <ul className="space-y-2">
            {module.key_points.map((point, index) => (
              <li key={index} className="flex items-start">
                <svg className="flex-shrink-0 h-5 w-5 text-brand-secondary mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.293a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {sortedCheckpoints.length > 0 && (
        <div className="bg-gray-50 px-6 sm:px-8 py-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Checkpoints</h3>
          <div className="space-y-4">
            {sortedCheckpoints.map(checkpoint => (
              <CheckpointCard key={checkpoint.at_minute} checkpoint={checkpoint} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ModuleCard = React.memo(ModuleCardComponent);

export default ModuleCard;
