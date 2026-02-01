import React from 'react';
import { courseData } from '../data';
import { SummarySection } from '../types';

interface SummaryProps {
  onBack: () => void;
}

const Summary: React.FC<SummaryProps> = ({ onBack }) => {
  const renderSection = (section: SummarySection, idx: number) => {
    switch (section.type) {
      case 'text':
        return (
          <div key={idx} className="mb-6">
            <h4 className="font-bold text-teal-800 mb-2">{section.title}</h4>
            <p className="text-gray-700 leading-relaxed bg-white/40 p-4 rounded-lg border-r-4 border-teal-500">
              {section.data}
            </p>
          </div>
        );
      case 'list':
        return (
          <div key={idx} className="mb-6">
            <h4 className="font-bold text-teal-800 mb-2">{section.title}</h4>
            <ul className="space-y-2">
              {(section.data as string[]).map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs ml-3 mt-1 flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'cards':
        return (
          <div key={idx} className="mb-6">
            <h4 className="font-bold text-teal-800 mb-4">{section.title}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(section.data as any[]).map((card, i) => (
                <div key={i} className="bg-white/50 p-4 rounded-xl border border-white/60 shadow-sm flex items-start">
                  {card.icon && <i className={`fa-solid ${card.icon} text-2xl text-teal-600 ml-4 mt-1`}></i>}
                  <div>
                    <h5 className="font-bold text-gray-800">{card.title}</h5>
                    <p className="text-gray-600 text-sm mt-1">{card.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'comparison':
        const { headers, rows } = section.data;
        return (
          <div key={idx} className="mb-6 overflow-x-auto">
            <h4 className="font-bold text-teal-800 mb-2">{section.title}</h4>
            <table className="w-full text-right border-collapse rounded-xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-teal-600 text-white">
                  {headers.map((h: string, i: number) => (
                    <th key={i} className="p-3 text-sm font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row: string[], i: number) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white/80" : "bg-teal-50/80"}>
                    {row.map((cell, j) => (
                      <td key={j} className="p-3 text-gray-800 text-sm border-b border-gray-100">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'timeline':
        return (
          <div key={idx} className="mb-6">
            <h4 className="font-bold text-teal-800 mb-4">{section.title}</h4>
            <div className="relative border-r-2 border-teal-300 mr-4 space-y-6">
              {(section.data as any[]).map((item, i) => (
                <div key={i} className="relative pr-6">
                  <div className="absolute top-0 right-[-9px] w-4 h-4 bg-teal-500 rounded-full border-2 border-white"></div>
                  <h5 className="font-bold text-gray-800">{item.title}</h5>
                  <p className="text-gray-600 text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="text-white hover:text-teal-100 flex items-center gap-2">
          <i className="fa-solid fa-arrow-right"></i> الرئيسية
        </button>
        <h2 className="text-2xl font-bold text-white">الملخص الشامل</h2>
      </div>

      <div className="space-y-8">
        {courseData.summary.map((chapter) => (
          <div key={chapter.id} className="glass-panel rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-4">
              <span className="bg-teal-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold">
                {chapter.id}
              </span>
              <h3 className="text-xl font-bold text-teal-700">{chapter.title}</h3>
            </div>
            <div>
              {chapter.content.map((section, idx) => renderSection(section, idx))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Summary;
