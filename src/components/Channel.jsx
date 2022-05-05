import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import { setCurrentChannelId } from '../slices/channelsSlice.js';

const Channel = ({ channel }) => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const dispatch = useDispatch();

  const currentClass = classnames('w-100', 'rounded-0', 'text-start', 'btn', {
    'btn-secondary': channel.id === currentChannelId,
  });

  if (!channel.removable) {
    return (
      <li className="nav-item w-100">
        <button type="button" className={currentClass} onClick={() => dispatch(setCurrentChannelId(channel.id))}>
          <span className="me-1">#</span>
          {channel.name}
        </button>
      </li>
    );
  }

  return (
    <li className="nav-item w-100">
      <div role="group" className="d-flex dropdown btn-group">
        <button type="button" className={currentClass} onClick={() => setCurrentChannelId(channel.id)}>
          <span className="me-1">#</span>
          {channel.name}
        </button>
        <button type="button" aria-expanded="false" className="flex-grow-0 dropdown-toggle dropdown-toggle-split btn">
          <span className="visually-hidden">Управление каналом</span>
        </button>
      </div>
    </li>
  );
};

export default Channel;
