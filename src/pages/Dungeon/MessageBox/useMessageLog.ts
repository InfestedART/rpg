import type { MessageLogType, MsgType } from "@/types/game.types";
import { useCallback, useState } from "react";

const useMessageLog = () => {
  const [messages, setMessages] = useState<MessageLogType[]>([]);

  const sendMessage = useCallback((msg: string, type: MsgType = 'info') => {
    setMessages(prev => [...prev, { message: msg, timestamp: Date.now(), type }]);
  }, [])

  const clearMessages = useCallback(() => setMessages([]), [])

  return {
    messages,
    sendMessage,
    clearMessages
  }
} 

export default useMessageLog;