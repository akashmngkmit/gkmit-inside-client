import { DescriptionCards } from '@/components/DescriptionCards';
import { Faqs } from '@/components/Faqs';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { Navbar } from '@/components/navbar';
import React from 'react';

export const LandingPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <DescriptionCards />
      <Faqs />
      <Footer />
    </>
  );
};
