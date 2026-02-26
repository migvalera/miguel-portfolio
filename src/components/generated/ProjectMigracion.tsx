import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SiteNavbar } from '@/components/layout/SiteNavbar';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { FadeInSection } from '@/components/animations/FadeInSection';
import migration03Img from '@/assets/images/projects/Migration_03.jpg';

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


export const ProjectMigracion = ({
  onNavigate
}: {
  onNavigate?: (page: 'home' | 'projects' | 'about' | 'redesign' | 'migracion' | 'portfolio' | 'vanvu') => void;
}) => {
  const { t } = useTranslation(['common', 'project2']);
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
            {t('project2:title')}
          </h1>

          <p className="m-0 max-w-[700px] text-black font-manrope text-[15px] md:text-[16px] font-normal leading-[1.6] md:leading-[25.6px]">
            {t('project2:subtitle')}
          </p>

          <div className="grid grid-cols-3 gap-[14px] w-full">
            {[
              { labelKey: 'common:meta.role', value: t('common:productDesigner') },
              { labelKey: 'common:meta.client', value: t('common:bbva') },
              { labelKey: 'common:meta.year', value: '2025' },
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
              <img src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/65646d09-26f9-45ef-bb73-bce6b9f5e329.jpg" alt="Project Overview" className="w-full h-[220px] md:h-[563px] rounded-2xl object-cover" />
            </div>

            <div className="max-w-[700px] flex flex-col gap-6 md:gap-[32px]">
              <section className="flex flex-col gap-4 md:gap-[20px]">
                <h2 className="m-0 text-[22px] md:text-[30px] font-medium font-manrope text-black">{t('project2:sections.about')}</h2>
                <p className="m-0 text-[15px] md:text-[16px] leading-[1.6] md:leading-[25.6px] font-manrope text-black">
                  {t('project2:aboutProject')}
                </p>
              </section>
        <section className="flex flex-col gap-4 md:gap-[20px]">
                <h2 className="m-0 text-[22px] md:text-[30px] font-medium font-manrope text-black">{t('project2:sections.role')}</h2>
                <p className="m-0 text-[15px] md:text-[16px] leading-[1.6] md:leading-[25.6px] font-manrope text-black whitespace-pre-line">
                  {t('project2:role')}
                </p>
              </section>
              <section className="flex flex-col gap-4 md:gap-[20px]">
                <h2 className="m-0 text-[22px] md:text-[30px] font-medium font-manrope text-black">{t('project2:sections.keyObjectives')}</h2>
                <p className="m-0 text-[15px] md:text-[16px] leading-[1.6] md:leading-[25.6px] font-manrope text-black whitespace-pre-line">
                  {t('project2:keyObjectives')}
                </p>
              </section>
            </div>

            <div className="flex flex-col md:flex-row gap-[10px] w-full">
              <img src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/a68ae16e-bb83-4977-8167-ea667c117bd1.jpg" alt="Process 1" className="w-full md:w-[calc(50%-5px)] h-[200px] md:h-[305px] rounded-2xl object-cover" />
              <img src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/090bab33-8c85-4cdd-9345-62cc2afe0769.jpg" alt="Process 2" className="w-full md:w-[calc(50%-5px)] h-[200px] md:h-[305px] rounded-2xl object-cover" />
            </div>

            <div className="max-w-[700px] flex flex-col gap-6 md:gap-[32px]">
              <section className="flex flex-col gap-4 md:gap-[20px]">
                <h2 className="m-0 text-[22px] md:text-[30px] font-medium font-manrope text-black">{t('project2:sections.tacticalSolution')}</h2>
                <p className="m-0 text-[15px] md:text-[16px] leading-[1.6] md:leading-[25.6px] font-manrope text-black">
                  {t('project2:tacticalSolution')}
                </p>
              </section>

              <section className="flex flex-col gap-4 md:gap-[20px]">
                <h2 className="m-0 text-[22px] md:text-[30px] font-medium font-manrope text-black">{t('project2:sections.migrationValidation')}</h2>
                <p className="m-0 text-[15px] md:text-[16px] leading-[1.6] md:leading-[25.6px] font-manrope text-black">
                  {t('project2:migrationValidation')}
                </p>
              </section>
            </div>

            <div className="flex flex-col md:flex-row gap-[10px] w-full">
              <img src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/270787cb-8394-4196-93e5-5a65243ceac7.jpg" alt="Flow 1" className="w-full md:w-[calc(50%-5px)] h-[200px] md:h-[305px] rounded-2xl object-cover" />
              <img src={migration03Img} alt="Flow 2" className="w-full md:w-[calc(50%-5px)] h-[200px] md:h-[305px] rounded-2xl object-cover" />
            </div>

            <img src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/5a517d48-feb4-4975-b54e-d40cd9fdc864.jpg" alt="Validation Flow Detail" className="w-full h-[220px] md:h-[563px] rounded-2xl object-cover" />

            <section className="max-w-[700px] flex flex-col gap-4 md:gap-[20px]">
              <h2 className="m-0 text-[22px] md:text-[30px] font-medium font-manrope text-black">{t('project2:sections.retrospective')}</h2>
              <p className="m-0 text-[15px] md:text-[16px] leading-[1.6] md:leading-[25.6px] font-manrope text-black whitespace-pre-line">
                {t('project2:retrospective')}
              </p>
            </section>
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
              img: 'https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/80710bfd-07fe-4cd0-ad51-c67414740824.jpg',
              titleKey: 'project2:otherRedesign.title',
              descKey: 'project2:otherRedesign.desc',
              page: 'redesign' as const
            }, {
              img: 'https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/a78a2346-9296-4b54-994d-16e3bd1066de.jpg',
              titleKey: 'project2:otherPortfolio.title',
              descKey: 'project2:otherPortfolio.desc',
              page: 'portfolio' as const
            }].map((project, idx) => <div key={idx} className="flex flex-col md:flex-row gap-4 md:gap-[28px] max-w-[800px] cursor-pointer" onClick={() => handleNavigate(project.page)} onMouseEnter={() => setHoveredOther(idx)} onMouseLeave={() => setHoveredOther(null)}>
                  <div className="w-full md:w-[250px] h-[160px] md:h-[126px] rounded-2xl overflow-hidden flex-shrink-0">
                    <img src={project.img} alt={t(project.titleKey)} className="w-full h-full object-cover transition-transform duration-[400ms] ease-in-out" style={{
                  transform: hoveredOther === idx ? 'scale(1.07)' : 'scale(1)'
                }} />
                  </div>
                  <div className="flex flex-col gap-[10px] justify-center">
                    <h3 className="m-0 font-manrope text-[20px] md:text-[30px] font-medium leading-[1.3] transition-colors duration-300" style={{
                  color: hoveredOther === idx ? '#F97400' : '#F3F3F2'
                }}>{t(project.titleKey)}</h3>
                    <p className="m-0 text-bg font-manrope text-[12px] font-medium">{t(project.descKey)}</p>
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
export { ProjectMigracion as PortfolioWebsite };

