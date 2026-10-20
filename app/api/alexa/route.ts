import { NextRequest, NextResponse } from "next/server";

type AlexaRequest = {
    version?: string;
    session?: {
        application?: { applicationId?: string };
    };
    context?: {
        System?: {
            application?: { applicationId?: string };
        };
    };
    request?: {
        type?: string;
        requestId?: string;
        intent?: {
            name?: string;
            slots?: Record<string, { value?: string }>;
        };
    };
};

function alexaResponse(text: string, shouldEndSession = true) {
    return NextResponse.json({
        version: "1.0",
        response: {
            outputSpeech: {
                type: "PlainText",
                text,
            },
            shouldEndSession,
        },
    });
}

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as AlexaRequest;

        // Confirm that this request belongs to your configured Alexa skill.
        const expectedSkillId = process.env.ALEXA_SKILL_ID;

        const actualSkillId =
            body.session?.application?.applicationId ??
            body.context?.System?.application?.applicationId;

        if (
            !expectedSkillId ||
            !actualSkillId ||
            actualSkillId !== expectedSkillId
        ) {
            return NextResponse.json(
                { error: "Unauthorized Alexa skill" },
                { status: 401 }
            );
        }

        const requestType = body.request?.type;
        const intentName = body.request?.intent?.name;

        if (requestType === "LaunchRequest") {
            return alexaResponse(
                "Welcome to StudyPilot AI! You can ask for a study tip or a study plan.",
                false
            );
        }

        if (requestType === "IntentRequest") {
            if (intentName === "StudyTipIntent") {
                const subject =
                    body.request?.intent?.slots?.subject?.value?.trim() ||
                    "your studies";

                return alexaResponse(
                    `Here is your StudyPilot tip for ${subject}: study in focused sessions, take short breaks, and test yourself without looking at your notes.`
                );
            }

            if (intentName === "StudyPlanIntent") {
                const subject =
                    body.request?.intent?.slots?.subject?.value?.trim() ||
                    "your subject";

                return alexaResponse(
                    `Here is a simple plan for ${subject}: spend 25 minutes learning, 5 minutes reviewing from memory, and 10 minutes solving practice questions. Repeat the cycle as needed.`
                );
            }

            if (intentName === "AMAZON.HelpIntent") {
                return alexaResponse(
                    "You can say, give me a study tip for Python, or create a study plan for mathematics.",
                    false
                );
            }

            if (
                intentName === "AMAZON.StopIntent" ||
                intentName === "AMAZON.CancelIntent"
            ) {
                return alexaResponse("Good luck with your studies. Goodbye!");
            }

            if (intentName === "AMAZON.FallbackIntent") {
                return alexaResponse(
                    "Sorry, I didn't understand. Try asking for a study tip or a study plan.",
                    false
                );
            }
        }

        if (requestType === "SessionEndedRequest") {
            return NextResponse.json({ version: "1.0" });
        }

        return alexaResponse(
            "Sorry, I couldn't process that request. Please try again."
        );
    } catch {
        return NextResponse.json(
            { error: "Invalid request" },
            { status: 400 }
        );
    }
}
