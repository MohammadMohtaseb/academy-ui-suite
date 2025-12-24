import React from 'react';
import { Award, Users, Monitor, Headphones, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const FeaturesSection: React.FC = () => {
  const { t, language, direction } = useLanguage();

  const features = [
    {
      icon: Award,
      title: t('features.certified'),
      description: t('features.certifiedDesc'),
      color: 'from-primary to-primary-light',
      benefits: [
        language === 'en' ? 'Globally recognized' : 'معترف بها عالمياً',
        language === 'en' ? 'Industry standards' : 'معايير الصناعة',
        language === 'en' ? 'Career advancement' : 'التقدم الوظيفي',
      ],
    },
    {
      icon: Users,
      title: t('features.experts'),
      description: t('features.expertsDesc'),
      color: 'from-secondary to-accent',
      benefits: [
        language === 'en' ? '15+ years experience' : 'أكثر من 15 سنة خبرة',
        language === 'en' ? 'Industry leaders' : 'قادة الصناعة',
        language === 'en' ? 'Practical insights' : 'رؤى عملية',
      ],
    },
    {
      icon: Monitor,
      title: t('features.flexible'),
      description: t('features.flexibleDesc'),
      color: 'from-info to-primary-light',
      benefits: [
        language === 'en' ? 'Online courses' : 'دورات إلكترونية',
        language === 'en' ? 'Hybrid options' : 'خيارات مختلطة',
        language === 'en' ? 'Self-paced learning' : 'تعلم ذاتي',
      ],
    },
    {
      icon: Headphones,
      title: t('features.support'),
      description: t('features.supportDesc'),
      color: 'from-success to-secondary',
      benefits: [
        language === 'en' ? 'Live chat support' : 'دعم مباشر',
        language === 'en' ? 'Email assistance' : 'مساعدة عبر البريد',
        language === 'en' ? 'Dedicated mentors' : 'مرشدون مخصصون',
      ],
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {language === 'en' ? 'Why Choose Our Academy?' : 'لماذا تختار أكاديميتنا؟'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {language === 'en'
              ? 'Discover the advantages that set us apart and make your learning journey exceptional.'
              : 'اكتشف المزايا التي تميزنا وتجعل رحلة تعلمك استثنائية.'}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Gradient */}
              <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br",
                feature.color
              )} />

              {/* Icon */}
              <div className={cn(
                "relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br text-primary-foreground shadow-lg group-hover:scale-110 transition-transform duration-500",
                feature.color
              )}>
                <feature.icon className="w-8 h-8" />
              </div>

              {/* Content */}
              <h3 className="relative text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="relative text-muted-foreground mb-6">
                {feature.description}
              </p>

              {/* Benefits List */}
              <ul className="relative space-y-2">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* Decorative Corner */}
              <div className={cn(
                "absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-500",
                feature.color
              )} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
