import React from 'react';

import { ArrowBigRight } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center p-3 h-screen w-full ">
      <div className="max-w-6xl bg-amber-50 h-96 w-full mx-auto p-3 flex flex-col items-center justify-center gap-8 border-2 border-black border-dotted rounded-2xl text-center">
        <h1 className="text-4xl font-bold">Welcome to GKMIT-INSIDE</h1>
        <p className="text-xl max-w-3xl">
          Your internal hub for company news, team updates, and connecting with
          colleagues. Share your projects, celebrate successes, and stay in the
          loop with everything happening at GKMIT.
        </p>
        <a
          className="bg-black h-12 w-48 px-6 text-white flex gap-3 items-center justify-center rounded-full hover:bg-gray-800 group hover:scale-110 duration-300 ease-in transition"
          href="/login"
        >
          Login
          <ArrowBigRight className="w-5 h-5 group-hover:rotate-135 transition-transform duration-300" />
        </a>
      </div>
    </div>
  );
}
