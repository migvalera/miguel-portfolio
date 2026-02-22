import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../LanguageSwitcher';
import ScrollProgress from '@/components/ScrollProgress';

interface PortfolioProjectsProps {
  onNavigate: (page: 'home' | 'projects' | 'about' | 'redesign' | 'migracion' | 'portfolio' | 'vanvu') => void;
}
interface BaseProps {
  isHovered?: boolean;
}
const SocialBaseDark = ({
  isHovered
}: BaseProps) => <div className={`w-[42px] h-[42px] rounded-full border border-dark-grey transition-all duration-300 flex-shrink-0 ${isHovered ? 'bg-black' : 'bg-bg'}`} />;

/* ─── Layout helpers ─── */
const FullWidth = ({
  children,
  className = '',
  id
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => <div id={id} className={`w-full ${className}`}>{children}</div>;const Inner = ({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`w-full max-w-[1200px] mx-auto px-5 md:px-[100px] ${className}`}>{children}</div>;
const projectsMeta = [
  { id: 1, titleKey: 'home:project1.title', descKey: 'home:project1.description', image: 'https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/2ebe988d-3a72-4109-80bf-284ab0fc748b.jpg', navigateTo: 'redesign' as const },
  { id: 2, titleKey: 'home:project2.title', descKey: 'home:project2.description', image: 'https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/add5f271-9666-4b75-a465-d11d2b2fbdfd.jpg', navigateTo: 'migracion' as const },
  { id: 3, titleKey: 'home:designIA.title', descKey: 'home:designIA.description', image: 'https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/a898fffd-82b3-4766-a0ee-451ac92340b5.jpg', navigateTo: 'portfolio' as const },
  { id: 4, titleKey: 'project4:title', descKey: 'project4:subtitle', image: 'https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/af8d4cdc-990f-44b3-a008-21513f67241b.jpg', navigateTo: 'vanvu' as const },
];
export const PortfolioProjects = ({
  onNavigate
}: PortfolioProjectsProps) => {
  const { t } = useTranslation(['common', 'home', 'projects', 'project4']);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [contactBtnHover, setContactBtnHover] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove('scroll-locked');
    document.body.classList.remove('scroll-locked');
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsPageVisible(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const navLinks = [
    { name: 'home', label: t('common:nav.home') },
    { name: 'projects', label: t('common:nav.projects') },
    { name: 'sobre', label: t('common:nav.about') },
  ];
  const projects = projectsMeta.map((p) => ({
    ...p,
    title: t(p.titleKey),
    description: t(p.descKey),
  }));
  const handleNavClick = (name: string) => {
    if (name === 'home') {
      onNavigate('home');
    } else if (name === 'projects') {
      onNavigate('projects');
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else if (name === 'sobre' || name === 'about') {
      onNavigate('about');
    }
    setMenuOpen(false);
  };
  return <div className="w-full min-h-screen flex flex-col bg-bg box-border overflow-x-hidden">

      {/* ── Navbar — full-width, content constrained ── */}
      <header className="w-full h-[70px] md:h-[90px] fixed top-0 left-0 right-0 z-[1000] border-b border-light-grey" style={{
      backgroundColor: 'rgba(255,255,255,0.9)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)'
    }}>
        <Inner className="h-full flex items-center justify-between !py-0">
          <button type="button" onClick={() => handleNavClick('home')} className="text-black font-manrope text-[16px] font-normal cursor-pointer bg-transparent border-none p-0 transition-colors duration-300 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded" aria-label="Home">
            {t('common:name')}
          </button>

          {/* Desktop nav + language */}
          <div className="hidden md:flex flex-row items-center gap-[30px]">
          <nav className="flex flex-row items-center gap-[30px]">
            {navLinks.map(({
            name,
            label
          }) => {
            const isActive = name === 'projects';
            return <button key={name} onClick={() => handleNavClick(name)} onMouseEnter={() => setHoveredLink(name)} onMouseLeave={() => setHoveredLink(null)} className={`font-manrope text-nav bg-transparent border-none p-0 cursor-pointer transition-colors duration-300 relative ${isActive ? 'text-black font-bold' : hoveredLink === name ? 'text-accent font-normal' : 'text-dark-grey font-normal'}`}>
                  {label}
                  <span className="absolute left-0 -bottom-[3px] h-[2px] transition-all duration-300" style={{
                width: isActive ? '100%' : hoveredLink === name ? '100%' : '0%',
                backgroundColor: isActive || hoveredLink === name ? '#F97400' : 'transparent'
              }} />
                </button>;
          })}
          </nav>
          <LanguageSwitcher />
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden flex flex-col justify-center gap-[5px] bg-transparent border-none cursor-pointer p-1" aria-label={t('common:aria.toggleMenu')} onClick={() => setMenuOpen(!menuOpen)}>
            <span className={`block w-6 h-0.5 bg-black transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-6 h-0.5 bg-black transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-black transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </Inner>
      </header>

      {/* Mobile nav — full-screen overlay */}
      {menuOpen && <div className="md:hidden fixed inset-0 z-[998] flex flex-col items-center justify-center gap-6" style={{
      backgroundColor: 'rgba(255,255,255,0.97)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)'
    }}>
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map(({
          name,
          label
        }) => {
          const isActive = name === 'projects';
          return <button key={name} onClick={() => handleNavClick(name)} className={`font-manrope text-[28px] bg-transparent border-none p-0 cursor-pointer text-center transition-colors duration-300 relative ${isActive ? 'text-black font-bold' : 'text-dark-grey font-normal hover:text-accent'}`}>
                  {label}
                  {isActive && <span className="absolute left-0 -bottom-[4px] h-[2px] w-full" style={{
              backgroundColor: '#F97400'
            }} />}
                </button>;
        })}
          </nav>
          <LanguageSwitcher />
        </div>}

      {/* Spacer */}
      <ScrollProgress />
      <div className="h-[70px] md:h-[90px]" />

      <div className="transition-opacity duration-300" style={{
      opacity: isPageVisible ? 1 : 0
    }}>

      {/* ── Hero Header ── */}
      <FullWidth className="bg-white rounded-b-[60px]">
        <div>
          <Inner className="flex flex-col pt-10 md:pt-[80px] pb-12 md:pb-[100px] gap-6 md:gap-[40px]">
            <h1 className="m-0 text-black font-manrope text-[28px] md:text-h1 font-normal leading-[1.15] md:leading-[55px] max-w-[700px]">
              {t('projects:title')}
            </h1>
            <p className="m-0 text-dark-grey font-manrope text-[15px] md:text-[16px] font-normal leading-[1.6] md:leading-[25.6px] max-w-[700px]">
              {t('projects:intro')}
            </p>
          </Inner>
        </div>
      </FullWidth>

      {/* ── Projects Grid ── */}
      <FullWidth className="bg-bg">
        <Inner className="flex flex-col gap-[60px] md:gap-[100px] pt-12 md:pt-[80px] pb-12 md:pb-[100px]">
          {/* Row 1 */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-[20px]">
            {projects.slice(0, 2).map(project => <div key={project.id} className="w-full md:flex-1 flex flex-col gap-4 md:gap-[20px] cursor-pointer no-underline group" onClick={() => {
            onNavigate(project.navigateTo);
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }} onMouseEnter={() => setHoveredProject(project.id)} onMouseLeave={() => setHoveredProject(null)}>
                <div className="w-full h-[220px] sm:h-[280px] md:h-[383px] overflow-hidden rounded-card">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-[400ms] ease-in-out group-hover:scale-105" />
                </div>
                <div className="flex flex-col gap-[10px]">
                  <h3 className="m-0 font-manrope text-[22px] md:text-[30px] font-medium leading-[1.3] md:leading-[41px] transition-all duration-300" style={{
                color: hoveredProject === project.id ? '#F97400' : '#2A2A28'
              }}>
                    {project.title}
                  </h3>
                  <p className="m-0 text-dark-grey font-manrope text-[15px] md:text-[16px] font-normal leading-[1.6] md:leading-[25.6px]">
                    {project.description}
                  </p>
                  <p className="m-0 font-manrope text-[20px] leading-[1] transition-all duration-300" style={{
                color: '#F97400',
                opacity: hoveredProject === project.id ? 1 : 0,
                transform: hoveredProject === project.id ? 'translateX(0)' : 'translateX(-8px)'
              }}>{'→'}</p>
                </div>
              </div>)}
          </div>

          {/* Row 2 */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-[20px]">
            {projects.slice(2, 4).map(project => <div key={project.id} className="w-full md:flex-1 flex flex-col gap-4 md:gap-[20px] cursor-pointer no-underline group" onClick={() => {
            onNavigate(project.navigateTo);
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }} onMouseEnter={() => setHoveredProject(project.id)} onMouseLeave={() => setHoveredProject(null)}>
                <div className="w-full h-[220px] sm:h-[280px] md:h-[383px] overflow-hidden rounded-card">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-[400ms] ease-in-out group-hover:scale-105" />
                </div>
                <div className="flex flex-col gap-[10px]">
                  <h3 className="m-0 font-manrope text-[22px] md:text-[30px] font-medium leading-[1.3] md:leading-[41px] transition-all duration-300" style={{
                color: hoveredProject === project.id ? '#F97400' : '#2A2A28'
              }}>
                    {project.title}
                  </h3>
                  <p className="m-0 text-dark-grey font-manrope text-[15px] md:text-[16px] font-normal leading-[1.6] md:leading-[25.6px]">
                    {project.description}
                  </p>
                  <p className="m-0 font-manrope text-[20px] leading-[1] transition-all duration-300" style={{
                color: '#F97400',
                opacity: hoveredProject === project.id ? 1 : 0,
                transform: hoveredProject === project.id ? 'translateX(0)' : 'translateX(-8px)'
              }}>{'→'}</p>
                </div>
              </div>)}
          </div>
        </Inner>
      </FullWidth>

      {/* ── Contact Section ── */}
      <FullWidth className="bg-dark-grey">
        <div>
          <Inner className="flex flex-col gap-6 md:gap-[32px] pt-12 md:pt-[80px] pb-12 md:pb-[100px]">
            <div className="flex flex-col gap-[8px]">
              <h2 className="m-0 text-bg font-manrope text-[26px] md:text-h2 font-medium">{t('common:contactHeading')}</h2>
              <p className="m-0 text-bg font-manrope text-[15px] md:text-[16px] font-normal leading-[1.6] md:leading-[25.6px] max-w-[643px]">
                {t('common:contactIntro')}
              </p>
            </div>
            <a href="https://www.linkedin.com/in/migvaler" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setContactBtnHover(true)} onMouseLeave={() => setContactBtnHover(false)} className="self-start inline-flex items-center h-[42px] px-[24px] border border-light-grey rounded-lg cursor-pointer font-manrope text-nav font-normal transition-all duration-300 no-underline" style={{
            backgroundColor: contactBtnHover ? '#000' : '#fff',
            color: contactBtnHover ? '#F3F3F2' : '#2A2A28',
            borderColor: contactBtnHover ? '#000' : undefined,
            transform: contactBtnHover ? 'translateY(-1px)' : 'translateY(0)'
          }}>
              {t('common:sendMessage')}
            </a>
          </Inner>
        </div>
      </FullWidth>

      {/* ── Footer ── */}
      <FullWidth className="bg-black no-fade">
        <Inner className="flex flex-col gap-8 md:gap-[40px] py-10 md:pt-[50px] md:pb-[80px]">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between md:items-center md:flex-wrap">
            {/* Name + nav links */}
            <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-[70px]">
              <span className="text-white font-manrope text-[16px]" style={{
              fontWeight: '400'
            }}>{t('common:footer.email')}</span>
              <div className="flex flex-col items-center gap-[14px] md:flex-row md:gap-[30px]">
                {navLinks.map(({
                name,
                label
              }) => <button key={name} onClick={() => handleNavClick(name)} className="bg-transparent border-none p-0 cursor-pointer text-[#AFAFAC] font-manrope text-nav font-medium transition-colors duration-300 hover:text-accent">
                    {label}
                  </button>)}
              </div>
            </div>

            {/* Social icons */}
            <div className="flex gap-[20px]">
              <a href="https://www.linkedin.com/in/migvaler" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHoveredSocial('foot-li')} onMouseLeave={() => setHoveredSocial(null)} className="relative flex flex-row gap-[10px] p-0 cursor-pointer" aria-label="LinkedIn">
                <SocialBaseDark isHovered={hoveredSocial === 'foot-li'} />
                <img src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/ad0ca53c-9242-4a76-9561-d6e723e70067.svg" alt="" className={`w-[16px] h-[16px] absolute left-[13px] top-[13px] transition-all duration-300 ${hoveredSocial === 'foot-li' ? 'invert brightness-0' : 'invert-0 brightness-0'}`} />
              </a>
              <a href="https://www.behance.net/migvaler" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHoveredSocial('foot-be')} onMouseLeave={() => setHoveredSocial(null)} className="relative flex flex-row gap-[10px] p-0 cursor-pointer" aria-label="Behance">
                <SocialBaseDark isHovered={hoveredSocial === 'foot-be'} />
                <img src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/31f081db-0b0a-4cfc-96eb-23c1bd43fff4.svg" alt="" className={`w-[16px] h-[16px] absolute left-[13px] top-[13px] transition-all duration-300 ${hoveredSocial === 'foot-be' ? 'invert brightness-0' : 'invert-0 brightness-0'}`} />
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-dark-grey w-full" />

          {/* Copyright */}
          <p className="m-0 text-[#AFAFAC] text-nav font-manrope text-center">
            {t('common:footer.copyright')}
          </p>
        </Inner>
      </FullWidth>
      </div>
    </div>;
};
export default PortfolioProjects;
