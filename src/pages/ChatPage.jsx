import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Container, Col, Row } from 'react-bootstrap';
import { getChannels } from '../slices/channelsSlice.js';
import { getMessages } from '../slices/messagesSlice.js';
import useAuth from '../hooks/useAuth.js';
import Channels from '../components/Channels.jsx';
import Messages from '../components/Messages.jsx';
import routes from '../routes.js';

const ChatPage = () => {
  const { getAuthHeader } = useAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get(routes.contentPath(), { headers: getAuthHeader() });
      dispatch(getChannels(data.channels));
      dispatch(getMessages(data.messages));
    };

    fetchContent();
  }, []);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col md={2} className="col-4 border-end pt-5 px-0 bg-light">
          <Channels />
        </Col>
        <Col className="p-0 h-100">
          <Messages />
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
