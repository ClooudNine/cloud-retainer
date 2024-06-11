'use client';
import React, { createContext, useContext, useState } from 'react';
import { ExtendedUser } from '@/auth';
import { AchievementChapter, CompletedAchievement } from '@/lib/types';

type AchievementsContextProviderProps = {
    children: React.ReactNode;
    user: ExtendedUser | undefined;
    achievements: AchievementChapter[];
    completedAchievements: CompletedAchievement[];
};

type AchievementsContext = {
    user: ExtendedUser | undefined;
    achievements: AchievementChapter[];
    activeChapter: AchievementChapter;
    setActiveChapter: (chapter: AchievementChapter) => void;
    completed: CompletedAchievement[];
    setCompleted: React.Dispatch<React.SetStateAction<CompletedAchievement[]>>;
};

export const AchievementsContext = createContext<AchievementsContext | null>(null);

export default function AchievementsProvider({
    children,
    user,
    achievements,
    completedAchievements,
}: AchievementsContextProviderProps) {
    const [activeChapter, setActiveChapter] = useState<AchievementChapter>(achievements[0]);
    const [completed, setCompleted] = useState<CompletedAchievement[]>(completedAchievements);

    return (
        <AchievementsContext.Provider
            value={{
                user,
                achievements,
                activeChapter,
                setActiveChapter,
                completed,
                setCompleted,
            }}
        >
            {children}
        </AchievementsContext.Provider>
    );
}

export function useAchievementsContext() {
    const context = useContext(AchievementsContext);
    if (context === null) {
        throw new Error('useAchievementsContext must be used within a AchievementsContextProvider');
    }
    return context;
}
