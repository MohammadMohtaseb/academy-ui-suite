import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const CTASection: React.FC = () => {
  const { language, direction } = useLanguage();

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-muted to-transparent" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {language === 'en' ? 'Start Your Journey Today' : 'ابدأ رحلتك اليوم'}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {language === 'en' ? (
              <>Ready to <span className="text-gradient">Transform</span> Your Career?</>
            ) : (
              <>مستعد <span className="text-gradient">لتحويل</span> مسيرتك المهنية؟</>
            )}
          </h2>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            {language === 'en'
              ? 'Join thousands of professionals who have elevated their careers through our world-class training programs. Take the first step towards excellence today.'
              : 'انضم إلى آلاف المهنيين الذين طوروا مسيرتهم المهنية من خلال برامجنا التدريبية العالمية. اتخذ الخطوة الأولى نحو التميز اليوم.'}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="gradient" size="xl" asChild>
              <Link to="/register" className="gap-2">
                {language === 'en' ? 'Get Started Now' : 'ابدأ الآن'}
                <ArrowRight className={cn("w-5 h-5", direction === 'rtl' && 'rotate-180')} />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link to="/programs">
                {language === 'en' ? 'Browse Programs' : 'تصفح البرامج'}
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              {language === 'en' ? 'Internationally Accredited' : 'معتمدة دولياً'}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              {language === 'en' ? '98% Satisfaction Rate' : '98% نسبة الرضا'}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              {language === 'en' ? 'Flexible Learning Options' : 'خيارات تعلم مرنة'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
