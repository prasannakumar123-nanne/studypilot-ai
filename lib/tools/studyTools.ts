
import type { StudyTask } from "../../types/study";

/**
 * Returns a study tip for the requested subject.
 */
export function getStudyTip(subject: string): string {
    const normalizedSubject = subject.trim().toLowerCase();

    const tips: Record<string, string> = {
        python:
            "Practice Python daily. Start with variables, conditions, loops, functions, and small projects.",
        java:
            "Practice Java classes, objects, inheritance, and exception handling. Write small programs daily.",
        javascript:
            "Learn variables, functions, arrays, objects, and asynchronous JavaScript by building small projects.",
        typescript:
            "Practice TypeScript types, interfaces, functions, and generics. Use types to catch mistakes early.",
        dsa:
            "Study one data structure or algorithm at a time. Practice arrays, strings, linked lists, trees, and sorting.",
        mathematics:
            "Solve problems step by step. Review mistakes and practice similar problems until the method is clear.",
        "data science":
            "Practice Python, statistics, data cleaning, visualization, and exploratory data analysis with real datasets.",
        ai:
            "Build a strong foundation in Python, linear algebra, probability, and machine learning before tackling advanced AI.",
        default:
            "Study in focused sessions, take short notes, solve practice questions, and review your mistakes regularly.",
    };

    return tips[normalizedSubject] ?? tips.default;
}

/**
 * Creates a simple study plan for the requested subject.
 */
export function getStudyPlan(subject: string): string[] {
    const normalizedSubject = subject.trim() || "your subject";

    return [
        `Step 1: Review the fundamentals of ${normalizedSubject}.`,
        `Step 2: Practice ${normalizedSubject} with examples and exercises.`,
        `Step 3: Test your understanding with practice questions.`,
        `Step 4: Review mistakes and revisit difficult concepts.`,
        `Step 5: Summarize what you learned and plan your next session.`,
    ];
}

/**
 * Handles basic study commands using predefined rules.
 * This is a rule-based prototype, not a live AI model.
 */
export function executeStudyCommand(
    request: string,
    tasks: StudyTask[],
): string {
    const normalizedRequest = request.trim().toLowerCase();

    if (!normalizedRequest) {
        return "Please enter a request. You can ask for a study tip, a study plan, or your tasks.";
    }

    // Handle requests for study tips.
    if (
        normalizedRequest.includes("tip") ||
        normalizedRequest.includes("advice")
    ) {
        const subject = request
            .replace(/\b(tips?|advice|for|about|give|me|study)\b/gi, "")
            .trim();

        return getStudyTip(subject || "Python");
    }

    // Handle requests for study plans.
    if (
        normalizedRequest.includes("plan") ||
        normalizedRequest.includes("schedule")
    ) {
        const subject = request
            .replace(/\b(plan|schedule|for|about|make|create|study|a|my)\b/gi, "")
            .trim();

        return getStudyPlan(subject || "Python").join("\n");
    }

    // Handle requests to list study tasks.
    if (
        normalizedRequest.includes("task") ||
        normalizedRequest.includes("todo") ||
        normalizedRequest.includes("to-do")
    ) {
        if (tasks.length === 0) {
            return "You have no study tasks yet. Add a task to get started.";
        }

        return tasks
            .map((task, index) => `${index + 1}. ${JSON.stringify(task)}`)
            .join("\n");
    }

    return [
        "I can help with these study commands:",
        "- Ask for a Python study tip.",
        "- Ask for a Java study plan.",
        "- Ask to show your study tasks.",
    ].join("\n");
}
