export const isMobile = () => 
  window.innerWidth < 768 || 
  /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

export const isLowEnd = () => {
  // Detect low-end devices
  const memory = navigator?.deviceMemory;
  const cores = navigator?.hardwareConcurrency;
  return memory < 4 || cores < 4;
};
