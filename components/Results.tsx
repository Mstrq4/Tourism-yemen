import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ResultsProps {
  result: {
    score: number;
    total: number;
    answers: any[];
    examTitle: string;
  };
  onHome: () => void;
}

const Results: React.FC<ResultsProps> = ({ result, onHome }) => {
  const percentage = Math.round((result.score / result.total) * 100);
  const data = [
    { name: 'صحيحة', value: result.score, color: '#10b981' },
    { name: 'خاطئة', value: result.total - result.score, color: '#ef4444' },
  ];

  const generatePDF = () => {
    const element = document.getElementById('pdf-print-zone');
    if (!element) return;
    
    // Show hidden element temporarily
    element.style.display = 'block';

    const opt = {
      margin: [10, 10, 10, 10], // top, left, bottom, right
      filename: `Report_${result.examTitle.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    // @ts-ignore
    window.html2pdf().from(element).set(opt).save().then(() => {
        element.style.display = 'none';
    });
  };

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-5xl mx-auto">
      {/* UI Results View */}
      <div className="glass-panel rounded-3xl p-8 mb-8 text-center animate-slide-up">
        <div className="inline-block bg-teal-100 text-teal-800 px-4 py-1 rounded-full text-sm font-bold mb-4">
            تقرير الأداء
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">النتيجة النهائية</h2>
        <p className="text-gray-500 mb-8 font-bold">{result.examTitle}</p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Chart */}
          <div className="w-56 h-56 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className={`text-4xl font-extrabold ${percentage >= 50 ? 'text-teal-600' : 'text-red-500'}`}>{percentage}%</span>
              <span className="text-xs text-gray-400 font-bold mt-1">المعدل العام</span>
            </div>
          </div>

          {/* Stats */}
          <div className="text-right space-y-4 bg-white/50 p-6 rounded-2xl border border-white">
            <div className="flex items-center justify-between gap-8 border-b border-gray-100 pb-2">
              <span className="text-gray-600">إجابات صحيحة</span>
              <span className="text-green-600 font-bold text-xl">{result.score}</span>
            </div>
            <div className="flex items-center justify-between gap-8 border-b border-gray-100 pb-2">
              <span className="text-gray-600">إجابات خاطئة</span>
              <span className="text-red-500 font-bold text-xl">{result.total - result.score}</span>
            </div>
             <div className="flex items-center justify-between gap-8">
              <span className="text-gray-600">إجمالي الأسئلة</span>
              <span className="text-gray-800 font-bold text-xl">{result.total}</span>
            </div>
            
            <div className="pt-6 flex flex-col gap-3">
                <button 
                    onClick={generatePDF}
                    className="w-full bg-teal-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-teal-700 flex items-center justify-center gap-2 font-bold transition-transform hover:scale-[1.02]"
                >
                    <i className="fa-solid fa-file-pdf"></i> تحميل تقرير PDF
                </button>
                <button 
                    onClick={onHome}
                    className="w-full bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-xl shadow-sm hover:bg-gray-50 font-bold"
                >
                    العودة للرئيسية
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Review List (Screen only) */}
      <div className="glass-panel rounded-2xl p-6">
        <h3 className="font-bold text-xl mb-6 text-gray-800 border-b pb-4 flex items-center gap-2">
            <i className="fa-solid fa-magnifying-glass text-teal-600"></i>
            مراجعة تفصيلية للإجابات
        </h3>
        <div className="space-y-4">
            {result.answers.map((ans, i) => (
                <div key={i} className={`p-5 rounded-2xl border transition-all hover:shadow-md ${ans.isCorrect ? 'border-green-200 bg-green-50/30' : 'border-red-200 bg-red-50/30'}`}>
                    <div className="flex items-start gap-3 mb-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white flex-shrink-0 mt-1 ${ans.isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                            {i+1}
                        </span>
                        <p className="font-bold text-gray-800 text-lg leading-snug">{ans.text}</p>
                    </div>
                    
                    <div className="mr-9 space-y-2">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm">
                            <span className={`px-3 py-1 rounded-lg font-bold border ${ans.isCorrect ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
                                إجابتك: {ans.userAnswer}
                            </span>
                            {!ans.isCorrect && (
                                <span className="px-3 py-1 rounded-lg font-bold bg-teal-50 text-teal-800 border border-teal-200 md:mr-2">
                                    <i className="fa-solid fa-check ml-1"></i>
                                    الصحيح: {ans.correctAnswer}
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-gray-600 bg-white/60 p-3 rounded-lg border border-gray-100">
                            <span className="font-bold text-teal-700">التعليل:</span> {ans.explanation}
                        </p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* --- HIDDEN PDF PRINT ZONE --- */}
      {/* This section is styled specifically for A4 paper output */}
      <div id="pdf-print-zone" className="bg-white" style={{ width: '210mm', minHeight: '297mm', padding: '15mm', fontFamily: 'Tajawal, sans-serif', direction: 'rtl', color: '#000' }}>
        
        {/* PDF Header */}
        <div className="flex justify-between items-start border-b-2 border-teal-600 pb-6 mb-8">
            <div className="text-right">
                <h1 className="text-3xl font-extrabold text-teal-800 mb-1">تقرير نتيجة اختبار</h1>
                <p className="text-lg font-bold text-gray-600">المقرر: السياحة في اليمن</p>
                <p className="text-sm text-gray-500 mt-1">قسم الآثار والسياحة | يوسف الدرعي</p>
            </div>
            <div className="text-left">
                <div className="bg-gray-100 px-4 py-2 rounded-lg border border-gray-300 text-center">
                    <p className="text-sm text-gray-500">الدرجة النهائية</p>
                    <p className="text-3xl font-bold text-teal-700">{result.score} <span className="text-lg text-gray-400">/ {result.total}</span></p>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">{new Date().toLocaleDateString('ar-YE')}</p>
            </div>
        </div>

        {/* PDF Summary Table */}
        <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-r-4 border-teal-500 pr-2">ملخص الأداء - {result.examTitle}</h2>
            <table className="w-full text-right border-collapse border border-gray-300 rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="p-3 border border-gray-300">البيان</th>
                        <th className="p-3 border border-gray-300">القيمة</th>
                        <th className="p-3 border border-gray-300">النسبة المئوية</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-3 border border-gray-300 font-bold">الإجابات الصحيحة</td>
                        <td className="p-3 border border-gray-300 text-green-700 font-bold">{result.score}</td>
                        <td className="p-3 border border-gray-300">{percentage}%</td>
                    </tr>
                    <tr>
                        <td className="p-3 border border-gray-300 font-bold">الإجابات الخاطئة</td>
                        <td className="p-3 border border-gray-300 text-red-600 font-bold">{result.total - result.score}</td>
                        <td className="p-3 border border-gray-300">{100 - percentage}%</td>
                    </tr>
                </tbody>
            </table>
        </div>

        {/* PDF Questions List */}
        <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-r-4 border-amber-500 pr-2">تفاصيل الإجابات</h2>
            <div className="space-y-4">
                {result.answers.map((ans, i) => (
                    <div key={i} className="mb-4 pb-4 border-b border-gray-200 break-inside-avoid">
                        <div className="flex items-start gap-2 mb-2">
                            <span className="font-bold text-teal-700">س{i+1}:</span>
                            <p className="font-bold text-gray-900 text-lg">{ans.text}</p>
                        </div>
                        
                        <div className="mr-8 grid grid-cols-2 gap-4 mb-2">
                             <div className={`p-2 rounded border ${ans.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                                <span className="font-bold text-xs text-gray-500 block mb-1">إجابتك:</span> 
                                <span className={`font-bold ${ans.isCorrect ? 'text-green-800' : 'text-red-800'}`}>{ans.userAnswer}</span>
                             </div>
                             {!ans.isCorrect && (
                                <div className="p-2 rounded bg-gray-50 border border-gray-200">
                                    <span className="font-bold text-xs text-gray-500 block mb-1">الإجابة الصحيحة:</span> 
                                    <span className="font-bold text-gray-800">{ans.correctAnswer}</span>
                                </div>
                             )}
                        </div>
                        <p className="mr-8 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                            <span className="font-bold">التعليل:</span> {ans.explanation}
                        </p>
                    </div>
                ))}
            </div>
        </div>
        
        {/* PDF Footer */}
        <div className="mt-8 pt-4 border-t border-gray-300 text-center text-xs text-gray-400">
            تم استخراج هذا التقرير آلياً من منصة "السياحة في اليمن" التفاعلية.
        </div>
      </div>
    </div>
  );
};

export default Results;