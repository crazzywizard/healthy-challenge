'use client';

import { useChallenge } from '@/contexts/challenge-context';
import { ChallengeStats } from '@/components/challenge-stats';
import { DailyGoals } from '@/components/daily-goals';
import { ProgressCalendar } from '@/components/progress-calendar';
import { Header } from '@/components/header';
import { LoadingSpinner } from '@/components/loading-spinner';
import { PWAInstallPrompt } from '@/components/pwa-install-prompt';
import { UserProfileForm } from '@/components/user-profile';

export default function HomePage() {
  const {
    isLoading: challengeLoading,
    userProfile,
    updateUserProfile,
  } = useChallenge();

  if (challengeLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header />
      <main className="container mx-auto px-4 py-6 max-w-md">
        <div className="space-y-6">
          <UserProfileForm
            userProfile={userProfile}
            onSave={updateUserProfile}
          />
          <ChallengeStats />
          <DailyGoals />
          <ProgressCalendar />
        </div>
      </main>
      <PWAInstallPrompt />
    </div>
  );
}
