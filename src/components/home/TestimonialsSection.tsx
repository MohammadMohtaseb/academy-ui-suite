import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    nameEn: 'Ahmad Al-Khatib',
    nameAr: 'أحمد الخطيب',
    roleEn: 'Finance Manager, ABC Corporation',
    roleAr: 'مدير مالي، شركة ABC',
    contentEn: 'The Financial Analysis program transformed my career. The practical approach and expert instructors made complex concepts easy to understand. I highly recommend this academy to anyone seeking professional development.',
    contentAr: 'برنامج التحليل المالي غيّر مسيرتي المهنية. النهج العملي والمدربون الخبراء جعلوا المفاهيم المعقدة سهلة الفهم. أوصي بشدة بهذه الأكاديمية لأي شخص يسعى للتطوير المهني.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  },
  {
    id: 2,
    nameEn: 'Sara Hussein',
    nameAr: 'سارة حسين',
    roleEn: 'HR Director, Global Tech',
    roleAr: 'مديرة موارد بشرية، جلوبال تك',
    contentEn: 'Outstanding training experience! The HR Management program provided me with cutting-edge tools and strategies. The networking opportunities with fellow professionals were invaluable.',
    contentAr: 'تجربة تدريبية متميزة! برنامج إدارة الموارد البشرية زودني بأدوات واستراتيجيات متطورة. فرص التواصل مع المهنيين الآخرين كانت لا تقدر بثمن.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
  {
    id: 3,
    nameEn: 'Mohammed Al-Rashid',
    nameAr: 'محمد الراشد',
    roleEn: 'Project Manager, Build Co.',
    roleAr: 'مدير مشاريع، شركة بيلد',
    contentEn: 'Earning my PMP certification through this academy was a game-changer. The comprehensive curriculum and supportive instructors prepared me thoroughly for both the exam and real-world challenges.',
    contentAr: 'الحصول على شهادة PMP من خلال هذه الأكاديمية كان نقطة تحول. المنهج الشامل والمدربون الداعمون أعدوني جيداً للامتحان والتحديات العملية.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  },
  {
    id: 4,
    nameEn: 'Layla Mansour',
    nameAr: 'ليلى منصور',
    roleEn: 'Marketing Lead, Digital Plus',
    roleAr: 'مديرة تسويق، ديجيتال بلس',
    contentEn: 'The Digital Marketing program exceeded my expectations. I gained practical skills in SEO, social media, and analytics that I apply daily. The ROI on this training has been incredible.',
    contentAr: 'برنامج التسويق الرقمي فاق توقعاتي. اكتسبت مهارات عملية في تحسين محركات البحث ووسائل التواصل والتحليلات أطبقها يومياً. العائد على هذا التدريب كان مذهلاً.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  },
];

const TestimonialsSection: React.FC = () => {
  const { t, language, direction } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-gradient-hero text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t('testimonials.title')}
          </h2>
          <p className="text-lg text-primary-foreground/70 max-w-3xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative max-w-4xl mx-auto">
          {/* Quote Icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center">
            <Quote className="w-8 h-8 text-secondary-light" />
          </div>

          {/* Testimonial Card */}
          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-primary-foreground/10">
            <div className="text-center">
              {/* Rating */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                ))}
              </div>

              {/* Content */}
              <p className="text-lg md:text-xl leading-relaxed mb-8 text-primary-foreground/90">
                "{language === 'en' ? testimonials[currentIndex].contentEn : testimonials[currentIndex].contentAr}"
              </p>

              {/* Author */}
              <div className="flex flex-col items-center">
                <img
                  src={testimonials[currentIndex].image}
                  alt={language === 'en' ? testimonials[currentIndex].nameEn : testimonials[currentIndex].nameAr}
                  className="w-16 h-16 rounded-full object-cover border-2 border-secondary mb-4"
                />
                <h4 className="text-lg font-semibold">
                  {language === 'en' ? testimonials[currentIndex].nameEn : testimonials[currentIndex].nameAr}
                </h4>
                <p className="text-primary-foreground/60 text-sm">
                  {language === 'en' ? testimonials[currentIndex].roleEn : testimonials[currentIndex].roleAr}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="heroOutline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full"
            >
              <ChevronLeft className={cn("w-5 h-5", direction === 'rtl' && 'rotate-180')} />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-300",
                    index === currentIndex
                      ? "bg-secondary w-8"
                      : "bg-primary-foreground/30 hover:bg-primary-foreground/50"
                  )}
                />
              ))}
            </div>

            <Button
              variant="heroOutline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
            >
              <ChevronRight className={cn("w-5 h-5", direction === 'rtl' && 'rotate-180')} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
