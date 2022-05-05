import React from 'react';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChannelId } from '../slices/channelsSlice.js';

const Channels = () => {
  const dispatch = useDispatch();

  const channels = useSelector((state) => state.channels.channels);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const getUnremovableChannels = (chnls) => {
    if (chnls.length === 0) {
      return null;
    }

    return (
      <>
        {chnls
          .filter((channel) => channel.removable === false)
          .map((channel) => {
            const currentClass = classnames('w-100', 'rounded-0', 'text-start', 'btn', {
              'btn-secondary': channel.id === currentChannelId,
            });

            return (
              <li className="nav-item w-100" key={channel.id}>
                <button onClick={() => dispatch(setCurrentChannelId(channel.id))} type="button" className={currentClass}>
                  <span className="me-1">#</span>
                  {channel.name}
                </button>
              </li>
            );
          })}
      </>
    );
  };

  const getRemovableChannels = (chnls) => {
    const removableChnls = chnls.filter((channel) => channel.removable);

    if (removableChnls.length === 0) {
      return null;
    }

    return (
      <>
        {removableChnls.map((channel) => (
          <li className="nav-item w-100" key={channel.id}>
            <div role="group" className="d-flex dropdown btn-group">
              <button onClick={() => setCurrentChannelId(channel.id)} type="button" className="w-100 rounded-0 text-start text-truncate btn">
                <span className="me-1">#</span>
                {channel.name}
              </button>
              <button type="button" aria-expanded="false" className="flex-grow-0 dropdown-toggle dropdown-toggle-split btn">
                <span className="visually-hidden">Управление каналом</span>
              </button>
            </div>
          </li>
        ))}
      </>
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {getUnremovableChannels(channels)}
        {getRemovableChannels(channels)}
      </ul>
    </>
  );
};

export default Channels;
