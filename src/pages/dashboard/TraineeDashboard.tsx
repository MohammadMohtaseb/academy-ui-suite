import React, { useState } from 'react';
import { BookOpen, Award, Calendar, BarChart3, Bell, LogOut, Play, Settings, Clock, CheckCircle, Download, FileText, Video, Star, MessageSquare, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import academyLogo from '@/assets/academy-logo.png';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const TraineeDashboard: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Modal states
  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showScheduleDetails, setShowScheduleDetails] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [selectedSession, setSelectedSession] = useState<any>(null);

  // Form states
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackComment, setFeedbackComment] = useState('');

  const stats = [
    { value: '4', label: language === 'en' ? 'Enrolled Courses' : 'الدورات المسجلة', color: 'text-primary', icon: BookOpen },
    { value: '68%', label: language === 'en' ? 'Avg Progress' : 'متوسط التقدم', color: 'text-secondary', icon: BarChart3 },
    { value: '2', label: language === 'en' ? 'Certificates Earned' : 'الشهادات المكتسبة', color: 'text-success', icon: Award },
    { value: '95%', label: language === 'en' ? 'Attendance' : 'نسبة الحضور', color: 'text-warning', icon: CheckCircle },
  ];

  const [courses, setCourses] = useState([
    { id: 1, title: language === 'en' ? 'Strategic Leadership' : 'القيادة الاستراتيجية', progress: 75, instructor: language === 'en' ? 'Dr. Ahmed' : 'د. أحمد', duration: '8 weeks', modules: 12, completedModules: 9, nextLesson: language === 'en' ? 'Decision Making' : 'صنع القرار' },
    { id: 2, title: language === 'en' ? 'Financial Analysis' : 'التحليل المالي', progress: 45, instructor: language === 'en' ? 'Mr. Khalid' : 'أ. خالد', duration: '6 weeks', modules: 10, completedModules: 4, nextLesson: language === 'en' ? 'Cash Flow Analysis' : 'تحليل التدفق النقدي' },
    { id: 3, title: language === 'en' ? 'Project Management' : 'إدارة المشاريع', progress: 90, instructor: language === 'en' ? 'Eng. Sara' : 'م. سارة', duration: '10 weeks', modules: 15, completedModules: 13, nextLesson: language === 'en' ? 'Risk Management' : 'إدارة المخاطر' },
    { id: 4, title: language === 'en' ? 'Digital Marketing' : 'التسويق الرقمي', progress: 20, instructor: language === 'en' ? 'Ms. Nora' : 'أ. نورة', duration: '8 weeks', modules: 12, completedModules: 2, nextLesson: language === 'en' ? 'SEO Basics' : 'أساسيات السيو' },
  ]);

  const [certificates, setCertificates] = useState([
    { id: 1, title: language === 'en' ? 'Leadership Fundamentals' : 'أساسيات القيادة', issueDate: '2024-10-15', grade: 'A', instructor: language === 'en' ? 'Dr. Ahmed' : 'د. أحمد', hours: 40 },
    { id: 2, title: language === 'en' ? 'Excel Advanced' : 'إكسل المتقدم', issueDate: '2024-11-20', grade: 'A+', instructor: language === 'en' ? 'Eng. Sara' : 'م. سارة', hours: 24 },
  ]);

  const upcomingSessions = [
    { id: 1, title: language === 'en' ? 'Strategic Leadership - Session 10' : 'القيادة الاستراتيجية - الجلسة 10', date: '2024-12-25', time: '09:00 AM', instructor: language === 'en' ? 'Dr. Ahmed' : 'د. أحمد', room: 'A1', type: 'live' },
    { id: 2, title: language === 'en' ? 'Financial Analysis - Session 5' : 'التحليل المالي - الجلسة 5', date: '2024-12-26', time: '11:00 AM', instructor: language === 'en' ? 'Mr. Khalid' : 'أ. خالد', room: 'B2', type: 'live' },
    { id: 3, title: language === 'en' ? 'Project Management - Final Exam' : 'إدارة المشاريع - الاختبار النهائي', date: '2024-12-28', time: '02:00 PM', instructor: language === 'en' ? 'Eng. Sara' : 'م. سارة', room: 'C3', type: 'exam' },
  ];

  const attendanceHistory = [
    { date: '2024-12-20', course: language === 'en' ? 'Leadership' : 'القيادة', status: 'present' },
    { date: '2024-12-19', course: language === 'en' ? 'Finance' : 'المالية', status: 'present' },
    { date: '2024-12-18', course: language === 'en' ? 'Project Mgmt' : 'إدارة المشاريع', status: 'present' },
    { date: '2024-12-17', course: language === 'en' ? 'Leadership' : 'القيادة', status: 'absent' },
    { date: '2024-12-16', course: language === 'en' ? 'Marketing' : 'التسويق', status: 'present' },
  ];

  const [notifications, setNotifications] = useState([
    { id: 1, message: language === 'en' ? 'New lesson available: Decision Making' : 'درس جديد متاح: صنع القرار', time: '1h', read: false },
    { id: 2, message: language === 'en' ? 'Session reminder: Tomorrow 9 AM' : 'تذكير بالجلسة: غداً 9 صباحاً', time: '3h', read: false },
    { id: 3, message: language === 'en' ? 'Certificate issued: Leadership' : 'تم إصدار شهادة: القيادة', time: '1d', read: true },
  ]);

  const navItems = [
    { icon: BarChart3, label: language === 'en' ? 'Overview' : 'نظرة عامة', key: 'overview' },
    { icon: BookOpen, label: language === 'en' ? 'My Courses' : 'دوراتي', key: 'courses' },
    { icon: Calendar, label: language === 'en' ? 'Schedule' : 'الجدول', key: 'schedule' },
    { icon: Award, label: language === 'en' ? 'Certificates' : 'الشهادات', key: 'certificates' },
    { icon: CheckCircle, label: language === 'en' ? 'Attendance' : 'الحضور', key: 'attendance' },
    { icon: Settings, label: language === 'en' ? 'Settings' : 'الإعدادات', key: 'settings' },
  ];

  const handleSubmitFeedback = () => {
    toast({ title: language === 'en' ? 'Feedback Submitted' : 'تم إرسال التقييم', description: language === 'en' ? 'Thank you for your feedback!' : 'شكراً لتقييمك!' });
    setShowFeedback(false);
    setFeedbackRating(5);
    setFeedbackComment('');
  };

  const handleDownloadCertificate = (cert: any) => {
    toast({ title: language === 'en' ? 'Downloading...' : 'جاري التحميل...', description: `${cert.title}.pdf` });
  };

  const markNotificationRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const renderOverviewContent = () => (
    <>
      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-card rounded-xl p-6 shadow-md border border-border hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab(i === 0 ? 'courses' : i === 2 ? 'certificates' : i === 3 ? 'attendance' : 'overview')}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Continue Learning */}
      <div className="bg-card rounded-xl p-6 shadow-md border border-border mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">{language === 'en' ? 'Continue Learning' : 'أكمل التعلم'}</h2>
          <Button variant="outline" size="sm" onClick={() => setActiveTab('courses')}>{language === 'en' ? 'View All' : 'عرض الكل'}</Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.slice(0, 3).map((course) => (
            <div key={course.id} className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer" onClick={() => { setSelectedCourse(course); setShowCourseDetails(true); }}>
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold">{course.title}</h3>
                <span className="text-sm text-muted-foreground">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2 mb-3" />
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{language === 'en' ? 'Next:' : 'التالي:'} {course.nextLesson}</p>
                <Button size="sm" className="gap-2" asChild>
                  <Link to="/lms/course/1"><Play className="w-4 h-4" />{language === 'en' ? 'Continue' : 'أكمل'}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Sessions */}
        <div className="bg-card rounded-xl p-6 shadow-md border border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">{language === 'en' ? 'Upcoming Sessions' : 'الجلسات القادمة'}</h2>
            <Button variant="outline" size="sm" onClick={() => setActiveTab('schedule')}>{language === 'en' ? 'View All' : 'عرض الكل'}</Button>
          </div>
          <div className="space-y-4">
            {upcomingSessions.slice(0, 2).map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors" onClick={() => { setSelectedSession(session); setShowScheduleDetails(true); }}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${session.type === 'exam' ? 'bg-warning/10' : 'bg-primary/10'}`}>
                    {session.type === 'exam' ? <FileText className="w-6 h-6 text-warning" /> : <Video className="w-6 h-6 text-primary" />}
                  </div>
                  <div>
                    <p className="font-medium">{session.title}</p>
                    <p className="text-sm text-muted-foreground">{session.date} • {session.time}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Certificates */}
        <div className="bg-card rounded-xl p-6 shadow-md border border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">{language === 'en' ? 'My Certificates' : 'شهاداتي'}</h2>
            <Button variant="outline" size="sm" onClick={() => setActiveTab('certificates')}>{language === 'en' ? 'View All' : 'عرض الكل'}</Button>
          </div>
          <div className="space-y-4">
            {certificates.map((cert) => (
              <div key={cert.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors" onClick={() => { setSelectedCertificate(cert); setShowCertificate(true); }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                    <Award className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="font-medium">{cert.title}</p>
                    <p className="text-sm text-muted-foreground">{language === 'en' ? 'Issued:' : 'صدرت:'} {cert.issueDate}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleDownloadCertificate(cert); }}>
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  const renderCoursesContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{language === 'en' ? 'My Courses' : 'دوراتي'}</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-card rounded-xl p-6 shadow-md border border-border hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${course.progress === 100 ? 'bg-success/20 text-success' : 'bg-primary/20 text-primary'}`}>
                {course.progress === 100 ? (language === 'en' ? 'Completed' : 'مكتمل') : `${course.progress}%`}
              </span>
            </div>
            <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{language === 'en' ? 'Instructor:' : 'المدرب:'} {course.instructor}</p>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">{language === 'en' ? 'Progress' : 'التقدم'}</span>
                <span>{course.completedModules}/{course.modules} {language === 'en' ? 'modules' : 'وحدات'}</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <p className="text-muted-foreground">{language === 'en' ? 'Duration' : 'المدة'}</p>
                <p className="font-medium">{course.duration}</p>
              </div>
              <div>
                <p className="text-muted-foreground">{language === 'en' ? 'Next Lesson' : 'الدرس التالي'}</p>
                <p className="font-medium">{course.nextLesson}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1 gap-2" asChild>
                <Link to="/lms/course/1"><Play className="w-4 h-4" />{language === 'en' ? 'Continue' : 'أكمل'}</Link>
              </Button>
              <Button variant="outline" onClick={() => { setSelectedCourse(course); setShowFeedback(true); }}>
                <MessageSquare className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderScheduleContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{language === 'en' ? 'My Schedule' : 'جدولي'}</h2>
      
      <div className="bg-card rounded-xl p-6 shadow-md border border-border">
        <h3 className="text-lg font-semibold mb-4">{language === 'en' ? 'Upcoming Sessions' : 'الجلسات القادمة'}</h3>
        <div className="space-y-4">
          {upcomingSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${session.type === 'exam' ? 'bg-warning/10' : 'bg-primary/10'}`}>
                  {session.type === 'exam' ? <FileText className="w-6 h-6 text-warning" /> : <Video className="w-6 h-6 text-primary" />}
                </div>
                <div>
                  <p className="font-medium">{session.title}</p>
                  <p className="text-sm text-muted-foreground">{session.instructor} • {language === 'en' ? 'Room' : 'قاعة'} {session.room}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{session.date}</p>
                <p className="text-sm text-muted-foreground">{session.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-xl p-6 shadow-md border border-border">
        <h3 className="text-lg font-semibold mb-4">{language === 'en' ? 'This Week' : 'هذا الأسبوع'}</h3>
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
            <div key={day} className={`p-3 rounded-lg text-center ${i === 2 ? 'bg-primary text-primary-foreground' : 'bg-muted/50'}`}>
              <p className="text-xs font-medium">{language === 'en' ? day : ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'][i]}</p>
              <p className="text-lg font-bold">{22 + i}</p>
              {i < 4 && i !== 2 && (
                <div className="w-2 h-2 bg-primary rounded-full mx-auto mt-1" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCertificatesContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{language === 'en' ? 'My Certificates' : 'شهاداتي'}</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div key={cert.id} className="bg-card rounded-xl p-6 shadow-md border border-border hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <Award className="w-10 h-10 text-primary-foreground" />
              </div>
            </div>
            <h3 className="font-semibold text-lg text-center mb-2">{cert.title}</h3>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{language === 'en' ? 'Issue Date' : 'تاريخ الإصدار'}</span>
                <span>{cert.issueDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{language === 'en' ? 'Grade' : 'الدرجة'}</span>
                <span className="font-medium text-success">{cert.grade}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{language === 'en' ? 'Hours' : 'الساعات'}</span>
                <span>{cert.hours} {language === 'en' ? 'hours' : 'ساعة'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{language === 'en' ? 'Instructor' : 'المدرب'}</span>
                <span>{cert.instructor}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => { setSelectedCertificate(cert); setShowCertificate(true); }}>
                {language === 'en' ? 'View' : 'عرض'}
              </Button>
              <Button variant="outline" onClick={() => handleDownloadCertificate(cert)}>
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAttendanceContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{language === 'en' ? 'My Attendance' : 'حضوري'}</h2>
      
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-card rounded-xl p-6 shadow-md border border-border text-center">
          <p className="text-4xl font-bold text-success mb-2">95%</p>
          <p className="text-muted-foreground">{language === 'en' ? 'Overall Attendance' : 'الحضور الإجمالي'}</p>
        </div>
        <div className="bg-card rounded-xl p-6 shadow-md border border-border text-center">
          <p className="text-4xl font-bold text-primary mb-2">38</p>
          <p className="text-muted-foreground">{language === 'en' ? 'Sessions Attended' : 'الجلسات المحضورة'}</p>
        </div>
        <div className="bg-card rounded-xl p-6 shadow-md border border-border text-center">
          <p className="text-4xl font-bold text-warning mb-2">2</p>
          <p className="text-muted-foreground">{language === 'en' ? 'Sessions Missed' : 'الجلسات الفائتة'}</p>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-md border border-border">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold">{language === 'en' ? 'Attendance History' : 'سجل الحضور'}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Date' : 'التاريخ'}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Course' : 'الدورة'}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{language === 'en' ? 'Status' : 'الحالة'}</th>
              </tr>
            </thead>
            <tbody>
              {attendanceHistory.map((record, i) => (
                <tr key={i} className="border-b border-border hover:bg-muted/50">
                  <td className="p-4">{record.date}</td>
                  <td className="p-4">{record.course}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${record.status === 'present' ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>
                      {record.status === 'present' ? (language === 'en' ? 'Present' : 'حاضر') : (language === 'en' ? 'Absent' : 'غائب')}
                    </span>
                  </td>
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
              <Input defaultValue="Ahmad Al-Rashid" className="mt-1" />
            </div>
            <div>
              <Label>{language === 'en' ? 'Email' : 'البريد الإلكتروني'}</Label>
              <Input defaultValue="ahmad@email.com" className="mt-1" />
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
              { label: language === 'en' ? 'Session Reminders' : 'تذكيرات الجلسات', checked: true },
              { label: language === 'en' ? 'New Content Alerts' : 'تنبيهات المحتوى الجديد', checked: true },
              { label: language === 'en' ? 'Grade Notifications' : 'إشعارات الدرجات', checked: true },
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
      case 'courses': return renderCoursesContent();
      case 'schedule': return renderScheduleContent();
      case 'certificates': return renderCertificatesContent();
      case 'attendance': return renderAttendanceContent();
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
            <h1 className="text-3xl font-bold text-foreground">{language === 'en' ? 'Welcome back, Ahmad!' : 'مرحباً بعودتك، أحمد!'}</h1>
            <p className="text-muted-foreground">{language === 'en' ? 'Continue your learning journey' : 'أكمل رحلة تعلمك'}</p>
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
                <p className="text-sm font-medium">{language === 'en' ? 'Ahmad Al-Rashid' : 'أحمد الراشد'}</p>
                <p className="text-xs text-muted-foreground">{language === 'en' ? 'Trainee' : 'متدرب'}</p>
              </div>
            </div>
          </div>
        </div>

        {renderContent()}
      </main>

      {/* Course Details Modal */}
      <Dialog open={showCourseDetails} onOpenChange={setShowCourseDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{language === 'en' ? 'Course Details' : 'تفاصيل الدورة'}</DialogTitle>
          </DialogHeader>
          {selectedCourse && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedCourse.title}</h3>
                  <p className="text-muted-foreground">{selectedCourse.instructor}</p>
                </div>
              </div>
              <Progress value={selectedCourse.progress} className="h-3" />
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">{language === 'en' ? 'Duration' : 'المدة'}</p>
                  <p className="font-medium">{selectedCourse.duration}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">{language === 'en' ? 'Modules' : 'الوحدات'}</p>
                  <p className="font-medium">{selectedCourse.completedModules}/{selectedCourse.modules}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg col-span-2">
                  <p className="text-xs text-muted-foreground">{language === 'en' ? 'Next Lesson' : 'الدرس التالي'}</p>
                  <p className="font-medium">{selectedCourse.nextLesson}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCourseDetails(false)}>{language === 'en' ? 'Close' : 'إغلاق'}</Button>
            <Button asChild><Link to="/lms/course/1"><Play className="w-4 h-4 mr-2" />{language === 'en' ? 'Continue' : 'أكمل'}</Link></Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Certificate Modal */}
      <Dialog open={showCertificate} onOpenChange={setShowCertificate}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{language === 'en' ? 'Certificate' : 'الشهادة'}</DialogTitle>
          </DialogHeader>
          {selectedCertificate && (
            <div className="border-4 border-primary/20 rounded-xl p-8 text-center bg-gradient-to-b from-background to-muted/30">
              <div className="flex justify-center mb-4">
                <Award className="w-16 h-16 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">{language === 'en' ? 'Certificate of Completion' : 'شهادة إتمام'}</h2>
              <p className="text-muted-foreground mb-6">{language === 'en' ? 'This is to certify that' : 'نشهد بأن'}</p>
              <p className="text-3xl font-bold text-primary mb-6">{language === 'en' ? 'Ahmad Al-Rashid' : 'أحمد الراشد'}</p>
              <p className="text-muted-foreground mb-4">{language === 'en' ? 'has successfully completed the course' : 'قد أتم بنجاح دورة'}</p>
              <p className="text-xl font-semibold mb-6">{selectedCertificate.title}</p>
              <div className="flex justify-center gap-8 text-sm text-muted-foreground">
                <div>
                  <p>{language === 'en' ? 'Date' : 'التاريخ'}</p>
                  <p className="font-medium text-foreground">{selectedCertificate.issueDate}</p>
                </div>
                <div>
                  <p>{language === 'en' ? 'Grade' : 'الدرجة'}</p>
                  <p className="font-medium text-success">{selectedCertificate.grade}</p>
                </div>
                <div>
                  <p>{language === 'en' ? 'Hours' : 'الساعات'}</p>
                  <p className="font-medium text-foreground">{selectedCertificate.hours}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCertificate(false)}>{language === 'en' ? 'Close' : 'إغلاق'}</Button>
            <Button onClick={() => handleDownloadCertificate(selectedCertificate)}><Download className="w-4 h-4 mr-2" />{language === 'en' ? 'Download PDF' : 'تحميل PDF'}</Button>
            <Button variant="outline" asChild><Link to="/certificate">{language === 'en' ? 'Full View' : 'عرض كامل'}</Link></Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Feedback Modal */}
      <Dialog open={showFeedback} onOpenChange={setShowFeedback}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{language === 'en' ? 'Course Feedback' : 'تقييم الدورة'}</DialogTitle>
          </DialogHeader>
          {selectedCourse && (
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-medium">{selectedCourse.title}</p>
                <p className="text-sm text-muted-foreground">{selectedCourse.instructor}</p>
              </div>
              <div>
                <Label>{language === 'en' ? 'Rating' : 'التقييم'}</Label>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => setFeedbackRating(star)} className="p-1">
                      <Star className={`w-8 h-8 ${star <= feedbackRating ? 'fill-warning text-warning' : 'text-muted'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label>{language === 'en' ? 'Comment' : 'التعليق'}</Label>
                <Textarea value={feedbackComment} onChange={(e) => setFeedbackComment(e.target.value)} placeholder={language === 'en' ? 'Share your experience...' : 'شاركنا تجربتك...'} className="mt-1" />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFeedback(false)}>{language === 'en' ? 'Cancel' : 'إلغاء'}</Button>
            <Button onClick={handleSubmitFeedback}>{language === 'en' ? 'Submit Feedback' : 'إرسال التقييم'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Details Modal */}
      <Dialog open={showScheduleDetails} onOpenChange={setShowScheduleDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{language === 'en' ? 'Session Details' : 'تفاصيل الجلسة'}</DialogTitle>
          </DialogHeader>
          {selectedSession && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${selectedSession.type === 'exam' ? 'bg-warning/10' : 'bg-primary/10'}`}>
                  {selectedSession.type === 'exam' ? <FileText className="w-6 h-6 text-warning" /> : <Video className="w-6 h-6 text-primary" />}
                </div>
                <div>
                  <h3 className="font-semibold">{selectedSession.title}</h3>
                  <p className="text-sm text-muted-foreground">{selectedSession.instructor}</p>
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
                  <p className="text-xs text-muted-foreground">{language === 'en' ? 'Type' : 'النوع'}</p>
                  <p className="font-medium">{selectedSession.type === 'exam' ? (language === 'en' ? 'Exam' : 'اختبار') : (language === 'en' ? 'Live Session' : 'جلسة مباشرة')}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScheduleDetails(false)}>{language === 'en' ? 'Close' : 'إغلاق'}</Button>
            <Button>{language === 'en' ? 'Add to Calendar' : 'إضافة للتقويم'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TraineeDashboard;