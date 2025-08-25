'use client';

import React from 'react';
import { ChallengeProvider } from '@/contexts/challenge-context';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <ChallengeProvider>{children}</ChallengeProvider>;
}
