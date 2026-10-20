
import type { StudyTask } from "../../types/study";

export function getStudyTip(subject: string): string {
    const tips: Record<string, string> = {
        python: "Practice Python by writing small programs every day.",
        java: "Practice Java classes, objects, and data structures.",
        mathematics: "Solve problems step by step and review your mistakes.",
        dsa: "Practice one data structure or algorithm at a time.",
    };

    return (
        tips[subject.toLowerCase()] ??
        `Study ${subject} in short sessions and practice with examples.`
    );
}

export function getStudyPlan(subject: string): string[] {
    return [
        `Review the fundamentals of ${subject}.`,
        `Practice ${subject} with a small exercise.`,
        `Test your understanding and review mistakes.`,
    ];
}

export function executeStudyCommand(
    request: string,
    tasks: StudyTask[],
): string {
    const normalized = request.toLowerCase();

    if (normalized.includes("tip")) {
        return getStudyTip(request.replace(/tip/gi, "").trim() || "Python");
    }

    if (normalized.includes("plan")) {
        return getStudyPlan(
            request.replace(/plan/gi, "").trim() || "Python",
        ).join("\n");
    }

    if (normalized.includes("task") || normalized.includes("todo")) {
        if (tasks.length === 0) {
            return "You have no study tasks yet. Add a task to get started.";
        }

        return tasks
            .map((task, index) => `${index + 1}. ${JSON.stringify(task)}`)
            .join("\n");
    }

    return "I can help with study tips, study plans, and your study tasks. Try asking for a Python tip or a study plan.";
}
