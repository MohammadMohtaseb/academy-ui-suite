import React from 'react';
import { Target, Eye, Award, Users, BookOpen, Building2, CheckCircle } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import academyLogo from '@/assets/academy-logo.png';

const About: React.FC = () => {
  const { t, language } = useLanguage();

  const values = [
    {
      icon: Award,
      titleEn: 'Excellence',
      titleAr: 'التميز',
      descEn: 'We strive for the highest standards in everything we do.',
      descAr: 'نسعى لأعلى المعايير في كل ما نقوم به.',
    },
    {
      icon: Users,
      titleEn: 'Collaboration',
      titleAr: 'التعاون',
      descEn: 'Working together to achieve exceptional results.',
      descAr: 'العمل معاً لتحقيق نتائج استثنائية.',
    },
    {
      icon: BookOpen,
      titleEn: 'Innovation',
      titleAr: 'الابتكار',
      descEn: 'Continuously evolving our methods and content.',
      descAr: 'التطوير المستمر لأساليبنا ومحتوانا.',
    },
    {
      icon: Building2,
      titleEn: 'Integrity',
      titleAr: 'النزاهة',
      descEn: 'Upholding ethical standards in all operations.',
      descAr: 'التمسك بالمعايير الأخلاقية في جميع العمليات.',
    },
  ];

  const milestones = [
    { year: '1995', titleEn: 'Academy Founded', titleAr: 'تأسيس الأكاديمية' },
    { year: '2005', titleEn: 'First International Accreditation', titleAr: 'أول اعتماد دولي' },
    { year: '2015', titleEn: 'Launched E-Learning Platform', titleAr: 'إطلاق منصة التعليم الإلكتروني' },
    { year: '2020', titleEn: '15,000+ Trained Professionals', titleAr: 'أكثر من 15,000 متدرب' },
    { year: '2024', titleEn: 'Regional Training Hub', titleAr: 'مركز تدريب إقليمي' },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <img src={academyLogo} alt="Academy Logo" className="h-20 mx-auto mb-8 brightness-0 invert" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('about.title')}
            </h1>
            <p className="text-xl text-primary-foreground/70">
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-card rounded-3xl p-10 shadow-lg border border-border hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">{t('about.mission')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('about.missionText')}</p>
            </div>

            {/* Vision */}
            <div className="bg-card rounded-3xl p-10 shadow-lg border border-border hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">{t('about.vision')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('about.visionText')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {language === 'en' ? 'Our Core Values' : 'قيمنا الأساسية'}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 text-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mx-auto mb-4 text-primary-foreground">
                  <value.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {language === 'en' ? value.titleEn : value.titleAr}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {language === 'en' ? value.descEn : value.descAr}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {language === 'en' ? 'Our Journey' : 'رحلتنا'}
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-primary" />
                  {index !== milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <Badge className="mb-2">{milestone.year}</Badge>
                  <h3 className="text-xl font-semibold text-foreground">
                    {language === 'en' ? milestone.titleEn : milestone.titleAr}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'en' ? 'Accreditations & Partnerships' : 'الاعتمادات والشراكات'}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {['ISO 9001', 'PMI ATP', 'HRCI', 'CFA Partner'].map((acc, index) => (
              <div
                key={index}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 flex items-center justify-center border border-primary-foreground/20"
              >
                <span className="text-lg font-bold">{acc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
