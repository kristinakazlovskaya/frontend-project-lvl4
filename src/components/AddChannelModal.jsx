import React, {
  useRef,
  useEffect,
} from 'react';
import { useFormik } from 'formik';
import {
  Modal,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import useContent from '../hooks/useContent.js';

const generateOnSubmit = (onHide, content) => (values) => {
  content.socket.emit('newChannel', { name: values.channelName });
  onHide();
};

const AddChannelModal = ({ onHide }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const content = useContent();

  const f = useFormik({ onSubmit: generateOnSubmit(onHide, content), initialValues: { channelName: '' } });

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Добавить канал</Modal.Title>
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

export default AddChannelModal;
