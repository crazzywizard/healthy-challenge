'use client';

import { useChallenge } from '@/contexts/challenge-context';
import {
  format,
  subDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/utils/cn';

export function ProgressCalendar() {
  const { challengeData } = useChallenge();
  const [currentWeek, setCurrentWeek] = useState(new Date());

  if (!challengeData) return null;

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 }); // Monday start
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const goToPreviousWeek = () => {
    setCurrentWeek(subDays(currentWeek, 7));
  };

  const goToNextWeek = () => {
    setCurrentWeek(subDays(currentWeek, -7));
  };

  const getDayProgress = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return challengeData.progress.find(p => p.date === dateStr);
  };

  const getProgressColor = (progress: DailyProgress | undefined) => {
    if (!progress) return 'bg-gray-100';

    const completedGoals = [
      progress.noEatingOut,
      progress.stepsOrCalories,
      progress.lowSugar,
    ].filter(Boolean).length;

    if (completedGoals === 3) return 'bg-green-500';
    if (completedGoals === 2) return 'bg-yellow-500';
    if (completedGoals === 1) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const isToday = (date: Date) => {
    return format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Progress Calendar
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={goToPreviousWeek}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm text-gray-600">
            {format(weekStart, 'MMM dd')} - {format(weekEnd, 'MMM dd')}
          </span>
          <button
            onClick={goToNextWeek}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {/* Day headers */}
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {weekDays.map(date => {
          const progress = getDayProgress(date);
          const isCurrentDay = isToday(date);

          return (
            <div
              key={date.toISOString()}
              className={cn(
                'aspect-square rounded-lg border-2 transition-all duration-200 relative',
                isCurrentDay ? 'border-blue-500' : 'border-gray-200',
                getProgressColor(progress)
              )}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className={cn(
                    'text-xs font-medium',
                    progress ? 'text-white' : 'text-gray-600'
                  )}
                >
                  {format(date, 'd')}
                </span>
              </div>

              {/* Progress indicator */}
              {progress && (
                <div className="absolute bottom-1 left-1 right-1 flex gap-1">
                  <div
                    className={cn(
                      'h-1 rounded-full flex-1',
                      progress.noEatingOut ? 'bg-white' : 'bg-white/30'
                    )}
                  />
                  <div
                    className={cn(
                      'h-1 rounded-full flex-1',
                      progress.stepsOrCalories ? 'bg-white' : 'bg-white/30'
                    )}
                  />
                  <div
                    className={cn(
                      'h-1 rounded-full flex-1',
                      progress.lowSugar ? 'bg-white' : 'bg-white/30'
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-gray-600">All 3 goals</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
          <span className="text-gray-600">2 goals</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded"></div>
          <span className="text-gray-600">1 goal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span className="text-gray-600">0 goals</span>
        </div>
      </div>
    </div>
  );
}
