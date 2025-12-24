import React from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <MainLayout>
      <section className="pt-32 pb-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('contact.title')}</h1>
          <p className="text-primary-foreground/70 text-lg">{t('contact.subtitle')}</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <h2 className="text-2xl font-bold mb-6">{language === 'en' ? 'Send us a message' : 'أرسل لنا رسالة'}</h2>
              <form className="space-y-4">
                <Input placeholder={t('contact.name')} />
                <Input type="email" placeholder={t('contact.email')} />
                <Input type="tel" placeholder={t('contact.phone')} />
                <Textarea placeholder={t('contact.message')} rows={5} />
                <Button variant="gradient" size="lg" className="w-full gap-2">
                  <Send className="w-4 h-4" />{t('contact.send')}
                </Button>
              </form>
            </div>
            <div className="space-y-6">
              {[
                { icon: MapPin, label: t('contact.address'), value: t('contact.addressValue') },
                { icon: Phone, label: language === 'en' ? 'Phone' : 'الهاتف', value: '+962 6 566 0171' },
                { icon: Mail, label: language === 'en' ? 'Email' : 'البريد', value: 'info@acc-academy.jo' },
                { icon: Clock, label: language === 'en' ? 'Hours' : 'ساعات العمل', value: language === 'en' ? 'Sun-Thu: 8AM-5PM' : 'أحد-خميس: 8ص-5م' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-semibold text-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Contact;
