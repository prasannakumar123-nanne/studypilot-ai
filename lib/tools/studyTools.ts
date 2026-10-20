
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
        "Practice Java by writing small programs using variables, loops, and methods.",
        "Understand object-oriented programming through simple classes and objects.",
        "Practice arrays, strings, and basic data structures before advancing to trees.",
    ],
    javascript: [
        "Learn JavaScript variables, functions, arrays, and objects through small projects.",
        "Practice asynchronous JavaScript using promises and async/await.",
        "Build interactive web pages to strengthen your JavaScript fundamentals.",
    ],
    "data-science": [
        "Practice Python data analysis with Pandas and small real-world datasets.",
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

    const selectedSubject: StudySubject = validSubjects.includes(
        normalized as StudySubject
    )
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
    const safeMinutes = Math.max(
        5,
        Math.min(240, Math.floor(minutes))
    );

    const firstBlock = Math.floor(safeMinutes * 0.6);
    const secondBlock = Math.floor(safeMinutes * 0.3);
    const reviewBlock = safeMinutes - firstBlock - secondBlock;

    return [
        `${firstBlock} minutes: Learn the fundamentals of ${subject}.`,
        `${secondBlock} minutes: Solve practice questions about ${subject}.`,
        `${reviewBlock} minutes: Review mistakes and summarize what you learned.`,
    ];
}
