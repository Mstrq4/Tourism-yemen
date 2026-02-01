import React, { useState } from 'react';
import { View, ExamModel } from './types';
import Home from './components/Home';
import Summary from './components/Summary';
import ExamHub from './components/ExamHub';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Navbar from './components/Navbar';
import { courseData } from './data';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [selectedExam, setSelectedExam] = useState<ExamModel | null>(null);
  const [quizResult, setQuizResult] = useState<any>(null);

  const handleStartExam = (exam: ExamModel) => {
    setSelectedExam(exam);
    setCurrentView(View.QUIZ);
  };

  const handleQuizComplete = (result: any) => {
    setQuizResult(result);
    setCurrentView(View.RESULTS);
  };

  const renderView = () => {
    switch (currentView) {
      case View.HOME:
        return <Home onNavigate={setCurrentView} />;
      case View.SUMMARY:
        return <Summary onBack={() => setCurrentView(View.HOME)} />;
      case View.EXAM_HUB:
        return <ExamHub exams={courseData.exams} onSelectExam={handleStartExam} onBack={() => setCurrentView(View.HOME)} />;
      case View.QUIZ:
        return selectedExam ? <Quiz exam={selectedExam} onComplete={handleQuizComplete} onExit={() => setCurrentView(View.EXAM_HUB)} /> : null;
      case View.RESULTS:
        return quizResult ? <Results result={quizResult} onHome={() => setCurrentView(View.HOME)} /> : null;
      default:
        return <Home onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-900 overflow-x-hidden relative flex flex-col">
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
         <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-teal-500/20 rounded-full blur-[120px] animate-pulse"></div>
         <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-amber-500/15 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Persistent Navbar */}
      <Navbar currentView={currentView} onNavigate={setCurrentView} />

      {/* Main Content Area */}
      <main className="flex-grow animate-fade-in pb-10">
        {renderView()}
      </main>

      {/* Simple Footer */}
      <footer className="text-center text-white/60 text-xs py-4">
        <p>© 2024 قسم الآثار والسياحة | يوسف الدرعي</p>
      </footer>
    </div>
  );
};

export default App;