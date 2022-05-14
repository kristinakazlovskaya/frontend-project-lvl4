import React, { createContext } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../slices/messagesSlice.js';
import {
  addChannel,
  setCurrentChannelId,
  removeChannel,
  renameChannel,
} from '../slices/channelsSlice.js';

export const ContentContext = createContext({});

const ContentProvider = ({ children, socket }) => {
  const dispatch = useDispatch();

  socket.on('newMessage', (message) => {
    dispatch(addMessage(message));
  });

  socket.on('newChannel', (channel) => {
    dispatch(addChannel(channel));
    dispatch(setCurrentChannelId(channel.id));
  });

  socket.on('removeChannel', (data) => {
    dispatch(removeChannel(data.id));
  });

  socket.on('renameChannel', (channel) => {
    dispatch(renameChannel(channel));
  });

  return (
    // eslint-disable-next-line
    <ContentContext.Provider value={{ socket }}>
      {children}
    </ContentContext.Provider>
  );
};

export default ContentProvider;
