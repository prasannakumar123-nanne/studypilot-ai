import type { QuizQuestion } from "../../types/study";

type Props = {
  question: QuizQuestion;
  selectedAnswer: number | null;
  onSelect: (answer: number) => void;
};

export default function QuizCard({
  question,
  selectedAnswer,
  onSelect,
}: Props) {
  return (
    <section className="rounded-xl border p-5">
      <h2 className="mb-4 text-lg font-semibold">{question.question}</h2>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={`${question.id}-${index}`}
            type="button"
            onClick={() => onSelect(index)}
            className={`block w-full rounded-lg border p-3 text-left ${
              selectedAnswer === index ? "border-blue-600 bg-blue-50" : ""
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {selectedAnswer !== null && (
        <p className="mt-3 text-sm">{question.explanation}</p>
      )}
    </section>
  );
}
