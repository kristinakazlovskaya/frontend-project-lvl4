import React, { useMemo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import AddMessageForm from './AddMessageForm.jsx';
import Message from './Message.jsx';

const Messages = () => {
  const { t } = useTranslation();

  const channels = useSelector((state) => state.channels.channels);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const messages = useSelector((state) => state.messages);

  const currentMessages = messages.filter((message) => message.channelId === currentChannelId);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView();
  };

  useEffect(scrollToBottom, [messages, currentChannelId]);

  const currentChannelName = useMemo(() => {
    const currentChannel = channels.find((channel) => channel.id === currentChannelId);
    return currentChannel ? currentChannel.name : 'general';
  }, [currentChannelId, channels]);

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            #
            {' '}
            {currentChannelName}
          </b>
        </p>
        <span className="text-muted">
          {t('chat.messages', { count: currentMessages.length })}
        </span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {currentMessages.map((message) => <Message key={message.id} message={message} />)}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-auto px-5 py-3">
        <AddMessageForm />
      </div>
    </div>
  );
};

export default Messages;
