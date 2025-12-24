import React, { useState } from 'react';
import { Users, BookOpen, TrendingUp, DollarSign, Calendar, Bell, Settings, LogOut, BarChart3, PieChart, Search, Plus, ChevronDown, Eye, Edit, Trash2, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import academyLogo from '@/assets/academy-logo.png';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPie, Pie, Cell } from 'recharts';

const AdminDashboard: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);

  const stats = [
    { icon: Users, label: language === 'en' ? 'Total Trainees' : 'إجمالي المتدربين', value: '15,234', change: '+12%', color: 'text-primary' },
    { icon: BookOpen, label: language === 'en' ? 'Active Programs' : 'البرامج النشطة', value: '48', change: '+5%', color: 'text-secondary' },
    { icon: TrendingUp, label: language === 'en' ? 'Completion Rate' : 'نسبة الإنجاز', value: '87%', change: '+3%', color: 'text-success' },
    { icon: DollarSign, label: language === 'en' ? 'Revenue' : 'الإيرادات', value: '$124,500', change: '+18%', color: 'text-warning' },
  ];

  const enrollmentData = [
    { month: language === 'en' ? 'Jan' : 'يناير', enrollments: 120, completions: 95 },
    { month: language === 'en' ? 'Feb' : 'فبراير', enrollments: 150, completions: 120 },
    { month: language === 'en' ? 'Mar' : 'مارس', enrollments: 180, completions: 150 },
    { month: language === 'en' ? 'Apr' : 'أبريل', enrollments: 220, completions: 180 },
    { month: language === 'en' ? 'May' : 'مايو', enrollments: 280, completions: 230 },
    { month: language === 'en' ? 'Jun' : 'يونيو', enrollments: 350, completions: 290 },
  ];

  const revenueData = [
    { month: language === 'en' ? 'Jan' : 'يناير', revenue: 15000 },
    { month: language === 'en' ? 'Feb' : 'فبراير', revenue: 18000 },
    { month: language === 'en' ? 'Mar' : 'مارس', revenue: 22000 },
    { month: language === 'en' ? 'Apr' : 'أبريل', revenue: 19000 },
    { month: language === 'en' ? 'May' : 'مايو', revenue: 28000 },
    { month: language === 'en' ? 'Jun' : 'يونيو', revenue: 32000 },
  ];

  const categoryData = [
    { name: language === 'en' ? 'Leadership' : 'القيادة', value: 35, color: 'hsl(var(--primary))' },
    { name: language === 'en' ? 'Technical' : 'التقنية', value: 28, color: 'hsl(var(--secondary))' },
    { name: language === 'en' ? 'Finance' : 'المالية', value: 20, color: 'hsl(var(--success))' },
    { name: language === 'en' ? 'Marketing' : 'التسويق', value: 17, color: 'hsl(var(--warning))' },
  ];

  const recentTrainees = [
    { id: 1, name: language === 'en' ? 'Ahmad Al-Rashid' : 'أحمد الراشد', email: 'ahmad@email.com', program: language === 'en' ? 'Leadership Essentials' : 'أساسيات القيادة', status: 'active', progress: 75 },
    { id: 2, name: language === 'en' ? 'Sara Mohammed' : 'سارة محمد', email: 'sara@email.com', program: language === 'en' ? 'Project Management' : 'إدارة المشاريع', status: 'active', progress: 90 },
    { id: 3, name: language === 'en' ? 'Khalid Hassan' : 'خالد حسن', email: 'khalid@email.com', program: language === 'en' ? 'Financial Analysis' : 'التحليل المالي', status: 'pending', progress: 30 },
    { id: 4, name: language === 'en' ? 'Nora Abdullah' : 'نورة عبدالله', email: 'nora@email.com', program: language === 'en' ? 'Digital Marketing' : 'التسويق الرقمي', status: 'completed', progress: 100 },
    { id: 5, name: language === 'en' ? 'Omar Yusuf' : 'عمر يوسف', email: 'omar@email.com', program: language === 'en' ? 'Data Science' : 'علوم البيانات', status: 'active', progress: 55 },
  ];

  const notifications = [
    { id: 1, message: language === 'en' ? 'New trainee registration' : 'تسجيل متدرب جديد', time: '5m' },
    { id: 2, message: language === 'en' ? 'Course completed by Sara' : 'أكملت سارة الدورة', time: '15m' },
    { id: 3, message: language === 'en' ? 'Payment received: $500' : 'تم استلام دفعة: $500', time: '1h' },
    { id: 4, message: language === 'en' ? 'New trainer application' : 'طلب مدرب جديد', time: '2h' },
  ];

  const upcomingSessions = [
    { id: 1, title: language === 'en' ? 'Leadership Workshop' : 'ورشة القيادة', time: '09:00 AM', trainer: language === 'en' ? 'Dr. Ahmed' : 'د. أحمد', attendees: 24 },
    { id: 2, title: language === 'en' ? 'Excel Masterclass' : 'احتراف إكسل', time: '11:00 AM', trainer: language === 'en' ? 'Eng. Sara' : 'م. سارة', attendees: 18 },
    { id: 3, title: language === 'en' ? 'Project Management' : 'إدارة المشاريع', time: '02:00 PM', trainer: language === 'en' ? 'Mr. Khalid' : 'أ. خالد', attendees: 30 },
  ];

  const navItems = [
    { icon: BarChart3, label: language === 'en' ? 'Dashboard' : 'لوحة التحكم', key: 'dashboard' },
    { icon: Users, label: language === 'en' ? 'Trainees' : 'المتدربون', key: 'trainees' },
    { icon: BookOpen, label: language === 'en' ? 'Programs' : 'البرامج', key: 'programs' },
    { icon: Calendar, label: language === 'en' ? 'Schedule' : 'الجدول', key: 'schedule' },
    { icon: PieChart, label: language === 'en' ? 'Reports' : 'التقارير', key: 'reports' },
    { icon: Settings, label: language === 'en' ? 'Settings' : 'الإعدادات', key: 'settings' },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-success/20 text-success',
      pending: 'bg-warning/20 text-warning',
      completed: 'bg-primary/20 text-primary',
    };
    const labels = {
      active: language === 'en' ? 'Active' : 'نشط',
      pending: language === 'en' ? 'Pending' : 'قيد الانتظار',
      completed: language === 'en' ? 'Completed' : 'مكتمل',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground p-6 hidden lg:flex flex-col">
        <img src={academyLogo} alt="Logo" className="h-10 mb-8 brightness-0 invert" />
        <nav className="space-y-2 flex-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.key
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'hover:bg-sidebar-accent/50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
        <Button variant="ghost" className="w-full gap-2 text-sidebar-foreground mt-auto" asChild>
          <Link to="/login">
            <LogOut className="w-4 h-4" />
            {language === 'en' ? 'Logout' : 'تسجيل الخروج'}
          </Link>
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {language === 'en' ? 'Admin Dashboard' : 'لوحة تحكم المسؤول'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' ? 'Welcome back! Here\'s your overview.' : 'مرحباً بعودتك! إليك نظرة عامة.'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Bell className="w-6 h-6 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>
              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-card border border-border rounded-xl shadow-lg z-50">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-semibold">{language === 'en' ? 'Notifications' : 'الإشعارات'}</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-4 hover:bg-muted/50 border-b border-border last:border-0">
                        <p className="text-sm">{n.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-semibold">A</span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{language === 'en' ? 'Admin User' : 'المسؤول'}</p>
                <p className="text-xs text-muted-foreground">admin@academy.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-card rounded-xl p-6 shadow-md border border-border hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-sm text-success font-medium bg-success/10 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Enrollment Chart */}
          <div className="bg-card rounded-xl p-6 shadow-md border border-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">{language === 'en' ? 'Enrollments & Completions' : 'التسجيلات والإنجازات'}</h2>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                {language === 'en' ? 'Export' : 'تصدير'}
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={enrollmentData}>
                <defs>
                  <linearGradient id="enrollGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="completeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Area type="monotone" dataKey="enrollments" stroke="hsl(var(--primary))" fill="url(#enrollGradient)" strokeWidth={2} />
                <Area type="monotone" dataKey="completions" stroke="hsl(var(--success))" fill="url(#completeGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Chart */}
          <div className="bg-card rounded-xl p-6 shadow-md border border-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">{language === 'en' ? 'Revenue Overview' : 'نظرة عامة على الإيرادات'}</h2>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                {language === 'en' ? 'Export' : 'تصدير'}
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Category Distribution */}
          <div className="bg-card rounded-xl p-6 shadow-md border border-border">
            <h2 className="text-lg font-semibold mb-6">{language === 'en' ? 'Programs by Category' : 'البرامج حسب الفئة'}</h2>
            <ResponsiveContainer width="100%" height={200}>
              <RechartsPie>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPie>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {categoryData.map((cat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-xs text-muted-foreground">{cat.name} ({cat.value}%)</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="bg-card rounded-xl p-6 shadow-md border border-border lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">{language === 'en' ? 'Upcoming Sessions' : 'الجلسات القادمة'}</h2>
              <Button variant="outline" size="sm">{language === 'en' ? 'View All' : 'عرض الكل'}</Button>
            </div>
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{session.title}</p>
                      <p className="text-sm text-muted-foreground">{session.trainer} • {session.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      <Users className="w-4 h-4 inline mr-1" />
                      {session.attendees}
                    </span>
                    <Button size="sm">{language === 'en' ? 'View' : 'عرض'}</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trainees Table */}
        <div className="bg-card rounded-xl shadow-md border border-border">
          <div className="p-6 border-b border-border">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-lg font-semibold">{language === 'en' ? 'Recent Trainees' : 'المتدربون الجدد'}</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder={language === 'en' ? 'Search trainees...' : 'بحث...'} className="pl-9 w-64" />
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="w-4 h-4" />
                  {language === 'en' ? 'Filter' : 'تصفية'}
                </Button>
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  {language === 'en' ? 'Add Trainee' : 'إضافة متدرب'}
                </Button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Name' : 'الاسم'}</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Email' : 'البريد'}</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Program' : 'البرنامج'}</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Progress' : 'التقدم'}</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Status' : 'الحالة'}</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Actions' : 'إجراءات'}</th>
                </tr>
              </thead>
              <tbody>
                {recentTrainees.map((trainee) => (
                  <tr key={trainee.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">{trainee.name.charAt(0)}</span>
                        </div>
                        <span className="font-medium">{trainee.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">{trainee.email}</td>
                    <td className="p-4">{trainee.program}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${trainee.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">{trainee.progress}%</span>
                      </div>
                    </td>
                    <td className="p-4">{getStatusBadge(trainee.status)}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-1.5 hover:bg-destructive/10 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-border flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {language === 'en' ? 'Showing 5 of 15,234 trainees' : 'عرض 5 من 15,234 متدرب'}
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>{language === 'en' ? 'Previous' : 'السابق'}</Button>
              <Button variant="outline" size="sm">{language === 'en' ? 'Next' : 'التالي'}</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
