export type QuizMistake = {
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  explanation: string;
};

export type QuizResult = {
  id: string;
  date: string;
  score: number;
  total: number;
  mistakes: QuizMistake[];
};

const STORAGE_KEY = "studypilot-quiz-results";

export function getQuizResults(): QuizResult[] {
  if (typeof window === "undefined") return [];

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];

    const parsed: unknown = JSON.parse(saved);
    return Array.isArray(parsed) ? (parsed as QuizResult[]) : [];
  } catch (error) {
    console.error("Failed to load quiz results:", error);
    return [];
  }
}

export function saveQuizResult(result: QuizResult): boolean {
  if (typeof window === "undefined") return false;

  try {
    const results = getQuizResults();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([result, ...results])
    );
    return true;
  } catch (error) {
    console.error("Failed to save quiz result:", error);
    return false;
  }
}

export function clearQuizResults(): boolean {
  if (typeof window === "undefined") return false;

  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error("Failed to clear quiz results:", error);
    return false;
  }
}

export function getAverageScore(): number {
  const results = getQuizResults();
  if (results.length === 0) return 0;

  const validResults = results.filter((result) => result.total > 0);
  if (validResults.length === 0) return 0;

  const totalPercentage = validResults.reduce(
    (sum, result) => sum + (result.score / result.total) * 100,
    0
  );

  return Math.round(totalPercentage / validResults.length);
}

export function getTotalQuizzes(): number {
  return getQuizResults().length;
}

export function getTotalMistakes(): number {
  return getQuizResults().reduce(
    (total, result) => total + result.mistakes.length,
    0
  );
}
