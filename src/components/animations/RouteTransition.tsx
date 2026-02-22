import React, { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface RouteTransitionProps {
  children: React.ReactNode;
  transitionKey: string;
  className?: string;
}

export const RouteTransition = ({
  children,
  transitionKey,
  className = '',
}: RouteTransitionProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = useState(prefersReducedMotion);
  const frameOneRef = useRef<number | null>(null);
  const frameTwoRef = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    setIsVisible(false);
    frameOneRef.current = window.requestAnimationFrame(() => {
      frameTwoRef.current = window.requestAnimationFrame(() => {
        setIsVisible(true);
      });
    });

    return () => {
      if (frameOneRef.current !== null) {
        window.cancelAnimationFrame(frameOneRef.current);
      }
      if (frameTwoRef.current !== null) {
        window.cancelAnimationFrame(frameTwoRef.current);
      }
    };
  }, [prefersReducedMotion, transitionKey]);

  return (
    <div key={transitionKey} className={`route-transition ${isVisible ? 'is-visible' : ''} ${className}`.trim()} data-route-key={transitionKey}>
      {children}
    </div>
  );
};
