'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ChallengeData, DailyProgress, UserProfile } from '@/types/challenge';
import {
  loadChallengeData,
  saveChallengeData,
  initializeChallenge,
  updateTodayProgress as updateProgress
} from '@/utils/challenge-utils';

interface ChallengeContextType {
  challengeData: ChallengeData | null;
  todayProgress: DailyProgress | null;
  userProfile: UserProfile | null;
  updateTodayProgress: (updates: Partial<Omit<DailyProgress, 'date'>>) => void;
  updateUserProfile: (profile: UserProfile) => void;
  resetChallenge: () => void;
  isLoading: boolean;
}

const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined);

export function ChallengeProvider({ children }: { children: React.ReactNode }) {
  const [challengeData, setChallengeData] = useState<ChallengeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      const data = loadChallengeData();
      if (data) {
        setChallengeData(data);
      } else {
        const newChallenge = initializeChallenge();
        setChallengeData(newChallenge);
        saveChallengeData(newChallenge);
      }
      setIsLoading(false);
    };

    loadData();
  }, []);

  const updateTodayProgress = (updates: Partial<Omit<DailyProgress, 'date'>>) => {
    if (!challengeData) return;

    const updatedData = updateProgress(challengeData, updates);
    setChallengeData(updatedData);
    saveChallengeData(updatedData);
  };

  const updateUserProfile = (profile: UserProfile) => {
    if (!challengeData) return;

    const updatedData = {
      ...challengeData,
      userProfile: profile
    };
    setChallengeData(updatedData);
    saveChallengeData(updatedData);
  };

  const resetChallenge = () => {
    const newChallenge = initializeChallenge();
    setChallengeData(newChallenge);
    saveChallengeData(newChallenge);
  };

  const todayProgress = challengeData
    ? challengeData.progress.find((p) => p.date === new Date().toISOString().split('T')[0]) || null
    : null;

  const userProfile = challengeData?.userProfile || null;

  return (
    <ChallengeContext.Provider
      value={{
        challengeData,
        todayProgress,
        userProfile,
        updateTodayProgress,
        updateUserProfile,
        resetChallenge,
        isLoading
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
}

export function useChallenge() {
  const context = useContext(ChallengeContext);
  if (context === undefined) {
    throw new Error('useChallenge must be used within a ChallengeProvider');
  }
  return context;
}
