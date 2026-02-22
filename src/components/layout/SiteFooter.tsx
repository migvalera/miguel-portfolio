import React, { useState } from 'react';

type PageKey = 'home' | 'projects' | 'about';

interface NavLink {
  name: PageKey;
  label: string;
}

interface SiteFooterProps {
  siteName: string;
  navLinks: NavLink[];
  copyright: string;
  onNavigate: (page: PageKey) => void;
}

const SocialBaseDark = ({ isHovered }: { isHovered?: boolean }) => (
  <div
    className={`w-[42px] h-[42px] rounded-full border border-dark-grey transition-all duration-300 flex-shrink-0 ${isHovered ? 'bg-black' : 'bg-bg'}`}
  />
);

export function SiteFooter({ siteName, navLinks, copyright, onNavigate }: SiteFooterProps) {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  return (
    <div className="w-full bg-black">
      <div className="w-full max-w-[1200px] mx-auto px-5 md:px-[100px] flex flex-col gap-8 md:gap-[40px] py-10 md:pt-[50px] md:pb-[80px]">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between md:items-center md:flex-wrap">
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-[70px]">
            <span className="text-white font-manrope text-[16px]" style={{ fontWeight: '400' }}>
              {siteName}
            </span>
            <div className="flex flex-col items-center gap-[14px] md:flex-row md:gap-[30px]">
              {navLinks.map(({ name, label }) => (
                <button
                  key={name}
                  onClick={() => onNavigate(name)}
                  className="bg-transparent border-none p-0 cursor-pointer text-[#AFAFAC] font-manrope text-nav font-medium transition-colors duration-300 hover:text-accent"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-[20px]">
            <a
              href="https://www.linkedin.com/in/migvaler"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredSocial('li')}
              onMouseLeave={() => setHoveredSocial(null)}
              className="relative flex flex-row gap-[10px] p-0 cursor-pointer"
              aria-label="LinkedIn"
            >
              <SocialBaseDark isHovered={hoveredSocial === 'li'} />
              <img
                src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/ad0ca53c-9242-4a76-9561-d6e723e70067.svg"
                alt=""
                className={`w-[16px] h-[16px] absolute left-[13px] top-[13px] transition-all duration-300 ${hoveredSocial === 'li' ? 'invert brightness-0' : 'invert-0 brightness-0'}`}
              />
            </a>
            <a
              href="https://www.behance.net/migvaler"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredSocial('be')}
              onMouseLeave={() => setHoveredSocial(null)}
              className="relative flex flex-row gap-[10px] p-0 cursor-pointer"
              aria-label="Behance"
            >
              <SocialBaseDark isHovered={hoveredSocial === 'be'} />
              <img
                src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/31f081db-0b0a-4cfc-96eb-23c1bd43fff4.svg"
                alt=""
                className={`w-[16px] h-[16px] absolute left-[13px] top-[13px] transition-all duration-300 ${hoveredSocial === 'be' ? 'invert brightness-0' : 'invert-0 brightness-0'}`}
              />
            </a>
          </div>
        </div>

        <div className="h-[1px] bg-dark-grey w-full" />
        <p className="m-0 text-[#AFAFAC] text-nav font-manrope text-center">{copyright}</p>
      </div>
    </div>
  );
}
