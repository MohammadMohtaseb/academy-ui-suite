import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';
type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.programs': 'Programs',
    'nav.trainers': 'Trainers',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.dashboard': 'Dashboard',
    
    // Hero
    'hero.badge': 'Excellence in Professional Training',
    'hero.title': 'Amman Chamber of Commerce',
    'hero.titleHighlight': 'Training Academy',
    'hero.subtitle': 'Empowering professionals with world-class training programs designed for the modern business landscape. Transform your career with industry-leading certifications.',
    'hero.explore': 'Explore Programs',
    'hero.register': 'Register Now',
    
    // Stats
    'stats.trainees': 'Trained Professionals',
    'stats.programs': 'Training Programs',
    'stats.trainers': 'Expert Trainers',
    'stats.partners': 'Corporate Partners',
    'stats.satisfaction': 'Satisfaction Rate',
    'stats.certificates': 'Certificates Issued',
    
    // Programs
    'programs.title': 'Our Training Programs',
    'programs.subtitle': 'Comprehensive professional development programs designed to enhance your skills and advance your career',
    'programs.viewAll': 'View All Programs',
    'programs.enroll': 'Enroll Now',
    'programs.details': 'View Details',
    'programs.hours': 'hours',
    'programs.level': 'Level',
    
    // Categories
    'category.management': 'Management & Leadership',
    'category.finance': 'Finance & Accounting',
    'category.technology': 'Information Technology',
    'category.hr': 'Human Resources',
    'category.marketing': 'Marketing & Sales',
    'category.language': 'Languages',
    
    // About
    'about.title': 'About the Academy',
    'about.subtitle': 'A legacy of excellence in professional development',
    'about.mission': 'Our Mission',
    'about.missionText': 'To empower professionals and organizations with cutting-edge knowledge and skills that drive business excellence and economic growth.',
    'about.vision': 'Our Vision',
    'about.visionText': 'To be the leading training institution in the region, recognized for innovation, quality, and impact in professional development.',
    
    // Features
    'features.certified': 'Certified Programs',
    'features.certifiedDesc': 'Internationally accredited certifications',
    'features.experts': 'Industry Experts',
    'features.expertsDesc': 'Learn from seasoned professionals',
    'features.flexible': 'Flexible Learning',
    'features.flexibleDesc': 'Online, hybrid, and in-person options',
    'features.support': '24/7 Support',
    'features.supportDesc': 'Dedicated student support team',
    
    // Testimonials
    'testimonials.title': 'What Our Trainees Say',
    'testimonials.subtitle': 'Success stories from professionals who transformed their careers',
    
    // Partners
    'partners.title': 'Our Partners',
    'partners.subtitle': 'Trusted by leading organizations across the region',
    
    // Footer
    'footer.quickLinks': 'Quick Links',
    'footer.programs': 'Programs',
    'footer.contact': 'Contact Us',
    'footer.rights': 'All Rights Reserved',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    
    // Contact
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'We\'re here to help you on your professional journey',
    'contact.name': 'Full Name',
    'contact.email': 'Email Address',
    'contact.phone': 'Phone Number',
    'contact.message': 'Your Message',
    'contact.send': 'Send Message',
    'contact.address': 'Address',
    'contact.addressValue': 'Amman, Jordan',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.overview': 'Overview',
    'dashboard.courses': 'My Courses',
    'dashboard.progress': 'Progress',
    'dashboard.certificates': 'Certificates',
    'dashboard.schedule': 'Schedule',
    'dashboard.settings': 'Settings',
    'dashboard.logout': 'Logout',
    
    // Common
    'common.loading': 'Loading...',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.viewMore': 'View More',
    'common.readMore': 'Read More',
    'common.learnMore': 'Learn More',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.download': 'Download',
    'common.share': 'Share',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.programs': 'البرامج',
    'nav.trainers': 'المدربون',
    'nav.about': 'عن الأكاديمية',
    'nav.contact': 'اتصل بنا',
    'nav.login': 'تسجيل الدخول',
    'nav.register': 'التسجيل',
    'nav.dashboard': 'لوحة التحكم',
    
    // Hero
    'hero.badge': 'التميز في التدريب المهني',
    'hero.title': 'أكاديمية غرفة تجارة',
    'hero.titleHighlight': 'عمّان للتدريب',
    'hero.subtitle': 'نمكّن المهنيين ببرامج تدريبية عالمية المستوى مصممة لمتطلبات سوق العمل الحديث. حوّل مسيرتك المهنية مع شهادات معتمدة دولياً.',
    'hero.explore': 'استعرض البرامج',
    'hero.register': 'سجّل الآن',
    
    // Stats
    'stats.trainees': 'متدرب محترف',
    'stats.programs': 'برنامج تدريبي',
    'stats.trainers': 'مدرب خبير',
    'stats.partners': 'شريك مؤسسي',
    'stats.satisfaction': 'نسبة الرضا',
    'stats.certificates': 'شهادة صادرة',
    
    // Programs
    'programs.title': 'برامجنا التدريبية',
    'programs.subtitle': 'برامج تطوير مهني شاملة مصممة لتعزيز مهاراتك وتطوير مسيرتك المهنية',
    'programs.viewAll': 'عرض جميع البرامج',
    'programs.enroll': 'سجّل الآن',
    'programs.details': 'عرض التفاصيل',
    'programs.hours': 'ساعة',
    'programs.level': 'المستوى',
    
    // Categories
    'category.management': 'الإدارة والقيادة',
    'category.finance': 'المالية والمحاسبة',
    'category.technology': 'تكنولوجيا المعلومات',
    'category.hr': 'الموارد البشرية',
    'category.marketing': 'التسويق والمبيعات',
    'category.language': 'اللغات',
    
    // About
    'about.title': 'عن الأكاديمية',
    'about.subtitle': 'إرث من التميز في التطوير المهني',
    'about.mission': 'رسالتنا',
    'about.missionText': 'تمكين المهنيين والمؤسسات بالمعرفة والمهارات المتقدمة التي تدفع التميز في الأعمال والنمو الاقتصادي.',
    'about.vision': 'رؤيتنا',
    'about.visionText': 'أن نكون المؤسسة التدريبية الرائدة في المنطقة، المعروفة بالابتكار والجودة والتأثير في التطوير المهني.',
    
    // Features
    'features.certified': 'برامج معتمدة',
    'features.certifiedDesc': 'شهادات معتمدة دولياً',
    'features.experts': 'خبراء الصناعة',
    'features.expertsDesc': 'تعلم من محترفين متمرسين',
    'features.flexible': 'تعلم مرن',
    'features.flexibleDesc': 'خيارات إلكترونية ومختلطة وحضورية',
    'features.support': 'دعم على مدار الساعة',
    'features.supportDesc': 'فريق دعم مخصص للمتدربين',
    
    // Testimonials
    'testimonials.title': 'ماذا يقول متدربونا',
    'testimonials.subtitle': 'قصص نجاح من محترفين حوّلوا مسيرتهم المهنية',
    
    // Partners
    'partners.title': 'شركاؤنا',
    'partners.subtitle': 'موثوق من المؤسسات الرائدة في المنطقة',
    
    // Footer
    'footer.quickLinks': 'روابط سريعة',
    'footer.programs': 'البرامج',
    'footer.contact': 'اتصل بنا',
    'footer.rights': 'جميع الحقوق محفوظة',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
    
    // Contact
    'contact.title': 'تواصل معنا',
    'contact.subtitle': 'نحن هنا لمساعدتك في رحلتك المهنية',
    'contact.name': 'الاسم الكامل',
    'contact.email': 'البريد الإلكتروني',
    'contact.phone': 'رقم الهاتف',
    'contact.message': 'رسالتك',
    'contact.send': 'إرسال الرسالة',
    'contact.address': 'العنوان',
    'contact.addressValue': 'عمّان، الأردن',
    
    // Dashboard
    'dashboard.welcome': 'مرحباً بعودتك',
    'dashboard.overview': 'نظرة عامة',
    'dashboard.courses': 'دوراتي',
    'dashboard.progress': 'التقدم',
    'dashboard.certificates': 'الشهادات',
    'dashboard.schedule': 'الجدول',
    'dashboard.settings': 'الإعدادات',
    'dashboard.logout': 'تسجيل الخروج',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.sort': 'ترتيب',
    'common.viewMore': 'عرض المزيد',
    'common.readMore': 'اقرأ المزيد',
    'common.learnMore': 'اعرف المزيد',
    'common.back': 'رجوع',
    'common.next': 'التالي',
    'common.previous': 'السابق',
    'common.submit': 'إرسال',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.download': 'تحميل',
    'common.share': 'مشاركة',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', language);
  }, [language, direction]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language | null;
    if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
      setLanguageState(savedLang);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
