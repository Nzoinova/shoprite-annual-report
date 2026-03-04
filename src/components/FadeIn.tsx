import React, { useEffect } from 'react';

export function useFadeIn() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);
}

export function FadeIn({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`fade-in ${className}`}>
      {children}
    </div>
  );
}
