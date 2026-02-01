import React from 'react';
import { ExamModel } from '../types';

interface ExamHubProps {
  exams: ExamModel[];
  onSelectExam: (exam: ExamModel) => void;
  onBack: () => void;
}

const ExamHub: React.FC<ExamHubProps> = ({ exams, onSelectExam, onBack }) => {
  return (
    <div className="container mx-auto px-4 py-4 max-w-6xl animate-fade-in">
      <div className="flex items-center justify-between mb-8">
         <div>
            <h2 className="text-3xl font-bold text-white mb-1">قاعة الاختبارات</h2>
            <p className="text-teal-100 text-sm">اختبر معلوماتك واستعد للامتحان النهائي</p>
         </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {exams.map((exam, idx) => (
          <button 
            key={exam.id}
            onClick={() => onSelectExam(exam)}
            className="glass-panel p-6 rounded-3xl text-right hover:scale-[1.02] transition-all group relative overflow-hidden"
            style={{animationDelay: `${idx * 0.1}s`}} 
          >
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-teal-500/5 rounded-br-full -z-10 transition-all group-hover:bg-teal-500/10"></div>

            <div className="flex justify-between items-start mb-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm ${idx % 2 === 0 ? 'bg-amber-100 text-amber-600' : 'bg-teal-100 text-teal-600'}`}>
                <i className="fa-solid fa-clipboard-question"></i>
              </div>
              <div className="flex flex-col items-end">
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold border border-gray-200 mb-1">
                    {exam.questions.length} سؤال
                  </span>
                  <span className="text-xs text-gray-400 font-medium">نموذج {exam.id}</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-teal-700 transition-colors">
              {exam.title}
            </h3>
            
            <p className="text-gray-500 text-sm mb-6 line-clamp-2">
              اختبار تفاعلي يغطي الجوانب الأساسية للمقرر. يشمل أسئلة متنوعة مع تصحيح فوري.
            </p>
            
            <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
               <span className="text-xs text-gray-400"><i className="fa-regular fa-clock ml-1"></i> 15 دقيقة تقريباً</span>
              <span className="bg-teal-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 group-hover:bg-teal-700 transition-colors shadow-lg shadow-teal-500/20">
                ابدأ <i className="fa-solid fa-arrow-left"></i>
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExamHub;