import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const partners = [
  { name: 'Jordan Investment Commission', logo: 'JIC' },
  { name: 'Central Bank of Jordan', logo: 'CBJ' },
  { name: 'Ministry of Industry', logo: 'MOI' },
  { name: 'USAID Jordan', logo: 'USAID' },
  { name: 'World Bank Group', logo: 'WBG' },
  { name: 'European Union', logo: 'EU' },
  { name: 'German GIZ', logo: 'GIZ' },
  { name: 'IFC', logo: 'IFC' },
];

const PartnersSection: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('partners.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('partners.subtitle')}
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group bg-card rounded-xl p-6 flex items-center justify-center h-24 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-2xl font-bold text-muted-foreground/50 group-hover:text-primary transition-colors duration-300">
                {partner.logo}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
