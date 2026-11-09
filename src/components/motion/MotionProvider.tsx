import React, { createContext, useContext } from 'react';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

interface MotionContextType {
  shouldReduceMotion: boolean;
}

const MotionContext = createContext<MotionContextType>({
  shouldReduceMotion: false,
});

export const useMotionConfig = () => useContext(MotionContext);

interface MotionProviderProps {
  children: React.ReactNode;
}

export const MotionProvider: React.FC<MotionProviderProps> = ({ children }) => {
  const shouldReduceMotion = useReducedMotionPreference();

  return (
    <MotionContext.Provider value={{ shouldReduceMotion }}>
      {children}
    </MotionContext.Provider>
  );
};
