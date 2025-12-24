import React, { useState } from 'react';
import { Users, BookOpen, TrendingUp, DollarSign, Calendar, Bell, Settings, LogOut, BarChart3, PieChart, Search, Plus, ChevronDown, Eye, Edit, Trash2, Download, Filter, X, Check, FileText, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import academyLogo from '@/assets/academy-logo.png';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPie, Pie, Cell, LineChart, Line } from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

const AdminDashboard: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Modal states
  const [showAddTrainee, setShowAddTrainee] = useState(false);
  const [showEditTrainee, setShowEditTrainee] = useState(false);
  const [showViewTrainee, setShowViewTrainee] = useState(false);
  const [showAddProgram, setShowAddProgram] = useState(false);
  const [showSessionDetails, setShowSessionDetails] = useState(false);
  const [selectedTrainee, setSelectedTrainee] = useState<any>(null);
  const [selectedSession, setSelectedSession] = useState<any>(null);

  // Form states
  const [newTrainee, setNewTrainee] = useState({ name: '', email: '', program: '', phone: '' });
  const [newProgram, setNewProgram] = useState({ title: '', category: '', duration: '', price: '' });

  // Data states
  const [trainees, setTrainees] = useState([
    { id: 1, name: language === 'en' ? 'Ahmad Al-Rashid' : 'أحمد الراشد', email: 'ahmad@email.com', phone: '+962 79 123 4567', program: language === 'en' ? 'Leadership Essentials' : 'أساسيات القيادة', status: 'active', progress: 75, joinDate: '2024-01-15' },
    { id: 2, name: language === 'en' ? 'Sara Mohammed' : 'سارة محمد', email: 'sara@email.com', phone: '+962 78 234 5678', program: language === 'en' ? 'Project Management' : 'إدارة المشاريع', status: 'active', progress: 90, joinDate: '2024-02-20' },
    { id: 3, name: language === 'en' ? 'Khalid Hassan' : 'خالد حسن', email: 'khalid@email.com', phone: '+962 77 345 6789', program: language === 'en' ? 'Financial Analysis' : 'التحليل المالي', status: 'pending', progress: 30, joinDate: '2024-03-10' },
    { id: 4, name: language === 'en' ? 'Nora Abdullah' : 'نورة عبدالله', email: 'nora@email.com', phone: '+962 79 456 7890', program: language === 'en' ? 'Digital Marketing' : 'التسويق الرقمي', status: 'completed', progress: 100, joinDate: '2024-01-05' },
    { id: 5, name: language === 'en' ? 'Omar Yusuf' : 'عمر يوسف', email: 'omar@email.com', phone: '+962 78 567 8901', program: language === 'en' ? 'Data Science' : 'علوم البيانات', status: 'active', progress: 55, joinDate: '2024-02-28' },
  ]);

  const [programs, setPrograms] = useState([
    { id: 1, title: language === 'en' ? 'Leadership Essentials' : 'أساسيات القيادة', category: language === 'en' ? 'Leadership' : 'القيادة', duration: '8 weeks', price: '$500', enrolled: 45, status: 'active' },
    { id: 2, title: language === 'en' ? 'Project Management Pro' : 'إدارة المشاريع المتقدمة', category: language === 'en' ? 'Management' : 'الإدارة', duration: '12 weeks', price: '$800', enrolled: 32, status: 'active' },
    { id: 3, title: language === 'en' ? 'Financial Analysis' : 'التحليل المالي', category: language === 'en' ? 'Finance' : 'المالية', duration: '6 weeks', price: '$450', enrolled: 28, status: 'active' },
    { id: 4, title: language === 'en' ? 'Digital Marketing' : 'التسويق الرقمي', category: language === 'en' ? 'Marketing' : 'التسويق', duration: '10 weeks', price: '$600', enrolled: 56, status: 'active' },
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, message: language === 'en' ? 'New trainee registration' : 'تسجيل متدرب جديد', time: '5m', read: false },
    { id: 2, message: language === 'en' ? 'Course completed by Sara' : 'أكملت سارة الدورة', time: '15m', read: false },
    { id: 3, message: language === 'en' ? 'Payment received: $500' : 'تم استلام دفعة: $500', time: '1h', read: true },
    { id: 4, message: language === 'en' ? 'New trainer application' : 'طلب مدرب جديد', time: '2h', read: true },
  ]);

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

  const upcomingSessions = [
    { id: 1, title: language === 'en' ? 'Leadership Workshop' : 'ورشة القيادة', time: '09:00 AM', date: '2024-12-25', trainer: language === 'en' ? 'Dr. Ahmed' : 'د. أحمد', attendees: 24, room: 'A1' },
    { id: 2, title: language === 'en' ? 'Excel Masterclass' : 'احتراف إكسل', time: '11:00 AM', date: '2024-12-25', trainer: language === 'en' ? 'Eng. Sara' : 'م. سارة', attendees: 18, room: 'B2' },
    { id: 3, title: language === 'en' ? 'Project Management' : 'إدارة المشاريع', time: '02:00 PM', date: '2024-12-26', trainer: language === 'en' ? 'Mr. Khalid' : 'أ. خالد', attendees: 30, room: 'C3' },
  ];

  const scheduleData = [
    { day: language === 'en' ? 'Sun' : 'أحد', date: 22, sessions: 3 },
    { day: language === 'en' ? 'Mon' : 'اثنين', date: 23, sessions: 5 },
    { day: language === 'en' ? 'Tue' : 'ثلاثاء', date: 24, sessions: 4, today: true },
    { day: language === 'en' ? 'Wed' : 'أربعاء', date: 25, sessions: 6 },
    { day: language === 'en' ? 'Thu' : 'خميس', date: 26, sessions: 2 },
    { day: language === 'en' ? 'Fri' : 'جمعة', date: 27, sessions: 0 },
    { day: language === 'en' ? 'Sat' : 'سبت', date: 28, sessions: 0 },
  ];

  const reportsData = {
    monthly: [
      { month: language === 'en' ? 'Jan' : 'يناير', trainees: 1200, revenue: 15000, completion: 85 },
      { month: language === 'en' ? 'Feb' : 'فبراير', trainees: 1350, revenue: 18000, completion: 87 },
      { month: language === 'en' ? 'Mar' : 'مارس', trainees: 1500, revenue: 22000, completion: 82 },
      { month: language === 'en' ? 'Apr' : 'أبريل', trainees: 1650, revenue: 19000, completion: 89 },
      { month: language === 'en' ? 'May' : 'مايو', trainees: 1800, revenue: 28000, completion: 91 },
      { month: language === 'en' ? 'Jun' : 'يونيو', trainees: 2000, revenue: 32000, completion: 88 },
    ]
  };

  const navItems = [
    { icon: BarChart3, label: language === 'en' ? 'Dashboard' : 'لوحة التحكم', key: 'dashboard' },
    { icon: Users, label: language === 'en' ? 'Trainees' : 'المتدربون', key: 'trainees' },
    { icon: BookOpen, label: language === 'en' ? 'Programs' : 'البرامج', key: 'programs' },
    { icon: Calendar, label: language === 'en' ? 'Schedule' : 'الجدول', key: 'schedule' },
    { icon: PieChart, label: language === 'en' ? 'Reports' : 'التقارير', key: 'reports' },
    { icon: CreditCard, label: language === 'en' ? 'Payments' : 'المدفوعات', key: 'payments' },
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

  const handleAddTrainee = () => {
    const newId = trainees.length + 1;
    setTrainees([...trainees, { 
      id: newId, 
      ...newTrainee, 
      status: 'pending', 
      progress: 0, 
      joinDate: new Date().toISOString().split('T')[0] 
    }]);
    setShowAddTrainee(false);
    setNewTrainee({ name: '', email: '', program: '', phone: '' });
    toast({ title: language === 'en' ? 'Trainee Added' : 'تمت إضافة المتدرب', description: language === 'en' ? 'New trainee has been added successfully' : 'تم إضافة المتدرب الجديد بنجاح' });
  };

  const handleEditTrainee = () => {
    setTrainees(trainees.map(t => t.id === selectedTrainee.id ? selectedTrainee : t));
    setShowEditTrainee(false);
    toast({ title: language === 'en' ? 'Trainee Updated' : 'تم تحديث المتدرب', description: language === 'en' ? 'Trainee information updated successfully' : 'تم تحديث معلومات المتدرب بنجاح' });
  };

  const handleDeleteTrainee = (id: number) => {
    setTrainees(trainees.filter(t => t.id !== id));
    toast({ title: language === 'en' ? 'Trainee Deleted' : 'تم حذف المتدرب', description: language === 'en' ? 'Trainee has been removed' : 'تم حذف المتدرب' });
  };

  const handleAddProgram = () => {
    const newId = programs.length + 1;
    setPrograms([...programs, { id: newId, ...newProgram, enrolled: 0, status: 'active' }]);
    setShowAddProgram(false);
    setNewProgram({ title: '', category: '', duration: '', price: '' });
    toast({ title: language === 'en' ? 'Program Added' : 'تمت إضافة البرنامج', description: language === 'en' ? 'New program has been created' : 'تم إنشاء البرنامج الجديد' });
  };

  const markNotificationRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const filteredTrainees = trainees.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const renderDashboardContent = () => (
    <>
      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-card rounded-xl p-6 shadow-md border border-border hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab(i === 0 ? 'trainees' : i === 1 ? 'programs' : 'reports')}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="text-sm text-success font-medium bg-success/10 px-2 py-1 rounded-full">{stat.change}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-card rounded-xl p-6 shadow-md border border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">{language === 'en' ? 'Enrollments & Completions' : 'التسجيلات والإنجازات'}</h2>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => toast({ title: language === 'en' ? 'Exported' : 'تم التصدير', description: 'enrollment_data.csv' })}>
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
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="enrollments" stroke="hsl(var(--primary))" fill="url(#enrollGradient)" strokeWidth={2} />
              <Area type="monotone" dataKey="completions" stroke="hsl(var(--success))" fill="url(#completeGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-md border border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">{language === 'en' ? 'Revenue Overview' : 'نظرة عامة على الإيرادات'}</h2>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => toast({ title: language === 'en' ? 'Exported' : 'تم التصدير', description: 'revenue_data.csv' })}>
              <Download className="w-4 h-4" />
              {language === 'en' ? 'Export' : 'تصدير'}
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
              <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-card rounded-xl p-6 shadow-md border border-border">
          <h2 className="text-lg font-semibold mb-6">{language === 'en' ? 'Programs by Category' : 'البرامج حسب الفئة'}</h2>
          <ResponsiveContainer width="100%" height={200}>
            <RechartsPie>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
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

        <div className="bg-card rounded-xl p-6 shadow-md border border-border lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">{language === 'en' ? 'Upcoming Sessions' : 'الجلسات القادمة'}</h2>
            <Button variant="outline" size="sm" onClick={() => setActiveTab('schedule')}>{language === 'en' ? 'View All' : 'عرض الكل'}</Button>
          </div>
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer" onClick={() => { setSelectedSession(session); setShowSessionDetails(true); }}>
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
                  <span className="text-sm text-muted-foreground"><Users className="w-4 h-4 inline mr-1" />{session.attendees}</span>
                  <Button size="sm">{language === 'en' ? 'View' : 'عرض'}</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Trainees Preview */}
      <div className="bg-card rounded-xl shadow-md border border-border">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-semibold">{language === 'en' ? 'Recent Trainees' : 'المتدربون الجدد'}</h2>
          <Button variant="outline" size="sm" onClick={() => setActiveTab('trainees')}>{language === 'en' ? 'View All' : 'عرض الكل'}</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Trainee' : 'المتدرب'}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Program' : 'البرنامج'}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Status' : 'الحالة'}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Progress' : 'التقدم'}</th>
              </tr>
            </thead>
            <tbody>
              {trainees.slice(0, 3).map((trainee) => (
                <tr key={trainee.id} className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => { setSelectedTrainee(trainee); setShowViewTrainee(true); }}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">{trainee.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium">{trainee.name}</p>
                        <p className="text-xs text-muted-foreground">{trainee.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{trainee.program}</td>
                  <td className="p-4">{getStatusBadge(trainee.status)}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${trainee.progress}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{trainee.progress}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderTraineesContent = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">{language === 'en' ? 'Trainees Management' : 'إدارة المتدربين'}</h2>
        <Button className="gap-2" onClick={() => setShowAddTrainee(true)}>
          <Plus className="w-4 h-4" />
          {language === 'en' ? 'Add Trainee' : 'إضافة متدرب'}
        </Button>
      </div>

      <div className="bg-card rounded-xl shadow-md border border-border">
        <div className="p-6 border-b border-border">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder={language === 'en' ? 'Search trainees...' : 'البحث عن متدرب...'} className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === 'en' ? 'All Status' : 'جميع الحالات'}</SelectItem>
                <SelectItem value="active">{language === 'en' ? 'Active' : 'نشط'}</SelectItem>
                <SelectItem value="pending">{language === 'en' ? 'Pending' : 'قيد الانتظار'}</SelectItem>
                <SelectItem value="completed">{language === 'en' ? 'Completed' : 'مكتمل'}</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2" onClick={() => toast({ title: language === 'en' ? 'Exported' : 'تم التصدير', description: 'trainees_list.csv' })}>
              <Download className="w-4 h-4" />
              {language === 'en' ? 'Export' : 'تصدير'}
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Trainee' : 'المتدرب'}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Program' : 'البرنامج'}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Status' : 'الحالة'}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Progress' : 'التقدم'}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Join Date' : 'تاريخ الانضمام'}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Actions' : 'إجراءات'}</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrainees.map((trainee) => (
                <tr key={trainee.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">{trainee.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium">{trainee.name}</p>
                        <p className="text-xs text-muted-foreground">{trainee.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{trainee.program}</td>
                  <td className="p-4">{getStatusBadge(trainee.status)}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${trainee.progress}%` }} />
                      </div>
                      <span className="text-sm text-muted-foreground">{trainee.progress}%</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{trainee.joinDate}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => { setSelectedTrainee(trainee); setShowViewTrainee(true); }}><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => { setSelectedTrainee({...trainee}); setShowEditTrainee(true); }}><Edit className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDeleteTrainee(trainee.id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-border flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{language === 'en' ? `Showing ${filteredTrainees.length} of ${trainees.length} trainees` : `عرض ${filteredTrainees.length} من ${trainees.length} متدرب`}</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>{language === 'en' ? 'Previous' : 'السابق'}</Button>
            <Button variant="outline" size="sm">{language === 'en' ? 'Next' : 'التالي'}</Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProgramsContent = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">{language === 'en' ? 'Programs Management' : 'إدارة البرامج'}</h2>
        <Button className="gap-2" onClick={() => setShowAddProgram(true)}>
          <Plus className="w-4 h-4" />
          {language === 'en' ? 'Add Program' : 'إضافة برنامج'}
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program) => (
          <div key={program.id} className="bg-card rounded-xl p-6 shadow-md border border-border hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <span className="px-2 py-1 bg-success/20 text-success text-xs rounded-full">{language === 'en' ? 'Active' : 'نشط'}</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">{program.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{program.category}</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-muted-foreground">{language === 'en' ? 'Duration' : 'المدة'}</p>
                <p className="font-medium">{program.duration}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{language === 'en' ? 'Price' : 'السعر'}</p>
                <p className="font-medium">{program.price}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{language === 'en' ? 'Enrolled' : 'المسجلين'}</p>
                <p className="font-medium">{program.enrolled}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">{language === 'en' ? 'Edit' : 'تعديل'}</Button>
              <Button size="sm" className="flex-1">{language === 'en' ? 'View Details' : 'التفاصيل'}</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderScheduleContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{language === 'en' ? 'Schedule' : 'الجدول'}</h2>
      
      <div className="bg-card rounded-xl p-6 shadow-md border border-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">{language === 'en' ? 'December 2024' : 'ديسمبر 2024'}</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">{language === 'en' ? 'Previous' : 'السابق'}</Button>
            <Button variant="outline" size="sm">{language === 'en' ? 'Next' : 'التالي'}</Button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-4">
          {scheduleData.map((day, i) => (
            <div key={i} className={`p-4 rounded-xl text-center cursor-pointer transition-all ${day.today ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted'}`}>
              <p className="text-sm font-medium">{day.day}</p>
              <p className="text-2xl font-bold my-2">{day.date}</p>
              {day.sessions > 0 && (
                <span className={`text-xs ${day.today ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
                  {day.sessions} {language === 'en' ? 'sessions' : 'جلسات'}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-xl p-6 shadow-md border border-border">
        <h3 className="text-lg font-semibold mb-4">{language === 'en' ? "Today's Sessions" : 'جلسات اليوم'}</h3>
        <div className="space-y-4">
          {upcomingSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{session.title}</p>
                  <p className="text-sm text-muted-foreground">{session.time} • {language === 'en' ? 'Room' : 'قاعة'} {session.room}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium">{session.trainer}</p>
                  <p className="text-xs text-muted-foreground">{session.attendees} {language === 'en' ? 'attendees' : 'حاضر'}</p>
                </div>
                <Button size="sm">{language === 'en' ? 'Manage' : 'إدارة'}</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReportsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{language === 'en' ? 'Reports & Analytics' : 'التقارير والتحليلات'}</h2>
        <Button className="gap-2" onClick={() => toast({ title: language === 'en' ? 'Report Generated' : 'تم إنشاء التقرير', description: 'full_report.pdf' })}>
          <FileText className="w-4 h-4" />
          {language === 'en' ? 'Generate Report' : 'إنشاء تقرير'}
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">{language === 'en' ? 'Overview' : 'نظرة عامة'}</TabsTrigger>
          <TabsTrigger value="trainees">{language === 'en' ? 'Trainees' : 'المتدربون'}</TabsTrigger>
          <TabsTrigger value="revenue">{language === 'en' ? 'Revenue' : 'الإيرادات'}</TabsTrigger>
          <TabsTrigger value="programs">{language === 'en' ? 'Programs' : 'البرامج'}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl p-6 shadow-md border border-border">
              <h3 className="text-lg font-semibold mb-4">{language === 'en' ? 'Monthly Performance' : 'الأداء الشهري'}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={reportsData.monthly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="trainees" stroke="hsl(var(--primary))" strokeWidth={2} />
                  <Line type="monotone" dataKey="completion" stroke="hsl(var(--success))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-md border border-border">
              <h3 className="text-lg font-semibold mb-4">{language === 'en' ? 'Revenue Trend' : 'اتجاه الإيرادات'}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={reportsData.monthly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="trainees">
          <div className="bg-card rounded-xl p-6 shadow-md border border-border">
            <h3 className="text-lg font-semibold mb-4">{language === 'en' ? 'Trainee Statistics' : 'إحصائيات المتدربين'}</h3>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-3xl font-bold text-primary">15,234</p>
                <p className="text-sm text-muted-foreground">{language === 'en' ? 'Total' : 'الإجمالي'}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-3xl font-bold text-success">12,450</p>
                <p className="text-sm text-muted-foreground">{language === 'en' ? 'Active' : 'نشط'}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-3xl font-bold text-warning">1,284</p>
                <p className="text-sm text-muted-foreground">{language === 'en' ? 'Pending' : 'قيد الانتظار'}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-3xl font-bold text-secondary">1,500</p>
                <p className="text-sm text-muted-foreground">{language === 'en' ? 'Completed' : 'مكتمل'}</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="revenue">
          <div className="bg-card rounded-xl p-6 shadow-md border border-border">
            <h3 className="text-lg font-semibold mb-4">{language === 'en' ? 'Revenue Analysis' : 'تحليل الإيرادات'}</h3>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={reportsData.monthly}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fill="url(#revenueGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="programs">
          <div className="bg-card rounded-xl p-6 shadow-md border border-border">
            <h3 className="text-lg font-semibold mb-4">{language === 'en' ? 'Programs Performance' : 'أداء البرامج'}</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Program' : 'البرنامج'}</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Enrolled' : 'المسجلين'}</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Completed' : 'المكتملين'}</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Revenue' : 'الإيرادات'}</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Rating' : 'التقييم'}</th>
                  </tr>
                </thead>
                <tbody>
                  {programs.map((p) => (
                    <tr key={p.id} className="border-b border-border">
                      <td className="p-4 font-medium">{p.title}</td>
                      <td className="p-4">{p.enrolled}</td>
                      <td className="p-4">{Math.floor(p.enrolled * 0.7)}</td>
                      <td className="p-4">${p.enrolled * parseInt(p.price.replace('$', ''))}</td>
                      <td className="p-4">⭐ 4.8</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderPaymentsContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{language === 'en' ? 'Payments' : 'المدفوعات'}</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-card rounded-xl p-6 shadow-md border border-border">
          <p className="text-sm text-muted-foreground mb-2">{language === 'en' ? 'Total Revenue' : 'إجمالي الإيرادات'}</p>
          <p className="text-3xl font-bold text-primary">$124,500</p>
          <p className="text-sm text-success mt-2">+18% {language === 'en' ? 'from last month' : 'من الشهر الماضي'}</p>
        </div>
        <div className="bg-card rounded-xl p-6 shadow-md border border-border">
          <p className="text-sm text-muted-foreground mb-2">{language === 'en' ? 'Pending Payments' : 'المدفوعات المعلقة'}</p>
          <p className="text-3xl font-bold text-warning">$12,350</p>
          <p className="text-sm text-muted-foreground mt-2">15 {language === 'en' ? 'invoices' : 'فاتورة'}</p>
        </div>
        <div className="bg-card rounded-xl p-6 shadow-md border border-border">
          <p className="text-sm text-muted-foreground mb-2">{language === 'en' ? 'This Month' : 'هذا الشهر'}</p>
          <p className="text-3xl font-bold text-success">$32,000</p>
          <p className="text-sm text-muted-foreground mt-2">48 {language === 'en' ? 'transactions' : 'معاملة'}</p>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-md border border-border">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3 className="text-lg font-semibold">{language === 'en' ? 'Recent Transactions' : 'المعاملات الأخيرة'}</h3>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            {language === 'en' ? 'Export' : 'تصدير'}
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Invoice' : 'الفاتورة'}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Trainee' : 'المتدرب'}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Program' : 'البرنامج'}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Amount' : 'المبلغ'}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Status' : 'الحالة'}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Date' : 'التاريخ'}</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'INV-001', trainee: 'Ahmad', program: 'Leadership', amount: '$500', status: 'paid', date: '2024-12-20' },
                { id: 'INV-002', trainee: 'Sara', program: 'Project Mgmt', amount: '$800', status: 'paid', date: '2024-12-19' },
                { id: 'INV-003', trainee: 'Khalid', program: 'Finance', amount: '$450', status: 'pending', date: '2024-12-18' },
                { id: 'INV-004', trainee: 'Nora', program: 'Marketing', amount: '$600', status: 'paid', date: '2024-12-17' },
              ].map((tx) => (
                <tr key={tx.id} className="border-b border-border hover:bg-muted/50">
                  <td className="p-4 font-medium">{tx.id}</td>
                  <td className="p-4">{tx.trainee}</td>
                  <td className="p-4 text-muted-foreground">{tx.program}</td>
                  <td className="p-4 font-medium">{tx.amount}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${tx.status === 'paid' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
                      {tx.status === 'paid' ? (language === 'en' ? 'Paid' : 'مدفوع') : (language === 'en' ? 'Pending' : 'معلق')}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSettingsContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{language === 'en' ? 'Settings' : 'الإعدادات'}</h2>
      
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl p-6 shadow-md border border-border">
          <h3 className="text-lg font-semibold mb-4">{language === 'en' ? 'Profile Settings' : 'إعدادات الملف الشخصي'}</h3>
          <div className="space-y-4">
            <div>
              <Label>{language === 'en' ? 'Full Name' : 'الاسم الكامل'}</Label>
              <Input defaultValue="Admin User" className="mt-1" />
            </div>
            <div>
              <Label>{language === 'en' ? 'Email' : 'البريد الإلكتروني'}</Label>
              <Input defaultValue="admin@academy.com" className="mt-1" />
            </div>
            <div>
              <Label>{language === 'en' ? 'Phone' : 'الهاتف'}</Label>
              <Input defaultValue="+962 79 123 4567" className="mt-1" />
            </div>
            <Button onClick={() => toast({ title: language === 'en' ? 'Saved' : 'تم الحفظ' })}>{language === 'en' ? 'Save Changes' : 'حفظ التغييرات'}</Button>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-md border border-border">
          <h3 className="text-lg font-semibold mb-4">{language === 'en' ? 'Notification Settings' : 'إعدادات الإشعارات'}</h3>
          <div className="space-y-4">
            {[
              { label: language === 'en' ? 'Email Notifications' : 'إشعارات البريد', checked: true },
              { label: language === 'en' ? 'SMS Notifications' : 'إشعارات الرسائل', checked: false },
              { label: language === 'en' ? 'New Registrations' : 'التسجيلات الجديدة', checked: true },
              { label: language === 'en' ? 'Payment Alerts' : 'تنبيهات الدفع', checked: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span>{item.label}</span>
                <input type="checkbox" defaultChecked={item.checked} className="w-5 h-5 accent-primary" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboardContent();
      case 'trainees': return renderTraineesContent();
      case 'programs': return renderProgramsContent();
      case 'schedule': return renderScheduleContent();
      case 'reports': return renderReportsContent();
      case 'payments': return renderPaymentsContent();
      case 'settings': return renderSettingsContent();
      default: return renderDashboardContent();
    }
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
                activeTab === item.key ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'hover:bg-sidebar-accent/50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
        <Button variant="ghost" className="w-full gap-2 text-sidebar-foreground mt-auto" asChild>
          <Link to="/login"><LogOut className="w-4 h-4" />{language === 'en' ? 'Logout' : 'تسجيل الخروج'}</Link>
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{language === 'en' ? 'Admin Dashboard' : 'لوحة تحكم المسؤول'}</h1>
            <p className="text-muted-foreground">{language === 'en' ? "Welcome back! Here's your overview." : 'مرحباً بعودتك! إليك نظرة عامة.'}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 hover:bg-muted rounded-lg transition-colors">
                <Bell className="w-6 h-6 text-muted-foreground" />
                {notifications.some(n => !n.read) && <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />}
              </button>
              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-card border border-border rounded-xl shadow-lg z-50">
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <h3 className="font-semibold">{language === 'en' ? 'Notifications' : 'الإشعارات'}</h3>
                    <Button variant="ghost" size="sm" onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}>{language === 'en' ? 'Mark all read' : 'تحديد الكل كمقروء'}</Button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className={`p-4 hover:bg-muted/50 border-b border-border last:border-0 cursor-pointer ${!n.read ? 'bg-primary/5' : ''}`} onClick={() => markNotificationRead(n.id)}>
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

        {renderContent()}
      </main>

      {/* Add Trainee Modal */}
      <Dialog open={showAddTrainee} onOpenChange={setShowAddTrainee}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{language === 'en' ? 'Add New Trainee' : 'إضافة متدرب جديد'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>{language === 'en' ? 'Full Name' : 'الاسم الكامل'}</Label>
              <Input value={newTrainee.name} onChange={(e) => setNewTrainee({ ...newTrainee, name: e.target.value })} />
            </div>
            <div>
              <Label>{language === 'en' ? 'Email' : 'البريد الإلكتروني'}</Label>
              <Input type="email" value={newTrainee.email} onChange={(e) => setNewTrainee({ ...newTrainee, email: e.target.value })} />
            </div>
            <div>
              <Label>{language === 'en' ? 'Phone' : 'الهاتف'}</Label>
              <Input value={newTrainee.phone} onChange={(e) => setNewTrainee({ ...newTrainee, phone: e.target.value })} />
            </div>
            <div>
              <Label>{language === 'en' ? 'Program' : 'البرنامج'}</Label>
              <Select value={newTrainee.program} onValueChange={(v) => setNewTrainee({ ...newTrainee, program: v })}>
                <SelectTrigger><SelectValue placeholder={language === 'en' ? 'Select program' : 'اختر البرنامج'} /></SelectTrigger>
                <SelectContent>
                  {programs.map(p => <SelectItem key={p.id} value={p.title}>{p.title}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddTrainee(false)}>{language === 'en' ? 'Cancel' : 'إلغاء'}</Button>
            <Button onClick={handleAddTrainee}>{language === 'en' ? 'Add Trainee' : 'إضافة المتدرب'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Trainee Modal */}
      <Dialog open={showEditTrainee} onOpenChange={setShowEditTrainee}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{language === 'en' ? 'Edit Trainee' : 'تعديل المتدرب'}</DialogTitle>
          </DialogHeader>
          {selectedTrainee && (
            <div className="space-y-4">
              <div>
                <Label>{language === 'en' ? 'Full Name' : 'الاسم الكامل'}</Label>
                <Input value={selectedTrainee.name} onChange={(e) => setSelectedTrainee({ ...selectedTrainee, name: e.target.value })} />
              </div>
              <div>
                <Label>{language === 'en' ? 'Email' : 'البريد الإلكتروني'}</Label>
                <Input type="email" value={selectedTrainee.email} onChange={(e) => setSelectedTrainee({ ...selectedTrainee, email: e.target.value })} />
              </div>
              <div>
                <Label>{language === 'en' ? 'Status' : 'الحالة'}</Label>
                <Select value={selectedTrainee.status} onValueChange={(v) => setSelectedTrainee({ ...selectedTrainee, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">{language === 'en' ? 'Active' : 'نشط'}</SelectItem>
                    <SelectItem value="pending">{language === 'en' ? 'Pending' : 'قيد الانتظار'}</SelectItem>
                    <SelectItem value="completed">{language === 'en' ? 'Completed' : 'مكتمل'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditTrainee(false)}>{language === 'en' ? 'Cancel' : 'إلغاء'}</Button>
            <Button onClick={handleEditTrainee}>{language === 'en' ? 'Save Changes' : 'حفظ التغييرات'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Trainee Modal */}
      <Dialog open={showViewTrainee} onOpenChange={setShowViewTrainee}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{language === 'en' ? 'Trainee Details' : 'تفاصيل المتدرب'}</DialogTitle>
          </DialogHeader>
          {selectedTrainee && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{selectedTrainee.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedTrainee.name}</h3>
                  <p className="text-muted-foreground">{selectedTrainee.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">{language === 'en' ? 'Program' : 'البرنامج'}</p>
                  <p className="font-medium">{selectedTrainee.program}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">{language === 'en' ? 'Status' : 'الحالة'}</p>
                  <p>{getStatusBadge(selectedTrainee.status)}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">{language === 'en' ? 'Progress' : 'التقدم'}</p>
                  <p className="font-medium">{selectedTrainee.progress}%</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">{language === 'en' ? 'Join Date' : 'تاريخ الانضمام'}</p>
                  <p className="font-medium">{selectedTrainee.joinDate}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewTrainee(false)}>{language === 'en' ? 'Close' : 'إغلاق'}</Button>
            <Button onClick={() => { setShowViewTrainee(false); setShowEditTrainee(true); }}>{language === 'en' ? 'Edit' : 'تعديل'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Program Modal */}
      <Dialog open={showAddProgram} onOpenChange={setShowAddProgram}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{language === 'en' ? 'Add New Program' : 'إضافة برنامج جديد'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>{language === 'en' ? 'Program Title' : 'عنوان البرنامج'}</Label>
              <Input value={newProgram.title} onChange={(e) => setNewProgram({ ...newProgram, title: e.target.value })} />
            </div>
            <div>
              <Label>{language === 'en' ? 'Category' : 'الفئة'}</Label>
              <Select value={newProgram.category} onValueChange={(v) => setNewProgram({ ...newProgram, category: v })}>
                <SelectTrigger><SelectValue placeholder={language === 'en' ? 'Select category' : 'اختر الفئة'} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Leadership">{language === 'en' ? 'Leadership' : 'القيادة'}</SelectItem>
                  <SelectItem value="Technical">{language === 'en' ? 'Technical' : 'التقنية'}</SelectItem>
                  <SelectItem value="Finance">{language === 'en' ? 'Finance' : 'المالية'}</SelectItem>
                  <SelectItem value="Marketing">{language === 'en' ? 'Marketing' : 'التسويق'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>{language === 'en' ? 'Duration' : 'المدة'}</Label>
              <Input value={newProgram.duration} onChange={(e) => setNewProgram({ ...newProgram, duration: e.target.value })} placeholder="e.g., 8 weeks" />
            </div>
            <div>
              <Label>{language === 'en' ? 'Price' : 'السعر'}</Label>
              <Input value={newProgram.price} onChange={(e) => setNewProgram({ ...newProgram, price: e.target.value })} placeholder="e.g., $500" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddProgram(false)}>{language === 'en' ? 'Cancel' : 'إلغاء'}</Button>
            <Button onClick={handleAddProgram}>{language === 'en' ? 'Add Program' : 'إضافة البرنامج'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Session Details Modal */}
      <Dialog open={showSessionDetails} onOpenChange={setShowSessionDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{language === 'en' ? 'Session Details' : 'تفاصيل الجلسة'}</DialogTitle>
          </DialogHeader>
          {selectedSession && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedSession.title}</h3>
                  <p className="text-muted-foreground">{selectedSession.trainer}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">{language === 'en' ? 'Date' : 'التاريخ'}</p>
                  <p className="font-medium">{selectedSession.date}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">{language === 'en' ? 'Time' : 'الوقت'}</p>
                  <p className="font-medium">{selectedSession.time}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">{language === 'en' ? 'Room' : 'القاعة'}</p>
                  <p className="font-medium">{selectedSession.room}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">{language === 'en' ? 'Attendees' : 'الحضور'}</p>
                  <p className="font-medium">{selectedSession.attendees}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSessionDetails(false)}>{language === 'en' ? 'Close' : 'إغلاق'}</Button>
            <Button>{language === 'en' ? 'Manage Session' : 'إدارة الجلسة'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;