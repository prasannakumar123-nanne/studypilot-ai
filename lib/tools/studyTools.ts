
import type { StudyTask } from "../../types/study";

export type StudySubject =
    | "python"
    | "java"
    | "javascript"
    | "data-science"
    | "general";

export interface StudyTip {
    subject: StudySubject;
    tip: string;
}

const studyTips: Record<StudySubject, string[]> = {
    python: [
        "Practice Python by writing small programs and tracing how variables change.",
        "Learn lists, dictionaries, loops, and functions by building mini-projects.",
        "Solve one Python problem daily and explain your solution in your own words.",
    ],
    java: [
        "Practice Java with variables, loops, methods, and small programs.",
        "Understand object-oriented programming through classes and objects.",
        "Practice arrays, strings, and data structures before advancing to trees.",
    ],
    javascript: [
        "Learn variables, functions, arrays, and objects through small projects.",
        "Practice asynchronous JavaScript with promises and async/await.",
        "Build interactive web pages to strengthen your JavaScript fundamentals.",
    ],
    "data-science": [
        "Practice data analysis with Python, Pandas, and real-world datasets.",
        "Learn statistics before moving to advanced machine learning algorithms.",
        "Visualize your data and explain the patterns you discover.",
    ],
    general: [
        "Break your study session into focused blocks with short breaks.",
        "Use active recall instead of only rereading your notes.",
        "Review difficult topics regularly and practice with questions.",
    ],
};

export function getStudyTip(
    subject: string = "general"
): StudyTip {
    const normalized = subject.toLowerCase().trim();

    const validSubjects: StudySubject[] = [
        "python",
        "java",
        "javascript",
        "data-science",
        "general",
    ];

    const selectedSubject: StudySubject =
        validSubjects.includes(normalized as StudySubject)
            ? (normalized as StudySubject)
            : "general";

    const tips = studyTips[selectedSubject];
    const tip = tips[Math.floor(Math.random() * tips.length)];

    return {
        subject: selectedSubject,
        tip,
    };
}

export function getStudyPlan(
    subject: string,
    minutes: number = 30
): string[] {
    const safeMinutes = Number.isFinite(minutes)
        ? Math.max(5, Math.min(240, Math.floor(minutes)))
        : 30;

    const firstBlock = Math.floor(safeMinutes * 0.6);
    const secondBlock = Math.floor(safeMinutes * 0.3);
    const reviewBlock = safeMinutes - firstBlock - secondBlock;

    return [
        `${firstBlock} minutes: Learn the fundamentals of ${subject}.`,
        `${secondBlock} minutes: Solve practice questions about ${subject}.`,
        `${reviewBlock} minutes: Review mistakes and summarize what you learned.`,
    ];
}

/**
 * Routes a study request to the existing command handler.
 * Keep this signature compatible with the existing application.
 */
export function executeStudyCommand(
    request: string,
    tasks: StudyTask[]
) {
    const normalized = request.toLowerCase();

    if (
        normalized.includes("tip") ||
        normalized.includes("advice")
    ) {
        const subject = detectSubject(normalized);
        return getStudyTip(subject);
    }

    if (
        normalized.includes("plan") ||
        normalized.includes("schedule")
    ) {
        const subject = detectSubject(normalized);
        return getStudyPlan(subject, 30);
    }

    return {
        message:
            "Try asking for a study tip or a study plan for Python, Java, JavaScript, or Data Science.",
        tasks,
    };
}

function detectSubject(request: string): string {
    if (request.includes("python")) return "python";
    if (request.includes("java")) return "java";
    if (
        request.includes("javascript") ||
        request.includes("js")
    ) {
        return "javascript";
    }
    if (
        request.includes("data science") ||
        request.includes("data-science")
    ) {
        return "data-science";
    }

    return "general";
}
