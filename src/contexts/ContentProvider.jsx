import React, { createContext } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addMessage } from '../slices/messagesSlice.js';

export const ContentContext = createContext({});

const ContentProvider = ({ children }) => {
  const socket = io();

  const dispatch = useDispatch();

  socket.on('newMessage', (message) => {
    dispatch(addMessage(message));
  });

  return (
    // eslint-disable-next-line
    <ContentContext.Provider value={{ socket }}>
      {children}
    </ContentContext.Provider>
  );
};

export default ContentProvider;
