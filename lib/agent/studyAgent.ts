
import {
  executeStudyCommand,
  getStudyTip,
  getStudyPlan,
  type StudyTip,
} from "../tools/studyTools";

import type { StudyTask } from "../../types/study";

export interface StudyAgentResponse {
  success: boolean;
  message: string;
  tip?: StudyTip;
  plan?: string[];
  tasks?: StudyTask[];
}

export function runStudyAgent(
  request: string,
  tasks: StudyTask[]
): StudyAgentResponse {
  try {
    const result = executeStudyCommand(request, tasks);

    if (
      result &&
      typeof result === "object" &&
      "subject" in result &&
      "tip" in result
    ) {
      const tipResult = result as StudyTip;

      return {
        success: true,
        message: `Here is your StudyPilot AI study tip for ${tipResult.subject}.`,
        tip: tipResult,
      };
    }

    if (Array.isArray(result)) {
      return {
        success: true,
        message: "Your study plan is ready.",
        plan: result,
      };
    }

    if (
      result &&
      typeof result === "object" &&
      "message" in result
    ) {
      const response = result as {
        message: string;
        tasks?: StudyTask[];
      };

      return {
        success: true,
        message: response.message,
        tasks: response.tasks,
      };
    }

    return {
      success: true,
      message: "Your study request was processed.",
      tasks,
    };
  } catch {
    return {
      success: false,
      message:
        "Unable to process your study request. Please try again.",
    };
  }
}

export { getStudyTip, getStudyPlan };
