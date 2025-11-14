import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; 
import { PenTool, LayoutGrid, MessageSquare } from 'lucide-react';

const FeatureCard = ({ icon, title, description }) => (
  <Card className="w-full">
    <CardHeader>
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 text-primary p-3 rounded-lg">
          {icon}
        </div>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="mt-1">{description}</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent>
    </CardContent>
  </Card>
);

export const DescriptionCards = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center">What is GKMIT-INSIDE?</h2>
          <p className="text-lg text-gray-600 max-w-2xl text-center">
            A private, internal platform built to help you connect, share, and
            stay informed with everything happening at GKMIT.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <FeatureCard
            icon={<PenTool className="w-6 h-6" />}
            title="Share Your Work"
            description="Create posts to share project updates, team successes, and helpful insights with the whole company."
          />
          
          <FeatureCard
            icon={<LayoutGrid className="w-6 h-6" />}
            title="Stay Updated"
            description="Discover what's happening on the main feed, from official company news to what other teams are working on."
          />
          
          <FeatureCard
            icon={<MessageSquare className="w-6 h-6" />}
            title="Connect & Interact"
            description="React, comment, and bookmark posts. Engage in discussions and find the information that matters to you."
          />
        </div>
      </div>
    </section>
  );
};