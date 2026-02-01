import React, { useState, useEffect } from 'react';
import { ExamModel } from '../types';

interface QuizProps {
  exam: ExamModel;
  onComplete: (result: any) => void;
  onExit: () => void;
}

const Quiz: React.FC<QuizProps> = ({ exam, onComplete, onExit }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [shake, setShake] = useState(false);
  const [answers, setAnswers] = useState<any[]>([]);
  const [score, setScore] = useState(0);

  const question = exam.questions[currentIdx];
  const progress = ((currentIdx) / exam.questions.length) * 100;

  useEffect(() => {
    // Reset state on question change
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(null);
    setShake(false);
  }, [currentIdx]);

  const playSound = (correct: boolean) => {
    try {
      // Short friendly beep for correct, low thud for wrong
      const soundUri = correct 
        ? "data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU" // Placeholder: In real app use actual short MP3/WAV base64
        : "data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU"; // Placeholder
      
      // Since we can't load real large audio files here easily without external hosting, 
      // we'll simulate the "Concept" of playing sound.
      // In a real environment, replace these strings with actual base64 of a chime and a buzzer.
      
      // Creating a simple oscillator for immediate feedback without external assets
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        if (correct) {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(500, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        } else {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(200, ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.2);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        }
      }
    } catch (e) {
      console.error("Audio play failed", e);
    }
  };

  const handleAnswer = (idx: number) => {
    if (isAnswered) return;

    const correct = idx === question.correctIndex;
    setIsAnswered(true);
    setSelectedOption(idx);
    setIsCorrect(correct);
    
    playSound(correct);

    if (correct) {
      setScore(s => s + 1);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }

    setAnswers([...answers, {
      questionId: question.id,
      text: question.text,
      userAnswer: question.options[idx],
      correctAnswer: question.options[question.correctIndex],
      explanation: question.explanation,
      isCorrect: correct
    }]);
  };

  const handleNext = () => {
    if (currentIdx < exam.questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      onComplete({
        score,
        total: exam.questions.length,
        answers,
        examTitle: exam.title
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative bg-gray-50/20">
      {/* Sticky Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-3 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-l from-teal-400 to-teal-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(45,212,191,0.5)]"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Top Bar */}
      <div className="fixed top-6 left-6 right-6 flex justify-between items-center z-40 max-w-4xl mx-auto w-full pointer-events-none">
        <button onClick={onExit} className="pointer-events-auto bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-md hover:bg-white text-gray-700 hover:text-red-500 transition-colors">
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>
        <div className="bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full shadow-md text-teal-800 font-extrabold text-lg tracking-wider border border-teal-100">
          <span className="text-teal-600">{score}</span> / <span className="text-gray-400">{exam.questions.length}</span>
        </div>
      </div>

      <div className={`glass-panel w-full max-w-3xl rounded-[2rem] p-8 md:p-12 transition-all duration-300 relative overflow-hidden ${shake ? 'shake border-red-400 ring-2 ring-red-200' : 'border-white/60'}`}>
        
        {/* Question Header */}
        <div className="mb-10 relative z-10">
          <div className="flex justify-between items-end mb-4 border-b border-gray-100 pb-2">
             <span className="text-sm text-teal-600 font-bold bg-teal-50 px-3 py-1 rounded-full">سؤال {currentIdx + 1}</span>
             <span className="text-xs text-gray-400">اختر الإجابة الصحيحة</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-800 leading-relaxed md:leading-normal text-right">
            {question.text}
          </h2>
        </div>

        {/* Options Grid */}
        <div className="space-y-4 relative z-10">
          {question.options.map((option, idx) => {
            let btnClass = "w-full text-right p-5 rounded-2xl border-2 transition-all duration-300 font-bold text-lg relative overflow-hidden group ";
            
            if (isAnswered) {
              if (idx === question.correctIndex) {
                // Correct Answer Style
                btnClass += "bg-green-500 border-green-600 text-white shadow-lg scale-[1.02] ring-4 ring-green-100";
              } else if (idx === selectedOption) {
                // Wrong Answer Style
                btnClass += "bg-red-500 border-red-600 text-white opacity-90";
              } else {
                // Unselected Style
                btnClass += "bg-gray-50 border-transparent opacity-40 blur-[1px]";
              }
            } else {
              // Default Hover Style
              btnClass += "bg-white/80 border-transparent hover:border-teal-400 hover:bg-white hover:shadow-md hover:-translate-y-1 active:scale-[0.98]";
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={isAnswered}
                className={btnClass}
              >
                <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {isAnswered && idx === question.correctIndex && (
                        <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center animate-bounce-slow">
                            <i className="fa-solid fa-check"></i>
                        </span>
                    )}
                    {isAnswered && idx === selectedOption && idx !== question.correctIndex && (
                        <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center">
                            <i className="fa-solid fa-xmark"></i>
                        </span>
                    )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback Section */}
        {isAnswered && (
          <div className={`mt-8 p-6 rounded-2xl border-l-4 shadow-sm animate-slide-up ${isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
            <div className="flex items-start gap-4">
              <div className={`mt-1 text-2xl ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                <i className={`fa-solid ${isCorrect ? 'fa-lightbulb' : 'fa-circle-exclamation'}`}></i>
              </div>
              <div>
                <h4 className={`font-bold text-lg mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {isCorrect ? 'أحسنت! إجابة موفقة' : 'للأسف، إجابة غير صحيحة'}
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-bold text-gray-900 ml-1">التعليل:</span>
                  {question.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Next Button */}
        {isAnswered && (
          <div className="mt-8 animate-fade-in">
             <button 
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-extrabold text-xl py-4 px-6 rounded-2xl shadow-xl shadow-teal-500/20 transform transition-all hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-3"
            >
                <span>{currentIdx === exam.questions.length - 1 ? 'عرض النتائج النهائية' : 'السؤال التالي'}</span>
                <i className={`fa-solid ${currentIdx === exam.questions.length - 1 ? 'fa-flag-checkered' : 'fa-arrow-left'}`}></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;