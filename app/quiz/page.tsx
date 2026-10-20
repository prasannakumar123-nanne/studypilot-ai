"use client";

import { useState } from "react";
import { saveQuizResult } from "@/lib/quizStorage";

type Question = {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

const questions: Question[] = [
  {
    question: "Which keyword is used to define a function in Python?",
    options: ["function", "def", "fun", "define"],
    correctAnswer: 1,
    explanation:
      "Python uses the def keyword to define a function. For example: def greet():",
  },
  {
    question: "Which data type stores True or False values in Python?",
    options: ["String", "Integer", "Boolean", "List"],
    correctAnswer: 2,
    explanation:
      "The bool data type represents True or False values in Python.",
  },
  {
    question: "What does a Python dictionary store?",
    options: [
      "Only numbers",
      "Only strings",
      "Values without keys",
      "Key-value pairs",
    ],
    correctAnswer: 3,
    explanation:
      "A Python dictionary stores information as key-value pairs.",
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [submitted, setSubmitted] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const question = questions[currentQuestion];
  const answeredCount = Object.keys(selectedAnswers).length;

  const score = questions.reduce((total, item, index) => {
    return total + (selectedAnswers[index] === item.correctAnswer ? 1 : 0);
  }, 0);

  function selectAnswer(optionIndex: number) {
    if (submitted) return;

    setSelectedAnswers((previous) => ({
      ...previous,
      [currentQuestion]: optionIndex,
    }));
  }

  function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
    }
  }

  function previousQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1);
    }
  }

  function submitQuiz() {
    if (answeredCount !== questions.length || submitted) return;

    const mistakes = questions.flatMap((item, index) => {
      const selectedIndex = selectedAnswers[index];

      if (selectedIndex === item.correctAnswer) {
        return [];
      }

      return [
        {
          question: item.question,
          selectedAnswer: item.options[selectedIndex],
          correctAnswer: item.options[item.correctAnswer],
          explanation: item.explanation,
        },
      ];
    });

    const saved = saveQuizResult({
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      score,
      total: questions.length,
      mistakes,
    });

    setSaveMessage(
      saved
        ? "Your quiz result and mistakes have been saved!"
        : "Your result could not be saved. Please check your browser storage."
    );

    setSubmitted(true);
  }

  function restartQuiz() {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setSubmitted(false);
    setSaveMessage("");
  }

  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "#f5f7fb",
    color: "#172033",
    padding: "40px 20px",
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: "760px",
    margin: "0 auto",
  };

  const cardStyle: React.CSSProperties = {
    background: "#ffffff",
    border: "1px solid #e5eaf2",
    borderRadius: "20px",
    padding: "32px",
    boxShadow: "0 12px 35px rgba(20, 40, 80, 0.07)",
  };

  const buttonStyle: React.CSSProperties = {
    border: "none",
    borderRadius: "10px",
    padding: "12px 20px",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
  };

  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <header style={{ marginBottom: "28px" }}>
          <a
            href="/"
            style={{
              color: "#4f46e5",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "14px",
            }}
          >
            ← Back to Dashboard
          </a>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
              marginTop: "28px",
            }}
          >
            <div>
              <p
                style={{
                  color: "#6366f1",
                  fontWeight: 700,
                  fontSize: "12px",
                  letterSpacing: "2px",
                  margin: "0 0 8px",
                }}
              >
                STUDYPILOT AI
              </p>

              <h1
                style={{
                  fontSize: "clamp(28px, 5vw, 38px)",
                  margin: 0,
                  letterSpacing: "-1px",
                }}
              >
                Knowledge Check
              </h1>

              <p style={{ color: "#68738a", marginTop: "10px" }}>
                Test your knowledge and learn from every answer.
              </p>
            </div>

            <div
              style={{
                background: "#e9eaff",
                color: "#4f46e5",
                borderRadius: "14px",
                padding: "14px 18px",
                textAlign: "center",
                minWidth: "90px",
              }}
            >
              <div style={{ fontSize: "25px", fontWeight: 800 }}>
                {submitted
                  ? `${score}/${questions.length}`
                  : `${currentQuestion + 1}/${questions.length}`}
              </div>
              <div style={{ fontSize: "12px", marginTop: "4px" }}>
                {submitted ? "Your score" : "Question"}
              </div>
            </div>
          </div>
        </header>

        {!submitted ? (
          <section style={cardStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#68738a",
                fontSize: "13px",
                marginBottom: "12px",
              }}
            >
              <span>Progress</span>
              <span>
                {Math.round(
                  ((currentQuestion + 1) / questions.length) * 100
                )}
                %
              </span>
            </div>

            <div
              style={{
                width: "100%",
                height: "7px",
                background: "#e9edf5",
                borderRadius: "20px",
                overflow: "hidden",
                marginBottom: "30px",
              }}
            >
              <div
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                  borderRadius: "20px",
                  transition: "width 0.2s ease",
                }}
              />
            </div>

            <p
              style={{
                color: "#6366f1",
                fontWeight: 700,
                fontSize: "13px",
                marginBottom: "12px",
              }}
            >
              QUESTION {currentQuestion + 1} OF {questions.length}
            </p>

            <h2
              style={{
                fontSize: "23px",
                lineHeight: 1.5,
                margin: "0 0 24px",
              }}
            >
              {question.question}
            </h2>

            <div style={{ display: "grid", gap: "12px" }}>
              {question.options.map((option, index) => {
                const isSelected =
                  selectedAnswers[currentQuestion] === index;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => selectAnswer(index)}
                    aria-pressed={isSelected}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      width: "100%",
                      textAlign: "left",
                      padding: "17px",
                      borderRadius: "12px",
                      border: isSelected
                        ? "2px solid #6366f1"
                        : "1px solid #e0e6f0",
                      background: isSelected ? "#f0f0ff" : "#ffffff",
                      color: "#172033",
                      fontSize: "15px",
                      lineHeight: 1.5,
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        width: "30px",
                        height: "30px",
                        borderRadius: "8px",
                        background: isSelected ? "#6366f1" : "#eef1f7",
                        color: isSelected ? "#ffffff" : "#566176",
                        fontWeight: 700,
                      }}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>

                    <span style={{ flex: 1 }}>{option}</span>

                    {isSelected && (
                      <span style={{ color: "#6366f1", fontWeight: 800 }}>
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
                marginTop: "30px",
                paddingTop: "22px",
                borderTop: "1px solid #edf0f6",
              }}
            >
              <button
                type="button"
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
                style={{
                  ...buttonStyle,
                  background: "#eef1f7",
                  color: currentQuestion === 0 ? "#a4adbd" : "#344054",
                  cursor: currentQuestion === 0 ? "not-allowed" : "pointer",
                }}
              >
                ← Previous
              </button>

              <span style={{ color: "#68738a", fontSize: "13px" }}>
                {answeredCount} of {questions.length} answered
              </span>

              {currentQuestion < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={nextQuestion}
                  style={{
                    ...buttonStyle,
                    background: "#6366f1",
                    color: "#ffffff",
                  }}
                >
                  Next Question →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submitQuiz}
                  disabled={answeredCount !== questions.length}
                  style={{
                    ...buttonStyle,
                    background:
                      answeredCount === questions.length
                        ? "#6366f1"
                        : "#c7c9dc",
                    color: "#ffffff",
                    cursor:
                      answeredCount === questions.length
                        ? "pointer"
                        : "not-allowed",
                  }}
                >
                  Submit Quiz
                </button>
              )}
            </div>
          </section>
        ) : (
          <section style={cardStyle}>
            <div style={{ textAlign: "center", padding: "10px 0 24px" }}>
              <div
                style={{
                  width: "82px",
                  height: "82px",
                  borderRadius: "50%",
                  background:
                    score === questions.length ? "#dcfce7" : "#e9eaff",
                  color: score === questions.length ? "#15803d" : "#4f46e5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "38px",
                  margin: "0 auto 20px",
                }}
              >
                {score === questions.length ? "★" : "✓"}
              </div>

              <h2 style={{ fontSize: "28px", margin: "0 0 10px" }}>
                {score === questions.length
                  ? "Excellent work!"
                  : score >= 2
                    ? "Great effort!"
                    : "Keep practicing!"}
              </h2>

              <p style={{ color: "#68738a", margin: 0 }}>
                You completed the quiz. Review the explanations below to learn
                more.
              </p>

              <div
                style={{
                  fontSize: "44px",
                  fontWeight: 800,
                  color: "#4f46e5",
                  marginTop: "20px",
                }}
              >
                {score}/{questions.length}
              </div>

              <p style={{ color: "#68738a", marginTop: "4px" }}>
                {Math.round((score / questions.length) * 100)}% correct
              </p>

              <p
                role="status"
                style={{
                  color: saveMessage.startsWith("Your quiz result")
                    ? "#15803d"
                    : "#b45309",
                  fontSize: "14px",
                  marginTop: "16px",
                }}
              >
                {saveMessage}
              </p>
            </div>

            <div style={{ display: "grid", gap: "14px" }}>
              {questions.map((item, index) => {
                const correct =
                  selectedAnswers[index] === item.correctAnswer;

                return (
                  <div
                    key={item.question}
                    style={{
                      padding: "18px",
                      border: "1px solid #e5eaf2",
                      borderRadius: "12px",
                      background: "#ffffff",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "12px",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "16px",
                          lineHeight: 1.5,
                          margin: "0 0 12px",
                        }}
                      >
                        {index + 1}. {item.question}
                      </h3>

                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 700,
                          color: correct ? "#15803d" : "#dc2626",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {correct ? "✓ Correct" : "✗ Incorrect"}
                      </span>
                    </div>

                    <p
                      style={{
                        color: "#344054",
                        fontSize: "14px",
                        margin: "0 0 8px",
                      }}
                    >
                      Your answer: {item.options[selectedAnswers[index]]}
                    </p>

                    {!correct && (
                      <p
                        style={{
                          color: "#15803d",
                          fontSize: "14px",
                          margin: "0 0 8px",
                        }}
                      >
                        Correct answer: {item.options[item.correctAnswer]}
                      </p>
                    )}

                    <p
                      style={{
                        color: "#68738a",
                        fontSize: "14px",
                        lineHeight: 1.6,
                        margin: "8px 0 0",
                      }}
                    >
                      {item.explanation}
                    </p>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={restartQuiz}
              style={{
                ...buttonStyle,
                display: "block",
                width: "100%",
                marginTop: "24px",
                background: "#6366f1",
                color: "#ffffff",
              }}
            >
              Try Again ↻
            </button>
          </section>
        )}

        <footer
          style={{
            textAlign: "center",
            color: "#8992a5",
            fontSize: "12px",
            marginTop: "24px",
          }}
        >
          StudyPilot AI · Learn smarter, one question at a time.
        </footer>
      </div>
    </main>
  );
}