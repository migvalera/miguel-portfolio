import { useCallback, useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface UseScrollRevealOptions {
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
  disabled?: boolean;
}

export function useScrollReveal({
  once = true,
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px',
  disabled = false,
}: UseScrollRevealOptions = {}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(disabled || prefersReducedMotion);

  const ref = useCallback((element: HTMLElement | null) => {
    setNode(element);
  }, []);

  useEffect(() => {
    if (disabled || prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    if (typeof window === 'undefined' || !node) {
      return;
    }

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          setIsVisible(true);

          if (once) {
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [disabled, node, once, prefersReducedMotion, rootMargin, threshold]);

  return { ref, isVisible, prefersReducedMotion };
}
