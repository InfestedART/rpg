
import type { MessageLogType } from '@/types/game.types';
import './MessageBox.css';
import { useEffect, useRef } from 'react';

type MessageBoxProps = {
  messages: MessageLogType[]
}

const MessageBox = ({ messages }: MessageBoxProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className='message-box'>
      {messages.map(msg => (
        <div className={`message-log`} key={msg.timestamp}>
          <span className='message-box__timestamp'>
            [{new Date(msg.timestamp).toLocaleTimeString()}]:{' '}
          </span>
          <span className={`message-box__msg ${msg.type}`}>
            {msg.message}
          </span>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}

export default MessageBox