import { createContext, useContext, useState } from 'react';
import { getDeviceTier } from '../utils/deviceCapability';

const PerformanceContext = createContext('high');

export function PerformanceProvider({ children }) {
  // Initialize synchronously so child components get the correct tier on first render
  const [tier] = useState(() => getDeviceTier());

  return (
    <PerformanceContext.Provider value={tier}>
      {children}
    </PerformanceContext.Provider>
  );
}

export const usePerformanceTier = () => useContext(PerformanceContext);
