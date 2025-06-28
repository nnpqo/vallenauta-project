
'use client';

import { RewardsContext, type Badge } from '@/context/RewardsContext';
import { useState, useCallback } from 'react';
import type { ReactNode } from 'react';

export function RewardsProvider({ children }: { children: ReactNode }) {
  const [score, setScore] = useState(0);
  const [badges, setBadges] = useState<Badge[]>([]);

  const addPoints = useCallback((points: number) => {
    setScore((prevScore) => prevScore + points);
  }, []);

  const addBadge = useCallback((badge: Badge) => {
    setBadges((prevBadges) => {
      if (prevBadges.some((b) => b.id === badge.id)) {
        return prevBadges;
      }
      return [...prevBadges, badge];
    });
  }, []);

  const value = {
    score,
    badges,
    addPoints,
    addBadge,
  };

  return (
    <RewardsContext.Provider value={value}>{children}</RewardsContext.Provider>
  );
}
