import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Users, Star, Award, Calendar, CheckCircle, Play, FileText, ArrowLeft, Share2 } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const programDetails = {
  id: 1,
  titleEn: 'Strategic Leadership & Management',
  titleAr: 'القيادة الاستراتيجية والإدارة',
  descriptionEn: 'This comprehensive program is designed to develop the essential leadership skills needed to manage teams effectively and drive organizational success. You will learn strategic thinking, decision-making frameworks, team dynamics, and change management principles.',
  descriptionAr: 'تم تصميم هذا البرنامج الشامل لتطوير مهارات القيادة الأساسية اللازمة لإدارة الفرق بفعالية وتحقيق النجاح المؤسسي. ستتعلم التفكير الاستراتيجي وأطر صنع القرار وديناميكيات الفريق ومبادئ إدارة التغيير.',
  category: 'management',
  hours: 40,
  modules: 12,
  level: 'Advanced',
  levelAr: 'متقدم',
  rating: 4.9,
  reviews: 328,
  students: 1250,
  price: 450,
  startDate: '2024-02-15',
  language: 'English & Arabic',
  certificate: true,
  image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
  instructor: {
    name: 'Dr. Khalid Al-Masri',
    nameAr: 'د. خالد المصري',
    title: 'Leadership & Management Expert',
    titleAr: 'خبير في القيادة والإدارة',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  },
  curriculum: [
    { titleEn: 'Introduction to Strategic Leadership', titleAr: 'مقدمة في القيادة الاستراتيجية', duration: '3h' },
    { titleEn: 'Vision & Mission Development', titleAr: 'تطوير الرؤية والرسالة', duration: '4h' },
    { titleEn: 'Team Building & Dynamics', titleAr: 'بناء الفريق وديناميكياته', duration: '4h' },
    { titleEn: 'Decision Making Frameworks', titleAr: 'أطر صنع القرار', duration: '3h' },
    { titleEn: 'Change Management', titleAr: 'إدارة التغيير', duration: '4h' },
    { titleEn: 'Performance Management', titleAr: 'إدارة الأداء', duration: '3h' },
  ],
  outcomes: [
    { en: 'Develop strategic thinking capabilities', ar: 'تطوير قدرات التفكير الاستراتيجي' },
    { en: 'Lead high-performing teams effectively', ar: 'قيادة الفرق عالية الأداء بفعالية' },
    { en: 'Implement change management strategies', ar: 'تنفيذ استراتيجيات إدارة التغيير' },
    { en: 'Make data-driven decisions', ar: 'اتخاذ قرارات قائمة على البيانات' },
    { en: 'Build a culture of continuous improvement', ar: 'بناء ثقافة التحسين المستمر' },
  ],
};

const ProgramDetails: React.FC = () => {
  const { id } = useParams();
  const { language, direction, t } = useLanguage();

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/programs" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-6 transition-colors">
            <ArrowLeft className={cn("w-4 h-4", direction === 'rtl' && 'rotate-180')} />
            {language === 'en' ? 'Back to Programs' : 'العودة إلى البرامج'}
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-secondary/20 text-secondary-light border-secondary/30 mb-4">
                {language === 'en' ? 'Management' : 'الإدارة'}
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {language === 'en' ? programDetails.titleEn : programDetails.titleAr}
              </h1>
              <p className="text-lg text-primary-foreground/70 mb-8">
                {language === 'en' ? programDetails.descriptionEn : programDetails.descriptionAr}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-secondary-light" />
                  <span>{programDetails.hours} {language === 'en' ? 'hours' : 'ساعة'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-secondary-light" />
                  <span>{programDetails.students.toLocaleString()} {language === 'en' ? 'students' : 'متدرب'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-warning text-warning" />
                  <span>{programDetails.rating} ({programDetails.reviews})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-secondary-light" />
                  <span>{language === 'en' ? 'Certificate Included' : 'شهادة معتمدة'}</span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-4">
                <Button variant="hero" size="xl">
                  {language === 'en' ? `Enroll Now - $${programDetails.price}` : `سجّل الآن - $${programDetails.price}`}
                </Button>
                <Button variant="heroOutline" size="icon">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={programDetails.image}
                  alt={language === 'en' ? programDetails.titleEn : programDetails.titleAr}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button variant="hero" size="iconLg" className="rounded-full">
                    <Play className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="curriculum" className="w-full">
                <TabsList className="w-full grid grid-cols-3 mb-8">
                  <TabsTrigger value="curriculum">
                    {language === 'en' ? 'Curriculum' : 'المنهج'}
                  </TabsTrigger>
                  <TabsTrigger value="outcomes">
                    {language === 'en' ? 'Outcomes' : 'المخرجات'}
                  </TabsTrigger>
                  <TabsTrigger value="instructor">
                    {language === 'en' ? 'Instructor' : 'المدرب'}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="curriculum" className="space-y-4">
                  {programDetails.curriculum.map((module, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-card rounded-xl border border-border hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">
                            {language === 'en' ? module.titleEn : module.titleAr}
                          </h4>
                          <p className="text-sm text-muted-foreground">{module.duration}</p>
                        </div>
                      </div>
                      <FileText className="w-5 h-5 text-muted-foreground" />
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="outcomes" className="space-y-4">
                  {programDetails.outcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border">
                      <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                      <span className="text-foreground">{language === 'en' ? outcome.en : outcome.ar}</span>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="instructor">
                  <div className="bg-card rounded-2xl p-8 border border-border">
                    <div className="flex items-start gap-6">
                      <img
                        src={programDetails.instructor.image}
                        alt={language === 'en' ? programDetails.instructor.name : programDetails.instructor.nameAr}
                        className="w-24 h-24 rounded-2xl object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">
                          {language === 'en' ? programDetails.instructor.name : programDetails.instructor.nameAr}
                        </h3>
                        <p className="text-primary mb-4">
                          {language === 'en' ? programDetails.instructor.title : programDetails.instructor.titleAr}
                        </p>
                        <p className="text-muted-foreground">
                          {language === 'en'
                            ? 'With over 20 years of experience in leadership development, Dr. Al-Masri has trained thousands of executives across the MENA region.'
                            : 'مع أكثر من 20 عاماً من الخبرة في تطوير القيادة، درّب الدكتور المصري آلاف المسؤولين التنفيذيين في منطقة الشرق الأوسط وشمال أفريقيا.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Enroll Card */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-lg sticky top-24">
                <div className="text-3xl font-bold text-primary mb-4">${programDetails.price}</div>
                <Button variant="gradient" size="lg" className="w-full mb-4">
                  {t('programs.enroll')}
                </Button>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">{language === 'en' ? 'Duration' : 'المدة'}</span>
                    <span className="font-medium">{programDetails.hours} {language === 'en' ? 'hours' : 'ساعة'}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">{language === 'en' ? 'Modules' : 'الوحدات'}</span>
                    <span className="font-medium">{programDetails.modules}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">{language === 'en' ? 'Level' : 'المستوى'}</span>
                    <span className="font-medium">{language === 'en' ? programDetails.level : programDetails.levelAr}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-muted-foreground">{language === 'en' ? 'Certificate' : 'شهادة'}</span>
                    <span className="font-medium text-success">{language === 'en' ? 'Yes' : 'نعم'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ProgramDetails;
