import React, { useEffect, useState, useRef } from 'react';
import { TrendingUp, Users, BookOpen, Award, Building2, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface StatItem {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const StatsSection: React.FC = () => {
  const { t, direction } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const stats: StatItem[] = [
    { icon: Users, value: 15000, suffix: '+', label: t('stats.trainees'), color: 'text-primary-light' },
    { icon: BookOpen, value: 200, suffix: '+', label: t('stats.programs'), color: 'text-secondary' },
    { icon: Award, value: 100, suffix: '+', label: t('stats.trainers'), color: 'text-accent' },
    { icon: Building2, value: 500, suffix: '+', label: t('stats.partners'), color: 'text-info' },
    { icon: Star, value: 98, suffix: '%', label: t('stats.satisfaction'), color: 'text-success' },
    { icon: TrendingUp, value: 25000, suffix: '+', label: t('stats.certificates'), color: 'text-warning' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 bg-muted overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-dots opacity-50" />
      
      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary/5 to-transparent" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-secondary/5 to-transparent" />

      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={cn(
                "relative bg-card rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-500 group hover:-translate-y-1",
                isVisible ? "animate-count-up" : "opacity-0"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110",
                stat.color === 'text-primary-light' && 'bg-primary/10',
                stat.color === 'text-secondary' && 'bg-secondary/10',
                stat.color === 'text-accent' && 'bg-accent/10',
                stat.color === 'text-info' && 'bg-info/10',
                stat.color === 'text-success' && 'bg-success/10',
                stat.color === 'text-warning' && 'bg-warning/10',
              )}>
                <stat.icon className={cn("w-7 h-7", stat.color)} />
              </div>

              {/* Value */}
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {isVisible ? (
                  <CountUp end={stat.value} duration={2000} />
                ) : (
                  0
                )}
                <span className={stat.color}>{stat.suffix}</span>
              </div>

              {/* Label */}
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>

              {/* Decorative Line */}
              <div className={cn(
                "absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                stat.color === 'text-primary-light' && 'bg-primary',
                stat.color === 'text-secondary' && 'bg-secondary',
                stat.color === 'text-accent' && 'bg-accent',
                stat.color === 'text-info' && 'bg-info',
                stat.color === 'text-success' && 'bg-success',
                stat.color === 'text-warning' && 'bg-warning',
              )} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CountUp Component
const CountUp: React.FC<{ end: number; duration: number }> = ({ end, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
};

export default StatsSection;
