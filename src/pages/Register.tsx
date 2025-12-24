import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import academyLogo from '@/assets/academy-logo.png';

const Register: React.FC = () => {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <img src={academyLogo} alt="Logo" className="h-14 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground">{language === 'en' ? 'Create Account' : 'إنشاء حساب'}</h1>
          <p className="text-muted-foreground">{language === 'en' ? 'Join our training community' : 'انضم إلى مجتمعنا التدريبي'}</p>
        </div>
        <form className="space-y-4">
          <Input placeholder={language === 'en' ? 'Full Name' : 'الاسم الكامل'} />
          <Input type="email" placeholder={language === 'en' ? 'Email Address' : 'البريد الإلكتروني'} />
          <Input type="tel" placeholder={language === 'en' ? 'Phone Number' : 'رقم الهاتف'} />
          <Input type="password" placeholder={language === 'en' ? 'Password' : 'كلمة المرور'} />
          <Button variant="gradient" size="lg" className="w-full gap-2"><UserPlus className="w-4 h-4" />{language === 'en' ? 'Register' : 'التسجيل'}</Button>
        </form>
        <p className="text-center mt-6 text-muted-foreground">
          {language === 'en' ? 'Already have an account?' : 'لديك حساب بالفعل؟'}{' '}
          <Link to="/login" className="text-primary font-medium hover:underline">{language === 'en' ? 'Sign In' : 'تسجيل الدخول'}</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
