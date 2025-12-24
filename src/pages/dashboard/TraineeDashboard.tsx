import React from 'react';
import { BookOpen, Award, Calendar, BarChart3, Bell, LogOut, Play, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import academyLogo from '@/assets/academy-logo.png';
import { Link } from 'react-router-dom';

const TraineeDashboard: React.FC = () => {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 bg-sidebar text-sidebar-foreground p-6 hidden lg:block">
        <img src={academyLogo} alt="Logo" className="h-10 mb-8 brightness-0 invert" />
        <nav className="space-y-2">
          {[
            { icon: BarChart3, label: language === 'en' ? 'Overview' : 'نظرة عامة', active: true },
            { icon: BookOpen, label: language === 'en' ? 'My Courses' : 'دوراتي' },
            { icon: Calendar, label: language === 'en' ? 'Schedule' : 'الجدول' },
            { icon: Award, label: language === 'en' ? 'Certificates' : 'الشهادات' },
            { icon: Settings, label: language === 'en' ? 'Settings' : 'الإعدادات' },
          ].map((item, i) => (
            <button key={i} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${item.active ? 'bg-sidebar-accent' : 'hover:bg-sidebar-accent/50'}`}>
              <item.icon className="w-5 h-5" />{item.label}
            </button>
          ))}
        </nav>
        <Button variant="ghost" className="w-full mt-8 gap-2 text-sidebar-foreground" asChild>
          <Link to="/"><LogOut className="w-4 h-4" />{language === 'en' ? 'Logout' : 'تسجيل الخروج'}</Link>
        </Button>
      </aside>
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">{language === 'en' ? 'Welcome back, Ahmad!' : 'مرحباً بعودتك، أحمد!'}</h1>
            <p className="text-muted-foreground">{language === 'en' ? 'Continue your learning journey' : 'أكمل رحلة تعلمك'}</p>
          </div>
          <Bell className="w-6 h-6 text-muted-foreground" />
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card rounded-xl p-6 shadow-md border border-border">
            <p className="text-3xl font-bold text-primary">4</p>
            <p className="text-muted-foreground">{language === 'en' ? 'Enrolled Courses' : 'الدورات المسجلة'}</p>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-md border border-border">
            <p className="text-3xl font-bold text-secondary">68%</p>
            <p className="text-muted-foreground">{language === 'en' ? 'Avg Progress' : 'متوسط التقدم'}</p>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-md border border-border">
            <p className="text-3xl font-bold text-success">2</p>
            <p className="text-muted-foreground">{language === 'en' ? 'Certificates Earned' : 'الشهادات المكتسبة'}</p>
          </div>
        </div>
        <div className="bg-card rounded-xl p-6 shadow-md border border-border">
          <h2 className="text-xl font-bold mb-4">{language === 'en' ? 'Continue Learning' : 'أكمل التعلم'}</h2>
          <div className="space-y-4">
            {[
              { title: 'Strategic Leadership', progress: 75 },
              { title: 'Financial Analysis', progress: 45 },
              { title: 'Project Management', progress: 90 },
            ].map((c, i) => (
              <div key={i} className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{c.title}</span>
                  <span className="text-sm text-muted-foreground">{c.progress}%</span>
                </div>
                <Progress value={c.progress} className="h-2" />
                <Button size="sm" className="mt-3 gap-2" asChild>
                  <Link to="/lms/course/1"><Play className="w-4 h-4" />{language === 'en' ? 'Continue' : 'أكمل'}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TraineeDashboard;
