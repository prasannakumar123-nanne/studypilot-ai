import { executeStudyCommand } from "../tools/studyTools";
import type { StudyTask } from "../../types/study";

export function runStudyAgent(
  request: string,
  tasks: StudyTask[],
) {
  // This prototype routes requests using predefined rules.
  // It does not call a live AI model.
  return executeStudyCommand(request, tasks);
}
