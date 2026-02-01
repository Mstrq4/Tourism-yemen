export enum View {
  HOME = 'HOME',
  SUMMARY = 'SUMMARY',
  EXAM_HUB = 'EXAM_HUB',
  QUIZ = 'QUIZ',
  RESULTS = 'RESULTS'
}

export interface Question {
  id: number;
  text: string;
  options: string[]; // For true/false, options are ["صواب", "خطأ"]
  correctIndex: number; // 0-based index
  explanation: string;
  type: 'MCQ' | 'TF';
}

export interface ExamModel {
  id: number;
  title: string;
  questions: Question[];
}

export interface CourseData {
  summary: SummaryChapter[];
  exams: ExamModel[];
}

export interface SummaryChapter {
  id: number;
  title: string;
  content: SummarySection[];
}

export type SummarySectionType = 'text' | 'list' | 'timeline' | 'comparison' | 'cards';

export interface SummarySection {
  type: SummarySectionType;
  title?: string;
  data: any; // Flexible to accommodate different visual structures
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answers: { questionId: number; userAnswerIndex: number; isCorrect: boolean }[];
  examId: number | null;
  isComplete: boolean;
}