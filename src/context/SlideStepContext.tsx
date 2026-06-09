import React, { createContext, useContext, ReactNode } from 'react';

interface SlideStepContextType {
  subStep: number;
}

const SlideStepContext = createContext<SlideStepContextType | undefined>(undefined);

export const SlideStepProvider: React.FC<{ subStep: number; children: ReactNode }> = ({ subStep, children }) => {
  return (
    <SlideStepContext.Provider value={{ subStep }}>
      {children}
    </SlideStepContext.Provider>
  );
};

export const useSlideStep = () => {
  const context = useContext(SlideStepContext);
  if (context === undefined) {
    return { subStep: 0 }; // Default to 0 if not in provider
  }
  return context;
};
