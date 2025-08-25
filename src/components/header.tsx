'use client';

import { useChallenge } from '@/contexts/challenge-context';
import { Trophy, RotateCcw } from 'lucide-react';

export function Header() {
  const { resetChallenge } = useChallenge();

  const handleReset = () => {
    if (
      confirm(
        'Are you sure you want to reset your challenge? This will delete all progress.'
      )
    ) {
      resetChallenge();
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 max-w-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Trophy className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">75 Hard</h1>
              <p className="text-sm text-gray-600">Weight Loss Challenge</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Reset Challenge"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
