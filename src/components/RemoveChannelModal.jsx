import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import useContent from '../hooks/useContent.js';

const generateOnSubmit = (onHide, content, modalInfo, setIsSending) => {
  setIsSending(true);
  content.socket.emit('removeChannel', modalInfo, (response) => {
    if (response.status === 'ok') {
      setIsSending(false);
    }
  });
  onHide();
};

const RemoveChannelModal = ({ onHide }) => {
  const [isSending, setIsSending] = useState(false);

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
          <Button
            disabled={isSending}
            variant="secondary"
            className="me-2"
            onClick={onHide}
          >
            Отменить
          </Button>
          <Button
            disabled={isSending}
            variant="danger"
            onClick={() => generateOnSubmit(onHide, content, modalInfo, setIsSending)}
          >
            Удалить
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
