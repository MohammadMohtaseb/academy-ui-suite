import React from 'react';
import { Calendar, Users, ClipboardCheck, BarChart3, Bell, LogOut, BookOpen, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import academyLogo from '@/assets/academy-logo.png';
import { Link } from 'react-router-dom';

const TrainerDashboard: React.FC = () => {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 bg-sidebar text-sidebar-foreground p-6 hidden lg:block">
        <img src={academyLogo} alt="Logo" className="h-10 mb-8 brightness-0 invert" />
        <nav className="space-y-2">
          {[
            { icon: BarChart3, label: language === 'en' ? 'Overview' : 'نظرة عامة', active: true },
            { icon: Calendar, label: language === 'en' ? 'Schedule' : 'الجدول' },
            { icon: Users, label: language === 'en' ? 'My Trainees' : 'متدربيني' },
            { icon: ClipboardCheck, label: language === 'en' ? 'Attendance' : 'الحضور' },
            { icon: BookOpen, label: language === 'en' ? 'Evaluations' : 'التقييمات' },
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
          <h1 className="text-3xl font-bold">{language === 'en' ? 'Trainer Dashboard' : 'لوحة تحكم المدرب'}</h1>
          <Bell className="w-6 h-6 text-muted-foreground" />
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card rounded-xl p-6 shadow-md border border-border">
            <p className="text-3xl font-bold text-primary">12</p>
            <p className="text-muted-foreground">{language === 'en' ? 'Active Sessions' : 'جلسات نشطة'}</p>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-md border border-border">
            <p className="text-3xl font-bold text-secondary">248</p>
            <p className="text-muted-foreground">{language === 'en' ? 'Total Trainees' : 'إجمالي المتدربين'}</p>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-md border border-border">
            <p className="text-3xl font-bold text-success">4.9</p>
            <p className="text-muted-foreground">{language === 'en' ? 'Avg Rating' : 'متوسط التقييم'}</p>
          </div>
        </div>
        <div className="bg-card rounded-xl p-6 shadow-md border border-border">
          <h2 className="text-xl font-bold mb-4">{language === 'en' ? 'Upcoming Sessions' : 'الجلسات القادمة'}</h2>
          <div className="space-y-3">
            {['Strategic Leadership - 9:00 AM', 'Project Management - 2:00 PM', 'Team Building - 4:00 PM'].map((s, i) => (
              <div key={i} className="p-4 bg-muted rounded-lg flex items-center justify-between">
                <span>{s}</span><Button size="sm">{language === 'en' ? 'Start' : 'ابدأ'}</Button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TrainerDashboard;
