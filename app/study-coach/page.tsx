
"use client";

import { useState } from "react";
import Link from "next/link";

const studyGuides: Record<
    string,
    { introduction: string; steps: string[]; practice: string }
> = {
    Python: {
        introduction:
            "Build your Python fundamentals by learning one concept at a time.",
        steps: [
            "Review variables, data types, and input/output.",
            "Practice if/else conditions and loops.",
            "Write small functions and solve beginner problems.",
            "Review errors and explain your solution in your own words.",
        ],
        practice: "Write a program that counts how many numbers are even in a list.",
    },
    Java: {
        introduction:
            "Strengthen your Java fundamentals through small, runnable programs.",
        steps: [
            "Review variables, data types, and operators.",
            "Practice conditions, loops, and methods.",
            "Understand arrays, strings, and classes.",
            "Trace your code manually before running it.",
        ],
        practice:
            "Write a Java program that finds the largest number in an integer array.",
    },
    "Data Structures and Algorithms": {
        introduction:
            "Learn DSA by understanding the idea first, then implementing it.",
        steps: [
            "Review arrays, strings, and time complexity.",
            "Practice searching and sorting algorithms.",
            "Learn stacks, queues, linked lists, and trees.",
            "Solve one problem, then explain its time and space complexity.",
        ],
        practice:
            "Find the second-largest distinct number in an array without sorting it.",
    },
    "Data Science": {
        introduction:
            "Combine statistics, Python, and practical data analysis.",
        steps: [
            "Review Python basics and essential statistics.",
            "Learn NumPy arrays and pandas DataFrames.",
            "Clean missing values and explore a dataset.",
            "Create visualizations and explain your findings.",
        ],
        practice:
            "Load a small dataset and calculate the mean of one numerical column.",
    },
    Mathematics: {
        introduction:
            "Build understanding by working through examples before memorizing formulas.",
        steps: [
            "Identify the exact concept you need to learn.",
            "Review definitions and one worked example.",
            "Solve three problems from easy to challenging.",
            "Check mistakes and retry without looking at the solution.",
        ],
        practice:
            "Choose one topic from your current syllabus and solve three practice questions.",
    },
    "Machine Learning": {
        introduction:
            "Learn machine learning by connecting the theory to small experiments.",
        steps: [
            "Review Python, pandas, and basic statistics.",
            "Understand features, labels, and train/test splits.",
            "Learn a simple model such as linear regression.",
            "Evaluate model performance and inspect errors.",
        ],
        practice:
            "Describe the difference between training data and test data in your own words.",
    },
    "Web Development": {
        introduction:
            "Build your skills by creating small features and testing them in a browser.",
        steps: [
            "Review HTML structure and CSS layout.",
            "Learn JavaScript variables, functions, and events.",
            "Practice React components, props, and state.",
            "Build a small page and fix one issue at a time.",
        ],
        practice:
            "Create a simple page with a button that updates a counter when clicked.",
    },
};

export default function StudyCoachPage() {
    const [subject, setSubject] = useState("Python");
    const [question, setQuestion] = useState("");
    const [showGuidance, setShowGuidance] = useState(false);

    const guide = studyGuides[subject];

    function getGuidance(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setShowGuidance(true);
    }

    return (
        <main className="study-page">
            <header className="study-header">
                <div>
                    <p className="eyebrow">STUDYPILOT AI</p>
                    <h1>AI Study Coach 🤖</h1>
                    <p>Choose a subject and create a focused learning session.</p>
                </div>

                <Link href="/" className="study-secondary">
                    ← Dashboard
                </Link>
            </header>

            <section className="coach-layout">
                <div className="study-panel">
                    <h2>What are you learning today?</h2>
                    <p>
                        Select a subject and optionally describe what you are finding
                        difficult.
                    </p>

                    <form onSubmit={getGuidance} className="task-form">
                        <label htmlFor="coach-subject">Choose your subject</label>
                        <select
                            id="coach-subject"
                            value={subject}
                            onChange={(event) => {
                                setSubject(event.target.value);
                                setShowGuidance(false);
                            }}
                        >
                            {Object.keys(studyGuides).map((name) => (
                                <option key={name} value={name}>
                                    {name}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="coach-question">
                            What do you need help with? (optional)
                        </label>
                        <textarea
                            id="coach-question"
                            value={question}
                            onChange={(event) => setQuestion(event.target.value)}
                            placeholder="e.g. I don't understand Python loops..."
                            rows={5}
                        />

                        <button type="submit" className="study-primary">
                            Get study guidance →
                        </button>
                    </form>

                    <p className="coach-note">
                        This version uses built-in study guides. Your question is not sent
                        to an AI service.
                    </p>
                </div>

                <div className="study-panel coach-result">
                    <span className="coach-icon">💡</span>
                    <h2>Your learning guide</h2>

                    {!showGuidance ? (
                        <>
                            <p>{guide.introduction}</p>
                            <p>Press “Get study guidance” to see your learning plan.</p>
                        </>
                    ) : (
                        <>
                            <p>{guide.introduction}</p>

                            {question.trim() && (
                                <div className="question-summary">
                                    <strong>Your question</strong>
                                    <p>{question.trim()}</p>
                                </div>
                            )}

                            <h3>Recommended steps</h3>
                            <ol className="coach-steps">
                                {guide.steps.map((step, index) => (
                                    <li key={step}>
                                        <span className="step-number">{index + 1}</span>
                                        <span>{step}</span>
                                    </li>
                                ))}
                            </ol>

                            <div className="practice-card">
                                <strong>Try this practice task</strong>
                                <p>{guide.practice}</p>
                            </div>
                        </>
                    )}

                    <div className="study-actions">
                        <Link href="/study-planner" className="study-primary">
                            Plan my study →
                        </Link>
                        <Link href="/quiz" className="study-secondary">
                            Take a quiz →
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
