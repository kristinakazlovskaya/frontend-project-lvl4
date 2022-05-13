import React, {
  useRef,
  useEffect,
  useState,
} from 'react';
import { useFormik } from 'formik';
import {
  Modal,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import classNames from 'classnames';
import useContent from '../hooks/useContent.js';

const generateOnSubmit = (onHide, content, setIsSending) => (values) => {
  setIsSending(true);
  content.socket.emit('newChannel', { name: values.channelName }, (response) => {
    if (response.status === 'ok') {
      setIsSending(false);
    }
  });
  onHide();
};

const AddChannelModal = ({ onHide }) => {
  const inputRef = useRef();

  const content = useContent();

  const channels = useSelector((state) => state.channels.channels);

  const [isSending, setIsSending] = useState(false);

  const f = useFormik({
    onSubmit: generateOnSubmit(onHide, content, setIsSending),
    initialValues: { channelName: '' },
    validationSchema: Yup.object({
      channelName: Yup.string()
        .required('Обязательное поле')
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов')
        .notOneOf(channels.map((ch) => ch.name), 'Должно быть уникальным'),
    }),
    validateOnChange: false,
    validateOnBlur: false,
  });

  const inputClass = classNames('mb-2', {
    'is-invalid': f.touched.channelName && f.errors.channelName,
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
              className={inputClass}
              name="channelName"
              value={f.values.channelName}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
            />
            {f.touched.channelName && f.errors.channelName ? (
              <div className="invalid-feedback">{f.errors.channelName}</div>
            ) : null}
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
                type="submit"
                variant="primary"
              >
                Отправить
              </Button>
            </div>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
