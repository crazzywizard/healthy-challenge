import {
  ChallengeData,
  DailyProgress,
  ChallengeStats,
  CHALLENGE_DAYS,
  UserProfile
} from '@/types/challenge';
import { format, differenceInDays, isToday, isYesterday } from 'date-fns';

export const STORAGE_KEY = '75hard-challenge-data';

export function initializeChallenge(): ChallengeData {
  const today = new Date();
  return {
    userProfile: {
      name: '',
      startingWeight: 0
    },
    startDate: format(today, 'yyyy-MM-dd'),
    progress: [],
    stats: {
      currentDay: 1,
      totalDays: CHALLENGE_DAYS,
      streak: 0,
      completedDays: 0,
      successRate: 0
    }
  };
}

export function loadChallengeData(): ChallengeData | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function saveChallengeData(data: ChallengeData): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save challenge data:', error);
  }
}

export function getTodayProgress(data: ChallengeData): DailyProgress | null {
  const today = format(new Date(), 'yyyy-MM-dd');
  return data.progress.find((p) => p.date === today) || null;
}

export function updateTodayProgress(
  data: ChallengeData,
  updates: Partial<Omit<DailyProgress, 'date'>>
): ChallengeData {
  const today = format(new Date(), 'yyyy-MM-dd');
  const existingIndex = data.progress.findIndex((p) => p.date === today);

  const todayProgress: DailyProgress = {
    date: today,
    noEatingOut: updates.noEatingOut ?? false,
    stepsOrCalories: updates.stepsOrCalories ?? false,
    lowSugar: updates.lowSugar ?? false,
    notes: updates.notes
  };

  if (existingIndex >= 0) {
    data.progress[existingIndex] = todayProgress;
  } else {
    data.progress.push(todayProgress);
  }

  return {
    ...data,
    progress: [...data.progress],
    stats: calculateStats(data.progress, data.startDate)
  };
}

export function calculateStats(progress: DailyProgress[], startDate: string): ChallengeStats {
  const start = new Date(startDate);
  const today = new Date();
  const currentDay = Math.min(differenceInDays(today, start) + 1, CHALLENGE_DAYS);

  const completedDays = progress.filter(
    (p) => p.noEatingOut && p.stepsOrCalories && p.lowSugar
  ).length;

  // Calculate streak
  let streak = 0;
  const sortedProgress = progress.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  for (const day of sortedProgress) {
    if (day.noEatingOut && day.stepsOrCalories && day.lowSugar) {
      streak++;
    } else {
      break;
    }
  }

  const successRate = progress.length > 0 ? (completedDays / progress.length) * 100 : 0;

  return {
    currentDay,
    totalDays: CHALLENGE_DAYS,
    streak,
    completedDays,
    successRate: Math.round(successRate)
  };
}

export function formatDate(date: string): string {
  return format(new Date(date), 'MMM dd');
}

export function isDateToday(date: string): boolean {
  return isToday(new Date(date));
}

export function isDateYesterday(date: string): boolean {
  return isYesterday(new Date(date));
}

export function getProgressPercentage(progress: DailyProgress[]): number {
  if (progress.length === 0) return 0;

  const totalGoals = progress.length * 3; // 3 goals per day
  const completedGoals = progress.reduce((sum, day) => {
    return sum + (day.noEatingOut ? 1 : 0) + (day.stepsOrCalories ? 1 : 0) + (day.lowSugar ? 1 : 0);
  }, 0);

  return Math.round((completedGoals / totalGoals) * 100);
}
