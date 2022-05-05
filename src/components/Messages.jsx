import React from 'react';
import { useSelector } from 'react-redux';
import AddMessageForm from './AddMessageForm.jsx';
import Message from './Message.jsx';

const Messages = () => {
  const channels = useSelector((state) => state.channels.channels);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const messages = useSelector((state) => state.messages);

  const currentMessages = messages.filter((message) => message.channelId === currentChannelId);

  const getCurrentChannelName = () => {
    const currentChannel = channels.find((channel) => channel.id === currentChannelId);
    return currentChannel ? currentChannel.name : null;
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            #
            {' '}
            {getCurrentChannelName()}
          </b>
        </p>
        <span className="text-muted">
          {currentMessages.length}
          {' '}
          сообщений
        </span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {currentMessages.map((message) => <Message key={message.id} message={message} />)}
      </div>
      <div className="mt-auto px-5 py-3">
        <AddMessageForm />
      </div>
    </div>
  );
};

export default Messages;
