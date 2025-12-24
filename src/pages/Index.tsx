import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import ProgramsSection from '@/components/home/ProgramsSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PartnersSection from '@/components/home/PartnersSection';
import CTASection from '@/components/home/CTASection';

const Index: React.FC = () => {
  return (
    <MainLayout>
      <HeroSection />
      <StatsSection />
      <ProgramsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PartnersSection />
      <CTASection />
    </MainLayout>
  );
};

export default Index;
