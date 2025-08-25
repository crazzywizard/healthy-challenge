'use client';

import { useChallenge } from '@/contexts/challenge-context';
import { DAILY_GOALS } from '@/types/challenge';
import { CheckCircle, Circle } from 'lucide-react';
import { cn } from '@/utils/cn';

export function DailyGoals() {
  const { todayProgress, updateTodayProgress } = useChallenge();

  const handleToggleGoal = (goalId: string) => {
    if (!todayProgress) return;

    const updates: Record<string, boolean> = {};

    switch (goalId) {
      case 'no-eating-out':
        updates.noEatingOut = !todayProgress.noEatingOut;
        break;
      case 'steps-or-calories':
        updates.stepsOrCalories = !todayProgress.stepsOrCalories;
        break;
      case 'low-sugar':
        updates.lowSugar = !todayProgress.lowSugar;
        break;
    }

    updateTodayProgress(updates);
  };

  const getGoalStatus = (goalId: string): boolean => {
    if (!todayProgress) return false;

    switch (goalId) {
      case 'no-eating-out':
        return todayProgress.noEatingOut;
      case 'steps-or-calories':
        return todayProgress.stepsOrCalories;
      case 'low-sugar':
        return todayProgress.lowSugar;
      default:
        return false;
    }
  };

  const completedGoals = todayProgress
    ? [todayProgress.noEatingOut, todayProgress.stepsOrCalories, todayProgress.lowSugar].filter(
        Boolean
      ).length
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Today's Goals</h2>
        <div className="text-sm text-gray-600">{completedGoals}/3 completed</div>
      </div>

      <div className="space-y-3">
        {DAILY_GOALS.map((goal) => {
          const isCompleted = getGoalStatus(goal.id);

          return (
            <div
              key={goal.id}
              className={cn(
                'flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer',
                isCompleted
                  ? 'border-green-200 bg-green-50'
                  : 'border-gray-200 bg-gray-50 hover:border-gray-300'
              )}
              onClick={() => handleToggleGoal(goal.id)}
            >
              <div className="text-2xl">{goal.icon}</div>

              <div className="flex-1">
                <h3 className={cn('font-medium', isCompleted ? 'text-green-800' : 'text-gray-900')}>
                  {goal.title}
                </h3>
                <p className={cn('text-sm', isCompleted ? 'text-green-600' : 'text-gray-600')}>
                  {goal.description}
                </p>
              </div>

              <div className="flex-shrink-0">
                {isCompleted ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-400" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Daily Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Daily Progress</span>
          <span>{Math.round((completedGoals / 3) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedGoals / 3) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
