import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  reveal?: boolean;
  threshold?: number;
  rootMargin?: string;
  as?: 'div' | 'section' | 'article' | 'main';
}

export const FadeInSection = ({
  children,
  className = '',
  id,
  style,
  reveal = true,
  threshold,
  rootMargin,
  as = 'div',
}: FadeInSectionProps) => {
  const { ref, isVisible } = useScrollReveal({
    disabled: !reveal,
    threshold,
    rootMargin,
  });

  const Tag = as;

  return (
    <Tag
      id={id}
      ref={ref as React.Ref<HTMLElement>}
      className={`fade-reveal ${isVisible ? 'is-visible' : ''} ${className}`.trim()}
      style={style}
    >
      {children}
    </Tag>
  );
};
