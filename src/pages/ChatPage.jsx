import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { getChannels } from '../slices/channelsSlice.js';
import { getMessages } from '../slices/messagesSlice.js';
import useAuth from '../hooks/useAuth.js';
import Channels from '../components/Channels.jsx';
import Messages from '../components/Messages.jsx';

const ChatPage = () => {
  const { getAuthHeader } = useAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get('/api/v1/data', { headers: getAuthHeader() });
      dispatch(getChannels(data.channels));
      dispatch(getMessages(data.messages));
    };

    fetchContent();
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <Channels />
        </div>
        <div className="col p-0 h-100">
          <Messages />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
