import type { ChatMessage as Message } from "../../types/study";

export default function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={`my-3 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[85%] whitespace-pre-wrap rounded-xl border p-3 ${isUser ? "bg-blue-600 text-white" : "bg-white text-gray-900"}`}>
        <p className="mb-1 text-xs font-semibold">
          {isUser ? "You" : "StudyPilot"}
        </p>
        <p>{message.text}</p>
      </div>
    </div>
  );
}
