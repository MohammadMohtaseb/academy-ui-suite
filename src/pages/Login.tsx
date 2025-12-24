import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import academyLogo from '@/assets/academy-logo.png';

const Login: React.FC = () => {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <img src={academyLogo} alt="Logo" className="h-14 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground">{language === 'en' ? 'Welcome Back' : 'مرحباً بعودتك'}</h1>
          <p className="text-muted-foreground">{language === 'en' ? 'Sign in to your account' : 'سجّل الدخول إلى حسابك'}</p>
        </div>
        <form className="space-y-4">
          <Input type="email" placeholder={language === 'en' ? 'Email Address' : 'البريد الإلكتروني'} />
          <Input type="password" placeholder={language === 'en' ? 'Password' : 'كلمة المرور'} />
          <div className="flex justify-between text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" className="rounded" />{language === 'en' ? 'Remember me' : 'تذكرني'}</label>
            <Link to="/forgot-password" className="text-primary hover:underline">{language === 'en' ? 'Forgot password?' : 'نسيت كلمة المرور؟'}</Link>
          </div>
          <Button variant="gradient" size="lg" className="w-full gap-2"><LogIn className="w-4 h-4" />{language === 'en' ? 'Sign In' : 'تسجيل الدخول'}</Button>
        </form>
        <p className="text-center mt-6 text-muted-foreground">
          {language === 'en' ? "Don't have an account?" : 'ليس لديك حساب؟'}{' '}
          <Link to="/register" className="text-primary font-medium hover:underline">{language === 'en' ? 'Register' : 'سجّل الآن'}</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
