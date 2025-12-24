import React from 'react';
import { Award, Download, Share2, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import academyLogo from '@/assets/academy-logo.png';

const Certificate: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-muted py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">{language === 'en' ? 'Certificate of Completion' : 'شهادة إتمام'}</h1>
        </div>

        {/* Certificate Preview */}
        <div className="bg-card rounded-2xl shadow-2xl p-12 border-8 border-primary/20 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-primary opacity-10 rounded-br-full" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-secondary opacity-10 rounded-tl-full" />
          
          <div className="relative text-center">
            <img src={academyLogo} alt="Academy" className="h-16 mx-auto mb-6" />
            
            <p className="text-muted-foreground mb-2">{language === 'en' ? 'This is to certify that' : 'نشهد بأن'}</p>
            <h2 className="text-4xl font-bold text-primary mb-4">Ahmad Al-Khatib</h2>
            <p className="text-muted-foreground mb-6">{language === 'en' ? 'has successfully completed the program' : 'قد أتم بنجاح برنامج'}</p>
            <h3 className="text-2xl font-bold text-foreground mb-8">Strategic Leadership & Management</h3>

            <div className="flex justify-center items-center gap-8 mb-8">
              <div>
                <p className="text-sm text-muted-foreground">{language === 'en' ? 'Date' : 'التاريخ'}</p>
                <p className="font-semibold">January 15, 2024</p>
              </div>
              <div className="w-24 h-24 bg-muted rounded-xl flex items-center justify-center">
                <QrCode className="w-16 h-16 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{language === 'en' ? 'Hours' : 'الساعات'}</p>
                <p className="font-semibold">40 {language === 'en' ? 'hours' : 'ساعة'}</p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <div className="text-center">
                <div className="w-40 border-t-2 border-foreground pt-2">
                  <p className="text-sm">{language === 'en' ? 'Academy Director' : 'مدير الأكاديمية'}</p>
                </div>
              </div>
              <div className="text-center">
                <div className="w-40 border-t-2 border-foreground pt-2">
                  <p className="text-sm">{language === 'en' ? 'Program Instructor' : 'مدرب البرنامج'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4 mt-8">
          <Button variant="gradient" size="lg" className="gap-2">
            <Download className="w-5 h-5" />
            {language === 'en' ? 'Download PDF' : 'تحميل PDF'}
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <Share2 className="w-5 h-5" />
            {language === 'en' ? 'Share' : 'مشاركة'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
