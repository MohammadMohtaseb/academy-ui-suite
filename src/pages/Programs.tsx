import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Clock, Users, Star, ArrowRight, BookOpen, ChevronDown } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const allPrograms = [
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
    price: 450,
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
    price: 380,
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
    price: 320,
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
    price: 420,
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
    price: 550,
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
    price: 280,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
  },
  {
    id: 7,
    titleEn: 'Data Analytics & Business Intelligence',
    titleAr: 'تحليل البيانات وذكاء الأعمال',
    descriptionEn: 'Master data analytics tools and techniques for business decision-making.',
    descriptionAr: 'إتقان أدوات وتقنيات تحليل البيانات لاتخاذ القرارات التجارية.',
    category: 'technology',
    hours: 40,
    level: 'Intermediate',
    levelAr: 'متوسط',
    rating: 4.8,
    students: 650,
    price: 480,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
  },
  {
    id: 8,
    titleEn: 'Negotiation & Conflict Resolution',
    titleAr: 'التفاوض وحل النزاعات',
    descriptionEn: 'Develop advanced negotiation skills and learn effective conflict resolution strategies.',
    descriptionAr: 'طور مهارات التفاوض المتقدمة وتعلم استراتيجيات حل النزاعات الفعالة.',
    category: 'management',
    hours: 20,
    level: 'Advanced',
    levelAr: 'متقدم',
    rating: 4.7,
    students: 540,
    price: 350,
    image: 'https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=400&h=300&fit=crop',
  },
];

const categories = [
  { id: 'all', labelEn: 'All Programs', labelAr: 'جميع البرامج' },
  { id: 'management', labelEn: 'Management', labelAr: 'الإدارة' },
  { id: 'finance', labelEn: 'Finance', labelAr: 'المالية' },
  { id: 'technology', labelEn: 'Technology', labelAr: 'التكنولوجيا' },
  { id: 'marketing', labelEn: 'Marketing', labelAr: 'التسويق' },
  { id: 'hr', labelEn: 'HR', labelAr: 'الموارد البشرية' },
  { id: 'language', labelEn: 'Languages', labelAr: 'اللغات' },
];

const Programs: React.FC = () => {
  const { language, direction, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredPrograms = allPrograms.filter((program) => {
    const matchesSearch =
      program.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.titleAr.includes(searchQuery);
    const matchesCategory = selectedCategory === 'all' || program.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-secondary/20 text-secondary-light border-secondary/30 mb-6">
              <BookOpen className="w-4 h-4 mr-2" />
              {language === 'en' ? '200+ Programs Available' : 'أكثر من 200 برنامج متاح'}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('programs.title')}</h1>
            <p className="text-lg text-primary-foreground/70">{t('programs.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-card border-b border-border sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder={language === 'en' ? 'Search programs...' : 'ابحث عن البرامج...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {language === 'en' ? cat.labelEn : cat.labelAr}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Results Count */}
          <div className="mb-8">
            <p className="text-muted-foreground">
              {language === 'en'
                ? `Showing ${filteredPrograms.length} programs`
                : `عرض ${filteredPrograms.length} برنامج`}
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPrograms.map((program, index) => (
              <div
                key={program.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={program.image}
                    alt={language === 'en' ? program.titleEn : program.titleAr}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground text-xs">
                    {categories.find((c) => c.id === program.category)?.[language === 'en' ? 'labelEn' : 'labelAr']}
                  </Badge>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 text-primary-foreground text-sm">
                    <Star className="w-4 h-4 fill-warning text-warning" />
                    <span>{program.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {language === 'en' ? program.titleEn : program.titleAr}
                  </h3>

                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{program.hours}h</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{program.students}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-primary">${program.price}</span>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/programs/${program.id}`} className="gap-1">
                        {t('programs.details')}
                        <ArrowRight className={cn("w-4 h-4", direction === 'rtl' && 'rotate-180')} />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPrograms.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {language === 'en' ? 'No programs found' : 'لم يتم العثور على برامج'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'en'
                  ? 'Try adjusting your search or filter criteria'
                  : 'حاول تعديل معايير البحث أو التصفية'}
              </p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Programs;
