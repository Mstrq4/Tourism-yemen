import React from 'react';
import { View } from '../types';

interface NavbarProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { view: View.HOME, label: 'الرئيسية', icon: 'fa-house' },
    { view: View.SUMMARY, label: 'الملخص', icon: 'fa-book-open' },
    { view: View.EXAM_HUB, label: 'الاختبارات', icon: 'fa-clipboard-question' },
  ];

  return (
    <nav className="glass-nav w-full px-4 py-3 flex justify-between items-center shadow-lg mb-6 animate-slide-up">
      <div 
        className="flex items-center gap-3 cursor-pointer" 
        onClick={() => onNavigate(View.HOME)}
      >
        <div className="bg-teal-600 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg shadow-md">
          <i className="fa-solid fa-kaaba"></i>
        </div>
        <div className="hidden md:block">
          <h1 className="font-bold text-teal-800 text-lg leading-tight">السياحة في اليمن</h1>
          <p className="text-xs text-gray-500">مقرر دراسي تفاعلي</p>
        </div>
      </div>

      <div className="flex gap-2 md:gap-4 bg-gray-100/50 p-1 rounded-full backdrop-blur-sm">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => onNavigate(item.view)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
              currentView === item.view
                ? 'bg-teal-600 text-white shadow-md transform scale-105'
                : 'text-gray-600 hover:bg-teal-50 hover:text-teal-600'
            }`}
          >
            <i className={`fa-solid ${item.icon}`}></i>
            <span className="hidden sm:inline">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;