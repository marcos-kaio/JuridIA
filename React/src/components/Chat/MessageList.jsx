import React, { useRef, useEffect } from 'react';
import { Message, BotLoadingMessage } from './Message';
import { FileUpload } from './FileUpload';

export const MessageList = ({ messages, isLoading, showUploader, onFileUpload }) => {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div ref={chatContainerRef} className="flex-grow p-7 overflow-y-auto flex flex-col gap-5">
      {showUploader && <FileUpload onSimplify={onFileUpload} />}
      {messages.map((msg, index) => (
        <Message key={msg.id || `msg-${index}`} message={msg} />
      ))}
      {isLoading && <BotLoadingMessage />}
    </div>
  );
};