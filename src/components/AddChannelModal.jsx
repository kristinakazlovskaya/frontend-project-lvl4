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
  Form,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useContent from '../hooks/useContent.js';

const generateOnSubmit = (onHide, content, setIsSending, t) => (values) => {
  setIsSending(true);
  content.socket.emit('newChannel', { name: values.channelName }, (response) => {
    if (response.status === 'ok') {
      setIsSending(false);
    }
  });
  toast.success(t('toasts.addChannelModal'));
  onHide();
};

const AddChannelModal = ({ onHide }) => {
  const { t } = useTranslation();

  const inputRef = useRef();

  const content = useContent();

  const channels = useSelector((state) => state.channels.channels);

  const [isSending, setIsSending] = useState(false);

  const f = useFormik({
    onSubmit: generateOnSubmit(onHide, content, setIsSending, t),
    initialValues: { channelName: '' },
    validationSchema: Yup.object({
      channelName: Yup.string()
        .required(t('modals.validation.required'))
        .min(3, t('modals.validation.length'))
        .max(20, t('modals.validation.length'))
        .notOneOf(channels.map((ch) => ch.name), t('modals.validation.unique')),
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
        <Modal.Title>{t('modals.add.header')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={f.handleSubmit}>
          <FormGroup>
            <FormControl
              ref={inputRef}
              isInvalid={f.touched.channelName && f.errors.channelName}
              className={inputClass}
              name="channelName"
              label={t('modals.add.label')}
              value={f.values.channelName}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
            />
            <Form.Control.Feedback type="invalid">{f.errors.channelName}</Form.Control.Feedback>
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
                type="submit"
                variant="primary"
              >
                {t('modals.buttons.send')}
              </Button>
            </div>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
