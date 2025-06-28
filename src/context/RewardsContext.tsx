
'use client';

import { createContext } from 'react';

export interface Badge {
  id: string;
  name: string;
  icon: React.ElementType;
}

interface RewardsContextType {
  score: number;
  badges: Badge[];
  addPoints: (points: number) => void;
  addBadge: (badge: Badge) => void;
}

export const RewardsContext = createContext<RewardsContextType | undefined>(
  undefined
);
