import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
  Modal,
  FormGroup,
  FormControl,
  Button,
  Form,
} from 'react-bootstrap';
import * as Yup from 'yup';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useContent from '../hooks/useContent.js';

const generateOnSubmit = (onHide, content, modalInfo, setIsSending, t) => (values) => {
  setIsSending(true);
  content.socket.emit('renameChannel', { id: modalInfo.id, name: values.chName }, (response) => {
    if (response.status === 'ok') {
      setIsSending(false);
    }
  });
  toast.success(t('toasts.renameChannelModal'));
  onHide();
};

const RenameChannelModal = ({ onHide }) => {
  const { t } = useTranslation();

  const [isRefMounted, setIsRefMounted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const inputRef = useRef(null);

  const content = useContent();

  const modalInfo = useSelector((state) => state.modal);
  const channels = useSelector((state) => state.channels.channels);

  const channel = channels.find((ch) => ch.id === modalInfo.id);

  const f = useFormik({
    onSubmit: generateOnSubmit(onHide, content, modalInfo, setIsSending, t),
    initialValues: { chName: channel.name },
    validationSchema: Yup.object({
      chName: Yup.string()
        .required(t('modals.validation.required'))
        .min(3, t('modals.validation.length'))
        .max(20, t('modals.validation.length'))
        .notOneOf(channels.map((ch) => ch.name), t('modals.validation.unique')),
    }),
    validateOnChange: false,
    validateOnBlur: false,
  });

  const inputClass = classNames('mb-2', {
    'is-invalid': f.touched.chName && f.errors.chName,
  });

  const onRefChangeCallback = useCallback((input) => {
    if (input) {
      inputRef.current = input;
      setIsRefMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isRefMounted) {
      inputRef.current.select();
    }
  }, [isRefMounted]);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.rename.header')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={f.handleSubmit}>
          <FormGroup>
            <FormControl
              ref={onRefChangeCallback}
              isInvalid={f.touched.chName && f.errors.chNam}
              className={inputClass}
              name="chName"
              value={f.values.chName}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
            />
            <Form.Control.Feedback type="invalid">{f.errors.chName}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button onClick={onHide} variant="secondary" className="me-2" disabled={isSending}>{t('modals.buttons.cancel')}</Button>
              <Button type="submit" variant="primary" disabled={isSending}>{t('modals.buttons.send')}</Button>
            </div>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
