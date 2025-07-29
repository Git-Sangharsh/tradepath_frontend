import { useEffect, useState } from 'react';

const useAnimatedNumber = (target, duration = 1000) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const start = value;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const nextValue = start + (target - start) * progress;
      setValue(nextValue);

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return value;
};

export default useAnimatedNumber;
