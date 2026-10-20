export type StudyTask = {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: string;
};

export type ChatMessage = {
  role: "assistant" | "user";
  text: string;
};
