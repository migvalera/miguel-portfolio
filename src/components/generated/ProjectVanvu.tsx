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
}) => <FadeInSection reveal={reveal} className={`w-full ${className}`} style={style}>{children}</FadeInSection>;
const Inner = ({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`w-full max-w-[1200px] mx-auto px-5 md:px-[100px] ${className}`}>{children}</div>;

export const ProjectVanvu = ({
  onNavigate
}: {
  onNavigate?: (page: 'home' | 'projects' | 'about' | 'redesign' | 'migracion' | 'portfolio' | 'vanvu') => void;
}) => {
  const { t } = useTranslation(['common', 'project4']);
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
          {t('project4:title')}
        </h1>

        <p className="m-0 max-w-[700px] text-black font-manrope text-[15px] md:text-[16px] font-normal leading-[1.6] md:leading-[25.6px]">
          {t('project4:subtitle')}
        </p>

        <div className="grid grid-cols-3 gap-[14px] w-full">
          {[
              { labelKey: 'common:meta.role', value: t('common:productDesigner') },
              { labelKey: 'common:meta.client', value: t('common:personal') },
              { labelKey: 'common:meta.year', value: '2022' },
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
        <div className="w-full max-w-[1000px] flex flex-col gap-10 md:gap-[60px] pb-12 md:pb-[150px]">

          {/* Hero image */}
          <div>
            <img src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/4c7b6b47-9130-444e-8a5e-31319543b1b6.jpg" alt="Vanvu Project Hero" className="w-full h-[220px] md:h-[563px] rounded-2xl object-cover" />
          </div>

          {/* Sobre el proyecto */}
          <div>
            <section className="max-w-[700px] flex flex-col gap-6 md:gap-[40px]">
              <div className="flex flex-col gap-4 md:gap-[20px]">
                <h2 className="m-0 text-[22px] md:text-[30px] font-medium font-manrope text-black">{t('project4:sections.about')}</h2>
                <p className="m-0 text-[15px] md:text-[16px] leading-[1.6] md:leading-[25.6px] font-manrope text-black whitespace-pre-line">
                  {t('project4:aboutProject')}
                </p>
              </div>
              <div className="flex flex-col gap-4 md:gap-[20px]">
                <h2 className="m-0 text-[22px] md:text-[30px] font-medium font-manrope text-black">{t('project4:sections.keyObjectives')}</h2>
                <p className="m-0 text-[15px] md:text-[16px] leading-[1.6] md:leading-[25.6px] font-manrope text-black whitespace-pre-line">
                  {t('project4:keyObjectives')}
                </p>
              </div>
            </section>
          </div>

          {/* Benchmarking */}
          <div>
            <article className="flex flex-col gap-6 md:gap-[40px]">
              <div className="max-w-[700px] flex flex-col gap-4 md:gap-[20px]">
                <h2 className="m-0 text-[22px] md:text-[30px] font-medium font-manrope text-black">{t('project4:sections.benchmarking')}</h2>
                <p className="m-0 text-[15px] md:text-[16px] leading-[1.6] md:leading-[25.6px] font-manrope text-black whitespace-pre-line">
                  {t('project4:benchmarking')}
                </p>
              </div>
              <div className="flex gap-[14px] md:gap-[20px] flex-col sm:flex-row" style={{
                maxWidth: '495px'
              }}>
                <img src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/2c6a0335-6bda-45a2-af43-85afe180264e.png" alt="Product Canvas 1" className="flex-1 h-[200px] md:h-[350px] rounded-2xl object-cover" />
                <img src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/2631b003-8631-4de2-b450-f8483b876be9.png" alt="Product Canvas 2" className="flex-1 h-[200px] md:h-[350px] rounded-2xl object-cover" />
              </div>
            </article>
          </div>

          {/* Entrevistas */}
          <div>
            <article className="flex flex-col gap-6 md:gap-[40px]">
              <div className="max-w-[700px] flex flex-col gap-4 md:gap-[20px]">
                <h2 className="m-0 text-[22px] md:text-[30px] font-medium font-manrope text-black">{t('project4:sections.interviews')}</h2>
                <p className="m-0 text-[15px] md:text-[16px] leading-[1.6] md:leading-[25.6px] font-manrope text-black">
                  {t('project4:interviews')}
                </p>
              </div>
              <div className="flex gap-[14px] md:gap-[20px] flex-col sm:flex-row" style={{
                maxWidth: '495px'
              }}>
                <img src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/394685f5-b7ec-4e6a-9315-4b93ddda62eb.png" alt="Interview Analysis 1" className="flex-1 h-auto rounded-2xl object-cover" />
                <img src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/bae37d83-4869-426b-86b4-b4bc46f8d679.png" alt="Interview Analysis 2" className="flex-1 h-auto rounded-2xl object-cover" />
              </div>
            </article>
          </div>

          {/* Service blueprint + Wireframes + Prototipo + Test */}
          <div className="flex flex-col gap-10 md:gap-[60px]">
            <article className="flex flex-col gap-6 md:gap-[40px]">
              <div className="max-w-[700px] flex flex-col gap-4 md:gap-[20px]">
                <h2 className="m-0 text-[22px] md:text-[30px] font-medium font-manrope text-black">{t('project4:sections.serviceBlueprint')}</h2>
                <p className="m-0 text-[15px] md:text-[16px] leading-[1.6] md:leading-[25.6px] font-manrope text-black">
                  {t('project4:serviceBlueprint')}
                </p>
              </div>
              <img src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/32cc3969-9053-4847-b208-4f1fb6241d80.png" alt="Service Blueprint" className="w-full rounded-2xl object-cover" />
            </article>

            <article className="flex flex-col gap-6 md:gap-[40px]">
              <div className="max-w-[700px] flex flex-col gap-4 md:gap-[20px]">
                <h2 className="m-0 text-[22px] md:text-[30px] font-medium font-manrope text-black">{t('project4:sections.wireframes')}</h2>
                <p className="m-0 text-[15px] md:text-[16px] leading-[1.6] md:leading-[25.6px] font-manrope text-black">
                  {t('project4:wireframes')}
                </p>
              </div>
              <img src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/c9a9e187-ae93-442a-a4db-bf4d0f0d14aa.png" alt="Wireframes" className="w-full rounded-2xl object-cover" />
            </article>

            <article className="flex flex-col gap-6 md:gap-[40px]">
              <div className="max-w-[700px] flex flex-col gap-4 md:gap-[20px]">
                <h2 className="m-0 text-[22px] md:text-[30px] font-medium font-manrope text-black">{t('project4:sections.functionalPrototype')}</h2>
                <p className="m-0 text-[15px] md:text-[16px] leading-[1.6] md:leading-[25.6px] font-manrope text-black">
                  {t('project4:functionalPrototype')}
                </p>
              </div>
              <div className="max-w-[700px] flex flex-col gap-4 md:gap-[20px]">
                <h2 className="m-0 text-[22px] md:text-[30px] font-medium font-manrope text-black">{t('project4:sections.userTest')}</h2>
                <p className="m-0 text-[15px] md:text-[16px] leading-[1.6] md:leading-[25.6px] font-manrope text-black">
                  {t('project4:userTest')}
                </p>
              </div>
              <img src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/01f5f194-897d-4c79-a7e2-dfb2ed0f465e.png" alt="Functional Prototype" className="w-full rounded-2xl object-cover" />
            </article>

            <article className="max-w-[700px] flex flex-col gap-4 md:gap-[20px]">
              <h2 className="m-0 text-[22px] md:text-[30px] font-medium font-manrope text-black">{t('project4:sections.retrospective')}</h2>
              <p className="m-0 text-[15px] md:text-[16px] leading-[1.6] md:leading-[25.6px] font-manrope text-black whitespace-pre-line">
                {t('project4:retrospective')}
              </p>
            </article>
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
              img: 'https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/add5f271-9666-4b75-a465-d11d2b2fbdfd.jpg',
              titleKey: 'project4:otherMigracion.title',
              descKey: 'project4:otherMigracion.desc',
              page: 'migracion' as const
            }, {
              img: 'https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/a898fffd-82b3-4766-a0ee-451ac92340b5.jpg',
              titleKey: 'project4:otherPortfolio.title',
              descKey: 'project4:otherPortfolio.desc',
              page: 'portfolio' as const
            }].map((project, idx) => <div key={idx} className="flex flex-col md:flex-row gap-4 md:gap-[28px] max-w-[800px] cursor-pointer" onClick={() => handleNavigate(project.page)} onMouseEnter={() => setHoveredOther(idx)} onMouseLeave={() => setHoveredOther(null)}>
              <div className="w-full md:w-[250px] h-[160px] md:h-[126px] rounded-2xl overflow-hidden flex-shrink-0">
                <img src={project.img} alt={t(project.titleKey)} className="w-full h-full object-cover transition-transform duration-[400ms] ease-in-out" style={{
                  transform: hoveredOther === idx ? 'scale(1.07)' : 'scale(1)'
                }} />
              </div>
              <div className="flex flex-col gap-[10px] justify-center">
                <h3 className="m-0 font-manrope text-[20px] md:text-[26px] font-medium leading-[1.3] transition-colors duration-300" style={{
                  color: hoveredOther === idx ? '#F97400' : '#F3F3F2'
                }}>{t(project.titleKey)}</h3>
                <p className="m-0 text-bg font-manrope text-[12px] font-medium opacity-80">{t(project.descKey)}</p>
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


