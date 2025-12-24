import React from 'react';
import { ChevronLeft, Play, FileText, CheckCircle, Clock, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const LMSCourse: React.FC = () => {
  const { language, direction } = useLanguage();
  const modules = [
    { title: 'Introduction', completed: true, duration: '15 min' },
    { title: 'Core Concepts', completed: true, duration: '30 min' },
    { title: 'Advanced Techniques', completed: false, current: true, duration: '45 min' },
    { title: 'Case Studies', completed: false, duration: '30 min' },
    { title: 'Final Assessment', completed: false, duration: '20 min' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-80 bg-card border-r border-border p-6 hidden lg:block">
        <Link to="/dashboard/trainee" className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
          <ChevronLeft className={cn("w-4 h-4", direction === 'rtl' && 'rotate-180')} />
          {language === 'en' ? 'Back to Dashboard' : 'العودة للوحة التحكم'}
        </Link>
        <h2 className="text-lg font-bold mb-2">Strategic Leadership</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Progress value={60} className="h-2 flex-1" />
          <span>60%</span>
        </div>
        <div className="space-y-2">
          {modules.map((m, i) => (
            <button key={i} className={cn("w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors", m.current ? 'bg-primary/10 text-primary' : 'hover:bg-muted')}>
              {m.completed ? <CheckCircle className="w-5 h-5 text-success" /> : <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />}
              <div className="flex-1">
                <p className="font-medium text-sm">{m.title}</p>
                <p className="text-xs text-muted-foreground">{m.duration}</p>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Video Player Placeholder */}
          <div className="aspect-video bg-foreground/10 rounded-2xl mb-8 flex items-center justify-center">
            <Button variant="hero" size="iconLg" className="rounded-full">
              <Play className="w-8 h-8" />
            </Button>
          </div>

          <h1 className="text-2xl font-bold mb-4">Module 3: Advanced Techniques</h1>
          <p className="text-muted-foreground mb-6">
            {language === 'en' 
              ? 'Learn advanced leadership techniques including strategic decision-making, change management, and team dynamics.'
              : 'تعلم تقنيات القيادة المتقدمة بما في ذلك اتخاذ القرارات الاستراتيجية وإدارة التغيير وديناميكيات الفريق.'}
          </p>

          {/* Resources */}
          <div className="border-t border-border pt-6">
            <h3 className="font-bold mb-4">{language === 'en' ? 'Resources' : 'الموارد'}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {['Lecture Slides.pdf', 'Case Study.pdf', 'Worksheet.docx'].map((r, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="flex-1">{r}</span>
                  <Button size="sm" variant="outline">{language === 'en' ? 'Download' : 'تحميل'}</Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <Button variant="outline" size="lg">{language === 'en' ? 'Previous' : 'السابق'}</Button>
            <Button variant="gradient" size="lg" className="flex-1">{language === 'en' ? 'Complete & Continue' : 'أكمل واستمر'}</Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LMSCourse;
