
import React from 'react';
import { LogoIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LogoIcon />
          <h1 className="text-2xl font-bold text-brand-primary">Jam2Course</h1>
        </div>
        <p className="hidden md:block text-gray-600">Instant Micro-Courses from Jam Threads</p>
      </div>
    </header>
  );
};

export default Header;
