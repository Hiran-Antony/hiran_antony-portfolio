export function getDeviceTier() {
  const memory = navigator.deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 4;
  
  // Check WebGL capability
  let hasWeakGPU = false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    hasWeakGPU = !gl || gl.getParameter(gl.MAX_TEXTURE_SIZE) < 4096;
  } catch(e) {
    hasWeakGPU = true;
  }

  // Only downgrade to 'low' if the device is genuinely weak (less than 4 cores, weak RAM, or bad GPU)
  if (memory < 4 || cores < 4 || hasWeakGPU) {
    return 'low';
  }
  
  // High-end mobiles and mid-range desktops fall here (medium tier scales down particles safely)
  if (memory < 8 || cores < 6) {
    return 'medium';
  }
  
  // Top tier machines
  return 'high';
}

export function prefersReducedMotion() {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
}
