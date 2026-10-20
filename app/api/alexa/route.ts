
import { NextRequest, NextResponse } from "next/server";

type AlexaSlot = {
    value?: string;
};

type AlexaRequestBody = {
    version?: string;
    session?: {
        application?: {
            applicationId?: string;
        };
    };
    context?: {
        System?: {
            application?: {
                applicationId?: string;
            };
        };
    };
    request?: {
        type?: string;
        requestId?: string;
        intent?: {
            name?: string;
            slots?: Record<string, AlexaSlot>;
        };
    };
};

function alexaResponse(
    text: string,
    shouldEndSession = true
) {
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

function getSubject(body: AlexaRequestBody): string {
    const value =
        body.request?.intent?.slots?.subject?.value?.trim();

    return value || "your studies";
}

export async function GET() {
    return NextResponse.json({
        service: "StudyPilot Study Coach",
        project: "StudyPilot AI",
        status: "online",
        endpoint: "/api/alexa",
        message: "The endpoint is available. Alexa should send POST requests.",
    });
}

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as AlexaRequestBody;

        // Check the Alexa skill ID.
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

        // Alexa launch request.
        if (requestType === "LaunchRequest") {
            return alexaResponse(
                "Welcome to StudyPilot Study Coach, your personal study coach. " +
                "You can ask me for a study tip or a study plan. " +
                "For example, say: give me a study tip for Python.",
                false
            );
        }

        // Alexa intent requests.
        if (requestType === "IntentRequest") {
            switch (intentName) {
                case "StudyTipIntent": {
                    const subject = getSubject(body);

                    return alexaResponse(
                        `Here is your study tip for ${subject}. ` +
                        "Study in focused sessions. " +
                        "After learning a concept, close your notes and explain it from memory. " +
                        "Then solve practice questions and review difficult topics again tomorrow."
                    );
                }

                case "StudyPlanIntent": {
                    const subject = getSubject(body);

                    return alexaResponse(
                        `Here is a study plan for ${subject}. ` +
                        "First, spend 25 minutes learning one topic. " +
                        "Take a 5-minute break. " +
                        "Next, spend 20 minutes solving practice questions. " +
                        "Finally, spend 10 minutes reviewing what you learned."
                    );
                }

                case "AMAZON.HelpIntent":
                    return alexaResponse(
                        "You are using StudyPilot Study Coach. " +
                        "Say: give me a study tip for Python, " +
                        "or create a study plan for mathematics.",
                        false
                    );

                case "AMAZON.StopIntent":
                case "AMAZON.CancelIntent":
                    return alexaResponse(
                        "Good luck with your studies. Keep learning and practicing. Goodbye!"
                    );

                case "AMAZON.FallbackIntent":
                    return alexaResponse(
                        "Sorry, I did not understand. " +
                        "Try asking for a study tip or a study plan.",
                        false
                    );

                default:
                    return alexaResponse(
                        "I can help you study. Please ask for a study tip or a study plan.",
                        false
                    );
            }
        }

        // Alexa session-ended request.
        if (requestType === "SessionEndedRequest") {
            return NextResponse.json({
                version: "1.0",
            });
        }

        return alexaResponse(
            "Sorry, I could not process that request. Please try again."
        );
    } catch (error) {
        console.error("StudyPilot Study Coach error:", error);

        return NextResponse.json(
            { error: "Invalid Alexa request body" },
            { status: 400 }
        );
    }
}
