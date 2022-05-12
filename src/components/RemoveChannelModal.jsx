import React from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import useContent from '../hooks/useContent.js';

const generateOnSubmit = (onHide, content, modalInfo) => {
  content.socket.emit('removeChannel', modalInfo);
  onHide();
};

const RemoveChannelModal = ({ onHide }) => {
  const content = useContent();

  const modalInfo = useSelector((state) => state.modal);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button onClick={onHide} variant="secondary" className="me-2">Отменить</Button>
          <Button onClick={() => generateOnSubmit(onHide, content, modalInfo)} variant="danger">Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
