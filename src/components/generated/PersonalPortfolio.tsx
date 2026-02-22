import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { PortfolioProjects } from './PortfolioProjects';
import { AboutPage } from './AboutPage';
import { ProjectRedesign } from './ProjectRedesign';
import { ProjectMigracion } from './ProjectMigracion';
import { ProjectPortfolio } from './ProjectPortfolio';
import { ProjectVanvu } from './ProjectVanvu';
import { SiteNavbar } from '@/components/layout/SiteNavbar';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { FadeInSection } from '@/components/animations/FadeInSection';
import { RouteTransition } from '@/components/animations/RouteTransition';

import imgCarousel1 from '@/assets/images/projects/01PrimerPortfolio.jpg';
import imgCarousel2 from '@/assets/images/projects/02AllMusic.jpg';
import imgCarousel3 from '@/assets/images/projects/03NuriaFoto.jpg';
import imgCarousel4 from '@/assets/images/projects/04Vanvu.jpg';
import imgCarousel5 from '@/assets/images/projects/05Uxart.jpg';
import imgCarousel6 from '@/assets/images/projects/06Feelit.jpg';

/* ─── Sub-components using design system tokens ─── */
interface BaseProps {
  isHovered?: boolean;
}
const SocialBase = ({
  isHovered
}: BaseProps) => <div className={`w-[42px] h-[42px] rounded-full border border-light-grey transition-all duration-300 flex-shrink-0 ${isHovered ? 'bg-black' : 'bg-white'}`} />;

