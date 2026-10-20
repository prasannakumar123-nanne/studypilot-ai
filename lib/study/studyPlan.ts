export type StudySession = {
  title: string;
  durationMinutes: number;
  activity: string;
};

export function createStudyPlan(subject: string): StudySession[] {
  const name = subject.trim() || "your subject";

  return [
    {
      title: `Review ${name}`,
      durationMinutes: 10,
      activity: "Review notes and understand the main concepts.",
    },
    {
      title: `Practise ${name}`,
      durationMinutes: 10,
      activity: "Solve practice questions independently.",
    },
    {
      title: `Check ${name} mistakes`,
      durationMinutes: 5,
      activity: "Check answers and revise mistakes.",
    },
  ];
}
