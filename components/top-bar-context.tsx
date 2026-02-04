"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface TopBarContextType {
  isTopBarVisible: boolean;
  topBarHeight: number;
}

const TopBarContext = createContext<TopBarContextType>({
  isTopBarVisible: true,
  topBarHeight: 36, // Fixed height for all viewports
});

export function useTopBar() {
  return useContext(TopBarContext);
}

export function TopBarProvider({ children }: { children: ReactNode }) {
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const [topBarHeight] = useState(36); // Fixed 36px (h-9) for all viewports

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsTopBarVisible(scrollY < 10);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <TopBarContext.Provider value={{ isTopBarVisible, topBarHeight }}>
      {children}
    </TopBarContext.Provider>
  );
}
