import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, User, GraduationCap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import academyLogo from '@/assets/academy-logo.png';

type AccountType = 'admin' | 'trainer' | 'trainee';

const Login: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<AccountType>('trainee');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const accountTypes = [
    { 
      type: 'admin' as AccountType, 
      icon: Shield, 
      label: language === 'en' ? 'Admin' : 'مسؤول',
      email: 'admin@academy.com'
    },
    { 
      type: 'trainer' as AccountType, 
      icon: User, 
      label: language === 'en' ? 'Trainer' : 'مدرب',
      email: 'trainer@academy.com'
    },
    { 
      type: 'trainee' as AccountType, 
      icon: GraduationCap, 
      label: language === 'en' ? 'Trainee' : 'متدرب',
      email: 'trainee@academy.com'
    },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const routes = {
      admin: '/dashboard/admin',
      trainer: '/dashboard/trainer',
      trainee: '/dashboard/trainee',
    };
    navigate(routes[selectedType]);
  };

  const handleQuickLogin = (type: AccountType) => {
    const routes = {
      admin: '/dashboard/admin',
      trainer: '/dashboard/trainer',
      trainee: '/dashboard/trainee',
    };
    navigate(routes[type]);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-6">
          <img src={academyLogo} alt="Logo" className="h-14 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground">{language === 'en' ? 'Welcome Back' : 'مرحباً بعودتك'}</h1>
          <p className="text-muted-foreground">{language === 'en' ? 'Sign in to your account' : 'سجّل الدخول إلى حسابك'}</p>
        </div>

        {/* Account Type Selection */}
        <div className="mb-6">
          <p className="text-sm font-medium text-foreground mb-3">
            {language === 'en' ? 'Select Account Type' : 'اختر نوع الحساب'}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {accountTypes.map((account) => (
              <button
                key={account.type}
                onClick={() => setSelectedType(account.type)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                  selectedType === account.type
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                }`}
              >
                <account.icon className="w-6 h-6" />
                <span className="text-xs font-medium">{account.label}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input 
            type="email" 
            placeholder={language === 'en' ? 'Email Address' : 'البريد الإلكتروني'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            type="password" 
            placeholder={language === 'en' ? 'Password' : 'كلمة المرور'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              {language === 'en' ? 'Remember me' : 'تذكرني'}
            </label>
            <Link to="/forgot-password" className="text-primary hover:underline">
              {language === 'en' ? 'Forgot password?' : 'نسيت كلمة المرور؟'}
            </Link>
          </div>
          <Button type="submit" variant="gradient" size="lg" className="w-full gap-2">
            <LogIn className="w-4 h-4" />
            {language === 'en' ? 'Sign In' : 'تسجيل الدخول'}
          </Button>
        </form>

        {/* Quick Access Demo Buttons */}
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-xs text-center text-muted-foreground mb-3">
            {language === 'en' ? 'Quick Demo Access' : 'وصول سريع للعرض التجريبي'}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {accountTypes.map((account) => (
              <Button
                key={account.type}
                variant="outline"
                size="sm"
                onClick={() => handleQuickLogin(account.type)}
                className="text-xs"
              >
                {account.label}
              </Button>
            ))}
          </div>
        </div>

        <p className="text-center mt-6 text-muted-foreground">
          {language === 'en' ? "Don't have an account?" : 'ليس لديك حساب؟'}{' '}
          <Link to="/register" className="text-primary font-medium hover:underline">
            {language === 'en' ? 'Register' : 'سجّل الآن'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
