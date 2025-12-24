import React, { useState } from 'react';
import { Calendar, Users, ClipboardCheck, BarChart3, Bell, LogOut, BookOpen, Settings, Star, Clock, ChevronLeft, ChevronRight, Check, X, MessageSquare, Play, FileText, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import academyLogo from '@/assets/academy-logo.png';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

const TrainerDashboard: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  
  // Modal states
  const [showStartSession, setShowStartSession] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [showTraineeDetails, setShowTraineeDetails] = useState(false);
  const [showFeedbackReply, setShowFeedbackReply] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [selectedTrainee, setSelectedTrainee] = useState<any>(null);
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);

  // Form states
  const [replyMessage, setReplyMessage] = useState('');
  const [evaluationNotes, setEvaluationNotes] = useState('');
  const [evaluationScore, setEvaluationScore] = useState(5);

  const stats = [
    { value: '12', label: language === 'en' ? 'Active Sessions' : 'جلسات نشطة', color: 'text-primary' },
    { value: '248', label: language === 'en' ? 'Total Trainees' : 'إجمالي المتدربين', color: 'text-secondary' },
    { value: '4.9', label: language === 'en' ? 'Avg Rating' : 'متوسط التقييم', color: 'text-warning' },
    { value: '95%', label: language === 'en' ? 'Attendance Rate' : 'نسبة الحضور', color: 'text-success' },
  ];

  const [todaySessions, setTodaySessions] = useState([
    { id: 1, title: language === 'en' ? 'Strategic Leadership' : 'القيادة الاستراتيجية', time: '09:00 - 11:00', room: language === 'en' ? 'Room A1' : 'قاعة A1', attendees: 24, status: 'upcoming', started: false },
    { id: 2, title: language === 'en' ? 'Project Management' : 'إدارة المشاريع', time: '14:00 - 16:00', room: language === 'en' ? 'Room B2' : 'قاعة B2', attendees: 18, status: 'upcoming', started: false },
    { id: 3, title: language === 'en' ? 'Team Building Workshop' : 'ورشة بناء الفريق', time: '16:30 - 18:00', room: language === 'en' ? 'Room C3' : 'قاعة C3', attendees: 30, status: 'upcoming', started: false },
  ]);

  const getWeekSchedule = (offset: number) => {
    const baseDate = 15 + (offset * 7);
    return [
      { day: language === 'en' ? 'Sun' : 'أحد', date: baseDate, sessions: 2 },
      { day: language === 'en' ? 'Mon' : 'اثنين', date: baseDate + 1, sessions: 3, today: offset === 0 },
      { day: language === 'en' ? 'Tue' : 'ثلاثاء', date: baseDate + 2, sessions: 1 },
      { day: language === 'en' ? 'Wed' : 'أربعاء', date: baseDate + 3, sessions: 2 },
      { day: language === 'en' ? 'Thu' : 'خميس', date: baseDate + 4, sessions: 4 },
      { day: language === 'en' ? 'Fri' : 'جمعة', date: baseDate + 5, sessions: 0 },
      { day: language === 'en' ? 'Sat' : 'سبت', date: baseDate + 6, sessions: 0 },
    ];
  };

  const [myTrainees, setMyTrainees] = useState([
    { id: 1, name: language === 'en' ? 'Ahmad Al-Rashid' : 'أحمد الراشد', course: language === 'en' ? 'Leadership' : 'القيادة', progress: 85, attendance: 100, email: 'ahmad@email.com', phone: '+962 79 123 4567' },
    { id: 2, name: language === 'en' ? 'Sara Mohammed' : 'سارة محمد', course: language === 'en' ? 'Leadership' : 'القيادة', progress: 72, attendance: 90, email: 'sara@email.com', phone: '+962 78 234 5678' },
    { id: 3, name: language === 'en' ? 'Khalid Hassan' : 'خالد حسن', course: language === 'en' ? 'Project Mgmt' : 'إدارة المشاريع', progress: 90, attendance: 95, email: 'khalid@email.com', phone: '+962 77 345 6789' },
    { id: 4, name: language === 'en' ? 'Nora Abdullah' : 'نورة عبدالله', course: language === 'en' ? 'Leadership' : 'القيادة', progress: 65, attendance: 85, email: 'nora@email.com', phone: '+962 79 456 7890' },
    { id: 5, name: language === 'en' ? 'Omar Yusuf' : 'عمر يوسف', course: language === 'en' ? 'Project Mgmt' : 'إدارة المشاريع', progress: 78, attendance: 92, email: 'omar@email.com', phone: '+962 78 567 8901' },
  ]);

  const [attendanceList, setAttendanceList] = useState<{[key: number]: boolean}>({});

  const [recentFeedback, setRecentFeedback] = useState([
    { id: 1, trainee: language === 'en' ? 'Ahmad' : 'أحمد', rating: 5, comment: language === 'en' ? 'Excellent session! Very informative.' : 'جلسة ممتازة! مفيدة جداً.', replied: false },
    { id: 2, trainee: language === 'en' ? 'Sara' : 'سارة', rating: 5, comment: language === 'en' ? 'Great teaching style.' : 'أسلوب تدريس رائع.', replied: true },
    { id: 3, trainee: language === 'en' ? 'Khalid' : 'خالد', rating: 4, comment: language === 'en' ? 'Very helpful examples.' : 'أمثلة مفيدة جداً.', replied: false },
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, message: language === 'en' ? 'New trainee enrolled' : 'متدرب جديد مسجل', time: '5m', read: false },
    { id: 2, message: language === 'en' ? 'Session reminder: 2 hours' : 'تذكير بالجلسة: ساعتين', time: '30m', read: false },
    { id: 3, message: language === 'en' ? 'New feedback received' : 'تقييم جديد مستلم', time: '1h', read: true },
  ]);

  const navItems = [
    { icon: BarChart3, label: language === 'en' ? 'Overview' : 'نظرة عامة', key: 'overview' },
    { icon: Calendar, label: language === 'en' ? 'Schedule' : 'الجدول', key: 'schedule' },
    { icon: Users, label: language === 'en' ? 'My Trainees' : 'متدربيني', key: 'trainees' },
    { icon: ClipboardCheck, label: language === 'en' ? 'Attendance' : 'الحضور', key: 'attendance' },
    { icon: BookOpen, label: language === 'en' ? 'Evaluations' : 'التقييمات', key: 'evaluations' },
    { icon: MessageSquare, label: language === 'en' ? 'Feedback' : 'الملاحظات', key: 'feedback' },
    { icon: Settings, label: language === 'en' ? 'Settings' : 'الإعدادات', key: 'settings' },
  ];

  const handleStartSession = (session: any) => {
    setTodaySessions(todaySessions.map(s => s.id === session.id ? { ...s, started: true, status: 'in-progress' } : s));
    setShowStartSession(false);
    toast({ title: language === 'en' ? 'Session Started' : 'بدأت الجلسة', description: session.title });
  };

  const handleEndSession = (sessionId: number) => {
    setTodaySessions(todaySessions.map(s => s.id === sessionId ? { ...s, started: false, status: 'completed' } : s));
    toast({ title: language === 'en' ? 'Session Ended' : 'انتهت الجلسة' });
  };

  const handleMarkAttendance = () => {
    const presentCount = Object.values(attendanceList).filter(v => v).length;
    toast({ 
      title: language === 'en' ? 'Attendance Saved' : 'تم حفظ الحضور', 
      description: language === 'en' ? `${presentCount} trainees marked present` : `تم تسجيل حضور ${presentCount} متدرب` 
    });
    setShowAttendance(false);
    setAttendanceList({});
  };

  const handleSaveEvaluation = () => {
    toast({ title: language === 'en' ? 'Evaluation Saved' : 'تم حفظ التقييم' });
    setShowEvaluation(false);
    setEvaluationNotes('');
    setEvaluationScore(5);
  };

  const handleReplyFeedback = () => {
    setRecentFeedback(recentFeedback.map(f => f.id === selectedFeedback.id ? { ...f, replied: true } : f));
    toast({ title: language === 'en' ? 'Reply Sent' : 'تم إرسال الرد' });
    setShowFeedbackReply(false);
    setReplyMessage('');
  };

  const markNotificationRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const renderOverviewContent = () => (
    <>
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
              <button className="p-2 hover:bg-muted rounded-lg transition-colors" onClick={() => setCurrentWeekOffset(currentWeekOffset - 1)}>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-medium">{language === 'en' ? 'December 2024' : 'ديسمبر 2024'}</span>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors" onClick={() => setCurrentWeekOffset(currentWeekOffset + 1)}>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {getWeekSchedule(currentWeekOffset).map((day, i) => (
              <div key={i} className={`text-center p-3 rounded-xl cursor-pointer transition-all ${day.today ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`} onClick={() => setActiveTab('schedule')}>
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
            <p className="text-sm text-muted-foreground">{language === 'en' ? 'Based on 156 reviews' : 'بناءً على 156 تقييم'}</p>
          </div>
          <div className="space-y-2 mt-4">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2">
                <span className="text-sm w-3">{rating}</span>
                <Star className="w-4 h-4 fill-warning text-warning" />
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-warning rounded-full" style={{ width: `${rating === 5 ? 80 : rating === 4 ? 15 : 5}%` }} />
                </div>
                <span className="text-xs text-muted-foreground w-8">{rating === 5 ? '80%' : rating === 4 ? '15%' : '5%'}</span>
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
            <Button variant="outline" size="sm" onClick={() => setActiveTab('schedule')}>{language === 'en' ? 'View All' : 'عرض الكل'}</Button>
          </div>
          <div className="space-y-4">
            {todaySessions.map((session) => (
              <div key={session.id} className="p-4 bg-muted/50 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${session.started ? 'bg-success/10' : 'bg-primary/10'}`}>
                    {session.started ? <Play className="w-6 h-6 text-success" /> : <Clock className="w-6 h-6 text-primary" />}
                  </div>
                  <div>
                    <p className="font-medium">{session.title}</p>
                    <p className="text-sm text-muted-foreground">{session.time} • {session.room}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground"><Users className="w-4 h-4 inline mr-1" />{session.attendees}</span>
                  {session.started ? (
                    <Button size="sm" variant="destructive" onClick={() => handleEndSession(session.id)}>{language === 'en' ? 'End' : 'إنهاء'}</Button>
                  ) : session.status === 'completed' ? (
                    <span className="text-sm text-success">{language === 'en' ? 'Completed' : 'مكتمل'}</span>
                  ) : (
                    <Button size="sm" onClick={() => { setSelectedSession(session); setShowStartSession(true); }}>{language === 'en' ? 'Start' : 'ابدأ'}</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Feedback */}
        <div className="bg-card rounded-xl p-6 shadow-md border border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">{language === 'en' ? 'Recent Feedback' : 'التقييمات الأخيرة'}</h2>
            <Button variant="outline" size="sm" onClick={() => setActiveTab('feedback')}>{language === 'en' ? 'View All' : 'عرض الكل'}</Button>
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
                    {feedback.replied && <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded-full">{language === 'en' ? 'Replied' : 'تم الرد'}</span>}
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(feedback.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{feedback.comment}</p>
                {!feedback.replied && (
                  <Button size="sm" variant="outline" onClick={() => { setSelectedFeedback(feedback); setShowFeedbackReply(true); }}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    {language === 'en' ? 'Reply' : 'رد'}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Trainees Preview */}
      <div className="bg-card rounded-xl shadow-md border border-border">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-semibold">{language === 'en' ? 'My Trainees' : 'متدربيني'}</h2>
          <Button variant="outline" size="sm" onClick={() => setActiveTab('trainees')}>{language === 'en' ? 'View All' : 'عرض الكل'}</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Trainee' : 'المتدرب'}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Course' : 'الدورة'}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Progress' : 'التقدم'}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Attendance' : 'الحضور'}</th>
              </tr>
            </thead>
            <tbody>
              {myTrainees.slice(0, 3).map((trainee) => (
                <tr key={trainee.id} className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => { setSelectedTrainee(trainee); setShowTraineeDetails(true); }}>
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
                      <span className="text-xs text-muted-foreground">{trainee.progress}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`text-sm font-medium ${trainee.attendance >= 90 ? 'text-success' : trainee.attendance >= 75 ? 'text-warning' : 'text-destructive'}`}>
                      {trainee.attendance}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderScheduleContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{language === 'en' ? 'My Schedule' : 'جدولي'}</h2>
      
      <div className="bg-card rounded-xl p-6 shadow-md border border-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">{language === 'en' ? 'December 2024' : 'ديسمبر 2024'}</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setCurrentWeekOffset(currentWeekOffset - 1)}>{language === 'en' ? 'Previous' : 'السابق'}</Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentWeekOffset(0)}>{language === 'en' ? 'Today' : 'اليوم'}</Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentWeekOffset(currentWeekOffset + 1)}>{language === 'en' ? 'Next' : 'التالي'}</Button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-4 mb-6">
          {getWeekSchedule(currentWeekOffset).map((day, i) => (
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
          {todaySessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${session.started ? 'bg-success/10' : session.status === 'completed' ? 'bg-muted' : 'bg-primary/10'}`}>
                  {session.started ? <Play className="w-6 h-6 text-success" /> : <Clock className="w-6 h-6 text-primary" />}
                </div>
                <div>
                  <p className="font-medium">{session.title}</p>
                  <p className="text-sm text-muted-foreground">{session.time} • {session.room}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground"><Users className="w-4 h-4 inline mr-1" />{session.attendees}</span>
                <div className="flex gap-2">
                  {!session.started && session.status !== 'completed' && (
                    <Button size="sm" onClick={() => { setSelectedSession(session); setShowStartSession(true); }}>{language === 'en' ? 'Start Session' : 'بدء الجلسة'}</Button>
                  )}
                  {session.started && (
                    <>
                      <Button size="sm" variant="outline" onClick={() => { setSelectedSession(session); setShowAttendance(true); }}>{language === 'en' ? 'Attendance' : 'الحضور'}</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleEndSession(session.id)}>{language === 'en' ? 'End' : 'إنهاء'}</Button>
                    </>
                  )}
                  {session.status === 'completed' && (
                    <span className="text-sm text-success font-medium">{language === 'en' ? 'Completed' : 'مكتمل'}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTraineesContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{language === 'en' ? 'My Trainees' : 'متدربيني'}</h2>
      
      <div className="bg-card rounded-xl shadow-md border border-border">
        <div className="p-6 border-b border-border">
          <Input placeholder={language === 'en' ? 'Search trainees...' : 'البحث عن متدرب...'} className="max-w-md" />
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
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">{trainee.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium">{trainee.name}</p>
                        <p className="text-xs text-muted-foreground">{trainee.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{trainee.course}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Progress value={trainee.progress} className="w-24 h-2" />
                      <span className="text-sm text-muted-foreground">{trainee.progress}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`text-sm font-medium ${trainee.attendance >= 90 ? 'text-success' : trainee.attendance >= 75 ? 'text-warning' : 'text-destructive'}`}>
                      {trainee.attendance}%
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => { setSelectedTrainee(trainee); setShowTraineeDetails(true); }}>{language === 'en' ? 'View' : 'عرض'}</Button>
                      <Button size="sm" variant="outline" onClick={() => { setSelectedTrainee(trainee); setShowEvaluation(true); }}>{language === 'en' ? 'Evaluate' : 'تقييم'}</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAttendanceContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{language === 'en' ? 'Attendance Management' : 'إدارة الحضور'}</h2>
      
      <div className="bg-card rounded-xl p-6 shadow-md border border-border">
        <h3 className="text-lg font-semibold mb-4">{language === 'en' ? 'Select Session' : 'اختر الجلسة'}</h3>
        <div className="space-y-4">
          {todaySessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ClipboardCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{session.title}</p>
                  <p className="text-sm text-muted-foreground">{session.time}</p>
                </div>
              </div>
              <Button size="sm" onClick={() => { setSelectedSession(session); setShowAttendance(true); }}>
                {language === 'en' ? 'Take Attendance' : 'تسجيل الحضور'}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-xl p-6 shadow-md border border-border">
        <h3 className="text-lg font-semibold mb-4">{language === 'en' ? 'Attendance Summary' : 'ملخص الحضور'}</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-success/10 rounded-lg text-center">
            <p className="text-3xl font-bold text-success">95%</p>
            <p className="text-sm text-muted-foreground">{language === 'en' ? 'Average Attendance' : 'متوسط الحضور'}</p>
          </div>
          <div className="p-4 bg-warning/10 rounded-lg text-center">
            <p className="text-3xl font-bold text-warning">3</p>
            <p className="text-sm text-muted-foreground">{language === 'en' ? 'Low Attendance Trainees' : 'متدربين حضورهم منخفض'}</p>
          </div>
          <div className="p-4 bg-primary/10 rounded-lg text-center">
            <p className="text-3xl font-bold text-primary">248</p>
            <p className="text-sm text-muted-foreground">{language === 'en' ? 'Total Sessions' : 'إجمالي الجلسات'}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEvaluationsContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{language === 'en' ? 'Trainee Evaluations' : 'تقييمات المتدربين'}</h2>
      
      <div className="bg-card rounded-xl shadow-md border border-border">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold">{language === 'en' ? 'Pending Evaluations' : 'التقييمات المعلقة'}</h3>
        </div>
        <div className="divide-y divide-border">
          {myTrainees.map((trainee) => (
            <div key={trainee.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">{trainee.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium">{trainee.name}</p>
                  <p className="text-sm text-muted-foreground">{trainee.course}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium">{trainee.progress}% {language === 'en' ? 'Complete' : 'مكتمل'}</p>
                  <p className="text-xs text-muted-foreground">{trainee.attendance}% {language === 'en' ? 'Attendance' : 'حضور'}</p>
                </div>
                <Button size="sm" onClick={() => { setSelectedTrainee(trainee); setShowEvaluation(true); }}>
                  <Award className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Evaluate' : 'تقييم'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFeedbackContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{language === 'en' ? 'Trainee Feedback' : 'ملاحظات المتدربين'}</h2>
      
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-card rounded-xl p-6 shadow-md border border-border text-center">
          <p className="text-4xl font-bold text-warning mb-2">4.9</p>
          <div className="flex justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-4 h-4 fill-warning text-warning" />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">{language === 'en' ? 'Overall Rating' : 'التقييم العام'}</p>
        </div>
        <div className="bg-card rounded-xl p-6 shadow-md border border-border text-center">
          <p className="text-4xl font-bold text-primary mb-2">156</p>
          <p className="text-sm text-muted-foreground">{language === 'en' ? 'Total Reviews' : 'إجمالي التقييمات'}</p>
        </div>
        <div className="bg-card rounded-xl p-6 shadow-md border border-border text-center">
          <p className="text-4xl font-bold text-success mb-2">98%</p>
          <p className="text-sm text-muted-foreground">{language === 'en' ? 'Positive Feedback' : 'ملاحظات إيجابية'}</p>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-md border border-border">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold">{language === 'en' ? 'Recent Feedback' : 'الملاحظات الأخيرة'}</h3>
        </div>
        <div className="divide-y divide-border">
          {recentFeedback.map((feedback) => (
            <div key={feedback.id} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">{feedback.trainee.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium">{feedback.trainee}</p>
                    <div className="flex gap-0.5">
                      {[...Array(feedback.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-warning text-warning" />
                      ))}
                    </div>
                  </div>
                </div>
                {feedback.replied ? (
                  <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full">{language === 'en' ? 'Replied' : 'تم الرد'}</span>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => { setSelectedFeedback(feedback); setShowFeedbackReply(true); }}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    {language === 'en' ? 'Reply' : 'رد'}
                  </Button>
                )}
              </div>
              <p className="text-muted-foreground">{feedback.comment}</p>
            </div>
          ))}
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
              <Input defaultValue="Dr. Ahmed Hassan" className="mt-1" />
            </div>
            <div>
              <Label>{language === 'en' ? 'Email' : 'البريد الإلكتروني'}</Label>
              <Input defaultValue="ahmed@academy.com" className="mt-1" />
            </div>
            <div>
              <Label>{language === 'en' ? 'Specialization' : 'التخصص'}</Label>
              <Input defaultValue="Leadership & Management" className="mt-1" />
            </div>
            <Button onClick={() => toast({ title: language === 'en' ? 'Saved' : 'تم الحفظ' })}>{language === 'en' ? 'Save Changes' : 'حفظ التغييرات'}</Button>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-md border border-border">
          <h3 className="text-lg font-semibold mb-4">{language === 'en' ? 'Notification Settings' : 'إعدادات الإشعارات'}</h3>
          <div className="space-y-4">
            {[
              { label: language === 'en' ? 'Session Reminders' : 'تذكيرات الجلسات', checked: true },
              { label: language === 'en' ? 'New Trainee Enrollment' : 'تسجيل متدرب جديد', checked: true },
              { label: language === 'en' ? 'Feedback Notifications' : 'إشعارات التقييمات', checked: true },
              { label: language === 'en' ? 'Email Notifications' : 'إشعارات البريد', checked: false },
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
      case 'overview': return renderOverviewContent();
      case 'schedule': return renderScheduleContent();
      case 'trainees': return renderTraineesContent();
      case 'attendance': return renderAttendanceContent();
      case 'evaluations': return renderEvaluationsContent();
      case 'feedback': return renderFeedbackContent();
      case 'settings': return renderSettingsContent();
      default: return renderOverviewContent();
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
            <h1 className="text-3xl font-bold text-foreground">{language === 'en' ? 'Welcome, Dr. Ahmed!' : 'مرحباً، د. أحمد!'}</h1>
            <p className="text-muted-foreground">{language === 'en' ? 'You have 3 sessions scheduled today.' : 'لديك 3 جلسات مجدولة اليوم.'}</p>
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
                <span className="text-primary font-semibold">أ</span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{language === 'en' ? 'Dr. Ahmed Hassan' : 'د. أحمد حسن'}</p>
                <p className="text-xs text-muted-foreground">{language === 'en' ? 'Senior Trainer' : 'مدرب أول'}</p>
              </div>
            </div>
          </div>
        </div>

        {renderContent()}
      </main>

      {/* Start Session Modal */}
      <Dialog open={showStartSession} onOpenChange={setShowStartSession}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{language === 'en' ? 'Start Session' : 'بدء الجلسة'}</DialogTitle>
          </DialogHeader>
          {selectedSession && (
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-lg">{selectedSession.title}</h4>
                <p className="text-muted-foreground">{selectedSession.time} • {selectedSession.room}</p>
              </div>
              <p className="text-muted-foreground">{language === 'en' ? 'Are you ready to start this session? Trainees will be notified.' : 'هل أنت مستعد لبدء هذه الجلسة؟ سيتم إخطار المتدربين.'}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStartSession(false)}>{language === 'en' ? 'Cancel' : 'إلغاء'}</Button>
            <Button onClick={() => handleStartSession(selectedSession)}><Play className="w-4 h-4 mr-2" />{language === 'en' ? 'Start Session' : 'بدء الجلسة'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Attendance Modal */}
      <Dialog open={showAttendance} onOpenChange={setShowAttendance}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{language === 'en' ? 'Take Attendance' : 'تسجيل الحضور'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {myTrainees.map((trainee) => (
              <div key={trainee.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">{trainee.name.charAt(0)}</span>
                  </div>
                  <span className="font-medium">{trainee.name}</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant={attendanceList[trainee.id] === true ? 'default' : 'outline'} onClick={() => setAttendanceList({ ...attendanceList, [trainee.id]: true })}>
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant={attendanceList[trainee.id] === false ? 'destructive' : 'outline'} onClick={() => setAttendanceList({ ...attendanceList, [trainee.id]: false })}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAttendance(false)}>{language === 'en' ? 'Cancel' : 'إلغاء'}</Button>
            <Button onClick={handleMarkAttendance}>{language === 'en' ? 'Save Attendance' : 'حفظ الحضور'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Evaluation Modal */}
      <Dialog open={showEvaluation} onOpenChange={setShowEvaluation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{language === 'en' ? 'Trainee Evaluation' : 'تقييم المتدرب'}</DialogTitle>
          </DialogHeader>
          {selectedTrainee && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">{selectedTrainee.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium">{selectedTrainee.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedTrainee.course}</p>
                </div>
              </div>
              <div>
                <Label>{language === 'en' ? 'Score (1-10)' : 'الدرجة (1-10)'}</Label>
                <div className="flex items-center gap-4 mt-2">
                  <input type="range" min="1" max="10" value={evaluationScore} onChange={(e) => setEvaluationScore(parseInt(e.target.value))} className="flex-1" />
                  <span className="text-2xl font-bold text-primary">{evaluationScore}</span>
                </div>
              </div>
              <div>
                <Label>{language === 'en' ? 'Notes' : 'ملاحظات'}</Label>
                <Textarea value={evaluationNotes} onChange={(e) => setEvaluationNotes(e.target.value)} placeholder={language === 'en' ? 'Enter evaluation notes...' : 'أدخل ملاحظات التقييم...'} className="mt-1" />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEvaluation(false)}>{language === 'en' ? 'Cancel' : 'إلغاء'}</Button>
            <Button onClick={handleSaveEvaluation}>{language === 'en' ? 'Save Evaluation' : 'حفظ التقييم'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Trainee Details Modal */}
      <Dialog open={showTraineeDetails} onOpenChange={setShowTraineeDetails}>
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
                  <p className="text-xs text-muted-foreground">{language === 'en' ? 'Course' : 'الدورة'}</p>
                  <p className="font-medium">{selectedTrainee.course}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">{language === 'en' ? 'Phone' : 'الهاتف'}</p>
                  <p className="font-medium">{selectedTrainee.phone}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">{language === 'en' ? 'Progress' : 'التقدم'}</p>
                  <p className="font-medium">{selectedTrainee.progress}%</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">{language === 'en' ? 'Attendance' : 'الحضور'}</p>
                  <p className={`font-medium ${selectedTrainee.attendance >= 90 ? 'text-success' : 'text-warning'}`}>{selectedTrainee.attendance}%</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTraineeDetails(false)}>{language === 'en' ? 'Close' : 'إغلاق'}</Button>
            <Button onClick={() => { setShowTraineeDetails(false); setShowEvaluation(true); }}>{language === 'en' ? 'Evaluate' : 'تقييم'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reply to Feedback Modal */}
      <Dialog open={showFeedbackReply} onOpenChange={setShowFeedbackReply}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{language === 'en' ? 'Reply to Feedback' : 'الرد على الملاحظة'}</DialogTitle>
          </DialogHeader>
          {selectedFeedback && (
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">{selectedFeedback.trainee}</span>
                  <div className="flex gap-0.5">
                    {[...Array(selectedFeedback.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-warning text-warning" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground">{selectedFeedback.comment}</p>
              </div>
              <div>
                <Label>{language === 'en' ? 'Your Reply' : 'ردك'}</Label>
                <Textarea value={replyMessage} onChange={(e) => setReplyMessage(e.target.value)} placeholder={language === 'en' ? 'Write your reply...' : 'اكتب ردك...'} className="mt-1" />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFeedbackReply(false)}>{language === 'en' ? 'Cancel' : 'إلغاء'}</Button>
            <Button onClick={handleReplyFeedback}>{language === 'en' ? 'Send Reply' : 'إرسال الرد'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrainerDashboard;