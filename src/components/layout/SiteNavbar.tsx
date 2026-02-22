import React, { useState } from 'react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import ScrollProgress from '@/components/ScrollProgress';

type PageKey = 'home' | 'projects' | 'about';

interface NavLink {
  name: PageKey;
  label: string;
}

interface SiteNavbarProps {
  siteName: string;
  navLinks: NavLink[];
  activePage: PageKey;
  onNavigate: (page: PageKey) => void;
}

export function SiteNavbar({
  siteName,
  navLinks,
  activePage,
  onNavigate,
}: SiteNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<PageKey | null>(null);

  const handleClick = (name: PageKey) => {
    onNavigate(name);
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className="w-full h-[70px] md:h-[90px] fixed top-0 left-0 right-0 z-[1000] border-b border-light-grey"
        style={{
          backgroundColor: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="w-full max-w-[1200px] mx-auto px-5 md:px-[100px] h-full flex items-center justify-between">
          <button
            type="button"
            onClick={() => handleClick('home')}
            className="text-black font-manrope text-[16px] font-normal cursor-pointer bg-transparent border-none p-0 transition-colors duration-300 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
            aria-label="Home"
          >
            {siteName}
          </button>

          <div className="hidden md:flex flex-row items-center gap-[30px]">
            <nav className="flex flex-row items-center gap-[30px]">
              {navLinks.map(({ name, label }) => {
                const isActive = activePage === name;
                const isHover = hoveredLink === name;
                return (
                  <button
                    key={name}
                    onClick={() => handleClick(name)}
                    onMouseEnter={() => setHoveredLink(name)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className={`font-manrope text-nav bg-transparent border-none p-0 cursor-pointer transition-colors duration-300 relative ${isActive ? 'text-black' : isHover ? 'text-accent' : 'text-dark-grey'}`}
                    style={{ fontWeight: isActive || isHover ? 700 : 400 }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        display: 'block',
                        fontWeight: 700,
                        height: 0,
                        overflow: 'hidden',
                        visibility: 'hidden',
                      }}
                    >
                      {label}
                    </span>
                    {label}
                    <span
                      className="absolute left-0 -bottom-[3px] h-[2px] transition-all duration-300"
                      style={{
                        width: isActive || isHover ? '100%' : '0%',
                        backgroundColor: isActive || isHover ? '#F97400' : 'transparent',
                      }}
                    />
                  </button>
                );
              })}
            </nav>
            <LanguageSwitcher />
          </div>

          <button
            className="md:hidden flex flex-col justify-center gap-[5px] bg-transparent border-none cursor-pointer p-1"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`block w-6 h-0.5 bg-black transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-6 h-0.5 bg-black transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-black transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </header>

      <ScrollProgress />

      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 z-[998] flex flex-col items-center justify-center gap-6"
          style={{
            backgroundColor: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map(({ name, label }) => {
              const isActive = activePage === name;
              return (
                <button
                  key={name}
                  onClick={() => handleClick(name)}
                  className={`font-manrope text-[28px] bg-transparent border-none p-0 cursor-pointer text-center transition-colors duration-300 relative ${isActive ? 'text-black font-bold' : 'text-dark-grey font-normal hover:text-accent'}`}
                >
                  {label}
                  {isActive && (
                    <span
                      className="absolute left-0 -bottom-[4px] h-[2px] w-full"
                      style={{ backgroundColor: '#F97400' }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
          <LanguageSwitcher />
        </div>
      )}
    </>
  );
}
