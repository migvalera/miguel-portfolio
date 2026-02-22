import React, { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight;
      const winH = window.innerHeight;
      const total = Math.max(1, docHeight - winH);
      const pct = Math.min(100, Math.max(0, (scrollTop / total) * 100));
      setProgress(pct);
    };
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="md:hidden fixed left-0 right-0 z-[1001] top-[70px] h-[3px]">
      <div className="relative w-full h-full bg-[rgba(0,0,0,0.06)]">
        <div className="absolute left-0 top-0 h-full bg-accent transition-[width] duration-150 ease-linear" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
