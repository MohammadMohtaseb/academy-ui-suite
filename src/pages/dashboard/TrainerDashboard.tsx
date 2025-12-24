import React, { useState } from 'react';
import { Calendar, Users, ClipboardCheck, BarChart3, Bell, LogOut, BookOpen, Settings, Star, Clock, ChevronLeft, ChevronRight, Check, X, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import academyLogo from '@/assets/academy-logo.png';
import { Link } from 'react-router-dom';

const TrainerDashboard: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);

  const stats = [
    { value: '12', label: language === 'en' ? 'Active Sessions' : 'جلسات نشطة', color: 'text-primary' },
    { value: '248', label: language === 'en' ? 'Total Trainees' : 'إجمالي المتدربين', color: 'text-secondary' },
    { value: '4.9', label: language === 'en' ? 'Avg Rating' : 'متوسط التقييم', color: 'text-warning' },
    { value: '95%', label: language === 'en' ? 'Attendance Rate' : 'نسبة الحضور', color: 'text-success' },
  ];

  const todaySessions = [
    { 
      id: 1, 
      title: language === 'en' ? 'Strategic Leadership' : 'القيادة الاستراتيجية', 
      time: '09:00 - 11:00',
      room: language === 'en' ? 'Room A1' : 'قاعة A1',
      attendees: 24,
      status: 'upcoming'
    },
    { 
      id: 2, 
      title: language === 'en' ? 'Project Management' : 'إدارة المشاريع', 
      time: '14:00 - 16:00',
      room: language === 'en' ? 'Room B2' : 'قاعة B2',
      attendees: 18,
      status: 'upcoming'
    },
    { 
      id: 3, 
      title: language === 'en' ? 'Team Building Workshop' : 'ورشة بناء الفريق', 
      time: '16:30 - 18:00',
      room: language === 'en' ? 'Room C3' : 'قاعة C3',
      attendees: 30,
      status: 'upcoming'
    },
  ];

  const weekSchedule = [
    { day: language === 'en' ? 'Sun' : 'أحد', date: 15, sessions: 2 },
    { day: language === 'en' ? 'Mon' : 'اثنين', date: 16, sessions: 3, today: true },
    { day: language === 'en' ? 'Tue' : 'ثلاثاء', date: 17, sessions: 1 },
    { day: language === 'en' ? 'Wed' : 'أربعاء', date: 18, sessions: 2 },
    { day: language === 'en' ? 'Thu' : 'خميس', date: 19, sessions: 4 },
    { day: language === 'en' ? 'Fri' : 'جمعة', date: 20, sessions: 0 },
    { day: language === 'en' ? 'Sat' : 'سبت', date: 21, sessions: 0 },
  ];

  const myTrainees = [
    { id: 1, name: language === 'en' ? 'Ahmad Al-Rashid' : 'أحمد الراشد', course: language === 'en' ? 'Leadership' : 'القيادة', progress: 85, attendance: 100 },
    { id: 2, name: language === 'en' ? 'Sara Mohammed' : 'سارة محمد', course: language === 'en' ? 'Leadership' : 'القيادة', progress: 72, attendance: 90 },
    { id: 3, name: language === 'en' ? 'Khalid Hassan' : 'خالد حسن', course: language === 'en' ? 'Project Mgmt' : 'إدارة المشاريع', progress: 90, attendance: 95 },
    { id: 4, name: language === 'en' ? 'Nora Abdullah' : 'نورة عبدالله', course: language === 'en' ? 'Leadership' : 'القيادة', progress: 65, attendance: 85 },
    { id: 5, name: language === 'en' ? 'Omar Yusuf' : 'عمر يوسف', course: language === 'en' ? 'Project Mgmt' : 'إدارة المشاريع', progress: 78, attendance: 92 },
  ];

  const recentFeedback = [
    { id: 1, trainee: language === 'en' ? 'Ahmad' : 'أحمد', rating: 5, comment: language === 'en' ? 'Excellent session! Very informative.' : 'جلسة ممتازة! مفيدة جداً.' },
    { id: 2, trainee: language === 'en' ? 'Sara' : 'سارة', rating: 5, comment: language === 'en' ? 'Great teaching style.' : 'أسلوب تدريس رائع.' },
    { id: 3, trainee: language === 'en' ? 'Khalid' : 'خالد', rating: 4, comment: language === 'en' ? 'Very helpful examples.' : 'أمثلة مفيدة جداً.' },
  ];

  const notifications = [
    { id: 1, message: language === 'en' ? 'New trainee enrolled' : 'متدرب جديد مسجل', time: '5m' },
    { id: 2, message: language === 'en' ? 'Session reminder: 2 hours' : 'تذكير بالجلسة: ساعتين', time: '30m' },
    { id: 3, message: language === 'en' ? 'New feedback received' : 'تقييم جديد مستلم', time: '1h' },
  ];

  const navItems = [
    { icon: BarChart3, label: language === 'en' ? 'Overview' : 'نظرة عامة', key: 'overview' },
    { icon: Calendar, label: language === 'en' ? 'Schedule' : 'الجدول', key: 'schedule' },
    { icon: Users, label: language === 'en' ? 'My Trainees' : 'متدربيني', key: 'trainees' },
    { icon: ClipboardCheck, label: language === 'en' ? 'Attendance' : 'الحضور', key: 'attendance' },
    { icon: BookOpen, label: language === 'en' ? 'Evaluations' : 'التقييمات', key: 'evaluations' },
    { icon: Settings, label: language === 'en' ? 'Settings' : 'الإعدادات', key: 'settings' },
  ];

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
              {language === 'en' ? 'Welcome, Dr. Ahmed!' : 'مرحباً، د. أحمد!'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' ? 'You have 3 sessions scheduled today.' : 'لديك 3 جلسات مجدولة اليوم.'}
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
                <span className="text-primary font-semibold">أ</span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{language === 'en' ? 'Dr. Ahmed Hassan' : 'د. أحمد حسن'}</p>
                <p className="text-xs text-muted-foreground">{language === 'en' ? 'Senior Trainer' : 'مدرب أول'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-card rounded-xl p-6 shadow-md border border-border hover:shadow-lg transition-shadow">
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Week Schedule */}
          <div className="bg-card rounded-xl p-6 shadow-md border border-border lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">{language === 'en' ? 'This Week' : 'هذا الأسبوع'}</h2>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm font-medium">{language === 'en' ? 'December 2024' : 'ديسمبر 2024'}</span>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {weekSchedule.map((day, i) => (
                <div
                  key={i}
                  className={`text-center p-3 rounded-xl cursor-pointer transition-all ${
                    day.today
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  <p className="text-xs font-medium mb-1">{day.day}</p>
                  <p className="text-lg font-bold">{day.date}</p>
                  {day.sessions > 0 && (
                    <div className={`mt-2 text-xs ${day.today ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
                      {day.sessions} {language === 'en' ? 'sessions' : 'جلسات'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Rating Summary */}
          <div className="bg-card rounded-xl p-6 shadow-md border border-border">
            <h2 className="text-lg font-semibold mb-4">{language === 'en' ? 'Your Rating' : 'تقييمك'}</h2>
            <div className="text-center py-4">
              <p className="text-5xl font-bold text-warning mb-2">4.9</p>
              <div className="flex justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-warning text-warning" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {language === 'en' ? 'Based on 156 reviews' : 'بناءً على 156 تقييم'}
              </p>
            </div>
            <div className="space-y-2 mt-4">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm w-3">{rating}</span>
                  <Star className="w-4 h-4 fill-warning text-warning" />
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-warning rounded-full"
                      style={{ width: `${rating === 5 ? 80 : rating === 4 ? 15 : 5}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-8">
                    {rating === 5 ? '80%' : rating === 4 ? '15%' : '5%'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Today's Sessions */}
          <div className="bg-card rounded-xl p-6 shadow-md border border-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">{language === 'en' ? "Today's Sessions" : 'جلسات اليوم'}</h2>
              <Button variant="outline" size="sm">{language === 'en' ? 'View All' : 'عرض الكل'}</Button>
            </div>
            <div className="space-y-4">
              {todaySessions.map((session) => (
                <div key={session.id} className="p-4 bg-muted/50 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{session.title}</p>
                      <p className="text-sm text-muted-foreground">{session.time} • {session.room}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      <Users className="w-4 h-4 inline mr-1" />
                      {session.attendees}
                    </span>
                    <Button size="sm">{language === 'en' ? 'Start' : 'ابدأ'}</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Feedback */}
          <div className="bg-card rounded-xl p-6 shadow-md border border-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">{language === 'en' ? 'Recent Feedback' : 'التقييمات الأخيرة'}</h2>
              <Button variant="outline" size="sm">{language === 'en' ? 'View All' : 'عرض الكل'}</Button>
            </div>
            <div className="space-y-4">
              {recentFeedback.map((feedback) => (
                <div key={feedback.id} className="p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">{feedback.trainee.charAt(0)}</span>
                      </div>
                      <span className="font-medium">{feedback.trainee}</span>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(feedback.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{feedback.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* My Trainees */}
        <div className="bg-card rounded-xl shadow-md border border-border">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-semibold">{language === 'en' ? 'My Trainees' : 'متدربيني'}</h2>
            <Button variant="outline" size="sm">{language === 'en' ? 'View All' : 'عرض الكل'}</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Trainee' : 'المتدرب'}</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Course' : 'الدورة'}</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Progress' : 'التقدم'}</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Attendance' : 'الحضور'}</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Actions' : 'إجراءات'}</th>
                </tr>
              </thead>
              <tbody>
                {myTrainees.map((trainee) => (
                  <tr key={trainee.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">{trainee.name.charAt(0)}</span>
                        </div>
                        <span className="font-medium">{trainee.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">{trainee.course}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${trainee.progress}%` }} />
                        </div>
                        <span className="text-sm">{trainee.progress}%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        trainee.attendance >= 90 ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                      }`}>
                        {trainee.attendance}%
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                          <MessageSquare className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                          <ClipboardCheck className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TrainerDashboard;
