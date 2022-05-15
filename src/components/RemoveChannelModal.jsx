import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useContent from '../hooks/useContent.js';

const generateOnSubmit = (onHide, content, modalInfo, setIsSending, t) => {
  setIsSending(true);
  content.socket.emit('removeChannel', modalInfo, (response) => {
    if (response.status === 'ok') {
      setIsSending(false);
    }
  });
  toast.success(t('toasts.removeChannelModal'));
  onHide();
};

const RemoveChannelModal = ({ onHide }) => {
  const { t } = useTranslation();

  const [isSending, setIsSending] = useState(false);

  const content = useContent();

  const modalInfo = useSelector((state) => state.modal);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.remove.header')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('modals.remove.confirm')}</p>
        <div className="d-flex justify-content-end">
          <Button
            disabled={isSending}
            variant="secondary"
            className="me-2"
            onClick={onHide}
          >
            {t('modals.buttons.cancel')}
          </Button>
          <Button
            disabled={isSending}
            variant="danger"
            onClick={() => generateOnSubmit(onHide, content, modalInfo, setIsSending, t)}
          >
            {t('modals.buttons.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
