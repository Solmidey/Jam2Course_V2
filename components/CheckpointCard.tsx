
import React from 'react';
import { CheckpointPlan } from '../types';
import { DoIcon, ReflectIcon, ApplyIcon } from './Icons';

interface CheckpointCardProps {
  checkpoint: CheckpointPlan['checkpoints'][0];
}

const TASK_DETAILS: Record<CheckpointPlan['checkpoints'][0]['task_type'], { icon: React.ReactNode; color: keyof typeof COLOR_CLASSES }> = {
  Do: {
    icon: <DoIcon />,
    color: 'blue',
  },
  Reflect: {
    icon: <ReflectIcon />,
    color: 'purple',
  },
  Apply: {
    icon: <ApplyIcon />,
    color: 'green',
  },
};

const COLOR_CLASSES = {
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-300',
  },
  purple: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    border: 'border-purple-300',
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-300',
  },
} as const;

const CheckpointCardComponent: React.FC<CheckpointCardProps> = ({ checkpoint }) => {
  const details = TASK_DETAILS[checkpoint.task_type];
  const colors = COLOR_CLASSES[details.color];

  return (
    <div className={`p-4 rounded-lg border-l-4 ${colors.border} ${colors.bg}`}>
        <div className="flex items-start gap-4">
            <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full ${colors.text} bg-white`}>
                {details.icon}
            </div>
            <div>
                <div className="flex items-center gap-3">
                    <span className={`font-bold text-lg ${colors.text}`}>{checkpoint.task_type}</span>
                    <span className="text-xs font-mono bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                        @{checkpoint.at_minute} min
                    </span>
                </div>
                <p className={`mt-1 text-gray-700`}>{checkpoint.instruction}</p>
            </div>
        </div>
    </div>
  );
};

const CheckpointCard = React.memo(CheckpointCardComponent);

export default CheckpointCard;
