
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type StudyTask = {
    id: number;
    subject: string;
    topic: string;
    date: string;
    minutes: number;
    completed: boolean;
};

const STORAGE_KEY = "studypilot-study-tasks";

export default function StudyPlannerPage() {
    const [tasks, setTasks] = useState<StudyTask[]>([]);
    const [subject, setSubject] = useState("Python");
    const [topic, setTopic] = useState("");
    const [date, setDate] = useState("");
    const [minutes, setMinutes] = useState("30");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) setTasks(JSON.parse(saved) as StudyTask[]);
        } catch {
            setTasks([]);
        }
        setLoaded(true);
    }, []);

    useEffect(() => {
        if (loaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        }
    }, [tasks, loaded]);

    function addTask(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!topic.trim()) return;

        const newTask: StudyTask = {
            id: Date.now(),
            subject,
            topic: topic.trim(),
            date,
            minutes: Number(minutes),
            completed: false,
        };

        setTasks((current) => [newTask, ...current]);
        setTopic("");
        setDate("");
        setMinutes("30");
    }

    function toggleTask(id: number) {
        setTasks((current) =>
            current.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    }

    function deleteTask(id: number) {
        setTasks((current) => current.filter((task) => task.id !== id));
    }

    const completedCount = tasks.filter((task) => task.completed).length;
    const totalMinutes = tasks
        .filter((task) => task.completed)
        .reduce((sum, task) => sum + task.minutes, 0);

    return (
        <main className="study-page">
            <header className="study-header">
                <div>
                    <p className="eyebrow">STUDYPILOT AI</p>
                    <h1>Study Planner 📚</h1>
                    <p>Turn your learning goals into small daily actions.</p>
                </div>

                <Link href="/" className="study-secondary">
                    ← Dashboard
                </Link>
            </header>

            <section className="study-content">
                <div className="study-panel">
                    <h2>Create a study task</h2>
                    <p>Add a topic you want to learn or revise.</p>

                    <form onSubmit={addTask} className="task-form">
                        <label htmlFor="subject">Subject</label>
                        <select
                            id="subject"
                            value={subject}
                            onChange={(event) => setSubject(event.target.value)}
                        >
                            <option>Python</option>
                            <option>Java</option>
                            <option>Data Structures and Algorithms</option>
                            <option>Data Science</option>
                            <option>Mathematics</option>
                            <option>Machine Learning</option>
                            <option>Web Development</option>
                        </select>

                        <label htmlFor="topic">Topic or task</label>
                        <input
                            id="topic"
                            value={topic}
                            onChange={(event) => setTopic(event.target.value)}
                            placeholder="e.g. Practice Python loops"
                            required
                        />

                        <label htmlFor="date">Study date (optional)</label>
                        <input
                            id="date"
                            type="date"
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                        />

                        <label htmlFor="minutes">Planned time</label>
                        <select
                            id="minutes"
                            value={minutes}
                            onChange={(event) => setMinutes(event.target.value)}
                        >
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="90">1.5 hours</option>
                            <option value="120">2 hours</option>
                        </select>

                        <button type="submit" className="study-primary">
                            + Add study task
                        </button>
                    </form>
                </div>

                <div className="study-panel">
                    <h2>Your progress</h2>

                    <div className="study-stats">
                        <div>
                            <strong>{tasks.length}</strong>
                            <span>Total tasks</span>
                        </div>
                        <div>
                            <strong>{completedCount}</strong>
                            <span>Completed</span>
                        </div>
                        <div>
                            <strong>{totalMinutes}</strong>
                            <span>Minutes studied</span>
                        </div>
                    </div>

                    <div className="progress-track">
                        <div
                            className="progress-fill"
                            style={{
                                width: `${tasks.length === 0
                                        ? 0
                                        : (completedCount / tasks.length) * 100
                                    }%`,
                            }}
                        />
                    </div>

                    <p>
                        {tasks.length === 0
                            ? "Add your first task to start tracking progress."
                            : `${Math.round(
                                (completedCount / tasks.length) * 100
                            )}% of your tasks completed`}
                    </p>

                    <h2 className="task-list-heading">Your study tasks</h2>

                    {tasks.length === 0 ? (
                        <div className="empty-state">
                            <span>📝</span>
                            <p>No tasks yet. Add your first study task above!</p>
                        </div>
                    ) : (
                        <div className="task-list">
                            {tasks.map((task) => (
                                <article className="task-item" key={task.id}>
                                    <label className="task-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={task.completed}
                                            onChange={() => toggleTask(task.id)}
                                        />
                                        <span className={task.completed ? "task-done" : ""}>
                                            <strong>{task.topic}</strong>
                                            <small>
                                                {task.subject} · {task.minutes} minutes
                                                {task.date ? ` · ${task.date}` : ""}
                                            </small>
                                        </span>
                                    </label>

                                    <button
                                        type="button"
                                        className="delete-task"
                                        onClick={() => deleteTask(task.id)}
                                        aria-label={`Delete ${task.topic}`}
                                    >
                                        Delete
                                    </button>
                                </article>
                            ))}
                        </div>
                    )}

                    <div className="study-actions">
                        <Link href="/quiz" className="study-primary">
                            Practice a quiz →
                        </Link>
                        <Link href="/study-coach" className="study-secondary">
                            Get study guidance →
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
