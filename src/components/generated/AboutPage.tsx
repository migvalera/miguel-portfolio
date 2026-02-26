import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SiteNavbar } from '@/components/layout/SiteNavbar';
import { SiteFooter } from '@/components/layout/SiteFooter';

/* ─── Layout helpers (matching PersonalPortfolio) ─── */
const FullWidth = ({
  children,
  className = '',
  id,
  style
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}) => <div id={id} className={`w-full ${className}`} style={style}>{children}</div>;
const Inner = ({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`w-full max-w-[1200px] mx-auto px-5 md:px-[100px] ${className}`}>{children}</div>;


export const AboutPage = ({
  onNavigate
}: {
  onNavigate?: (page: 'home' | 'projects' | 'about') => void;
}) => {
  const { t } = useTranslation(['common', 'about']);
  const [btnHover, setBtnHover] = useState(false);
  const [contactBtnHover, setContactBtnHover] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsPageVisible(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const handleNavigate = (page: 'home' | 'projects' | 'about') => {
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
      <SiteNavbar activePage="about" navLinks={navLinks} onNavigate={handleNavigate} siteName={t('common:name')} />

      {/* Spacer */}
      <div className="h-[70px] md:h-[90px]" />
      <div className="transition-opacity duration-300" style={{
      opacity: isPageVisible ? 1 : 0
    }}>

      {/* ── Hero ── */}
      <FullWidth className="bg-white rounded-b-[60px]">
        <div>
          <Inner className="flex flex-col md:flex-row flex-wrap pt-10 md:pt-[80px] pb-12 md:pb-[100px] gap-8 md:gap-[40px]">
          <div className="flex-1 min-w-[280px] flex flex-col gap-6 md:gap-[40px]">
            <h1 className="m-0 text-black font-manrope text-[28px] md:text-h1 font-normal leading-[1.15] md:leading-[55px]">
              {t('about:hero.title')}
            </h1>
            <p className="m-0 text-black font-manrope text-[15px] md:text-[16px] font-normal leading-[1.6] md:leading-[25.6px]">
              {t('about:hero.bio')}
            </p>
            {/* Descargar CV */}
            <a href="https://drive.google.com/file/d/1Zyu69K34A8kTdpLaDE6-Ign0bKigeEB1/view?usp=drive_link" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setBtnHover(true)} onMouseLeave={() => setBtnHover(false)} className="self-start inline-flex items-center h-[42px] px-[20px] border rounded-lg cursor-pointer font-manrope text-nav font-normal transition-all duration-300 no-underline" style={{
              backgroundColor: btnHover ? '#000' : '#fff',
              color: btnHover ? '#F3F3F2' : '#2A2A28',
              borderColor: btnHover ? '#000' : '#D9D9D6',
              transform: btnHover ? 'translateY(-1px)' : 'translateY(0)'
            }}>
              {t('about:downloadCV')}
            </a>
          </div>
          <div className="flex-shrink-0">
            <img src="@/assets/images/projects/About_01.jpg" alt="Miguel Valera" className="w-full md:w-[475px] h-[260px] md:h-[329px] rounded-[13px] object-cover" />
          </div>
        </Inner>
        </div>
      </FullWidth>

      {/* ── Experience & Education ── */}
      <FullWidth className="bg-bg">
        <div>
          <Inner className="flex flex-col gap-14 md:gap-[56px] pt-12 md:pt-[80px] pb-12 md:pb-[80px]">
          {/* Experience */}
          <section className="max-w-[800px] flex flex-col gap-6 md:gap-[24px]">
            <h2 className="m-0 text-black font-manrope text-[32px] md:text-[40px] font-medium leading-[1.3]">{t('about:experience.title')}</h2>
            <p className="m-0 text-[#4C4D59] font-manrope text-[15px] md:text-[16px] leading-[1.6] md:leading-[25.6px]">
              {t('about:experience.intro')}
            </p>

            {(['bbva', 'freelance', 'adecco', 'dicea'] as const).map((companyKey, idx) => {
              const company = t(`about:companies.${companyKey}.role`);
              const content = companyKey === 'bbva' ? <div className="flex flex-col gap-4 text-[#4C4D59] text-[15px] md:text-[16px] leading-[1.6] md:leading-[25.6px]">
                    <div>
                      <p className="m-0 font-medium">{t('about:companies.bbva.designSystem')}</p>
                      <p className="m-0 whitespace-pre-line">{t('about:companies.bbva.designSystemContent')}</p>
                    </div>
                    <div>
                      <p className="m-0 font-medium">{t('about:companies.bbva.productDesigner')}</p>
                      <p className="m-0 whitespace-pre-line">{t('about:companies.bbva.productDesignerContent')}</p>
                    </div>
                    <div className="mt-4">
                      <p className="m-0 font-semibold">{t('about:companies.bbva.highlights')}</p>
                      <p className="m-0 whitespace-pre-line">{t('about:companies.bbva.highlightsContent')}</p>
                    </div>
                  </div> : companyKey === 'freelance' ? <div className="text-[#4C4D59] text-[15px] md:text-[16px] leading-[1.6] md:leading-[25.6px]">
                    <p className="m-0 font-medium">{t('about:companies.freelance.projects')}</p>
                    <p className="m-0 whitespace-pre-line">{t('about:companies.freelance.content')}</p>
                  </div> : companyKey === 'adecco' ? <div className="text-[#4C4D59] text-[15px] md:text-[16px] leading-[1.6] md:leading-[25.6px]">
                    <p className="m-0 font-medium">{t('about:companies.adecco.division')}</p>
                    <p className="m-0 whitespace-pre-line">{t('about:companies.adecco.content')}</p>
                  </div> : <p className="m-0 text-[#4C4D59] text-[15px] md:text-[16px] leading-[1.6] md:leading-[25.6px]">{t('about:companies.dicea.content')}</p>;
              const companyLabel = companyKey === 'bbva' ? 'BBVA' : companyKey === 'freelance' ? 'Freelance' : companyKey === 'adecco' ? 'Adecco Group' : 'Dicea Psicología Jurídica';
              return <article key={idx} className="flex flex-col mt-6 md:mt-[40px] first:mt-0">
                <h3 className="m-0 text-[20px] md:text-[24px] font-medium text-black">{companyLabel}</h3>
                <p className="m-0 mt-1 mb-4 text-[15px] md:text-[16px] text-[#4C4D59]">{company}</p>
                {content}
              </article>;
            })}
          </section>

          {/* Formation */}
          <section className="max-w-[800px] flex flex-col gap-6 md:gap-[32px]">
            <h2 className="m-0 text-black font-manrope text-[32px] md:text-[40px] font-medium leading-[1.3]">{t('about:formation.title')}</h2>
            <p className="m-0 text-[#4C4D59] font-manrope text-[15px] md:text-[16px] leading-[1.6] md:leading-[25.6px]">
              {t('about:formation.intro')}
            </p>
            <div className="flex flex-col gap-[24px]">
              {[0, 1, 2, 3, 4, 5].map((idx) => <div key={idx} className="flex flex-col">
                  <span className="text-[18px] md:text-[20px] font-medium text-black leading-[1.4]">{t(`about:education.${idx}.title`)}</span>
                  <span className="text-[15px] md:text-[16px] text-[#4C4D59] leading-[1.6]">{t(`about:education.${idx}.sub`)}</span>
                </div>)}
            </div>
          </section>

          {/* Skills */}
          <section className="max-w-[800px] flex flex-col gap-4">
            <h2 className="m-0 text-black font-manrope text-[32px] md:text-[40px] font-medium leading-[1.3]">{t('about:skills.title')}</h2>
            <p className="m-0 text-[#4C4D59] font-manrope text-[15px] md:text-[16px] leading-[1.6] md:leading-[25.6px]">
              {t('about:skills.intro')}
            </p>
            <p className="m-0 text-[#4C4D59] font-manrope text-[15px] md:text-[16px] leading-[1.6] md:leading-[25.6px] whitespace-pre-line">
              {t('about:skills.list')}
            </p>
          </section>
        </Inner>
        </div>
      </FullWidth>

      {/* ── Collaborations ── */}
      <FullWidth style={{
      backgroundColor: 'rgba(235,235,235,1)'
    }}>
        <div>
          <Inner className="flex flex-col gap-6 md:gap-[24px] pt-12 md:pt-[80px] pb-12 md:pb-[100px]">
          <div className="flex flex-col gap-[8px]">
            <h2 className="m-0 text-black font-manrope text-[26px] md:text-[40px] font-medium">{t('about:collaborations.title')}</h2>
            <p className="m-0 text-[#4C4D59] font-manrope text-[15px] md:text-[18px]">{t('about:collaborations.subtitle')}</p>
          </div>
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
            <img src="https://storage.googleapis.com/storage.magicpath.ai/user/374596014063120384/figma-assets/4c224cb7-6abb-43d9-95a6-75663d6f50f1.svg" alt="Colaboraciones" className="w-full h-auto" />
          </div>
        </Inner>
        </div>
      </FullWidth>

      {/* ── Contact ── */}
      <FullWidth className="bg-dark-grey">
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
      <SiteFooter navLinks={navLinks} onNavigate={handleNavigate} siteName={t('common:footer.email')} copyright={t('common:footer.copyright')} />
      </div>
    </div>;
};
export { AboutPage as CompanyAboutPage };
