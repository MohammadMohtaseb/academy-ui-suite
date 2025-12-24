import React from 'react';
import { Users, BookOpen, TrendingUp, DollarSign, Calendar, Bell, Settings, LogOut, BarChart3, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import academyLogo from '@/assets/academy-logo.png';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { language } = useLanguage();
  const stats = [
    { icon: Users, label: language === 'en' ? 'Total Trainees' : 'إجمالي المتدربين', value: '15,234', change: '+12%' },
    { icon: BookOpen, label: language === 'en' ? 'Active Programs' : 'البرامج النشطة', value: '48', change: '+5%' },
    { icon: TrendingUp, label: language === 'en' ? 'Completion Rate' : 'نسبة الإنجاز', value: '87%', change: '+3%' },
    { icon: DollarSign, label: language === 'en' ? 'Revenue' : 'الإيرادات', value: '$124,500', change: '+18%' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground p-6 hidden lg:block">
        <img src={academyLogo} alt="Logo" className="h-10 mb-8 brightness-0 invert" />
        <nav className="space-y-2">
          {[
            { icon: BarChart3, label: language === 'en' ? 'Dashboard' : 'لوحة التحكم', active: true },
            { icon: Users, label: language === 'en' ? 'Trainees' : 'المتدربون' },
            { icon: BookOpen, label: language === 'en' ? 'Programs' : 'البرامج' },
            { icon: Calendar, label: language === 'en' ? 'Schedule' : 'الجدول' },
            { icon: PieChart, label: language === 'en' ? 'Reports' : 'التقارير' },
            { icon: Settings, label: language === 'en' ? 'Settings' : 'الإعدادات' },
          ].map((item, i) => (
            <button key={i} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${item.active ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'hover:bg-sidebar-accent/50'}`}>
              <item.icon className="w-5 h-5" />{item.label}
            </button>
          ))}
        </nav>
        <Button variant="ghost" className="w-full mt-8 gap-2 text-sidebar-foreground" asChild>
          <Link to="/"><LogOut className="w-4 h-4" />{language === 'en' ? 'Logout' : 'تسجيل الخروج'}</Link>
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">{language === 'en' ? 'Admin Dashboard' : 'لوحة تحكم المسؤول'}</h1>
          <Bell className="w-6 h-6 text-muted-foreground cursor-pointer hover:text-primary" />
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-card rounded-xl p-6 shadow-md border border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm text-success font-medium">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Charts Placeholder */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl p-6 shadow-md border border-border h-80 flex items-center justify-center">
            <p className="text-muted-foreground">{language === 'en' ? 'Enrollment Chart' : 'مخطط التسجيلات'}</p>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-md border border-border h-80 flex items-center justify-center">
            <p className="text-muted-foreground">{language === 'en' ? 'Revenue Chart' : 'مخطط الإيرادات'}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
