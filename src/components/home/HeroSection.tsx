import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Award, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const HeroSection: React.FC = () => {
  const { t, direction } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        {/* Animated Shapes */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-light/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-dark/50 to-primary-dark/80" />
      </div>

      <div className="relative container mx-auto px-4 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={cn(
            "animate-fade-in",
            direction === 'rtl' ? 'lg:order-2' : ''
          )}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 backdrop-blur-sm border border-secondary/30 mb-8">
              <Award className="w-4 h-4 text-secondary-light" />
              <span className="text-sm font-medium text-primary-foreground/90">{t('hero.badge')}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              {t('hero.title')}
              <span className="block text-secondary-light mt-2">{t('hero.titleHighlight')}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-primary-foreground/70 leading-relaxed mb-10 max-w-xl">
              {t('hero.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Button variant="hero" size="xl" asChild>
                <Link to="/programs" className="gap-2">
                  {t('hero.explore')}
                  <ArrowRight className={cn("w-5 h-5", direction === 'rtl' && 'rotate-180')} />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/register">{t('hero.register')}</Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8">
              {[
                { icon: Users, value: '15,000+', label: t('stats.trainees') },
                { icon: BookOpen, value: '200+', label: t('stats.programs') },
                { icon: Award, value: '98%', label: t('stats.satisfaction') },
              ].map((stat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-secondary-light" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-foreground">{stat.value}</div>
                    <div className="text-sm text-primary-foreground/60">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual */}
          <div className={cn(
            "relative animate-fade-in",
            direction === 'rtl' ? 'lg:order-1' : ''
          )} style={{ animationDelay: '0.2s' }}>
            {/* Main Image Card */}
            <div className="relative z-10">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-card/20 to-card/5 backdrop-blur-sm border border-primary-foreground/10 p-8">
                {/* Placeholder for hero image */}
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary-light/30 to-secondary/30 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto mb-4">
                      <Play className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <p className="text-primary-foreground/80 text-lg font-medium">
                      {direction === 'rtl' ? 'شاهد قصتنا' : 'Watch Our Story'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-4 -left-4 z-20 bg-card rounded-2xl shadow-xl p-4 animate-bounce-subtle">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                  <Award className="w-6 h-6 text-success" />
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">50+</div>
                  <div className="text-sm text-muted-foreground">
                    {direction === 'rtl' ? 'شهادة دولية' : 'Certifications'}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 z-20 bg-card rounded-2xl shadow-xl p-4 animate-bounce-subtle" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">100+</div>
                  <div className="text-sm text-muted-foreground">
                    {direction === 'rtl' ? 'مدرب خبير' : 'Expert Trainers'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-3 rounded-full bg-primary-foreground/50 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
