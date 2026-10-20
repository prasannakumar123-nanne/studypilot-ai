import type { StudyTask } from "../../types/study";

export default function TaskSummary({ tasks }: { tasks: StudyTask[] }) {
  const completed = tasks.filter((task) => task.completed).length;
  const pending = tasks.length - completed;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="rounded-xl border p-4">
        <p>Total tasks</p>
        <strong className="text-2xl">{tasks.length}</strong>
      </div>
      <div className="rounded-xl border p-4">
        <p>Pending</p>
        <strong className="text-2xl">{pending}</strong>
      </div>
      <div className="rounded-xl border p-4">
        <p>Completed</p>
        <strong className="text-2xl">{completed}</strong>
      </div>
    </div>
  );
}
