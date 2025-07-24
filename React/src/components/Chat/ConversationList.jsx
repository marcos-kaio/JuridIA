import React from 'react';
import { FilePlusIcon, UserIcon, TrashIcon, ExitIcon } from '../utilities';

const ConversationItem = ({ text, isActive, onChangeChat, onDelete }) => (
  <div
    className={`relative flex items-center justify-between w-full p-4 rounded-lg border-2 group ${
      isActive
        ? 'bg-[#0DACAC] text-[#F4F7FB] border-[#F4F7FB]'
        : 'bg-[#F4F7FB] border-[#0DACAC] text-[#0DACAC]'
    }`}
  >
    <button
      onClick={onChangeChat}
      title={text}
      className='w-full text-left text-lg font-semibold font-montserrat cursor-pointer bg-transparent border-none overflow-hidden whitespace-nowrap text-ellipsis pr-8'
    >
      {text}
    </button>
    <button
      onClick={onDelete}
      className={`absolute right-2 p-1 rounded-full transition-opacity opacity-0 group-hover:opacity-100 ${
        isActive
          ? 'text-white hover:bg-white/20'
          : 'text-red-500 hover:bg-red-100'
      }`}
      aria-label='Deletar conversa'
    >
      <TrashIcon />
    </button>
  </div>
);

export const ConversationList = ({
  conversations,
  activeConversationId,
  onConversationSelect,
  onDelete,
  onNewChat,
  onLogout,
}) => (
  <aside className='hidden md:flex flex-col flex-shrink-0 w-[260px] bg-[#1F2A44] p-5 gap-5 border-r border-[#323f58]'>
    <div className='flex flex-col items-center gap-4'>
      <div className='w-16 h-16'>
        <UserIcon />
      </div>
      <button
        onClick={onNewChat}
        className='w-full p-3 bg-[#F4F7FB] rounded-lg flex items-center justify-center gap-2.5 text-lg font-montserrat font-medium cursor-pointer hover:bg-gray-200 transition-colors'
      >
        <FilePlusIcon />
        <span>Nova conversa</span>
      </button>
    </div>
    <div className='flex-grow flex flex-col gap-2.5 overflow-y-auto'>
      {conversations.map((convo) => (
        <ConversationItem
          key={convo.id}
          text={convo.title}
          isActive={convo.id === activeConversationId}
          onChangeChat={() => onConversationSelect(convo.id)}
          onDelete={(e) => {
            e.stopPropagation();
            onDelete(convo.id, convo.title);
          }}
        />
      ))}
    </div>
    <div className='mt-auto pl-2.5'>
      {/* Exit Icon SVG */}
      <ExitIcon onClick={onLogout} />
    </div>
  </aside>
);
