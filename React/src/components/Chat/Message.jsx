import React from 'react';
import ReactMarkdown from "react-markdown";

const UserMessage = ({ content }) => (
    <div className="flex justify-end w-full">
      <div className="max-w-[75%] py-4 px-5 rounded-2xl text-base leading-normal bg-[#E2E8F0] text-black rounded-tr-none">
        <span>{content}</span>
      </div>
    </div>
);

const BotMessage = ({ content }) => (
    <div className="flex justify-start w-full">
      <div className="max-w-[75%] py-4 px-5 rounded-2xl text-base leading-normal bg-[#0DACAC] text-white rounded-tl-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
);

export const Message = ({ message }) => {
    return message.role === 'user'
      ? <UserMessage content={message.content} />
      : <BotMessage content={message.content} />;
};

export const BotLoadingMessage = () => (
    <div className="flex justify-start w-full">
        <div className="max-w-[75%] py-4 px-5 rounded-2xl text-base leading-normal bg-[#0DACAC] text-white rounded-tl-none">
            <div className="flex items-center justify-center space-x-1">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-white rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            </div>
        </div>
    </div>
);