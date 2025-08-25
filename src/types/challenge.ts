export interface DailyProgress {
  date: string;
  noEatingOut: boolean;
  stepsOrCalories: boolean;
  lowSugar: boolean;
  notes?: string;
}

export interface UserProfile {
  name: string;
  startingWeight: number;
}

export interface ChallengeStats {
  currentDay: number;
  totalDays: number;
  streak: number;
  completedDays: number;
  successRate: number;
}

export interface ChallengeData {
  userProfile: UserProfile;
  startDate: string;
  progress: DailyProgress[];
  stats: ChallengeStats;
}

export interface DailyGoal {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  icon: string;
}

export const CHALLENGE_DAYS = 75;
export const DAILY_GOALS: Omit<DailyGoal, 'completed'>[] = [
  {
    id: 'no-eating-out',
    title: 'No Eating Out',
    description: 'Cook all meals at home',
    icon: '🍳'
  },
  {
    id: 'steps-or-calories',
    title: '8,000+ Steps or 350+ Calories',
    description: 'Walk 8,000+ steps or burn 350+ calories',
    icon: '🚶‍♂️'
  },
  {
    id: 'low-sugar',
    title: 'Under 25g Sugar',
    description: 'Keep daily sugar intake under 25 grams',
    icon: '🍭'
  }
];
