import React, { useEffect, useState } from 'react';

export function NavDots() {
  const sections = [
    'sec-cover', 'sec-summary', 'sec-timeline', 'sec-units', 
    'sec-services', 'sec-top10', 'sec-history', 'sec-yoy', 'sec-commitments'
  ];
  
  const [active, setActive] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      let currentActive = 0;
      sections.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.5) {
          currentActive = i;
        }
      });
      setActive(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2.5 hidden md:flex">
      {sections.map((id, i) => (
        <div 
          key={id}
          onClick={() => scrollTo(id)}
          className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
            i === active ? 'bg-teal scale-150' : 'bg-med-light-gray hover:bg-med-dark-gray'
          }`}
        />
      ))}
    </div>
  );
}
