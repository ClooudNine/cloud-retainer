'use client';
import React, { createContext, useContext, useEffect, useRef } from 'react';

type AudioProvider = {
    audioRef: React.MutableRefObject<HTMLAudioElement | null>;
};

export const AudioContext = createContext<AudioProvider | null>(null);

export default function AudioProvider({ children }: { children: React.ReactNode }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = new Audio('/sounds/statue-of-the-seven.mp3');
        audio.autoplay = true;
        audio.loop = true;

        audioRef.current = audio;

        return () => {
            audio.pause();
        };
    }, []);

    return <AudioContext.Provider value={{ audioRef }}>{children}</AudioContext.Provider>;
}

export const useAudioContext = () => {
    const context = useContext(AudioContext);
    if (context === null) {
        throw new Error('useAudioContext must be used within a AudioContextProvider');
    }
    return context;
};
