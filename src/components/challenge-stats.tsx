'use client';

import { useChallenge } from '@/contexts/challenge-context';
import { Calendar, Flame, Target, TrendingUp } from 'lucide-react';
import { cn } from '@/utils/cn';

export function ChallengeStats() {
  const { challengeData } = useChallenge();

  if (!challengeData) return null;

  const { stats } = challengeData;

  const statItems = [
    {
      icon: Calendar,
      label: 'Day',
      value: `${stats.currentDay}/${stats.totalDays}`,
      color: 'text-blue-600'
    },
    {
      icon: Flame,
      label: 'Streak',
      value: stats.streak,
      color: 'text-orange-600'
    },
    {
      icon: Target,
      label: 'Completed',
      value: stats.completedDays,
      color: 'text-green-600'
    },
    {
      icon: TrendingUp,
      label: 'Success Rate',
      value: `${stats.successRate}%`,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Challenge Progress</h2>

      <div className="grid grid-cols-2 gap-4">
        {statItems.map((item) => (
          <div key={item.label} className="text-center">
            <div className={cn('flex justify-center mb-2')}>
              <item.icon className={cn('w-6 h-6', item.color)} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{item.value}</div>
            <div className="text-sm text-gray-600">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Overall Progress</span>
          <span>{Math.round((stats.currentDay / stats.totalDays) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(stats.currentDay / stats.totalDays) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
