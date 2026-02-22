import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SiteNavbar } from '@/components/layout/SiteNavbar';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { FadeInSection } from '@/components/animations/FadeInSection';

/* ─── Layout helpers ─── */
const FullWidth = ({
  children,
  className = '',
  style,
  reveal = true
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  reveal?: boolean;
}) => <FadeInSection reveal={reveal} className={`w-full ${className}`} style={style}>
    {children}
  </FadeInSection>;
const Inner = ({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`w-full max-w-[1200px] mx-auto px-5 md:px-[100px] ${className}`}>
    {children}
  </div>;


export const ProjectPortfolio = ({
  onNavigate
}: {
  onNavigate?: (page: 'home' | 'projects' | 'about' | 'redesign' | 'migracion' | 'portfolio' | 'vanvu') => void;
}) => {
  const { t } = useTranslation(['common', 'project3']);
  const [backHover, setBackHover] = useState(false);
  const [hoveredOther, setHoveredOther] = useState<number | null>(null);

  const handleNavigate = (page: 'home' | 'projects' | 'about' | 'redesign' | 'migracion' | 'portfolio' | 'vanvu') => {
    onNavigate?.(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const navLinks = [
    { name: 'home', label: t('common:nav.home') },
    { name: 'projects', label: t('common:nav.projects') },
    { name: 'about', label: t('common:nav.about') },
  ] as const;
  return <div className="w-full min-h-screen flex flex-col bg-bg box-border overflow-x-hidden">
      <SiteNavbar activePage="projects" navLinks={navLinks} onNavigate={handleNavigate} siteName={t('common:name')} />

      {/* Spacer */}
      <div className="h-[70px] md:h-[90px]" />

      {/* ── Hero Header ── */}
      <FullWidth className="bg-white rounded-b-[60px]">
        <div>
          <Inner className="flex flex-col pt-8 md:pt-[40px] pb-12 md:pb-[100px] gap-8 md:gap-[40px]">
            <button onMouseEnter={() => setBackHover(true)} onMouseLeave={() => setBackHover(false)} onClick={() => handleNavigate('projects')} className="self-start bg-transparent border-none p-0 cursor-pointer font-manrope text-[12px] font-medium text-black transition-colors duration-200 hover:text-accent" style={{
            color: backHover ? '#F97400' : undefined
          }}>
            {t('common:back')}
          </button>

          <h1 className="m-0 max-w-[700px] text-black font-manrope text-[28px] md:text-h1 font-normal leading-[1.15] md:leading-[55px]">
            {t('project3:title')}
          </h1>

          <p className="m-0 max-w-[700px] text-black font-manrope text-[15px] md:text-[16px] font-normal leading-[1.6] md:leading-[25.6px]">
            {t('project3:subtitle')}
          </p>

          <div className="grid grid-cols-3 gap-[14px] w-full">
            {[
              { labelKey: 'common:meta.role', value: t('common:productDesigner') },
              { labelKey: 'common:meta.client', value: t('common:personal') },
              { labelKey: 'common:meta.year', value: '2026' },
            ].map((cell, idx) => <div key={idx} className="p-[16px] md:p-[20px] bg-white border border-[#EBEBEB] rounded-lg flex flex-col gap-[10px]">
                <span className="text-[12px] font-medium text-black font-manrope">{t(cell.labelKey)}</span>
                <span className="text-[14px] md:text-[16px] font-semibold text-black font-manrope leading-snug">{cell.value}</span>
              </div>)}
          </div>
        </Inner>
        </div>
      </FullWidth>

      {/* ── Main Content ── */}
      <FullWidth className="bg-bg" reveal={false}>
        <Inner className="flex flex-col items-center py-12 md:py-[60px]">
          <div className="w-full max-w-[1000px] flex flex-col gap-8 md:gap-[40px] pb-12 md:pb-[150px]">
            <div>
              <img src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/f743eed6-9f31-49e0-a6fe-a5b8d1b6bbe3.jpg" alt="Project Hero" className="w-full h-[220px] md:h-[563px] rounded-2xl object-cover" />
            </div>

            <div className="w-full max-w-[700px] flex flex-col gap-6 md:gap-[32px]">
              <div className="flex flex-col gap-4 md:gap-[20px]">
                <h2 className="m-0 text-[22px] md:text-[30px] font-medium font-manrope text-black">{t('project3:sections.about')}</h2>
                <p className="m-0 text-[15px] md:text-[16px] leading-[1.6] md:leading-[25.6px] font-manrope text-black whitespace-pre-line">
                  {t('project3:aboutProject')}
                </p>
              </div>

              <div className="flex flex-col gap-4 md:gap-[20px]">
                <h2 className="m-0 text-[22px] md:text-[30px] font-medium font-manrope text-black">{t('project3:sections.keyObjectives')}</h2>
                <p className="m-0 text-[15px] md:text-[16px] leading-[1.6] md:leading-[25.6px] font-manrope text-black whitespace-pre-line">
                  {t('project3:keyObjectives')}
                </p>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[10px]">
              <img src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/6ef97a5b-4aa4-44b7-897b-b3a12740e624.png" alt="Process 1" className="w-full h-[200px] md:h-[305px] rounded-2xl object-cover" />
              <img src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/0ad09ae1-01a8-45eb-8f50-6403325c4940.png" alt="Process 2" className="w-full h-[200px] md:h-[305px] rounded-2xl object-cover" />
            </div>

            <div className="w-full max-w-[700px] flex flex-col gap-4 md:gap-[20px]">
              <h2 className="m-0 text-[22px] md:text-[30px] font-medium font-manrope text-black">{t('project3:sections.figmaMake')}</h2>
              <p className="m-0 text-[15px] md:text-[16px] leading-[1.6] md:leading-[25.6px] font-manrope text-black whitespace-pre-line">
                {t('project3:figmaMake')}
              </p>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[10px]">
              <img src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/a43e7202-be85-41ec-a77d-40210c4ef250.png" alt="Tooling 1" className="w-full h-[200px] md:h-[305px] rounded-2xl object-cover" />
              <img src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/241a8c03-1373-4116-9592-9105780dbbbc.png" alt="Tooling 2" className="w-full h-[200px] md:h-[305px] rounded-2xl object-cover" />
            </div>

            <div className="w-full max-w-[700px] flex flex-col gap-4 md:gap-[20px]">
              <h2 className="m-0 text-[22px] md:text-[30px] font-medium font-manrope text-black">{t('project3:sections.magicPathCursor')}</h2>
              <p className="m-0 text-[15px] md:text-[16px] leading-[1.6] md:leading-[25.6px] font-manrope text-black whitespace-pre-line">
                {t('project3:magicPathCursor')}
              </p>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[10px]">
              <img src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/c1befe75-ad19-47a6-9bf6-d08ceed280b8.png" alt="Result 1" className="w-full h-[200px] md:h-[305px] rounded-2xl object-cover" />
              <img src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/15b3ffcd-d2c4-4a71-a01f-8b9d851f9325.png" alt="Result 2" className="w-full h-[200px] md:h-[305px] rounded-2xl object-cover" />
            </div>

            <div className="w-full max-w-[700px] flex flex-col gap-4 md:gap-[20px]">
              <h2 className="m-0 text-[22px] md:text-[30px] font-medium font-manrope text-black">{t('project3:sections.errorsLearnings')}</h2>
              <p className="m-0 text-[15px] md:text-[16px] leading-[1.6] md:leading-[25.6px] font-manrope text-black">
                {t('project3:errorsLearnings')}
              </p>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[10px]">
              <img src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/42d2dafb-1cd7-45b1-994e-64ce4ddd9bc4.png" alt="Learning 1" className="w-full h-[200px] md:h-[305px] rounded-2xl object-cover" />
              <img src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/36627d7e-e6c5-40b4-8791-d2d5054ef732.png" alt="Learning 2" className="w-full h-[200px] md:h-[305px] rounded-2xl object-cover" />
            </div>

            <img src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/f743eed6-9f31-49e0-a6fe-a5b8d1b6bbe3.jpg" alt="Final Portfolio" className="w-full h-[220px] md:h-[563px] rounded-2xl object-cover" />

            <div className="w-full max-w-[700px] flex flex-col gap-4 md:gap-[20px]">
              <h2 className="m-0 text-[22px] md:text-[30px] font-medium font-manrope text-black">{t('project3:sections.retrospective')}</h2>
              <p className="m-0 text-[15px] md:text-[16px] leading-[1.6] md:leading-[25.6px] font-manrope text-black">
                {t('project3:retrospective')}
              </p>
            </div>
          </div>
        </Inner>
      </FullWidth>

      {/* ── Other Projects ── */}
      <FullWidth className="bg-dark-grey">
        <div>
          <Inner className="flex flex-col gap-6 md:gap-[30px] pt-12 md:pt-[80px] pb-12 md:pb-[150px]">
            <h2 className="m-0 text-bg font-manrope text-[26px] md:text-[40px] font-medium">{t('common:otherProjects')}</h2>
            <div className="flex flex-col gap-8 md:gap-[40px]">
              {[{
              titleKey: 'project3:otherMigracion.title',
              subtitleKey: 'project3:otherMigracion.subtitle',
              image: 'https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/1c8131a0-4238-4467-9ccb-9d9dcaa2abc9.jpg',
              page: 'migracion' as const
            }, {
              titleKey: 'project3:otherRedesign.title',
              subtitleKey: 'project3:otherRedesign.subtitle',
              image: 'https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/08099dd4-8b36-4f9c-a923-f00214e8cbd6.jpg',
              page: 'redesign' as const
            }].map((project, idx) => <div key={idx} className="flex flex-col md:flex-row gap-4 md:gap-[28px] max-w-[800px] cursor-pointer" onClick={() => handleNavigate(project.page)} onMouseEnter={() => setHoveredOther(idx)} onMouseLeave={() => setHoveredOther(null)}>
                  <div className="w-full md:w-[250px] h-[160px] md:h-[126px] rounded-2xl overflow-hidden flex-shrink-0">
                    <img src={project.image} alt={t(project.titleKey)} className="w-full h-full object-cover transition-transform duration-[400ms] ease-in-out" style={{
                  transform: hoveredOther === idx ? 'scale(1.07)' : 'scale(1)'
                }} />
                  </div>
                  <div className="flex flex-col gap-[10px] justify-center">
                    <h3 className="m-0 font-manrope text-[20px] md:text-[30px] font-medium leading-[1.3] transition-colors duration-300" style={{
                  color: hoveredOther === idx ? '#F97400' : '#F3F3F2'
                }}>{t(project.titleKey)}</h3>
                    <p className="m-0 text-bg font-manrope text-[12px] font-medium">{t(project.subtitleKey)}</p>
                  </div>
                </div>)}
            </div>
          </Inner>
        </div>
      </FullWidth>

      {/* ── Footer ── */}
      <SiteFooter navLinks={navLinks} onNavigate={handleNavigate} siteName={t('common:footer.email')} copyright={t('common:footer.copyright')} />
    </div>;
};

