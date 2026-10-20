
export type QuizOption = {
    label: string;
    value: string;
};

export type MistakeAnalysis = {
    correct: boolean;
    title: string;
    explanation: string;
    nextStep: string;
};

type Question = {
    id: string;
    topic: string;
    prompt: string;
    code: string;
    options: QuizOption[];
    correctAnswer: string;
    explanation: string;
    misconception: Record<string, string>;
    nextStep: string;
};

export const questions: Question[] = [
    {
        id: "post-increment",
        topic: "Java Fundamentals",
        prompt: "What does this Java code print?",
        code: "int x = 5;\nSystem.out.println(x++);",
        options: [
            { label: "A", value: "5" },
            { label: "B", value: "6" },
            { label: "C", value: "Compilation error" },
            { label: "D", value: "Nothing" },
        ],
        correctAnswer: "5",
        explanation:
            "Post-increment uses the current value first. Java prints 5, then increases x to 6.",
        misconception: {
            "6":
                "You may be thinking that x++ increases the value before printing. That is how pre-increment (++x) behaves in this expression, but x++ uses the old value first.",
            "Compilation error":
                "The statement is valid Java. The variable x is declared as an integer, and println can print its value.",
            Nothing:
                "The println statement executes and prints the value of x. It does not produce empty output.",
        },
        nextStep:
            "Practice comparing x++ with ++x, then trace the value of x after each statement.",
    },
    {
        id: "integer-division",
        topic: "Java Fundamentals",
        prompt: "What is the value of 7 / 2 when both numbers are integers?",
        code: "int result = 7 / 2;\nSystem.out.println(result);",
        options: [
            { label: "A", value: "3" },
            { label: "B", value: "3.5" },
            { label: "C", value: "4" },
            { label: "D", value: "Compilation error" },
        ],
        correctAnswer: "3",
        explanation:
            "Integer division discards the fractional part. Since both operands are integers, 7 / 2 evaluates to 3.",
        misconception: {
            "3.5":
                "You are using ordinary decimal division. In Java, two int operands produce an integer result.",
            "4":
                "Java does not round integer division to the nearest whole number. It discards the fractional part.",
            "Compilation error":
                "This is valid Java. Integer division between two int values is allowed.",
        },
        nextStep:
            "Try 9 / 2 and 9 % 2. Remember that / gives the quotient and % gives the remainder.",
    },
];

export function analyzeAnswer(
    questionId: string,
    selectedAnswer: string,
): MistakeAnalysis | null {
    const question = questions.find((item) => item.id === questionId);

    if (!question) {
        return null;
    }

    const correct = selectedAnswer === question.correctAnswer;

    return {
        correct,
        title: correct ? "Correct! Great understanding." : "Let's learn from this mistake.",
        explanation:
            correct
                ? question.explanation
                : question.misconception[selectedAnswer] ??
                `The correct answer is ${question.correctAnswer}. ${question.explanation}`,
        nextStep: question.nextStep,
    };
}
