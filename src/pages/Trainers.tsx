import React from 'react';
import { Link } from 'react-router-dom';
import { Star, BookOpen, Users, Linkedin, Mail } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const trainers = [
  {
    id: 1,
    nameEn: 'Dr. Khalid Al-Masri',
    nameAr: 'د. خالد المصري',
    titleEn: 'Leadership & Management Expert',
    titleAr: 'خبير في القيادة والإدارة',
    bioEn: 'Over 20 years of experience in leadership development and executive training.',
    bioAr: 'أكثر من 20 عاماً من الخبرة في تطوير القيادة والتدريب التنفيذي.',
    specialties: ['Leadership', 'Strategy', 'Change Management'],
    specialtiesAr: ['القيادة', 'الاستراتيجية', 'إدارة التغيير'],
    courses: 12,
    students: 3500,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
  },
  {
    id: 2,
    nameEn: 'Dr. Sara Hussein',
    nameAr: 'د. سارة حسين',
    titleEn: 'HR & Organizational Development',
    titleAr: 'الموارد البشرية والتطوير التنظيمي',
    bioEn: 'Certified HR professional with extensive experience in talent management.',
    bioAr: 'محترفة موارد بشرية معتمدة مع خبرة واسعة في إدارة المواهب.',
    specialties: ['HR Management', 'Recruitment', 'Performance'],
    specialtiesAr: ['إدارة الموارد البشرية', 'التوظيف', 'الأداء'],
    courses: 8,
    students: 2100,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
  },
  {
    id: 3,
    nameEn: 'Prof. Ahmad Nasser',
    nameAr: 'أ. أحمد ناصر',
    titleEn: 'Financial Analysis & Accounting',
    titleAr: 'التحليل المالي والمحاسبة',
    bioEn: 'CPA with 25 years of experience in corporate finance and accounting.',
    bioAr: 'محاسب قانوني معتمد مع 25 عاماً من الخبرة في المالية والمحاسبة.',
    specialties: ['Financial Analysis', 'Accounting', 'Auditing'],
    specialtiesAr: ['التحليل المالي', 'المحاسبة', 'التدقيق'],
    courses: 15,
    students: 4200,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
  },
  {
    id: 4,
    nameEn: 'Layla Mansour',
    nameAr: 'ليلى منصور',
    titleEn: 'Digital Marketing Specialist',
    titleAr: 'أخصائية التسويق الرقمي',
    bioEn: 'Google-certified digital marketer with proven track record in campaign management.',
    bioAr: 'مسوقة رقمية معتمدة من جوجل مع سجل حافل في إدارة الحملات.',
    specialties: ['SEO', 'Social Media', 'Analytics'],
    specialtiesAr: ['تحسين محركات البحث', 'وسائل التواصل', 'التحليلات'],
    courses: 6,
    students: 1800,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
  },
  {
    id: 5,
    nameEn: 'Mohammed Al-Rashid',
    nameAr: 'محمد الراشد',
    titleEn: 'Project Management Professional',
    titleAr: 'محترف إدارة المشاريع',
    bioEn: 'PMP certified with experience managing large-scale infrastructure projects.',
    bioAr: 'معتمد PMP مع خبرة في إدارة مشاريع البنية التحتية الكبيرة.',
    specialties: ['PMP', 'Agile', 'Risk Management'],
    specialtiesAr: ['PMP', 'أجايل', 'إدارة المخاطر'],
    courses: 10,
    students: 2800,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
  },
  {
    id: 6,
    nameEn: 'Nadia Khouri',
    nameAr: 'نادية خوري',
    titleEn: 'Business Communication Coach',
    titleAr: 'مدربة التواصل في الأعمال',
    bioEn: 'Expert in business English and professional communication skills.',
    bioAr: 'خبيرة في الإنجليزية التجارية ومهارات التواصل المهني.',
    specialties: ['Business English', 'Presentation', 'Negotiation'],
    specialtiesAr: ['الإنجليزية التجارية', 'العرض التقديمي', 'التفاوض'],
    courses: 9,
    students: 3200,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop',
  },
];

const Trainers: React.FC = () => {
  const { language } = useLanguage();

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-secondary/20 text-secondary-light border-secondary/30 mb-6">
              <Users className="w-4 h-4 mr-2" />
              {language === 'en' ? '100+ Expert Trainers' : 'أكثر من 100 مدرب خبير'}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {language === 'en' ? 'Meet Our Expert Trainers' : 'تعرف على مدربينا الخبراء'}
            </h1>
            <p className="text-lg text-primary-foreground/70">
              {language === 'en'
                ? 'Learn from industry leaders with decades of real-world experience and proven expertise.'
                : 'تعلم من قادة الصناعة ذوي الخبرة العملية العميقة والخبرة المثبتة.'}
            </p>
          </div>
        </div>
      </section>

      {/* Trainers Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainers.map((trainer, index) => (
              <div
                key={trainer.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={trainer.image}
                    alt={language === 'en' ? trainer.nameEn : trainer.nameAr}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-primary-foreground mb-1">
                      {language === 'en' ? trainer.nameEn : trainer.nameAr}
                    </h3>
                    <p className="text-secondary-light text-sm">
                      {language === 'en' ? trainer.titleEn : trainer.titleAr}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-muted-foreground text-sm mb-4">
                    {language === 'en' ? trainer.bioEn : trainer.bioAr}
                  </p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(language === 'en' ? trainer.specialties : trainer.specialtiesAr).map((specialty, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border pt-4">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{trainer.courses} {language === 'en' ? 'courses' : 'دورات'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{trainer.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-warning text-warning" />
                      <span>{trainer.rating}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <Button variant="ghost" size="iconSm">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="iconSm">
                      <Mail className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Trainers;
