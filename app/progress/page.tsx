"use client";

import { useEffect, useState } from "react";
import type { StudyTask } from "../../types/study";

export default function ProgressPage() {
  const [tasks, setTasks] = useState<StudyTask[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("studypilot-tasks");
      if (saved) setTasks(JSON.parse(saved) as StudyTask[]);
    } catch {
      setTasks([]);
    }
  }, []);

  const completed = tasks.filter((task) => task.completed).length;
  const pending = tasks.length - completed;
  const percentage = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-2 text-3xl font-bold">Study Progress</h1>
      <p className="mb-6 text-gray-600">Your saved study task summary.</p>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border p-4">Total: <strong>{tasks.length}</strong></div>
        <div className="rounded-xl border p-4">Completed: <strong>{completed}</strong></div>
        <div className="rounded-xl border p-4">Pending: <strong>{pending}</strong></div>
      </div>

      <section className="mt-6 rounded-xl border p-5">
        <div className="mb-3 flex justify-between">
          <span>Completion rate</span>
          <strong>{percentage}%</strong>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-gray-200">
          <div className="h-full rounded-full bg-blue-600" style={{ width: `${percentage}%` }} />
        </div>
        {tasks.length === 0 && (
          <p className="mt-4 text-gray-600">Add tasks in Study Planner to track your progress.</p>
        )}
      </section>
    </main>
  );
}
