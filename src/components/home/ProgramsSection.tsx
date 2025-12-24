import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Star, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

// Mock programs data
const programs = [
  {
    id: 1,
    titleEn: 'Strategic Leadership & Management',
    titleAr: 'القيادة الاستراتيجية والإدارة',
    descriptionEn: 'Develop essential leadership skills for managing teams and driving organizational success.',
    descriptionAr: 'طور مهارات القيادة الأساسية لإدارة الفرق وتحقيق النجاح المؤسسي.',
    category: 'management',
    hours: 40,
    level: 'Advanced',
    levelAr: 'متقدم',
    rating: 4.9,
    students: 1250,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    titleEn: 'Financial Analysis & Reporting',
    titleAr: 'التحليل المالي وإعداد التقارير',
    descriptionEn: 'Master financial analysis techniques and create impactful business reports.',
    descriptionAr: 'إتقان تقنيات التحليل المالي وإنشاء تقارير أعمال مؤثرة.',
    category: 'finance',
    hours: 35,
    level: 'Intermediate',
    levelAr: 'متوسط',
    rating: 4.8,
    students: 980,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    titleEn: 'Digital Marketing Mastery',
    titleAr: 'إتقان التسويق الرقمي',
    descriptionEn: 'Learn modern digital marketing strategies including SEO, social media, and analytics.',
    descriptionAr: 'تعلم استراتيجيات التسويق الرقمي الحديثة بما في ذلك تحسين محركات البحث ووسائل التواصل الاجتماعي والتحليلات.',
    category: 'marketing',
    hours: 30,
    level: 'Beginner',
    levelAr: 'مبتدئ',
    rating: 4.7,
    students: 1500,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
  },
  {
    id: 4,
    titleEn: 'HR Management & Development',
    titleAr: 'إدارة وتطوير الموارد البشرية',
    descriptionEn: 'Comprehensive HR training covering recruitment, performance management, and employee development.',
    descriptionAr: 'تدريب شامل على الموارد البشرية يغطي التوظيف وإدارة الأداء وتطوير الموظفين.',
    category: 'hr',
    hours: 45,
    level: 'Intermediate',
    levelAr: 'متوسط',
    rating: 4.6,
    students: 720,
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=300&fit=crop',
  },
  {
    id: 5,
    titleEn: 'Project Management Professional',
    titleAr: 'إدارة المشاريع الاحترافية',
    descriptionEn: 'Prepare for PMP certification with comprehensive project management training.',
    descriptionAr: 'استعد لشهادة PMP مع تدريب شامل على إدارة المشاريع.',
    category: 'management',
    hours: 50,
    level: 'Advanced',
    levelAr: 'متقدم',
    rating: 4.9,
    students: 890,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
  },
  {
    id: 6,
    titleEn: 'Business English Communication',
    titleAr: 'التواصل بالإنجليزية في الأعمال',
    descriptionEn: 'Enhance your professional English skills for effective business communication.',
    descriptionAr: 'عزز مهاراتك في اللغة الإنجليزية المهنية للتواصل الفعال في الأعمال.',
    category: 'language',
    hours: 25,
    level: 'Beginner',
    levelAr: 'مبتدئ',
    rating: 4.8,
    students: 2100,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
  },
];

const ProgramsSection: React.FC = () => {
  const { t, language, direction } = useLanguage();

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, { en: string; ar: string }> = {
      management: { en: 'Management', ar: 'الإدارة' },
      finance: { en: 'Finance', ar: 'المالية' },
      marketing: { en: 'Marketing', ar: 'التسويق' },
      hr: { en: 'HR', ar: 'الموارد البشرية' },
      language: { en: 'Language', ar: 'اللغات' },
      technology: { en: 'Technology', ar: 'التكنولوجيا' },
    };
    return labels[category]?.[language] || category;
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-6">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {language === 'en' ? 'Our Programs' : 'برامجنا'}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t('programs.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('programs.subtitle')}
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {programs.map((program, index) => (
            <div
              key={program.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={program.image}
                  alt={language === 'en' ? program.titleEn : program.titleAr}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                
                {/* Category Badge */}
                <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">
                  {getCategoryLabel(program.category)}
                </Badge>
                
                {/* Rating */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1 text-primary-foreground">
                  <Star className="w-4 h-4 fill-warning text-warning" />
                  <span className="text-sm font-medium">{program.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {language === 'en' ? program.titleEn : program.titleAr}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {language === 'en' ? program.descriptionEn : program.descriptionAr}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{program.hours} {t('programs.hours')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{program.students.toLocaleString()}</span>
                  </div>
                </div>

                {/* Level & CTA */}
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {language === 'en' ? program.level : program.levelAr}
                  </Badge>
                  <Button variant="ghost" size="sm" className="group/btn gap-2" asChild>
                    <Link to={`/programs/${program.id}`}>
                      {t('programs.details')}
                      <ArrowRight className={cn(
                        "w-4 h-4 transition-transform group-hover/btn:translate-x-1",
                        direction === 'rtl' && 'rotate-180 group-hover/btn:-translate-x-1'
                      )} />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="gradient" size="lg" asChild>
            <Link to="/programs" className="gap-2">
              {t('programs.viewAll')}
              <ArrowRight className={cn("w-5 h-5", direction === 'rtl' && 'rotate-180')} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
