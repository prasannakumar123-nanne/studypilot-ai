
import { NextResponse } from "next/server";

const tips: Record<string, string> = {
    python:
        "Practice Python by writing small programs and tracing how variables change.",
    java:
        "Practice Java by writing small programs and understanding loops, methods, and classes.",
    dsa:
        "For data structures and algorithms, solve one problem at a time and explain its time complexity.",
    "data science":
        "Practice data science by exploring a dataset, cleaning it, and creating a simple visualization.",
    "machine learning":
        "Learn machine learning by understanding the data, training a simple model, and evaluating its predictions.",
    mathematics:
        "Practice mathematics by solving problems step by step and reviewing every mistake.",
    "web development":
        "Build web development skills by creating a small feature and testing it in your browser.",
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const subject = (searchParams.get("subject") || "general")
        .trim()
        .toLowerCase();

    const tip =
        tips[subject] ??
        "Study in short focused sessions, practise actively, and review your mistakes.";

    return NextResponse.json({
        app: "StudyPilot AI",
        subject,
        tip,
    });
}
