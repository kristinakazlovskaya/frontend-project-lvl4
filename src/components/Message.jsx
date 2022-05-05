import React from 'react';

const Message = ({ id, body, username }) => (
  <div key={id} className="text-break mb-2">
    <b>{username}</b>
    :
    {' '}
    {body}
  </div>
);

export default Message;