/* ─── Layout helpers ─── */
const FullWidth = ({
  children,
  className = '',
  id,
  reveal = true
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  reveal?: boolean;
}) => <FadeInSection id={id} reveal={reveal} className={`w-full ${className}`}>{children}</FadeInSection>;
const Inner = ({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`w-full max-w-[1200px] mx-auto px-5 md:px-[100px] ${className}`}>{children}</div>;

/* ─── Carousel: data without copy (copy from i18n in component) ─── */
const carouselProjectsMeta = [
  { id: 1, key: 'portfolioMv', image: imgCarousel1, behanceUrl: 'https://www.behance.net/gallery/107738449/Portfolio-Miguel-Valera-Diseno-y-Desarrollo-Web' },
  { id: 2, key: 'allMusic', image: imgCarousel2, behanceUrl: 'https://www.behance.net/gallery/101209167/All-Music-App-Prototipo-Interactivo' },
  { id: 3, key: 'nuriaFoto', image: imgCarousel3, behanceUrl: 'https://www.behance.net/gallery/107709921/Nuria-Fotografia-Desarrollo-web' },
  { id: 4, key: 'vanvu', image: imgCarousel4, behanceUrl: 'https://www.behance.net/gallery/165625177/Vanvu-Diseno-UXUI' },
  { id: 5, key: 'uxart', image: imgCarousel5, behanceUrl: 'https://www.behance.net/gallery/107715069/UXART-Diseno-y-Desarrollo-Web' },
  { id: 6, key: 'feelIt', image: imgCarousel6, behanceUrl: 'https://www.behance.net/gallery/138644135/Feel-It-Diseno-UXUI' }
] as const;

/* ─── Infinite Carousel Component ─── */
const InfiniteCarousel = ({ items }: { items: { title: string; description: string; image: string; behanceUrl: string }[] }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef(0);
  const CARD_WIDTH = 320;
  const CARD_GAP = 16;
  const STEP = CARD_WIDTH + CARD_GAP;
  const SPEED = 0.5;
  const duplicated = [...items, ...items];
  useEffect(() => {
    const totalOriginalWidth = items.length * STEP;
    const animate = () => {
      if (!isPaused) {
        positionRef.current += SPEED;
        if (positionRef.current >= totalOriginalWidth) {
          positionRef.current -= totalOriginalWidth;
        }
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(-${positionRef.current}px)`;
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPaused, items.length]);
  return <div className="w-full overflow-hidden" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => {
    setIsPaused(false);
    setHoveredIndex(null);
  }}>
      <div ref={trackRef} className="flex" style={{
      gap: `${CARD_GAP}px`,
      willChange: 'transform'
    }}>
        {duplicated.map((project, index) => {
        const isHovered = hoveredIndex === index;
        return <a key={`${project.title}-${index}`} href={project.behanceUrl} target="_blank" rel="noopener noreferrer" className="relative flex-shrink-0 overflow-hidden rounded-card cursor-pointer block" style={{
          width: `${CARD_WIDTH}px`,
          height: '220px'
        }} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.4s ease'
          }} />
              <div className="absolute inset-0 flex flex-col justify-end p-5" style={{
            backgroundColor: isHovered ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0)',
            transition: 'background-color 0.35s ease'
          }}>
                <div style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.35s ease, transform 0.35s ease'
            }}>
                  <p className="m-0 text-white font-manrope text-[15px] font-semibold leading-[1.3] mb-[6px]">{project.title}</p>
                  <p className="m-0 text-white font-manrope text-[13px] font-normal leading-[1.5] opacity-80">{project.description}</p>
                </div>
              </div>
            </a>;
      })}
      </div>
    </div>;
};


/* ─── Root App Component with page routing ─── */
export const PersonalPortfolio = () => {
  const [page, setPage] = useState<'home' | 'projects' | 'about' | 'redesign' | 'migracion' | 'portfolio' | 'vanvu'>('home');

  // whenever the page changes ensure we're at the top
  useEffect(() => {
    document.documentElement.classList.remove('scroll-locked');
    document.body.classList.remove('scroll-locked');
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [page]);

  // navigation handler simply updates the page state
  const handleNavigate = (target: 'home' | 'projects' | 'about' | 'redesign' | 'migracion' | 'portfolio' | 'vanvu') => {
    if (target === page) return;
    setPage(target);
  };



  const pageContent = page === 'projects'
    ? <PortfolioProjects onNavigate={p => handleNavigate(p)} />
    : page === 'about'
    ? <AboutPage onNavigate={p => handleNavigate(p)} />
    : page === 'redesign'
    ? <ProjectRedesign onNavigate={p => handleNavigate(p)} />
    : page === 'migracion'
    ? <ProjectMigracion onNavigate={p => handleNavigate(p)} />
    : page === 'portfolio'
    ? <ProjectPortfolio onNavigate={p => handleNavigate(p)} />
    : page === 'vanvu'
    ? <ProjectVanvu onNavigate={p => handleNavigate(p)} />
    : <HomePage onNavigate={handleNavigate} />;

  return <RouteTransition transitionKey={page} className="min-h-screen">{pageContent}</RouteTransition>;
};


/* ─── Home Page ─── */
const HomePage = ({
  onNavigate
}: {
  onNavigate: (page: 'home' | 'projects' | 'about' | 'redesign' | 'migracion' | 'portfolio') => void;
}) => {
  const { t } = useTranslation(['common', 'home']);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [contactBtnHover, setContactBtnHover] = useState(false);
  const [designIAHovered, setDesignIAHovered] = useState(false);

  const navLinks = [
    { name: 'home', label: t('common:nav.home') },
    { name: 'projects', label: t('common:nav.projects') },
    { name: 'about', label: t('common:nav.about') },
  ];
  const carouselItems = carouselProjectsMeta.map((m) => ({
    title: t(`home:carousel.${m.key}.title`),
    description: t(`home:carousel.${m.key}.description`),
    image: m.image,
    behanceUrl: m.behanceUrl,
  }));

  const handleNavClick = (name: 'home' | 'projects' | 'about') => {
    if (name === 'projects') {
      onNavigate('projects');
      return;
    }
    if (name === 'about') {
      onNavigate('about');
      return;
    }
    const el = document.getElementById('home');
    if (el) el.scrollIntoView({
      behavior: 'smooth'
    });
  };
    return <div className="w-full flex flex-col bg-bg box-border overflow-x-hidden">
      <SiteNavbar navLinks={navLinks} activePage="home" onNavigate={handleNavClick} siteName={t('common:name')} />

      {/* Spacer to offset fixed navbar */}
      <div className="h-[70px] md:h-[90px]" />

      {/* ── Hero Section ── */}
      <FullWidth id="home" className="bg-white rounded-b-[60px]">
        <div>
          <Inner className="flex flex-col pt-10 md:pt-[80px] pb-12 md:pb-[100px] gap-6 md:gap-[40px]">
          <div className="max-w-[860px] flex flex-col gap-6 md:gap-[40px]">
            {/* Avatar */}
            <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full bg-cover bg-center" style={{
              backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 100%), url("https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/04951239-eed1-433d-8afd-2da5f00be01c.jpg")`
            }} role="img" aria-label="Miguel Valera Profile" />

            {/* Heading */}
            <h1 className="m-0 max-w-[40ch] text-black font-manrope text-[28px] md:text-h1 font-normal leading-[1.15] md:leading-[55px]">
              {t('home:hero.title')}
            </h1>

            {/* Bio */}
            <p className="m-0 text-black font-manrope text-[15px] md:text-[16px] font-normal leading-[1.6] md:leading-[25.6px]">
              {t('home:hero.bio')}
            </p>

            {/* Social buttons */}
            <div className="flex gap-[13px]">
              <a href="https://www.linkedin.com/in/migvaler" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHoveredSocial('hero-li')} onMouseLeave={() => setHoveredSocial(null)} className="relative flex flex-row gap-[10px] p-0 cursor-pointer" aria-label="LinkedIn">
                <SocialBase isHovered={hoveredSocial === 'hero-li'} />
                <img src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/745d3dc1-75b4-4ac5-9987-89b643621b51.svg" alt="" className={`w-[16px] h-[16px] absolute left-[13px] top-[13px] transition-all duration-300 ${hoveredSocial === 'hero-li' ? 'invert' : ''}`} />
              </a>
              <a href="https://migvaler.medium.com/" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHoveredSocial('hero-be')} onMouseLeave={() => setHoveredSocial(null)} className="relative flex flex-row gap-[10px] p-0 cursor-pointer hidden" aria-label="Medium">
                <SocialBase isHovered={hoveredSocial === 'hero-be'} />
                <img src="https://cdn.simpleicons.org/medium/000000" alt="" className={`w-[16px] h-[16px] absolute left-[13px] top-[13px] transition-all duration-300 ${hoveredSocial === 'hero-be' ? 'invert' : ''}`} />
              </a>
            </div>
          </div>

          {/* ── Infinite Carousel (full inner width) ── */}
          <InfiniteCarousel items={carouselItems} />
        </Inner>
        </div>
      </FullWidth>

      {/* ── Selected Projects ── */}
      <FullWidth id="projects" className="bg-bg">
        <div>
          <Inner className="flex flex-col pt-12 md:pt-[80px] pb-12 md:pb-[100px] gap-10 md:gap-[50px]">
          <div className="flex flex-col gap-4 md:gap-[20px]">
            <h2 className="m-0 text-black font-manrope text-[26px] md:text-h2 font-medium">{t('home:selectedProjects.title')}</h2>
            <p className="m-0 max-w-[550px] text-dark-grey font-manrope text-[15px] md:text-[16px] font-normal leading-[1.6] md:leading-[25.6px]">
              {t('home:selectedProjects.intro')}
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-[20px]">
            {/* Project 1 */}
            <div className="w-full md:flex-1 md:basis-[480px] flex flex-col gap-4 md:gap-[20px] cursor-pointer group" onClick={() => onNavigate('redesign')} onMouseEnter={() => setHoveredSocial('proj-1')} onMouseLeave={() => setHoveredSocial(null)}>
              <div className="w-full h-[220px] sm:h-[280px] md:h-[383px] overflow-hidden rounded-card">
                <img src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/bf91385b-d941-4662-affe-41695dc6ea7f.jpg" alt="Rediseño de procesos" className="w-full h-full object-cover transition-transform duration-[400ms] ease-in-out group-hover:scale-105" />
              </div>
              <div className="flex flex-col gap-[10px]">
                <h3 className="m-0 font-manrope text-[22px] md:text-[30px] font-medium transition-colors duration-300" style={{
                  color: hoveredSocial === 'proj-1' ? '#F97400' : '#2A2A28'
                }}>{t('home:project1.title')}</h3>
                <p className="m-0 text-dark-grey font-manrope text-[15px] md:text-[16px] font-normal leading-[1.6] md:leading-[25.6px]">
                  {t('home:project1.description')}
                </p>
              </div>
            </div>
            {/* Project 2 */}
            <div className="w-full md:flex-1 md:basis-[480px] flex flex-col gap-4 md:gap-[20px] cursor-pointer group" onClick={() => onNavigate('migracion')} onMouseEnter={() => setHoveredSocial('proj-2')} onMouseLeave={() => setHoveredSocial(null)}>
              <div className="w-full h-[220px] sm:h-[280px] md:h-[383px] overflow-hidden rounded-card">
                <img src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/89642ec9-f96c-42fd-bcc9-2ade6e5b190b.jpg" alt="Migración de Design System" className="w-full h-full object-cover transition-transform duration-[400ms] ease-in-out group-hover:scale-105" />
              </div>
              <div className="flex flex-col gap-[10px]">
                <h3 className="m-0 font-manrope text-[22px] md:text-[30px] font-medium transition-colors duration-300" style={{
                  color: hoveredSocial === 'proj-2' ? '#F97400' : '#2A2A28'
                }}>{t('home:project2.title')}</h3>
                <p className="m-0 text-dark-grey font-manrope text-[15px] md:text-[16px] font-normal leading-[1.6] md:leading-[25.6px]">
                  {t('home:project2.description')}
                </p>
              </div>
            </div>
          </div>
        </Inner>
        </div>
      </FullWidth>

      {/* ── DesignIA Section ── */}
      <FullWidth className="flex flex-col md:flex-row group/designia" onMouseEnter={() => setDesignIAHovered(true)} onMouseLeave={() => setDesignIAHovered(false)}>
          <div className="w-full md:w-1/2 bg-black flex flex-col justify-center py-12 md:py-0 md:min-h-[400px]">
            <div className="w-full max-w-[600px] md:max-w-none md:w-full px-5 md:pl-[calc((100vw-1200px)/2+100px)] md:pr-[60px] flex flex-col gap-4 md:gap-[19px]">
              <h2 className="m-0 text-white font-manrope text-[26px] md:text-h2 font-medium cursor-pointer" onClick={() => onNavigate('portfolio')} style={{
              color: designIAHovered ? '#F97400' : '#FFFFFF',
              transition: 'color 300ms ease'
            }}>{t('home:designIA.title')}</h2>
              <p className="m-0 text-bg font-manrope text-[15px] md:text-[16px] font-normal leading-[1.6] md:leading-[25.6px]">
                {t('home:designIA.description')}
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-[250px] md:h-[400px] overflow-hidden cursor-pointer" onClick={() => onNavigate('portfolio')}>
            <img src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/10d245e6-7fe4-4a74-a952-cf9ac76af968.jpg" alt="Design + IA" className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover/designia:scale-105" />
          </div>
      </FullWidth>

      {/* ── Collaborations ── */}
      <FullWidth className="bg-bg">
        <div>
          <Inner className="flex flex-col gap-6 md:gap-[24px] pt-12 md:pt-[80px] pb-12 md:pb-[100px]">
          <div className="flex flex-col gap-[8px]">
            <h2 className="m-0 text-black font-manrope text-[26px] md:text-h2 font-medium">{t('home:collaborations.title')}</h2>
            <p className="m-0 text-dark-grey font-manrope text-[16px] md:text-[18px] font-normal">{t('home:collaborations.subtitle')}</p>
          </div>
          {/* Mobile: 3-col grid (2 rows of 3). Desktop: single row SVG */}
          <div className="md:hidden grid grid-cols-3 place-items-center gap-x-0 gap-y-0 py-[20px]">
            {[{
              label: 'BBVA',
              pos: '0%'
            }, {
              label: 'Eggs',
              pos: '20%'
            }, {
              label: 'Adecco',
              pos: '40%'
            }, {
              label: 'Dicea',
              pos: '60%'
            }, {
              label: 'Tramontana',
              pos: '80%'
            }, {
              label: 'FCC',
              pos: '100%'
            }].map((item, i) => <div key={i} className="w-full flex items-center justify-center" style={{
              height: '72px'
            }}>
                <div className="relative overflow-hidden" style={{
                width: '112px',
                maxWidth: '100%',
                height: '72px',
                opacity: 0.75
              }}>
                  <img src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/4c224cb7-6abb-43d9-95a6-75663d6f50f1.svg" alt={item.label} draggable={false} style={{
                  width: '672px',
                  height: '72px',
                  maxWidth: 'none',
                  transform: `translateX(-${i * 112}px)`
                }} />
                </div>
              </div>)}
          </div>
          <div className="hidden md:block py-[20px]">
            <img src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/4c224cb7-6abb-43d9-95a6-75663d6f50f1.svg" alt="Collaborating Brands" className="w-full h-auto" />
          </div>
        </Inner>
        </div>
      </FullWidth>

      {/* ── Contact Section ── */}
      <FullWidth id="about" className="bg-dark-grey">
        <div>
          <Inner className="flex flex-col gap-6 md:gap-[32px] pt-12 md:pt-[80px] pb-12 md:pb-[100px]">
          <div className="flex flex-col gap-[8px]">
            <h2 className="m-0 text-bg font-manrope text-[26px] md:text-h2 font-medium">{t('common:contactHeading')}</h2>
            <p className="m-0 text-bg font-manrope text-[15px] md:text-[16px] font-normal leading-[1.6] md:leading-[25.6px]">
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
      <SiteFooter navLinks={navLinks} onNavigate={handleNavClick} siteName={t('common:footer.email')} copyright={t('common:footer.copyright')} />
    </div>;
};
export const Home = PersonalPortfolio;





