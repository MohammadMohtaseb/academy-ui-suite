import React from 'react';
import { Link } from 'react-router-dom';
import { KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import academyLogo from '@/assets/academy-logo.png';

const ForgotPassword: React.FC = () => {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <img src={academyLogo} alt="Logo" className="h-14 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground">{language === 'en' ? 'Reset Password' : 'إعادة تعيين كلمة المرور'}</h1>
          <p className="text-muted-foreground">{language === 'en' ? 'Enter your email to receive reset instructions' : 'أدخل بريدك الإلكتروني لتلقي تعليمات إعادة التعيين'}</p>
        </div>
        <form className="space-y-4">
          <Input type="email" placeholder={language === 'en' ? 'Email Address' : 'البريد الإلكتروني'} />
          <Button variant="gradient" size="lg" className="w-full gap-2"><KeyRound className="w-4 h-4" />{language === 'en' ? 'Send Reset Link' : 'إرسال رابط إعادة التعيين'}</Button>
        </form>
        <p className="text-center mt-6 text-muted-foreground">
          <Link to="/login" className="text-primary font-medium hover:underline">{language === 'en' ? 'Back to Login' : 'العودة لتسجيل الدخول'}</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
