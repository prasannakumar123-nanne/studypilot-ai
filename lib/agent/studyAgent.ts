
import {
  getStudyTip,
  getStudyPlan,
  type StudyTip,
} from "../tools/studyTools";

export interface StudyAgentResponse {
  success: boolean;
  message: string;
  tip?: StudyTip;
  plan?: string[];
}

export function runStudyAgent(
  subject: string = "general",
  minutes: number = 30
): StudyAgentResponse {
  try {
    const tip = getStudyTip(subject);
    const plan = getStudyPlan(subject, minutes);

    return {
      success: true,
      message: `Here is your StudyPilot AI study guidance for ${tip.subject}.`,
      tip,
      plan,
    };
  } catch {
    return {
      success: false,
      message: "Unable to generate study guidance. Please try again.",
    };
  }
}

export { getStudyTip, getStudyPlan };
