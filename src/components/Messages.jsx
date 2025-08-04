
import { MessageSquare } from "lucide-react";

const Messages = () => {
  return (
    <button className="flex items-center gap-1 bg-gray-200 p-2 rounded-full cursor-pointer hover:bg-gray-300 hover:text-sky-700 md:hidden">
      <MessageSquare size={22} />
      <span className="w-1 h-1 bg-gray-700  rounded-full"></span>
      <span>16</span>
    </button>
  );
};

export default Messages;
