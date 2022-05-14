import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import { Dropdown, ButtonGroup, Nav } from 'react-bootstrap';
import { setCurrentChannelId } from '../slices/channelsSlice.js';
import { showModal } from '../slices/modalSlice.js';

const Channel = ({ channel }) => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const dispatch = useDispatch();

  const currentClass = classnames('w-100', 'rounded-0', 'text-start', 'btn', {
    'btn-secondary': channel.id === currentChannelId,
    'text-truncate': channel.id === currentChannelId,
  });

  const dropdownClass = classnames({
    'flex-grow-0': true,
    'btn-secondary': channel.id === currentChannelId,
  });

  if (!channel.removable) {
    return (
      <Nav.Item as="li" className="w-100">
        <button type="button" className={currentClass} onClick={() => dispatch(setCurrentChannelId(channel.id))}>
          <span className="me-1">#</span>
          {channel.name}
        </button>
      </Nav.Item>
    );
  }

  return (
    <Nav.Item as="li" className="w-100">
      <Dropdown as={ButtonGroup} className="d-flex">
        <button type="button" className={currentClass} onClick={() => dispatch(setCurrentChannelId(channel.id))}>
          <span className="me-1">#</span>
          {channel.name}
        </button>

        <Dropdown.Toggle split id="dropdown-split-basic" variant={dropdownClass} />

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => dispatch(showModal({ type: 'removing', id: channel.id }))}>Удалить</Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch(showModal({ type: 'renaming', id: channel.id }))}>Переименовать</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );
};

export default Channel;
