'use client';
import React, { createContext, useContext, useEffect, useRef } from 'react';

type AudioProvider = {
    audio: React.MutableRefObject<HTMLAudioElement | undefined>;
};

export const AudioContext = createContext<AudioProvider | null>(null);

export default function AudioProvider({ children }: { children: React.ReactNode }) {
    const audio = useRef<HTMLAudioElement | undefined>(
        typeof Audio !== 'undefined'
            ? new Audio('/sounds/statue-of-the-seven.mp3')
            : undefined
    );

    useEffect(() => {
        const music = audio.current;
        if (music) {
            music.autoplay = true;
            music.loop = true;
        }

        return () => {
            if (music) {
                music.remove();
            }
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
