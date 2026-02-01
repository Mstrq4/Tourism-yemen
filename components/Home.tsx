import React from 'react';
import { View } from '../types';

interface HomeProps {
  onNavigate: (view: View) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="container mx-auto px-4 py-6 flex flex-col">
      {/* Hero Section */}
      <header className="glass-panel rounded-3xl p-10 mb-12 text-center relative overflow-hidden transform hover:scale-[1.01] transition-transform duration-500 shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 animate-slide-up">
          <div className="inline-block bg-teal-100 text-teal-800 px-4 py-1 rounded-full text-sm font-bold mb-4 shadow-sm">
            قسم الأثار والسياحة - مستوى أول
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 mb-4 tracking-tight drop-shadow-sm">
            السياحة <span className="text-teal-600">في اليمن</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light">
             رحلة تعليمية تفاعلية بإشراف <span className="font-bold text-gray-800">يوسف الدرعي</span>
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => onNavigate(View.SUMMARY)}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transform transition hover:scale-105 hover:shadow-teal-500/30 flex items-center gap-2"
            >
              ابـدأ التعلـم <i className="fa-solid fa-arrow-left"></i>
            </button>
             <button 
              onClick={() => onNavigate(View.EXAM_HUB)}
              className="bg-white hover:bg-gray-50 text-teal-700 border border-gray-200 font-bold py-4 px-8 rounded-full shadow-md transform transition hover:scale-105 flex items-center gap-2"
            >
              الاختبارات <i className="fa-solid fa-clipboard-question"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Pillars */}
      <section className="grid md:grid-cols-3 gap-6 mb-12 animate-slide-up" style={{animationDelay: '0.2s'}}>
        <div className="glass-card p-8 rounded-2xl text-center group cursor-default">
          <div className="bg-teal-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-teal-600 text-3xl shadow-inner group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-coins"></i>
          </div>
          <h3 className="font-bold text-xl mb-3 text-gray-800">الأهمية الاقتصادية</h3>
          <p className="text-gray-600 leading-relaxed">عمود الاقتصاد الوطني ومصدر أساسي للعملة الصعبة وفرص العمل للشباب.</p>
        </div>
        <div className="glass-card p-8 rounded-2xl text-center group cursor-default">
          <div className="bg-amber-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-amber-600 text-3xl shadow-inner group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-landmark"></i>
          </div>
          <h3 className="font-bold text-xl mb-3 text-gray-800">كنوز التاريخ</h3>
          <p className="text-gray-600 leading-relaxed">من ناطحات السحاب الطينية في شبام إلى قلاع تعز وسدود مأرب العظيمة.</p>
        </div>
        <div className="glass-card p-8 rounded-2xl text-center group cursor-default">
          <div className="bg-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600 text-3xl shadow-inner group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-user-shield"></i>
          </div>
          <h3 className="font-bold text-xl mb-3 text-gray-800">الإرشاد والأمن</h3>
          <p className="text-gray-600 leading-relaxed">دور المرشد كسفير للوطن، وأهمية الأمن السياحي في خلق بيئة آمنة للزوار.</p>
        </div>
      </section>

      {/* Quick Access Grid */}
      <section className="animate-slide-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-bold text-white mb-6 pr-2 border-r-4 border-amber-500">الوصول السريع</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <button onClick={() => onNavigate(View.SUMMARY)} className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center hover:bg-white text-gray-700 hover:text-teal-700 transition-colors">
            <i className="fa-solid fa-book-open-reader text-4xl mb-3 text-teal-500"></i>
            <span className="font-bold">المقرر الدراسي</span>
            </button>
            
            <button onClick={() => onNavigate(View.EXAM_HUB)} className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center hover:bg-white text-gray-700 hover:text-amber-700 transition-colors">
            <i className="fa-solid fa-pen-to-square text-4xl mb-3 text-amber-500"></i>
            <span className="font-bold">نماذج الاختبارات</span>
            </button>
            
             <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center opacity-80 bg-gray-100/50 cursor-not-allowed">
            <i className="fa-solid fa-chart-pie text-4xl mb-3 text-gray-400"></i>
            <span className="font-bold text-gray-500">إحصائياتي (قريباً)</span>
            </div>
          </div>
      </section>
    </div>
  );
};

export default Home;