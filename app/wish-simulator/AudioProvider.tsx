'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

type AudioProvider = {
    audio: HTMLAudioElement | null;
};

export const AudioContext = createContext<AudioProvider | null>(null);

export default function AudioProvider({ children }: { children: React.ReactNode }) {
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

    useEffect(() => {
        const backgroundMusic = new Audio('/sounds/statue-of-the-seven.mp3');
        backgroundMusic.autoplay = true;
        backgroundMusic.loop = true;

        setAudio(backgroundMusic);

        return () => {
            backgroundMusic.pause();
        };
    }, []);

    return <AudioContext.Provider value={{ audio }}>{children}</AudioContext.Provider>;
}

export const useAudioContext = () => {
    const context = useContext(AudioContext);
    if (context === null) {
        throw new Error('useAudioContext must be used within a AudioContextProvider');
    }
    return context;
};
