
import { executeStudyCommand } from "../tools/studyTools";
import type { StudyTask } from "../../types/study";

export function runStudyAgent(
  request: string,
  tasks: StudyTask[],
) {
  return executeStudyCommand(request, tasks);
}
