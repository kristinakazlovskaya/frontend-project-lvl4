import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthProvider.jsx';

const Main = () => {
  const { getAuthHeader } = useContext(AuthContext);
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get('/api/v1/data', { headers: getAuthHeader() });
      setContent(data);
    };

    fetchContent();
  }, []);

  return content && <p>I am chat</p>;
};

export default Main;
