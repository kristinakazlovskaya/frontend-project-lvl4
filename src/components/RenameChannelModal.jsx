import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
  Modal,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import useContent from '../hooks/useContent.js';

const generateOnSubmit = (onHide, content, modalInfo) => (values) => {
  content.socket.emit('renameChannel', { id: modalInfo.id, name: values.channelName });
  onHide();
};

const RenameChannelModal = ({ onHide }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  const content = useContent();

  const modalInfo = useSelector((state) => state.modal);
  const channels = useSelector((state) => state.channels.channels);

  const channel = channels.find((ch) => ch.id === modalInfo.id);

  const f = useFormik({
    onSubmit: generateOnSubmit(onHide, content, modalInfo),
    initialValues: { channelName: channel.name },
  });

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={f.handleSubmit}>
          <FormGroup>
            <FormControl
              ref={inputRef}
              required
              className="mb-2"
              name="channelName"
              value={f.values.body}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
            />
            <div className="d-flex justify-content-end">
              <Button onClick={onHide} variant="secondary" className="me-2">Отменить</Button>
              <Button type="submit" variant="primary">Отправить</Button>
            </div>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
