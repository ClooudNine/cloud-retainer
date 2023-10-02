'use client'
import { createContext } from 'react'
export const BannerContext = createContext({})

export default function BannerProvider({ children }) {
    return <BannerContext.Provider value="dark">{children}</BannerContext.Provider>
}